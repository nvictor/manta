import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(currentDir, "..");
const decksRoot = path.join(projectRoot, "decks");
const deckzeroCompilerUrl = pathToFileURL(path.resolve(projectRoot, "../deckzero/scripts/compile-markdown.mjs")).href;
const { compileMarkdownDeck } = await import(deckzeroCompilerUrl);

function indentBlock(value, indent) {
  return String(value)
    .trim()
    .split("\n")
    .map(function (line) {
      return line ? " ".repeat(indent) + line : "";
    })
    .join("\n");
}

function renderDocument(slidesHtml, config, customCss) {
  const title = config.title || "deck";
  const theme = config.theme || "light";
  const brandSrc = config.brandSrc || "assets/media/default.svg";
  const brandStyle = config.brandStyle || "logo";
  const brandPosition = config.brandPosition || "top-right";
  const brandAlt = config.brandAlt || "deckzero";
  const cssBlock = customCss.trim()
    ? `
    <style>
${indentBlock(customCss, 6)}
    </style>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" href="assets/reveal/reset.css" />
    <link rel="stylesheet" href="assets/reveal/reveal.css" />
    <link rel="stylesheet" href="assets/reveal/plugin/highlight/monokai.css" />
    <link rel="stylesheet" href="assets/deckzero/deckzero.css" />
    <link rel="stylesheet" href="assets/deckzero/themes/light.css" />${cssBlock}
  </head>
  <body>
    <div
      class="reveal"
      data-dz-brand-src="${brandSrc}"
      data-dz-brand-style="${brandStyle}"
      data-dz-brand-position="${brandPosition}"
      data-dz-brand-alt="${brandAlt}"
      data-dz-theme="${theme}"
    >
      <div class="slides">
${indentBlock(slidesHtml, 8)}
      </div>
    </div>

    <script src="assets/reveal/reveal.js"></script>
    <script src="assets/reveal/plugin/zoom.js"></script>
    <script src="assets/reveal/plugin/notes.js"></script>
    <script src="assets/reveal/plugin/search.js"></script>
    <script src="assets/reveal/plugin/markdown.js"></script>
    <script src="assets/reveal/plugin/highlight.js"></script>
    <script src="assets/deckzero/deckzero.js"></script>
    <script>
      Reveal.initialize({
        controls: true,
        progress: true,
        hash: true,
        center: true,
        transition: "fade",
        backgroundTransition: "fade",
        plugins: [RevealZoom, RevealNotes, RevealSearch, RevealMarkdown, RevealHighlight]
      });
    </script>
  </body>
</html>
`;
}

async function compileDeck(deckName) {
  const directDir = path.join(projectRoot, deckName);
  const nestedDir = path.join(decksRoot, deckName);
  let deckDir = nestedDir;

  try {
    await fs.access(path.join(directDir, "deck.config.json"));
    deckDir = directDir;
  } catch {
    deckDir = nestedDir;
  }

  const markdownPath = path.join(deckDir, "deck.md");
  const configPath = path.join(deckDir, "deck.config.json");
  const cssPath = path.join(deckDir, "deck.css");
  const outputPath = path.join(deckDir, "index.html");

  const markdown = await fs.readFile(markdownPath, "utf8");
  const config = JSON.parse(await fs.readFile(configPath, "utf8"));
  const customCss = await fs.readFile(cssPath, "utf8").catch(function () {
    return "";
  });
  const slidesHtml = compileMarkdownDeck(markdown);
  const documentHtml = renderDocument(slidesHtml, config, customCss);

  await fs.writeFile(outputPath, documentHtml);
  console.log("Compiled " + path.relative(projectRoot, outputPath) + " from deck.md");
}

async function collectDeckNames() {
  const names = new Set();

  const rootEntries = await fs.readdir(projectRoot, { withFileTypes: true });
  for (const entry of rootEntries) {
    if (!entry.isDirectory() || entry.name === ".git" || entry.name === "decks" || entry.name === "scripts") {
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

const requestedDecks = process.argv.slice(2);
const deckNames = requestedDecks.length
  ? requestedDecks
  : await collectDeckNames();

for (const deckName of deckNames) {
  await compileDeck(deckName);
}
