import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { approvedBusinesses, loadBusinesses } from "../src/content/load-businesses.js";
import { summarizeOpeningHours } from "../src/content/hours.js";
import { buildBusinessProfile } from "../src/content/local-copy.js";
import { businessDisplayName } from "../src/content/business-name.js";
import { siteSpecDatasetSchema } from "../src/site-specs/schema.js";

type Args = {
  input: string;
  specs: string;
  outDir: string;
  city: string;
  segment: string;
  remakeFrom: string | null;
  screenshotsDir: string | null;
};

function parseArgs(argv: string[]): Args {
  const valueAfter = (flag: string, fallback: string): string => {
    const index = argv.indexOf(flag);
    return index >= 0 ? argv[index + 1] : fallback;
  };
  const requiredValue = (flag: string): string => {
    const value = valueAfter(flag, "");
    if (!value || value.startsWith("--")) {
      throw new Error(
        `Usage: tsx scripts/create-agent-briefs.ts --input <businesses.json> --specs <site-specs.json> --out <briefs-dir> --city <city> --segment <segment> (missing ${flag})`,
      );
    }
    return value;
  };

  return {
    input: requiredValue("--input"),
    specs: requiredValue("--specs"),
    outDir: requiredValue("--out"),
    city: requiredValue("--city"),
    segment: valueAfter("--segment", "servicios vehiculares"),
    remakeFrom: valueAfter("--remake-from", "") || null,
    screenshotsDir: valueAfter("--screenshots", "") || null,
  };
}

function fencedJson(value: unknown): string {
  return `\n\`\`\`json\n${JSON.stringify(value, null, 2)}\n\`\`\`\n`;
}

