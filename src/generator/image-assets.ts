import { copyFile, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Business } from "../content/business-schema.js";

export type PreparedImage = {
  heroSrc: string;
  status: "downloaded" | "placeholder" | "mock" | "authored";
};

// Nombres de portada que puede traer un frontend escrito por agente, en orden de preferencia.
const authoredHeroNames = ["portada.jpg", "portada.webp", "portada.png", "hero.jpg", "hero.webp", "hero.png"];

/**
 * Portada que trae el propio frontend escrito por agente, si existe.
 *
 * Cuando el frontend ya versiona su portada en `data/frontends/<run>/<slug>/assets/`,
 * descargar la foto de Google Places no aporta nada y ademas pisaba ese archivo, que
 * es justo lo que `docs/DATA_RULES.md` prohibe para el hero. Devuelve `null` cuando el
 * frontend no trae portada propia: esos sitios siguen dependiendo de la descarga.
 */
export async function authoredHeroImage(siteDir: string): Promise<PreparedImage> {
  for (const name of authoredHeroNames) {
    try {
      if ((await stat(path.join(siteDir, "assets", name))).isFile()) {
        return { heroSrc: `./assets/${name}`, status: "authored" };
      }
    } catch {
      // Probamos el siguiente nombre.
    }
  }
  // El frontend no usa una portada con nombre conocido: sus imagenes son las que
  // referencie su propio HTML. `heroSrc` solo lo consume el renderer de fallback.
  return { heroSrc: "./index.html", status: "authored" };
}

function isGooglePlacePhoto(url: string): boolean {
  return url.startsWith("https://places.googleapis.com/v1/") && url.includes("/media");
}

function hasUrlScheme(url: string): boolean {
  return /^[a-z][a-z0-9+.-]*:\/\//iu.test(url);
}

function isInsideRoot(root: string, target: string): boolean {
  const relative = path.relative(root, target);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function localPathToExtension(filePath: string): string {
  const extension = path.extname(filePath).toLowerCase().replace(/^\./u, "");
  if (["png", "webp", "jpg"].includes(extension)) {
    return extension;
  }
  return "jpg";
}

function withGoogleKey(url: string, apiKey: string): string {
  const parsed = new URL(url);
  parsed.searchParams.set("key", apiKey);
  return parsed.toString();
}

function contentTypeToExtension(contentType: string | null): string {
  if (!contentType) return "jpg";
  if (contentType.includes("png")) return "png";
  if (contentType.includes("webp")) return "webp";
  return "jpg";
}

function hashText(value: string): number {
  let hash = 0;
  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return hash;
}

function placeholderSvg(business: Business): string {
  const seed = hashText(business.name);
  const hue = seed % 360;
  const accentHue = (hue + 44) % 360;
  const lineTilt = 25 + (seed % 30);
  const name = business.name.replace(/[<&>"]/g, "");
  const category = business.category.replace(/[<&>"]/g, "");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1050" viewBox="0 0 1600 1050" role="img" aria-label="${name}">
  <defs>
    <linearGradient id="paint" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="hsl(${hue} 28% 10%)"/>
      <stop offset="0.58" stop-color="hsl(${hue} 22% 22%)"/>
      <stop offset="1" stop-color="hsl(${accentHue} 70% 44%)"/>
    </linearGradient>
    <pattern id="tread" width="120" height="120" patternUnits="userSpaceOnUse" patternTransform="rotate(${lineTilt})">
      <rect width="120" height="120" fill="none"/>
      <rect x="0" y="0" width="26" height="120" fill="rgba(255,255,255,0.10)"/>
      <rect x="58" y="0" width="18" height="120" fill="rgba(255,255,255,0.06)"/>
    </pattern>
  </defs>
  <rect width="1600" height="1050" fill="url(#paint)"/>
  <rect width="1600" height="1050" fill="url(#tread)" opacity="0.65"/>
  <circle cx="${1120 + (seed % 180)}" cy="${650 + (seed % 140)}" r="220" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="34"/>
  <circle cx="${1120 + (seed % 180)}" cy="${650 + (seed % 140)}" r="92" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="26"/>
  <path d="M160 ${610 + (seed % 80)}h680l88-160h245l92 160h135" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="110" y="180" fill="#fff7e8" font-family="Arial, sans-serif" font-size="72" font-weight="700">${name}</text>
  <text x="114" y="260" fill="#ffd27a" font-family="Arial, sans-serif" font-size="38" font-weight="700">${category}</text>
</svg>`;
}

export async function prepareHeroImage(business: Business, siteDir: string, requireRealImage: boolean): Promise<PreparedImage> {
  const photo = business.photos.find((item) => item.usage_status === "allowed");
  const assetsDir = path.join(siteDir, "assets");
  await mkdir(assetsDir, { recursive: true });

  if (!photo || photo.url.startsWith("mock://")) {
    await writeFile(path.join(assetsDir, "hero.svg"), placeholderSvg(business), "utf8");
    return { heroSrc: "./assets/hero.svg", status: photo?.url.startsWith("mock://") ? "mock" : "placeholder" };
  }

  if (!hasUrlScheme(photo.url)) {
    const repoRoot = path.resolve(process.cwd());
    const localPhotoPath = path.resolve(repoRoot, photo.url);
    if (!isInsideRoot(repoRoot, localPhotoPath)) {
      throw new Error(`${business.slug}: local photo path escapes repository: ${photo.url}`);
    }

    try {
      const localPhotoStat = await stat(localPhotoPath);
      if (localPhotoStat.isFile()) {
        const extension = localPathToExtension(localPhotoPath);
        await copyFile(localPhotoPath, path.join(assetsDir, `hero.${extension}`));
        return { heroSrc: `./assets/hero.${extension}`, status: "downloaded" };
      }
    } catch {
      // Keep the existing placeholder behavior below when real images are not required.
    }

    console.warn(`${business.slug}: local photo file does not exist: ${photo.url}; using generated placeholder.`);
    if (requireRealImage) {
      throw new Error(`${business.slug}: local photo file does not exist: ${photo.url}.`);
    }
  }

  if (isGooglePlacePhoto(photo.url)) {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (apiKey) {
      const response = await fetch(withGoogleKey(photo.url, apiKey), { redirect: "follow" });
      if (response.ok) {
        const contentType = response.headers.get("content-type");
        const extension = contentTypeToExtension(contentType);
        const bytes = new Uint8Array(await response.arrayBuffer());
        await writeFile(path.join(assetsDir, `hero.${extension}`), bytes);
        return { heroSrc: `./assets/hero.${extension}`, status: "downloaded" };
      }
      console.warn(`${business.slug}: photo download failed with ${response.status}; using generated placeholder.`);
      if (requireRealImage) {
        throw new Error(`${business.slug}: Google Places photo download failed with ${response.status}.`);
      }
    } else {
      console.warn(`${business.slug}: GOOGLE_PLACES_API_KEY is not set; using generated placeholder.`);
      if (requireRealImage) {
        throw new Error(`${business.slug}: GOOGLE_PLACES_API_KEY is required to download real images.`);
      }
    }
  }

  if (requireRealImage) {
    throw new Error(`${business.slug}: no downloadable real image was available.`);
  }

  await writeFile(path.join(assetsDir, "hero.svg"), placeholderSvg(business), "utf8");
  return { heroSrc: "./assets/hero.svg", status: "placeholder" };
}
