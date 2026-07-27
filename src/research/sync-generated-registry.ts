import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { flagValue } from "../generated-output.js";
import { buildRegistry, defaultPublicBaseUrl, loadRegistry, renderRegistryJson, renderRegistryMarkdown } from "./generated-registry.js";

type Args = {
  out: string;
  dataDir: string;
  generatedDir: string;
  baseUrl: string | null;
  check: boolean;
};

function markdownPath(jsonPath: string): string {
  return jsonPath.replace(/\.json$/iu, ".md") === jsonPath ? `${jsonPath}.md` : jsonPath.replace(/\.json$/iu, ".md");
}

function parseArgs(argv: string[]): Args {
  return {
    out: flagValue(argv, "--out", path.join("data", "generated-landings.json")) ?? path.join("data", "generated-landings.json"),
    dataDir: flagValue(argv, "--data-dir", "data") ?? "data",
    generatedDir: flagValue(argv, "--generated-dir", "generated") ?? "generated",
    baseUrl: flagValue(argv, "--base-url", defaultPublicBaseUrl),
    check: argv.includes("--check"),
  };
}

async function readOptional(filePath: string): Promise<string | null> {
  try {
    return await readFile(filePath, "utf8");
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT") return null;
    throw error;
  }
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv);
  const previous = await loadRegistry(args.out);
  const registry = await buildRegistry({
    dataDir: args.dataDir,
    generatedDir: args.generatedDir,
    baseUrl: args.baseUrl,
    previous,
  });
  const json = renderRegistryJson(registry);
  const markdownOut = markdownPath(args.out);
  const markdown = renderRegistryMarkdown(registry, markdownOut);

  if (args.check) {
    const [currentJson, currentMarkdown] = await Promise.all([readOptional(args.out), readOptional(markdownOut)]);
    if (currentJson !== json || currentMarkdown !== markdown) {
      throw new Error(`Generated registry is out of date. Run npm run registry:sync (expected ${args.out} and ${markdownOut}).`);
    }
    console.log(`Generated registry is up to date (${registry.entries.length} entry/entries).`);
    return;
  }

  await mkdir(path.dirname(args.out), { recursive: true });
  await mkdir(path.dirname(markdownOut), { recursive: true });
  await Promise.all([writeFile(args.out, json, "utf8"), writeFile(markdownOut, markdown, "utf8")]);
  console.log(`Wrote ${registry.entries.length} registry entry/entries to ${args.out} and ${markdownOut}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
