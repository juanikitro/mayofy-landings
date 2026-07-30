import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Business } from "../content/business-schema.js";
import { businessDatasetSchema } from "../content/business-schema.js";
import { loadBusinesses } from "../content/load-businesses.js";
import { emptyRegistry, loadRegistry, matchesRegistry, renderLandingLink } from "./generated-registry.js";
import type { GeneratedLandingEntry } from "./generated-registry.js";

type Args = {
  input: string;
  out: string;
  limit: number;
  terms: string[];
  excludeTerms: string[];
  title: string;
  registryPath: string;
  includeGenerated: boolean;
};

type ScoredBusiness = {
  business: Business;
  score: number;
  reasons: string[];
  segment: ServiceSegment;
};

type ServiceSegment =
  | "detailing"
  | "lavadero"
  | "lubricentro"
  | "taller"
  | "gomeria"
  | "chapa-pintura"
  | "polarizados"
  | "repuestos-audio"
  | "otros";

const serviceSegments: Array<{ id: ServiceSegment; label: string; terms: string[] }> = [
  {
    id: "detailing",
    label: "detailing/estetica",
    terms: ["detailing", "estetica vehicular", "estética vehicular"],
  },
  {
    id: "lavadero",
    label: "lavadero",
    terms: ["lavadero", "lavado", "car wash", "limpieza"],
  },
  {
    id: "lubricentro",
    label: "lubricentro",
    terms: ["lubricentro", "lubricante", "lubricantes", "aceite", "aceites"],
  },
  {
    id: "gomeria",
    label: "gomeria",
    terms: ["gomeria", "gomería", "cubierta", "cubiertas", "tire", "auxilio"],
  },
  {
    id: "chapa-pintura",
    label: "chapa y pintura",
    terms: ["chapa", "pintura", "paint", "body"],
  },
  {
    id: "polarizados",
    label: "polarizados",
    terms: ["polarizado", "polarizados"],
  },
  {
    id: "repuestos-audio",
    label: "repuestos/audio",
    terms: ["repuesto", "repuestos", "audio", "autopart", "parts", "accesorio", "accesorios"],
  },
  {
    id: "taller",
    label: "taller mecanico",
    terms: ["taller", "mecanica", "mecánica", "service", "car repair", "maintenance"],
  },
];

const strongVehicleTerms = [
  "lavadero",
  "detailing",
  "lubricentro",
  "taller",
  "gomeria",
  "gomería",
  "polarizado",
  "audio",
  "repuesto",
  "chapa",
  "pintura",
  "vehicular",
  "auto",
  "moto",
  "cubierta",
  "lubricante",
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
      throw new Error(`Usage: tsx src/research/shortlist-businesses.ts --input <candidates.json> --out <shortlist.json> (missing ${flag})`);
    }
    return value;
  };

  return {
    input: requiredValue("--input"),
    out: requiredValue("--out"),
    limit: Number(valueAfter("--limit", "10")),
    terms: splitList(valueAfter("--terms", strongVehicleTerms.join("|"))),
    excludeTerms: splitList(valueAfter("--exclude", "")),
    title: valueAfter("--title", "Shortlist"),
    registryPath: valueAfter("--registry", "data/generated-landings.json"),
    includeGenerated: argv.includes("--include-generated"),
  };
}

