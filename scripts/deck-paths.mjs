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
  const targetDeckzeroDir = path.join(deckDir, "assets", "deckzero");
  const themesDir = path.join(targetDeckzeroDir, "themes");

  await fs.rm(targetDeckzeroDir, { recursive: true, force: true });
  await fs.mkdir(themesDir, { recursive: true });

  await fs.copyFile(resolveDeckzeroPackageFile("deckzero/deckzero.css"), path.join(targetDeckzeroDir, "deckzero.css"));
  await fs.copyFile(resolveDeckzeroPackageFile("deckzero/deckzero.js"), path.join(targetDeckzeroDir, "deckzero.js"));
  await fs.copyFile(resolveDeckzeroPackageFile("deckzero/themes/light.css"), path.join(themesDir, "light.css"));

  console.log("Synced " + path.relative(projectRoot, targetDeckzeroDir) + " from installed deckzero package");

  // Sync reveal and media assets if missing
  const assetsDir = path.join(deckDir, "assets");
  const revealDir = path.join(assetsDir, "reveal");
  const mediaDir = path.join(assetsDir, "media");

  const deckzeroRoot = path.dirname(resolveDeckzeroPackageFile("deckzero/package.json"));

  try {
    await fs.access(revealDir);
  } catch {
    const sourceReveal = path.join(deckzeroRoot, "demo", "vendor", "reveal");
    await fs.cp(sourceReveal, revealDir, { recursive: true });
    console.log("Synced " + path.relative(projectRoot, revealDir) + " from deckzero package");
  }

  try {
    await fs.access(mediaDir);
  } catch {
    const sourceMedia = path.join(deckzeroRoot, "demo", "src", "assets", "media");
    await fs.mkdir(mediaDir, { recursive: true });
    // Only copy default.svg if it exists in source
    try {
        await fs.copyFile(path.join(sourceMedia, "default.svg"), path.join(mediaDir, "default.svg"));
        console.log("Synced " + path.relative(projectRoot, path.join(mediaDir, "default.svg")) + " from deckzero package");
    } catch {}
  }

  return {
    deckDir,
    targetDir: targetDeckzeroDir
  };
}
