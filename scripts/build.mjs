import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

import { collectDeckNames, projectRoot, syncDeckzeroAssets } from "./deck-paths.mjs";

const require = createRequire(import.meta.url);
const deckzeroCompilerUrl = pathToFileURL(require.resolve("deckzero/compiler")).href;
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
  const { deckDir } = await syncDeckzeroAssets(deckName);

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

const requestedDecks = process.argv.slice(2);
const deckNames = requestedDecks.length
  ? requestedDecks
  : await collectDeckNames();

for (const deckName of deckNames) {
  await compileDeck(deckName);
}