function slugPart(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function loadCurrentSpecs(filePath: string): Promise<Map<string, unknown>> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = siteSpecDatasetSchema.parse(JSON.parse(raw));
    return new Map(parsed.map((spec) => [spec.business_id, spec]));
  } catch {
    return new Map();
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

async function optionalExcerpt(filePath: string, maxLength = 2800): Promise<string | null> {
  if (!(await fileExists(filePath))) {
    return null;
  }

  const raw = await readFile(filePath, "utf8");
  return raw.length > maxLength ? `${raw.slice(0, maxLength)}\n...[truncated]` : raw;
}

async function loadRemakeContext(args: Args, slug: string): Promise<{
  htmlPath: string | null;
  cssPath: string | null;
  htmlExcerpt: string | null;
  cssExcerpt: string | null;
  desktopScreenshot: string | null;
  mobileScreenshot: string | null;
}> {
  const htmlPath = args.remakeFrom ? path.join(args.remakeFrom, slug, "index.html") : null;
  const cssPath = args.remakeFrom ? path.join(args.remakeFrom, slug, "styles.css") : null;
  const desktopScreenshot = args.screenshotsDir ? path.join(args.screenshotsDir, `${slug}-desktop.png`) : null;
  const mobileScreenshot = args.screenshotsDir ? path.join(args.screenshotsDir, `${slug}-mobile.png`) : null;

  return {
    htmlPath: htmlPath && (await fileExists(htmlPath)) ? htmlPath : null,
    cssPath: cssPath && (await fileExists(cssPath)) ? cssPath : null,
    htmlExcerpt: htmlPath ? await optionalExcerpt(htmlPath) : null,
    cssExcerpt: cssPath ? await optionalExcerpt(cssPath, 1800) : null,
    desktopScreenshot: desktopScreenshot && (await fileExists(desktopScreenshot)) ? desktopScreenshot : null,
    mobileScreenshot: mobileScreenshot && (await fileExists(mobileScreenshot)) ? mobileScreenshot : null,
  };
}

function renderBrief(params: {
  business: Awaited<ReturnType<typeof loadBusinesses>>[number];
  index: number;
  batchSize: number;
  currentSpec: unknown;
  args: Args;
  remakeContext: Awaited<ReturnType<typeof loadRemakeContext>>;
}): string {
  const { business, index, batchSize, currentSpec, args, remakeContext } = params;
  const profile = buildBusinessProfile(business);
  const batchLabel = batchSize === 1 ? "the page" : `the ${batchSize} pages`;
  const sourceUrls = [
    business.rating.source_url,
    ...business.website_check.checked_sources,
    ...business.photos.map((photo) => photo.source_url),
    ...business.reviews.map((review) => review.source_url),
  ];

  const normalizedSegment = args.segment
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const domainDirection = normalizedSegment.includes("ropa") || normalizedSegment.includes("indumentaria") || normalizedSegment.includes("moda")
    ? "Use apparel/local-retail cues: vidriera, temporada, seleccion de prendas, cercania, ubicacion, formas de contacto. Do not invent brands, prices, stock, sizes or promos."
    : normalizedSegment.includes("vehicul")
      ? "Use automotive conversion cues: premium/detailing or urban/custom art direction, strong hero, trust numbers, services, editable packages, before/after, reviews, booking CTA, practical contact and location."
      : `Use cues from the ${args.segment} domain and the local retail/service context in ${args.city}.`;
  const runSlug = `${slugPart(args.city)}-${slugPart(args.segment)}`;
  const remakeBlock =
    remakeContext.htmlPath || remakeContext.cssPath || remakeContext.desktopScreenshot || remakeContext.mobileScreenshot
      ? `
## Remake Context

This brief is allowed to replace an existing weak landing. Do not preserve the current structure just because it exists.

- current HTML: ${remakeContext.htmlPath ?? "not found"}
- current CSS: ${remakeContext.cssPath ?? "not found"}
- desktop screenshot: ${remakeContext.desktopScreenshot ?? "not found"}
- mobile screenshot: ${remakeContext.mobileScreenshot ?? "not found"}

Before writing the replacement, critique the existing page against these remake targets:

1. Does the first viewport feel like a real local business or a generated template?
2. Is the main photo/visual large enough to carry the page?
3. Does the copy speak to a customer action instead of explaining the generator?
4. Are weak photos compensated with safe AI-generated generic imagery or texture?
5. Does mobile have rhythm, not only stacked cards?

Current HTML excerpt:

\`\`\`html
${remakeContext.htmlExcerpt ?? "No HTML excerpt available."}
\`\`\`

Current CSS excerpt:

\`\`\`css
${remakeContext.cssExcerpt ?? "No CSS excerpt available."}
\`\`\`
`
      : "";

  const displayName = businessDisplayName(business);

  return `# Site Brief ${index + 1}: ${displayName}

## Goal

Write or refine one \`SiteSpec\` for this business and create its real frontend artifact. Use the agent session context, judgement, and frontend skill. Do not call the OpenAI API from repo scripts.

## Hard Rules

- Use only verified data below.
- Do not invent services, years, awards, guarantees, prices, certifications, owners, staff, or claims.
- Visible copy must be Spanish argentino, natural, local, commercial, and strong enough to sell the next action.
- If useful commercial facts are missing, use safe AI-assisted filler: generic rubro imagery, process visuals, texture, section names, microcopy, and "a confirmar" offers. Never present them as verified facts.
- When reviews or the verified offering highlight a specific item (e.g. empanadas fritas, entraña, chinchulines, sandwich de lomito, a signature dish or product), you MAY use stock or AI-generated images of that item with no "not a real photo" disclaimer: the item is evidenced, so the appetizing image works as a serving suggestion. This does NOT extend to venue/installations/staff/results imagery (those still follow the editorial-hero honesty rule) and does NOT allow inventing commercial facts. See docs/DATA_RULES.md.
- The HERO image ALWAYS uses a memorable stock or AI-generated editorial asset, NEVER the Google Places photo (Places photos are usually weak and lower the bar; use them only to extract identity and as documentary context in inner sections). For a specific physical space (e.g. an event hall) the stock/AI hero must be atmospheric (event mood, table setting, lights) and its alt must not claim it is that exact venue. See docs/DATA_RULES.md.
- The contact card (the hours + address block near the end of the page) ALWAYS includes a "Cómo llegar" link to Google Maps right next to the address line, even when the section already has a separate Maps CTA elsewhere. Do not ship the address as plain text in that card.
- Internal placeholders may exist in specs, but the customer-facing HTML must not show raw brackets, "placeholder", "demo", "editable", "template", "landing", or "creado con IA".
- Avoid generic filler like "soluciones integrales", "calidad garantizada", "experiencia unica", "creado con IA".
- Keep the business name isolated to this one site.
- Make the page feel designed for "${args.segment}" in ${args.city}, not like a SaaS template.
- Final generation expects an \`agent_frontend\`. The renderer fallback is only for rough preview.

## Business Snapshot

- id: \`${business.id}\`
- slug: \`${business.slug}\`
- name: ${displayName}
- source name: ${business.name}
- category: ${business.category}
- inferred profile: ${profile.rubro}
- requested segment: ${args.segment}
- city: ${args.city}
- address: ${business.address}
- phone: ${business.phone ?? "null"}
- hours summary: ${summarizeOpeningHours(business.opening_hours.raw)}
- rating: ${business.rating.value} / 5 (${business.rating.reviews_count} reseñas)
- service baseline: ${business.main_product_or_service}

## Suggested Commercial Profile
${fencedJson({
    tone: profile.tone,
    customer_type: profile.customerType,
    hero_claim: profile.heroClaim,
    services: profile.services,
    trust_bar: profile.trustBar,
    service_cards: profile.serviceCards,
    why_choose: profile.whyChoose,
    packages: profile.packages,
    gallery: profile.gallery,
    process: profile.process,
    final_cta: profile.finalCta,
  })}

## Useful Real Signals

### Reviews

${business.reviews
  .slice(0, 3)
  .map((review, reviewIndex) => `${reviewIndex + 1}. "${review.text}" — ${review.author ?? "Cliente"} (${review.rating}/5)`)
  .join("\n")}

### Photos

${business.photos
  .slice(0, 3)
  .map((photo, photoIndex) => `${photoIndex + 1}. ${photo.type} | ${photo.usage_status} | ${photo.url}`)
  .join("\n")}

### Sources

${[...new Set(sourceUrls)].map((url) => `- ${url}`).join("\n")}
${remakeBlock}

## Recommended Design Direction

- ${domainDirection}
- Quality matters more than cheap or fast generation.
- Choose one proven conversion template: \`hero-proof-offer\`, \`editorial-local-story\`, \`visual-menu\`, \`service-diagnostic\`, \`catalog-counter\`, or \`urgent-call-first\`.
- Build a real landing structure: strong hero, trust bar, services, why choose, offer/options, before/after or gallery, process, reviews/contact, final CTA.
- Make sparse data look intentional: use AI-generated generic imagery and crafted microcopy where the source data is thin. Do not leave empty generic cards.
- Automotive references to emulate structurally: strong claim + numbers + services + CTA to booking; urban/aggressive wrapping/custom style; detailing service taxonomy; emotional hero; packages; before/after; reviews.
- You may use plain HTML/CSS or a framework/library if it materially improves the final UI. You have broad discretion to use frontend/UI, animation, and icon libraries such as Aceternity UI (https://ui.aceternity.com/components), shadcn/ui (https://ui.shadcn.com/docs/components), Magic UI (https://magicui.design/), Framer Motion, GSAP, Motion One, lucide-react, React Icons, or similar component/motion kits when they raise product quality.
- If using a framework, build/export it yourself and point \`agent_frontend.output_dir\` at the static output.
- Avoid making ${batchLabel} share the same hero rhythm, card system, font pairing, spacing scale, or composition.
- Prefer concrete microcopy based on the signals above.
- Vary \`visual_mood\` and \`composition\` across this ${batchSize}-site batch.
- Avoid repeating the same hero rhythm, proof order, and CTA wording from nearby briefs.
- If the page would otherwise look templated, use a high-conversion template deliberately: first viewport promise + proof + CTA, visible image, objection handling, offer/options, process, final CTA. Make it polished rather than novel.

## Current Spec, If Any
${fencedJson(currentSpec ?? null)}

## SiteSpec Schema Shape

Return one object with:

- \`business_id\`
- \`slug\`
- \`visual_mood\`: one of \`roadside-urgent\`, \`workshop-trust\`, \`precision-service\`, \`neighborhood-direct\`, \`fleet-utility\`
- \`composition\`: one of \`split-command\`, \`poster-bay\`, \`route-card\`, \`service-ledger\`, \`photo-board\`
- \`headline\`
- \`subheadline\`
- \`primary_cta\`
- \`secondary_cta\`
- \`service_tags\`: 3 to 5 strings
- \`proof_points\`: 3 to 4 strings
- \`resource_title\`
- \`resource_items\`: 3 to 4 strings
- \`review_heading\`
- \`contact_heading\`
- \`image_prompt\`
- \`design_notes\`
- \`conversion_template\`: one of \`hero-proof-offer\`, \`editorial-local-story\`, \`visual-menu\`, \`service-diagnostic\`, \`catalog-counter\`, \`urgent-call-first\`
- \`design_brief\`: required for future/remake quality:
  - \`market_position\`: what this page sells and for whom
  - \`visual_thesis\`: concrete art direction tied to the business/rubro
  - \`copy_voice\`: how the copy should sound and what it must avoid
  - \`layout_signature\`: what makes this page structurally specific
  - \`asset_plan\`: how real photos and safe AI generic imagery are used
  - \`ai_fill_plan.copy\`: how AI enriches thin data without false claims
  - \`ai_fill_plan.imagery\`: what non-specific images/textures can be generated
  - \`ai_fill_plan.boundaries\`: explicit limits: no fake prices, stock, brands, years, awards, guarantees, services or reviews
  - \`anti_patterns\`: visible failure modes to avoid
  - \`rewrite_targets\`: what to improve if remaking an existing page
- \`commercial\`: recommended for sellable landings:
  - \`tone\`: \`premium-detailing\`, \`urban-custom\`, \`practical-workshop\`, \`fast-local\`, \`parts-counter\`, or \`bodyshop-craft\`
  - \`customer_type\`
  - \`hero_claim\`
  - \`trust_bar\`: 3 to 5 cards with \`label\`, \`title\`, \`body\`, optional \`meta\`, optional \`is_demo\`
  - \`service_cards\`: 3 to 6 benefit-led service cards
  - \`why_choose\`: 3 to 5 reasons tied to the business/rubro
  - \`packages\`: 2 to 4 offer/options; no fake prices
  - \`gallery\`: 2 to 4 before/after, real-photo or AI-safe generic visual blocks
  - \`process\`: 3 to 5 steps from inquiry to visit/booking
  - \`final_cta\`: \`title\`, \`body\`, \`primary_label\`, \`secondary_label\`
  - \`editable_note\`: short warning for placeholders
- \`agent_frontend\`: required for final quality generation:
  - \`mode\`: \`static-files\` or \`framework-build\`
  - \`source_dir\`: source folder kept inside this repo, for example \`data/frontends/${runSlug}/${business.slug}\`
  - \`output_dir\`: required only for \`framework-build\`; points to the static build output copied by the generator
  - \`build_command\`: optional note, not executed by the generator
  - \`libraries\`: optional list of real libraries used
  - \`notes\`: short explanation of the visual direction and why it fits this business
- \`creative\`: object used by the renderer to make the page feel custom:
  - \`concept\`: commercial idea for this specific business
  - \`audience\`: who is likely to search/contact
  - \`visual_direction\`: concrete art direction, not generic adjectives
  - \`layout\`: one of \`studio-detail\`, \`wash-flow\`, \`oil-bay\`, \`roadside-rescue\`, \`bodyshop-craft\`, \`parts-counter\`, \`mechanic-ledger\`
  - \`texture\`: one of \`polished-glass\`, \`water-ripple\`, \`oil-label\`, \`road-markings\`, \`primer-dust\`, \`parts-shelf\`, \`service-ledger\`
  - \`hero_angle\`: one strong commercial sentence for the hero
  - \`hero_cards\`: 2 to 4 cards with \`label\`, \`value\`, optional \`note\`
  - \`sections\`: 3 to 5 blocks. Each block has \`type\`, \`eyebrow\`, \`title\`, \`body\`, \`items\`, optional \`callout\`.

Creative block \`type\` values:

- \`service-board\`
- \`process\`
- \`quote-strip\`
- \`quick-actions\`
- \`material-story\`
- \`metric-grid\`

The \`agent_frontend\` artifact is the main place where the page stops being a template. The \`design_brief\` and \`creative\` objects remain useful as planning metadata and fallback input, but the final UI must be authored.
`;
}

function renderIndex(businesses: Awaited<ReturnType<typeof loadBusinesses>>, args: Args): string {
  return `# ${args.city} Agent Briefs

Use these briefs from a Codex/Claude session to rewrite the configured site specs file.

- city: ${args.city}
- segment: ${args.segment}
- specs: ${args.specs}

Recommended flow:

\`\`\`powershell
npm run agent:briefs -- --input ${args.input} --specs ${args.specs} --out ${args.outDir} --city "${args.city}" --segment "${args.segment}"
# Agent edits ${args.specs}
npm run validate:specs -- --businesses ${args.input} --specs ${args.specs}
npm run generate:preview -- ${args.input} --specs ${args.specs} --session ${slugPart(args.city)}-${slugPart(args.segment)}
npm run generate -- ${args.input} --specs ${args.specs} --session ${slugPart(args.city)}-${slugPart(args.segment)}
npm run qa -- --session ${slugPart(args.city)}-${slugPart(args.segment)}
\`\`\`

Remake flow for an existing weak batch:

\`\`\`powershell
npm run agent:briefs -- --input <businesses.json> --specs <site-specs.json> --out <briefs-dir> --city "${args.city}" --segment "${args.segment}" --remake-from <generated-run-dir> --screenshots <screenshots-dir>
\`\`\`

Each remake brief includes current HTML/CSS excerpts and screenshot paths when available. Replace the frontend instead of preserving a weak structure.

Businesses:

${businesses.map((business, index) => `${index + 1}. [${businessDisplayName(business)}](./${business.slug}.md)`).join("\n")}
`;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv);
  const businesses = approvedBusinesses(await loadBusinesses(args.input));
  const currentSpecs = await loadCurrentSpecs(args.specs);

  await rm(args.outDir, { recursive: true, force: true });
  await mkdir(args.outDir, { recursive: true });

  for (const [index, business] of businesses.entries()) {
    const remakeContext = await loadRemakeContext(args, business.slug);
    await writeFile(
      path.join(args.outDir, `${business.slug}.md`),
      renderBrief({ business, index, batchSize: businesses.length, currentSpec: currentSpecs.get(business.id), args, remakeContext }),
      "utf8",
    );
  }

  await writeFile(path.join(args.outDir, "README.md"), renderIndex(businesses, args), "utf8");
  console.log(`Wrote ${businesses.length} agent brief(s) to ${args.outDir}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