function normalizedKey(business: Business): string {
  return `${business.name}|${business.address}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function segmentStrength(business: Business, terms: string[]): number {
  const haystack = `${business.name} ${business.category} ${business.main_product_or_service}`.toLowerCase();
  return terms.some((term) => haystack.includes(term.toLowerCase())) ? 1 : 0;
}

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function classifySegment(business: Business): ServiceSegment {
  const verifiedHaystack = normalize(
    [
      business.name,
      business.category,
      business.reviews.map((review) => review.text).join(" "),
    ].join(" "),
  );

  for (const segment of serviceSegments) {
    if (segment.terms.some((term) => verifiedHaystack.includes(normalize(term)))) {
      return segment.id;
    }
  }

  const service = normalize(business.main_product_or_service);
  const querySafeSegments: ServiceSegment[] = ["detailing", "lavadero", "lubricentro", "gomeria", "chapa-pintura", "taller"];

  for (const segment of serviceSegments.filter((item) => querySafeSegments.includes(item.id))) {
    if (segment.terms.some((term) => service.includes(normalize(term)))) {
      return segment.id;
    }
  }

  return "otros";
}

function segmentLabel(segmentId: ServiceSegment): string {
  return serviceSegments.find((segment) => segment.id === segmentId)?.label ?? "otros";
}

function scoreBusiness(business: Business, terms: string[]): ScoredBusiness {
  const reasons: string[] = [];
  let score = 0;
  const segment = classifySegment(business);

  if (!business.has_own_website) {
    score += 20;
    reasons.push("sin websiteUri");
  }
  if (business.rating.value >= 4.7) {
    score += 18;
    reasons.push("rating muy alto");
  } else if (business.rating.value >= 4.3) {
    score += 12;
    reasons.push("rating alto");
  }

  score += Math.min(18, Math.log10(Math.max(business.rating.reviews_count, 1)) * 9);
  if (business.rating.reviews_count >= 25) reasons.push("volumen de reseñas bueno");
  if (business.reviews.length >= 3) {
    score += 16;
    reasons.push("3 reseñas disponibles");
  }
  if (business.photos.length > 0) {
    score += 12;
    reasons.push("fotos disponibles");
  }
  if (business.phone) {
    score += 6;
    reasons.push("telefono disponible");
  }
  if (business.opening_hours.raw) {
    score += 6;
    reasons.push("horarios disponibles");
  }
  if (segmentStrength(business, terms)) {
    score += 14;
    reasons.push("rubro coincide con la busqueda");
  }
  score += business.data_quality_score * 10;

  if (business.missing_data_reason) {
    score -= 8;
    reasons.push(`datos faltantes: ${business.missing_data_reason}`);
  }

  return {
    business,
    score: Number(score.toFixed(2)),
    reasons,
    segment,
  };
}

function isEligible(business: Business, excludeTerms: string[]): boolean {
  const haystack = `${business.name} ${business.address}`.toLowerCase();
  return (
    !business.has_own_website &&
    business.rating.value >= 4.3 &&
    business.rating.reviews_count >= 10 &&
    business.reviews.length >= 3 &&
    business.photos.length > 0 &&
    business.address.length > 0 &&
    !excludeTerms.some((term) => haystack.includes(term.toLowerCase()))
  );
}

function dedupe(scored: ScoredBusiness[]): ScoredBusiness[] {
  const bestByKey = new Map<string, ScoredBusiness>();

  for (const item of scored) {
    const key = normalizedKey(item.business);
    const existing = bestByKey.get(key);
    if (!existing || item.score > existing.score) {
      bestByKey.set(key, item);
    }
  }

  return [...bestByKey.values()];
}

function selectDiverse(scored: ScoredBusiness[], limit: number): ScoredBusiness[] {
  const selected: ScoredBusiness[] = [];
  const usedIds = new Set<string>();
  const segmentCounts = new Map<ServiceSegment, number>();
  const priority = serviceSegments.map((segment) => segment.id);

  const add = (item: ScoredBusiness): boolean => {
    if (usedIds.has(item.business.id) || selected.length >= limit) return false;
    selected.push(item);
    usedIds.add(item.business.id);
    segmentCounts.set(item.segment, (segmentCounts.get(item.segment) ?? 0) + 1);
    return true;
  };

  for (const segment of priority) {
    const best = scored.find((item) => item.segment === segment && !usedIds.has(item.business.id));
    if (best) add(best);
    if (selected.length >= limit) return selected;
  }

  for (const maxPerSegment of [2, 3]) {
    for (const item of scored) {
      if (item.segment === "otros") continue;
      if ((segmentCounts.get(item.segment) ?? 0) >= maxPerSegment) continue;
      add(item);
      if (selected.length >= limit) return selected;
    }
  }

  for (const item of scored) {
    add(item);
    if (selected.length >= limit) return selected;
  }

  return selected;
}

function renderReport(
  scored: ScoredBusiness[],
  title: string,
  excludedGenerated: Array<{ business: Business; landing: GeneratedLandingEntry }>,
  reportPath: string,
): string {
  const lines = [`# ${title}`, "", `Generated at: ${new Date().toISOString()}`, ""];

  for (const [index, item] of scored.entries()) {
    lines.push(`${index + 1}. ${item.business.name}`);
    lines.push(`   - Score: ${item.score}`);
    lines.push(`   - Segment: ${segmentLabel(item.segment)}`);
    lines.push(`   - Rating: ${item.business.rating.value} (${item.business.rating.reviews_count} reseñas)`);
    lines.push(`   - Category: ${item.business.category}`);
    lines.push(`   - Address: ${item.business.address}`);
    lines.push(`   - Reasons: ${item.reasons.join("; ")}`);
    lines.push("");
  }

  if (excludedGenerated.length > 0) {
    lines.push("## Descartados: ya tiene landing", "");
    for (const item of excludedGenerated) {
      lines.push(`- ${item.business.name}: ${renderLandingLink(item.landing, reportPath)}`);
    }
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv);
  const candidates = await loadBusinesses(args.input);
  const registry = args.includeGenerated ? emptyRegistry() : await loadRegistry(args.registryPath);
  const excludedGenerated: Array<{ business: Business; landing: GeneratedLandingEntry }> = [];
  const candidatesWithoutGenerated = candidates.filter((business) => {
    const match = matchesRegistry(business, registry);
    if (!match) return true;
    excludedGenerated.push({ business, landing: match });
    return false;
  });
  const scored = dedupe(candidatesWithoutGenerated.filter((business) => isEligible(business, args.excludeTerms)).map((business) => scoreBusiness(business, args.terms))).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.business.rating.value !== a.business.rating.value) return b.business.rating.value - a.business.rating.value;
    return b.business.rating.reviews_count - a.business.rating.reviews_count;
  });
  const selected = selectDiverse(scored, args.limit);

  if (selected.length < args.limit) {
    throw new Error(`Only ${selected.length} eligible candidate(s), need ${args.limit}. Run search again with a higher limit or lower filters.`);
  }

  const shortlist = selected.map((item) => ({
    ...item.business,
    approved_for_generation: false,
    missing_data_reason: item.business.missing_data_reason,
  }));

  const parsed = businessDatasetSchema.parse(shortlist);
  const reportPath = args.out.replace(/\.json$/i, ".report.md");
  await mkdir(path.dirname(args.out), { recursive: true });
  await writeFile(args.out, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");
  await writeFile(reportPath, renderReport(selected, args.title, excludedGenerated, reportPath), "utf8");

  console.log(`Skipped ${excludedGenerated.length} business(es) already present in the generated registry.`);
  console.log(`Wrote ${parsed.length} shortlisted business(es) to ${args.out}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
