import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Business } from "../content/business-schema.js";
import { businessDatasetSchema } from "../content/business-schema.js";
import { placeDetails, textSearch, type GooglePlaceDetails } from "./google-places.js";
import { emptyRegistry, loadRegistry, matchesRegistry, matchesRegistryPlaceId } from "./generated-registry.js";
import { slugify } from "./slug.js";

type Args = {
  city: string;
  country: string;
  out: string;
  limit: number;
  perQueryLimit: number;
  segment: string;
  queries: string[];
  vehicleRelated: boolean;
  excludeTerms: string[];
  registryPath: string;
  includeGenerated: boolean;
};

const vehicleQueries = [
  "lavadero de autos",
  "car detailing",
  "lubricentro",
  "taller mecanico",
  "gomeria",
  "polarizados autos",
  "audio para autos",
  "repuestos autos",
  "chapa y pintura autos",
  "estetica vehicular",
];

const chainSignals = [
  "ypf",
  "shell",
  "axion",
  "puma",
  "toyota",
  "ford",
  "chevrolet",
  "renault",
  "volkswagen",
  "fiat",
  "norauto",
];

function splitList(value: string): string[] {
  return value
    .split(/[|,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseArgs(argv: string[]): Args {
  const valueAfter = (flag: string, fallback: string): string => {
    const index = argv.indexOf(flag);
    return index >= 0 ? argv[index + 1] : fallback;
  };
  const requiredValue = (flag: string): string => {
    const value = valueAfter(flag, "");
    if (!value || value.startsWith("--")) {
      throw new Error(`Usage: tsx src/research/search-businesses.ts --city <city> --out <candidates.json> (missing ${flag})`);
    }
    return value;
  };

  const segment = valueAfter("--segment", "servicios vehiculares");
  const queries = splitList(valueAfter("--queries", vehicleQueries.join("|")));

  return {
    city: requiredValue("--city"),
    country: valueAfter("--country", "Argentina"),
    out: requiredValue("--out"),
    limit: Number(valueAfter("--limit", "30")),
    perQueryLimit: Number(valueAfter("--per-query-limit", "12")),
    segment,
    queries,
    vehicleRelated: !argv.includes("--not-vehicle-related"),
    excludeTerms: splitList(valueAfter("--exclude", "")),
    registryPath: valueAfter("--registry", path.join("data", "generated-landings.json")),
    includeGenerated: argv.includes("--include-generated"),
  };
}

function publicSource(place: GooglePlaceDetails): string {
  return place.googleMapsUri ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.displayName?.text ?? place.id)}`;
}

function category(place: GooglePlaceDetails): string {
  return place.primaryTypeDisplayName?.text ?? place.primaryType ?? "negocio local";
}

function serviceFromQuery(query: string): string {
  return query
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function openingHoursRaw(place: GooglePlaceDetails): string | null {
  return place.regularOpeningHours?.weekdayDescriptions?.join(" | ") ?? null;
}

function looksLikeChain(place: GooglePlaceDetails, extraSignals: string[] = []): boolean {
  const haystack = [place.displayName?.text, place.formattedAddress, ...(place.types ?? [])].join(" ").toLowerCase();
  return [...chainSignals, ...extraSignals.map((signal) => signal.toLowerCase())].some((signal) => haystack.includes(signal));
}

function qualityScore(place: GooglePlaceDetails): number {
  let score = 0.35;
  if (place.formattedAddress) score += 0.1;
  if (place.nationalPhoneNumber || place.internationalPhoneNumber) score += 0.1;
  if (openingHoursRaw(place)) score += 0.1;
  if ((place.rating ?? 0) >= 4.3) score += 0.1;
  if ((place.userRatingCount ?? 0) >= 10) score += 0.1;
  if ((place.reviews?.length ?? 0) >= 3) score += 0.1;
  if ((place.photos?.length ?? 0) > 0) score += 0.05;
  return Math.min(Number(score.toFixed(2)), 1);
}

function fieldEvidence(place: GooglePlaceDetails): Business["verification"]["field_evidence"] {
  const source = publicSource(place);
  const fields: Business["verification"]["field_evidence"] = [
    { field: "name", source_url: source, notes: "Google Places API displayName." },
    { field: "address", source_url: source, notes: "Google Places API formattedAddress." },
    { field: "city", source_url: source, notes: "Derived from the requested city and Google Places formattedAddress context." },
    { field: "category", source_url: source, notes: "Google Places API primary type." },
    { field: "rating", source_url: source, notes: "Google Places API rating and userRatingCount." },
    { field: "website_check", source_url: source, notes: "Google Places API websiteUri checked." },
  ];

  if (place.nationalPhoneNumber || place.internationalPhoneNumber) {
    fields.push({ field: "phone", source_url: source, notes: "Google Places API phone field." });
  }
  if (openingHoursRaw(place)) {
    fields.push({ field: "opening_hours", source_url: source, notes: "Google Places API regularOpeningHours." });
  }
  if ((place.reviews?.length ?? 0) > 0) {
    fields.push({ field: "reviews", source_url: source, notes: "Google Places API reviews. Preserve attribution before publishing." });
  }
  if ((place.photos?.length ?? 0) > 0) {
    fields.push({ field: "photos", source_url: source, notes: "Google Places API photos metadata. Permission review required." });
  }
  fields.push({ field: "main_product_or_service", source_url: source, notes: "Derived conservatively from category/query, must be manually verified." });

  return fields;
}

function toBusinessCandidate(place: GooglePlaceDetails, query: string, args: Args): Business {
  const name = place.displayName?.text ?? place.id;
  const source = publicSource(place);
  const hasWebsite = Boolean(place.websiteUri);
  const reviews = (place.reviews ?? []).slice(0, 3).map((review) => ({
    text: review.originalText?.text ?? review.text?.text ?? "",
    author: review.authorAttribution?.displayName ?? null,
    rating: review.rating ?? 0,
    source_url: review.authorAttribution?.uri ?? source,
  })).filter((review) => review.text.length > 0);

  const photos = (place.photos ?? []).slice(0, 3).map((photo) => ({
    url: photo.name ? `https://places.googleapis.com/v1/${photo.name}/media?maxWidthPx=1600` : source,
    type: "other" as const,
    source_url: source,
    usage_status: "allowed" as const,
    permission_notes: "Marked allowed by local pipeline configuration. Source remains Google Places API photo metadata.",
  }));

  const missing: string[] = [];
  if (!place.nationalPhoneNumber && !place.internationalPhoneNumber) missing.push("telefono");
  if (!openingHoursRaw(place)) missing.push("horarios");
  if (reviews.length < 3) missing.push("3 resenas literales");
  if (photos.length === 0) missing.push("fotos");
  if (hasWebsite) missing.push("descartado: Google Places informa websiteUri");
  if (looksLikeChain(place, args.excludeTerms)) missing.push("posible cadena/franquicia por nombre o tipo");

  return {
    id: `google-${place.id}`,
    name,
    slug: slugify(name),
    category: category(place),
    is_vehicle_related: args.vehicleRelated,
    address: place.formattedAddress ?? `${args.city}, ${args.country}`,
    city: args.city,
    neighborhood_or_area: null,
    phone: place.nationalPhoneNumber ?? place.internationalPhoneNumber ?? null,
    opening_hours: {
      raw: openingHoursRaw(place),
      structured: {},
    },
    rating: {
      value: place.rating ?? 0,
      reviews_count: place.userRatingCount ?? 0,
      source_url: source,
    },
    reviews,
    main_product_or_service: serviceFromQuery(query),
    photos,
    has_own_website: hasWebsite,
    website_check: {
      checked_sources: [source],
      evidence: hasWebsite ? [`Google Places websiteUri: ${place.websiteUri}`] : ["Google Places no devolvio websiteUri para este Place ID."],
      notes: hasWebsite
        ? "No apto: Google Places informa sitio web propio."
        : "Candidato sin websiteUri en Google Places. Requiere verificacion secundaria antes de aprobacion final.",
    },
    data_quality_score: qualityScore(place),
    missing_data_reason: missing.length > 0 ? missing.join("; ") : null,
    approved_for_generation: false,
    is_mock: false,
    verification: {
      source_records: [
        {
          label: "Google Places API",
          url: source,
          captured_at: new Date().toISOString(),
          notes: `Resultado automatico para "${query}" en ${args.city}. Segmento: ${args.segment}.`,
        },
      ],
      field_evidence: fieldEvidence(place),
    },
  };
}

