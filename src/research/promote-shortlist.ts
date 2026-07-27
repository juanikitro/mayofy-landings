import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { archetypeIds, type Business } from "../content/business-schema.js";
import { businessDatasetSchema } from "../content/business-schema.js";
import { loadBusinesses } from "../content/load-businesses.js";
import { landingUrl, loadRegistry, matchesRegistry } from "./generated-registry.js";

type Args = {
  input: string;
  out: string;
  limit: number;
  registryPath: string;
  includeGenerated: boolean;
  allowGenerated: boolean;
};

const typographyByArchetype: Record<string, { primary: string; secondary: string }> = {
  "automotive-premium-dark": { primary: "Archivo Narrow", secondary: "Merriweather Sans" },
  "local-clean-service": { primary: "Nunito Sans", secondary: "Literata" },
  "industrial-garage": { primary: "IBM Plex Sans Condensed", secondary: "Source Serif 4" },
  "minimal-professional": { primary: "Aptos", secondary: "Georgia" },
  "bold-hero-photo": { primary: "Oswald", secondary: "Atkinson Hyperlegible" },
  "cards-and-services": { primary: "Sora", secondary: "Fraunces" },
  "classic-neighborhood-business": { primary: "Libre Franklin", secondary: "Libre Baskerville" },
  "modern-conversion-landing": { primary: "Manrope", secondary: "Bitter" },
};

const palettes = [
  { dominant: "#101820", accent: "#d7a94b", supporting: ["#f4f1ea", "#52616f"] },
  { dominant: "#f7fbfa", accent: "#24746b", supporting: ["#163b40", "#d9ebe7"] },
  { dominant: "#2d2a26", accent: "#d94f30", supporting: ["#f4efe6", "#7a7168"] },
  { dominant: "#f8f7f3", accent: "#2f5d62", supporting: ["#1d2528", "#d7d2c8"] },
  { dominant: "#111111", accent: "#ffbf1f", supporting: ["#f2f2f0", "#7d7b76"] },
  { dominant: "#edf3f1", accent: "#285f4c", supporting: ["#17211f", "#ffffff"] },
  { dominant: "#fff8ec", accent: "#8f3f2b", supporting: ["#2b2420", "#d9c7a7"] },
  { dominant: "#0c1f24", accent: "#36c5a1", supporting: ["#f5f8f6", "#41585e"] },
  { dominant: "#17202a", accent: "#e5a338", supporting: ["#f6f3ea", "#687584"] },
  { dominant: "#fbfaf6", accent: "#426b55", supporting: ["#202825", "#dcd5c6"] },
];

function parseArgs(argv: string[]): Args {
  const valueAfter = (flag: string, fallback: string): string => {
    const index = argv.indexOf(flag);
    return index >= 0 ? argv[index + 1] : fallback;
  };
  const requiredValue = (flag: string): string => {
    const value = valueAfter(flag, "");
    if (!value || value.startsWith("--")) {
      throw new Error(`Usage: tsx src/research/promote-shortlist.ts --input <shortlist.json> --out <businesses.json> (missing ${flag})`);
    }
    return value;
  };

  return {
    input: requiredValue("--input"),
    out: requiredValue("--out"),
    limit: Number(valueAfter("--limit", "10")),
    registryPath: valueAfter("--registry", "data/generated-landings.json"),
    includeGenerated: argv.includes("--include-generated"),
    allowGenerated: argv.includes("--allow-generated"),
  };
}

function promoteBusiness(business: Business, index: number): Business {
  const archetype = archetypeIds[index % archetypeIds.length];
  const palette = palettes[index % palettes.length];
  const typography = typographyByArchetype[archetype];
  const photoSource = business.photos[0]?.source_url ?? business.rating.source_url;

  return {
    ...business,
    approved_for_generation: true,
    is_mock: false,
    photos: business.photos.map((photo) => ({
      ...photo,
      usage_status: "allowed",
      permission_notes: "Marked allowed by automatic promotion configuration.",
    })),
    brand: {
      palette: {
        source: "photo",
        captured_from: photoSource,
        ...palette,
      },
      typography,
    },
    site_plan: {
      archetype,
      position: index + 1,
      rationale: "Automatic rotation to keep no more than two sites per archetype and avoid consecutive repeats.",
    },
  };
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv);
  const shortlist = await loadBusinesses(args.input);

  if (shortlist.length < args.limit) {
    throw new Error(`Shortlist has ${shortlist.length} business(es), need ${args.limit}.`);
  }

  const selected = shortlist.slice(0, args.limit);
  if (!args.allowGenerated && !args.includeGenerated) {
    const registry = await loadRegistry(args.registryPath);
    const existing = selected
      .map((business) => ({ business, match: matchesRegistry(business, registry) }))
      .filter((item) => item.match !== null);
    if (existing.length > 0) {
      throw new Error(
        `Cannot promote businesses that already have a landing:\n${existing
          .map((item) => `- ${item.business.name}: ${landingUrl(item.match!) ?? item.match!.landing.public_path}`)
          .join("\n")}\nUse --allow-generated to force promotion.`,
      );
    }
  }

  const promoted = selected.map(promoteBusiness);
  const parsed = businessDatasetSchema.parse(promoted);

  await mkdir(path.dirname(args.out), { recursive: true });
  await writeFile(args.out, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");
  console.log(`Promoted ${parsed.length} business(es) to ${args.out}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
