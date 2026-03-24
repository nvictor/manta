import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

export const projectRoot = path.resolve(currentDir, "..");
export const decksRoot = path.join(projectRoot, "decks");

function resolveDeckzeroPackageFile(specifier) {
  try {
    return require.resolve(specifier);
  } catch {
    throw new Error("Missing installed deckzero package. Run `npm install` in manta to fetch deckzero from GitHub.");
  }
}

export async function resolveDeckDir(deckName) {
  const directDir = path.join(projectRoot, deckName);
  const nestedDir = path.join(decksRoot, deckName);

  try {
    await fs.access(path.join(directDir, "deck.config.json"));
    return directDir;
  } catch {}

  await fs.access(path.join(nestedDir, "deck.config.json"));
  return nestedDir;
}

export async function collectDeckNames() {
  const names = new Set();

  const rootEntries = await fs.readdir(projectRoot, { withFileTypes: true });
  for (const entry of rootEntries) {
    if (!entry.isDirectory() || entry.name === ".git" || entry.name === "decks" || entry.name === "scripts" || entry.name === "node_modules") {
      continue;
    }
    try {
      await fs.access(path.join(projectRoot, entry.name, "deck.config.json"));
      names.add(entry.name);
    } catch {}
  }

  try {
    const nestedEntries = await fs.readdir(decksRoot, { withFileTypes: true });
    for (const entry of nestedEntries) {
      if (!entry.isDirectory()) {
        continue;
      }
      try {
        await fs.access(path.join(decksRoot, entry.name, "deck.config.json"));
        names.add(entry.name);
      } catch {}
    }
  } catch {}

  return Array.from(names).sort();
}

export async function syncDeckzeroAssets(deckName) {
  const deckDir = await resolveDeckDir(deckName);
  const targetDir = path.join(deckDir, "assets", "deckzero");
  const themesDir = path.join(targetDir, "themes");

  await fs.rm(targetDir, { recursive: true, force: true });
  await fs.mkdir(themesDir, { recursive: true });

  await fs.copyFile(resolveDeckzeroPackageFile("deckzero/deckzero.css"), path.join(targetDir, "deckzero.css"));
  await fs.copyFile(resolveDeckzeroPackageFile("deckzero/deckzero.js"), path.join(targetDir, "deckzero.js"));
  await fs.copyFile(resolveDeckzeroPackageFile("deckzero/themes/light.css"), path.join(themesDir, "light.css"));

  console.log("Synced " + path.relative(projectRoot, targetDir) + " from installed deckzero package");

  return {
    deckDir,
    targetDir
  };
}
