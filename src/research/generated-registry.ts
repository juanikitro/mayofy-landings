import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { approvedBusinesses, loadBusinesses } from "../content/load-businesses.js";
import type { Business } from "../content/business-schema.js";
import { loadSiteSpecs } from "../site-specs/load-site-specs.js";

// Single Vercel project publishing every landing as /<run>/<slug>/, same base the final study uses.
export const defaultPublicBaseUrl = "https://mayofy.vercel.app";

export const generatedLandingStatusSchema = z.enum(["planned", "authored", "generated"]);

export const businessLinksSchema = z.object({
  google_maps: z.string().min(1).nullable(),
  instagram: z.string().min(1).nullable(),
  whatsapp: z.string().min(1).nullable(),
  phone: z.string().min(1).nullable(),
  facebook: z.string().min(1).nullable(),
  email: z.string().min(1).nullable(),
  otros: z.array(z.string().min(1)),
});

export const landingRegistrySchema = z.object({
  local_path: z.string().min(1),
  public_path: z.string().regex(/^\/[^\s]*\/$/u),
  public_url: z.string().url().nullable(),
  frontend_source: z.string().min(1).nullable(),
});

export const generatedLandingEntrySchema = z.object({
  business_id: z.string().min(1),
  place_id: z.string().min(1),
  name: z.string().min(1),
  brand_name: z.string().min(1).optional(),
  slug: z.string().min(1),
  city: z.string(),
  address: z.string().min(1),
  category: z.string().min(1),
  phone: z.string().min(1).nullable(),
  run: z.string().min(1),
  status: generatedLandingStatusSchema,
  business_links: businessLinksSchema,
  landing: landingRegistrySchema,
  first_generated_at: z.string().datetime().nullable(),
  last_generated_at: z.string().datetime().nullable(),
});

export const generatedRegistrySchema = z.object({
  version: z.literal(1),
  entries: z.array(generatedLandingEntrySchema),
});

const manifestSchema = z.object({
  sites: z.array(
    z.object({
      business_id: z.string().min(1),
      slug: z.string().min(1),
      agent_frontend_source: z.string().min(1).nullable().optional(),
    }),
  ),
});

type BusinessIdentity = Pick<Business, "id" | "name" | "slug" | "city" | "address" | "phone">;
type ManifestSite = z.infer<typeof manifestSchema>["sites"][number];

export type BusinessLinks = z.infer<typeof businessLinksSchema>;
export type LandingRegistry = z.infer<typeof landingRegistrySchema>;
export type GeneratedLandingEntry = z.infer<typeof generatedLandingEntrySchema>;
export type GeneratedRegistry = z.infer<typeof generatedRegistrySchema>;

export type BuildRegistryOptions = {
  dataDir: string;
  generatedDir: string;
  baseUrl?: string | null;
  previous?: GeneratedRegistry;
  timestamp?: string;
};

export type BuildRegistryEntryOptions = {
  business: Business;
  run: string;
  generatedDir: string;
  baseUrl?: string | null;
  frontendSource?: string | null;
  hasManifest?: boolean;
  previousEntry?: GeneratedLandingEntry | null;
  timestamp: string;
};

function isNotFound(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}

function toPortablePath(value: string): string {
  return value.replaceAll("\\", "/");
}

function normalizedText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizedCity(value: string | undefined): string {
  return normalizedText(value ?? "");
}

function cityFromAddress(address: string): string {
  const parts = address.split(",").map((part) => part.trim()).filter(Boolean);
  for (let index = parts.length - 2; index >= 0; index -= 1) {
    const candidate = parts[index] ?? "";
    if (/^(provincia|province|estado|state)\b/iu.test(candidate)) continue;
    const withoutPostalCode = candidate.replace(/^[A-Z]\d{4,5}[A-Z]*\s+/u, "").trim();
    if (withoutPostalCode) return withoutPostalCode;
  }
  return "";
}

function registryCity(business: Business): string {
  return business.city ?? cityFromAddress(business.address);
}

function normalizedNameAddress(value: Pick<BusinessIdentity, "name" | "address">): string {
  return normalizedText(`${value.name}|${value.address}`);
}

function phoneLastEight(value: string | null | undefined): string | null {
  const digits = (value ?? "").replace(/\D/g, "");
  return digits.length >= 8 ? digits.slice(-8) : null;
}

function placeIdFromBusinessId(businessId: string): string {
  return businessId.replace(/^google-/u, "");
}

