#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";

// Dominio del catalogo de landings (proyecto Vercel `mayofy-landings`, ver
// docs/DEPLOYMENT.md). No confundir con https://mayofy.vercel.app, que es el sitio
// propio de Mayofy y se usa como link de portfolio en los mensajes de outreach.
const PUBLIC_CATALOG_BASE_URL = "https://mayofy-landings.vercel.app";

function argValue(argv, flag) {
  const index = argv.indexOf(flag);
  if (index < 0) {
    return null;
  }
  const value = argv[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value.`);
  }
  return value;
}

function parseRuns(argv) {
  const raw = argValue(argv, "--runs") ?? process.env.RUNS_JSON;
  if (!raw) {
    throw new Error("Usage: node scripts/generate-deploy-runs.mjs --runs '[\"run-name\"]'");
  }

  const runs = JSON.parse(raw);
  if (!Array.isArray(runs) || runs.some((run) => typeof run !== "string" || !/^[a-z0-9][a-z0-9-]*$/u.test(run))) {
    throw new Error("--runs must be a JSON array of run slugs.");
  }
  return [...new Set(runs)].sort();
}

function clientReadinessMode(argv) {
  const mode = argValue(argv, "--client-readiness") ?? "strict";
  if (!["strict", "warn", "skip"].includes(mode)) {
    throw new Error("--client-readiness must be strict, warn, or skip.");
  }
  return mode;
}

async function expectedCount(runName) {
  const datasetPath = path.join("data", `${runName}-businesses.json`);
  const raw = await readFile(datasetPath, "utf8");
  const data = JSON.parse(raw);
  if (!Array.isArray(data)) {
    throw new Error(`${datasetPath} must contain a JSON array.`);
  }
  return String(data.length);
}

function commandName(command) {
  return process.platform === "win32" && command === "npx" ? "npx.cmd" : command;
}

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`\n> ${command} ${args.join(" ")}`);
    const child = spawn(commandName(command), args, {
      ...options,
      env: process.env,
      stdio: "inherit",
      windowsHide: true,
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve(true);
        return;
      }
      if (options.allowFailure) {
        console.warn(`${command} exited with code ${code}; continuing because this step is warning-only.`);
        resolve(false);
        return;
      }
      reject(new Error(`${command} exited with code ${code}`));
    });
  });
}

async function validateAndGenerate(runName, options) {
  const businessesPath = path.join("data", `${runName}-businesses.json`);
  const specsPath = path.join("data", "site-specs", `${runName}-site-specs.json`);
  const briefsPath = path.join("data", "agent-briefs", runName);
  const count = await expectedCount(runName);

  await runCommand("npx", [
    "tsx",
    "src/validators/validate-design-gate.ts",
    "--businesses",
    businessesPath,
    "--specs",
    specsPath,
  ]);

  await runCommand("npx", [
    "tsx",
    "src/generator/generate-sites.ts",
    businessesPath,
    "--specs",
    specsPath,
    "--session",
    runName,
    "--require-real-images",
    "--require-agent-frontends",
    "--require-design-brief",
  ]);

  await runCommand("npx", [
    "tsx",
    "src/validators/validate-generated-sites.ts",
    "--session",
    runName,
    "--require-agent-frontends",
    "--expected-count",
    count,
  ]);

  if (options.clientReadiness === "skip") {
    console.log("Skipping client readiness audit for catalog deploy.");
  } else {
    const passed = await runCommand("npx", ["tsx", "src/validators/validate-client-readiness.ts", "--session", runName, "--min-score", "85"], {
      allowFailure: options.clientReadiness === "warn",
    });
    if (!passed) {
      console.warn(`${runName}: client readiness audit failed; catalog deploy will continue. Fix this before selling the affected landing.`);
    }
  }

  await runCommand("npx", [
    "tsx",
    "src/delivery/create-final-study.ts",
    "--businesses",
    businessesPath,
    "--specs",
    specsPath,
    "--briefs",
    briefsPath,
    "--session",
    runName,
    "--price",
    "[PRECIO]",
    "--base-url",
    PUBLIC_CATALOG_BASE_URL,
  ]);
}

async function main() {
  const runs = parseRuns(process.argv);
  const clientReadiness = clientReadinessMode(process.argv);
  if (runs.length === 0) {
    console.log("No runs to generate.");
    return;
  }

  for (const runName of runs) {
    console.log(`\n=== ${runName} ===`);
    await validateAndGenerate(runName, { clientReadiness });
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