function registryIdentity(place: GooglePlaceDetails, args: Args) {
  const name = place.displayName?.text ?? place.id;
  return {
    id: `google-${place.id}`,
    name,
    slug: slugify(name),
    city: args.city,
    address: place.formattedAddress ?? `${args.city}, ${args.country}`,
    phone: place.nationalPhoneNumber ?? place.internationalPhoneNumber ?? null,
  };
}

function shouldKeep(place: GooglePlaceDetails, minRating: number, minReviews: number, excludeTerms: string[], country: string): boolean {
  if (place.businessStatus && place.businessStatus !== "OPERATIONAL") return false;
  if (looksLikeChain(place, excludeTerms)) return false;
  if (place.websiteUri) return false;
  if ((place.rating ?? 0) < minRating) return false;
  if ((place.userRatingCount ?? 0) < minReviews) return false;
  if (!place.formattedAddress) return false;
  if (!place.formattedAddress.toLocaleLowerCase().includes(country.toLocaleLowerCase())) return false;
  return true;
}

function balancedByQuery(items: Array<{ place: GooglePlaceDetails; query: string }>, queries: string[], limit: number): Array<{ place: GooglePlaceDetails; query: string }> {
  const groups = new Map<string, Array<{ place: GooglePlaceDetails; query: string }>>();
  for (const query of queries) {
    groups.set(query, []);
  }
  for (const item of items) {
    const group = groups.get(item.query) ?? [];
    group.push(item);
    groups.set(item.query, group);
  }

  const output: Array<{ place: GooglePlaceDetails; query: string }> = [];
  let added = true;

  while (output.length < limit && added) {
    added = false;
    for (const query of queries) {
      const group = groups.get(query) ?? [];
      const next = group.shift();
      if (!next) continue;
      output.push(next);
      added = true;
      if (output.length >= limit) break;
    }
  }

  return output;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv);
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_PLACES_API_KEY is required. Copy .env.example values into your shell environment first.");
  }

  const minRating = Number(process.env.LOCAL_WEB_SEARCH_MIN_RATING ?? "4.3");
  const minReviews = Number(process.env.LOCAL_WEB_SEARCH_MIN_REVIEWS ?? "10");
  const registry = args.includeGenerated ? emptyRegistry() : await loadRegistry(args.registryPath);
  const seen = new Map<string, { place: GooglePlaceDetails; query: string }>();
  let skippedBeforeDetails = 0;
  let skippedAfterDetails = 0;

  for (const query of args.queries) {
    const fullQuery = `${query} en ${args.city}, ${args.country}`;
    const results = await textSearch(fullQuery, apiKey);
    let acceptedForQuery = 0;

    for (const result of results) {
      if (acceptedForQuery >= args.perQueryLimit) break;
      if (!result.id || seen.has(result.id)) continue;
      if (matchesRegistryPlaceId(result.id, registry)) {
        skippedBeforeDetails += 1;
        continue;
      }
      const details = await placeDetails(result.id, apiKey);
      if (matchesRegistry(registryIdentity(details, args), registry)) {
        skippedAfterDetails += 1;
        continue;
      }
      if (shouldKeep(details, minRating, minReviews, args.excludeTerms, args.country)) {
        seen.set(result.id, { place: details, query });
        acceptedForQuery += 1;
      }
    }
  }

  const candidates = balancedByQuery([...seen.values()], args.queries, args.limit).map(({ place, query }) => toBusinessCandidate(place, query, args));
  const parsed = businessDatasetSchema.parse(candidates);

  await mkdir(path.dirname(args.out), { recursive: true });
  await writeFile(args.out, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");

  console.log(
    `Skipped ${skippedBeforeDetails + skippedAfterDetails} already-generated business(es) (${skippedBeforeDetails} before details, ${skippedAfterDetails} after details).`,
  );
  console.log(`Wrote ${parsed.length} candidate(s) to ${args.out}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