function registryEntryIdentity(entry: GeneratedLandingEntry): BusinessIdentity {
  return {
    id: entry.business_id,
    name: entry.name,
    slug: entry.slug,
    city: entry.city || undefined,
    address: entry.address,
    phone: entry.phone,
  };
}

function sortedRegistry(entries: GeneratedLandingEntry[]): GeneratedRegistry {
  return generatedRegistrySchema.parse({
    version: 1,
    entries: [...entries].sort((left, right) => left.run.localeCompare(right.run) || left.slug.localeCompare(right.slug)),
  });
}

function normalizeBaseUrl(baseUrl: string | null | undefined): string | null {
  const normalized = baseUrl?.trim().replace(/\/+$/u, "") ?? "";
  return normalized || null;
}

function publicUrl(baseUrl: string | null | undefined, publicPath: string): string | null {
  const normalized = normalizeBaseUrl(baseUrl);
  return normalized ? `${normalized}${publicPath}` : null;
}

function safeUrl(value: string): URL | null {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function isGoogleMaps(url: URL): boolean {
  return (
    url.hostname === "maps.app.goo.gl" ||
    url.hostname === "maps.google.com" ||
    (url.hostname.endsWith("google.com") && url.pathname.includes("/maps"))
  );
}

function isInstagram(url: URL): boolean {
  return url.hostname === "instagram.com" || url.hostname.endsWith(".instagram.com");
}

function isMayofyInstagram(url: URL): boolean {
  return isInstagram(url) && url.pathname.split("/").filter(Boolean)[0]?.toLowerCase() === "mayofy.web";
}

function isWhatsapp(url: URL): boolean {
  return (
    url.hostname === "wa.link" ||
    url.hostname === "wa.me" ||
    url.hostname === "api.whatsapp.com" ||
    url.hostname === "web.whatsapp.com" ||
    url.hostname.endsWith(".whatsapp.com")
  );
}

function isFacebook(url: URL): boolean {
  return url.hostname === "facebook.com" || url.hostname.endsWith(".facebook.com") || url.hostname === "fb.com";
}

function isEmail(url: URL): boolean {
  return url.protocol === "mailto:";
}

function uniqueUrls(values: string[]): string[] {
  return [...new Set(values.filter((value) => Boolean(safeUrl(value))))];
}

function firstUrl(urls: string[], predicate: (url: URL) => boolean): string | null {
  return urls.find((value) => {
    const parsed = safeUrl(value);
    return parsed !== null && predicate(parsed);
  }) ?? null;
}

function extractBusinessLinks(business: Business): BusinessLinks {
  const urls = uniqueUrls([
    business.rating.source_url,
    ...business.verification.source_records.map((record) => record.url),
    ...business.photos.map((photo) => photo.source_url),
  ]).filter((value) => {
    const parsed = safeUrl(value);
    return parsed === null || !isMayofyInstagram(parsed);
  });

  const googleMaps = firstUrl(urls, isGoogleMaps);
  const instagram = firstUrl(urls, isInstagram);
  const whatsapp = firstUrl(urls, isWhatsapp);
  const facebook = firstUrl(urls, isFacebook);
  const email = firstUrl(urls, isEmail);
  const classified = new Set([googleMaps, instagram, whatsapp, facebook, email].filter((value): value is string => value !== null));
  const phoneDigits = business.phone?.replace(/[^\d+]/g, "") ?? "";

  return {
    google_maps: googleMaps,
    instagram,
    whatsapp,
    phone: phoneDigits ? `tel:${phoneDigits}` : null,
    facebook,
    email,
    otros: urls.filter((url) => !classified.has(url)),
  };
}

async function loadOptionalSiteSpecs(filePath: string) {
  try {
    return await loadSiteSpecs(filePath);
  } catch (error) {
    if (isNotFound(error)) return new Map();
    throw error;
  }
}

async function loadOptionalManifest(filePath: string): Promise<Map<string, ManifestSite>> {
  try {
    const raw = await readFile(filePath, "utf8");
    const manifest = manifestSchema.parse(JSON.parse(raw));
    return new Map(manifest.sites.map((site) => [site.business_id, site]));
  } catch (error) {
    if (isNotFound(error)) return new Map();
    throw error;
  }
}

export function emptyRegistry(): GeneratedRegistry {
  return { version: 1, entries: [] };
}

export async function loadRegistry(filePath: string): Promise<GeneratedRegistry> {
  try {
    return generatedRegistrySchema.parse(JSON.parse(await readFile(filePath, "utf8")));
  } catch (error) {
    if (isNotFound(error)) return emptyRegistry();
    throw error;
  }
}

export function renderRegistryJson(registry: GeneratedRegistry): string {
  return `${JSON.stringify(sortedRegistry(registry.entries), null, 2)}\n`;
}

export function matchesRegistry(business: BusinessIdentity, registry: GeneratedRegistry): GeneratedLandingEntry | null {
  const placeId = placeIdFromBusinessId(business.id);
  const byBusinessOrPlaceId = registry.entries.find(
    (entry) =>
      entry.business_id === business.id ||
      entry.business_id === placeId ||
      entry.place_id === business.id ||
      entry.place_id === placeId,
  );
  if (byBusinessOrPlaceId) return byBusinessOrPlaceId;

  const city = normalizedCity(business.city);
  if (city) {
    const bySlugAndCity = registry.entries.find((entry) => entry.slug === business.slug && normalizedCity(entry.city) === city);
    if (bySlugAndCity) return bySlugAndCity;
  }

  const nameAddress = normalizedNameAddress(business);
  const byNameAndAddress = registry.entries.find((entry) => normalizedNameAddress(entry) === nameAddress);
  if (byNameAndAddress) return byNameAndAddress;

  const phone = phoneLastEight(business.phone);
  if (phone && city) {
    const byPhoneAndCity = registry.entries.find(
      (entry) => phoneLastEight(entry.phone) === phone && normalizedCity(entry.city) === city,
    );
    if (byPhoneAndCity) return byPhoneAndCity;
  }

  return null;
}

export function matchesRegistryPlaceId(placeId: string, registry: GeneratedRegistry): GeneratedLandingEntry | null {
  const normalizedPlaceId = placeIdFromBusinessId(placeId);
  return (
    registry.entries.find(
      (entry) =>
        entry.place_id === placeId ||
        entry.place_id === normalizedPlaceId ||
        entry.business_id === placeId ||
        entry.business_id === `google-${normalizedPlaceId}`,
    ) ?? null
  );
}

export function landingUrl(entry: GeneratedLandingEntry): string | null {
  return entry.landing.public_url ?? entry.landing.frontend_source;
}

export function buildRegistryEntry(options: BuildRegistryEntryOptions): GeneratedLandingEntry {
  const previous = options.previousEntry ?? null;
  const frontendSource = options.frontendSource ?? null;
  const status = options.hasManifest || previous?.status === "generated" ? "generated" : frontendSource ? "authored" : "planned";
  const publicPath = `/${options.run}/${options.business.slug}/`;

  return generatedLandingEntrySchema.parse({
    business_id: options.business.id,
    place_id: placeIdFromBusinessId(options.business.id),
    name: options.business.name,
    ...(options.business.brand_name ? { brand_name: options.business.brand_name } : {}),
    slug: options.business.slug,
    city: registryCity(options.business),
    address: options.business.address,
    category: options.business.category,
    phone: options.business.phone,
    run: options.run,
    status,
    business_links: extractBusinessLinks(options.business),
    landing: {
      local_path: toPortablePath(path.join(options.generatedDir, options.run, options.business.slug)),
      public_path: publicPath,
      public_url: publicUrl(options.baseUrl, publicPath),
      frontend_source: frontendSource,
    },
    first_generated_at: status === "generated" ? previous?.first_generated_at ?? options.timestamp : previous?.first_generated_at ?? null,
    last_generated_at: status === "generated" ? previous?.last_generated_at ?? options.timestamp : previous?.last_generated_at ?? null,
  });
}

export async function buildRegistry(options: BuildRegistryOptions): Promise<GeneratedRegistry> {
  const timestamp = options.timestamp ?? new Date().toISOString();
  const previous = options.previous ?? emptyRegistry();
  const files = await readdir(options.dataDir, { withFileTypes: true });
  const datasets = files
    .filter((file) => file.isFile() && /-businesses\.json$/u.test(file.name) && !/mock/i.test(file.name))
    .map((file) => file.name)
    .sort((left, right) => left.localeCompare(right));
  const entries: GeneratedLandingEntry[] = [];

  for (const datasetFile of datasets) {
    const run = datasetFile.replace(/-businesses\.json$/u, "");
    const businesses = approvedBusinesses(await loadBusinesses(path.join(options.dataDir, datasetFile))).filter((business) => !business.is_mock);
    const specs = await loadOptionalSiteSpecs(path.join(options.dataDir, "site-specs", `${run}-site-specs.json`));
    const manifest = await loadOptionalManifest(path.join(options.generatedDir, run, "manifest.json"));

    for (const business of businesses) {
      const spec = specs.get(business.id);
      const manifestSite = manifest.get(business.id);
      entries.push(
        buildRegistryEntry({
          business,
          run,
          generatedDir: options.generatedDir,
          baseUrl: options.baseUrl,
          frontendSource: spec?.agent_frontend?.source_dir ?? manifestSite?.agent_frontend_source ?? null,
          hasManifest: Boolean(manifestSite),
          previousEntry: matchesRegistry(business, previous),
          timestamp,
        }),
      );
    }
  }

  return sortedRegistry(entries);
}

export function mergeGeneratedEntries(
  previous: GeneratedRegistry,
  generatedEntries: GeneratedLandingEntry[],
  timestamp: string,
): GeneratedRegistry {
  const entries = [...previous.entries];

  for (const generatedEntry of generatedEntries) {
    const existing = matchesRegistry(registryEntryIdentity(generatedEntry), { version: 1, entries });
    const merged: GeneratedLandingEntry = {
      ...generatedEntry,
      status: "generated",
      first_generated_at: existing?.first_generated_at ?? timestamp,
      last_generated_at: timestamp,
    };
    const existingIndex = existing ? entries.indexOf(existing) : -1;
    if (existingIndex >= 0) {
      entries[existingIndex] = merged;
    } else {
      entries.push(merged);
    }
  }

  return sortedRegistry(entries);
}

function markdownCell(value: string): string {
  return value.replaceAll("|", "\\|").replace(/\r?\n/g, " ");
}

function markdownLink(label: string, url: string): string {
  return `[${label}](<${url}>)`;
}

// `frontend_source` is repo-relative, so it only becomes a relative link when the document
// itself lives inside the repo. Otherwise the repo-relative path stays readable as-is.
function relativeToDocument(target: string, documentPath: string): string {
  const documentDir = path.dirname(path.resolve(documentPath));
  const insideRepo = !path.relative(process.cwd(), documentDir).startsWith("..");
  return insideRepo ? toPortablePath(path.relative(documentDir, path.resolve(target))) : target;
}

export function renderLandingLink(entry: GeneratedLandingEntry, documentPath?: string): string {
  const target = landingUrl(entry);
  if (!target) return `\`${entry.landing.public_path}\``;
  const href = entry.landing.public_url || !documentPath ? target : relativeToDocument(target, documentPath);

  return markdownLink(entry.landing.public_path, href);
}

function renderBusinessLinks(links: BusinessLinks): string {
  const rendered = [
    links.google_maps ? markdownLink("Google Maps", links.google_maps) : null,
    links.instagram ? markdownLink("Instagram", links.instagram) : null,
    links.whatsapp ? markdownLink("WhatsApp", links.whatsapp) : null,
    links.phone ? markdownLink("Teléfono", links.phone) : null,
    links.facebook ? markdownLink("Facebook", links.facebook) : null,
    links.email ? markdownLink("Email", links.email) : null,
    ...links.otros.map((url, index) => markdownLink(`Otro ${index + 1}`, url)),
  ].filter((value): value is string => value !== null);

  return rendered.join(" · ") || "—";
}

export function renderRegistryMarkdown(registry: GeneratedRegistry, documentPath = path.join("data", "generated-landings.md")): string {
  const entries = sortedRegistry(registry.entries).entries;
  const byRun = new Map<string, GeneratedLandingEntry[]>();

  for (const entry of entries) {
    const group = byRun.get(entry.run) ?? [];
    group.push(entry);
    byRun.set(entry.run, group);
  }

  const lines = [
    "# Registro de landings generadas",
    "",
    "Listado versionado para evitar volver a investigar o generar el mismo negocio.",
    "",
  ];

  for (const [run, runEntries] of byRun) {
    lines.push(`## ${markdownCell(run)}`, "", "| Negocio | Ciudad | Rubro | Links del negocio | Landing | Estado |", "| --- | --- | --- | --- | --- | --- |");
    for (const entry of runEntries) {
      lines.push(
        `| ${markdownCell(entry.brand_name ?? entry.name)} | ${markdownCell(entry.city || "—")} | ${markdownCell(entry.category)} | ${renderBusinessLinks(entry.business_links)} | ${renderLandingLink(entry, documentPath)} | ${entry.status} |`,
      );
    }
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}
