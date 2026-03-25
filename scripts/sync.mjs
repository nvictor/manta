import { collectDeckNames, syncDeckzeroAssets } from "./deck-paths.mjs";

const requestedDecks = process.argv.slice(2);
const deckNames = requestedDecks.length
  ? requestedDecks
  : await collectDeckNames();

for (const deckName of deckNames) {
  await syncDeckzeroAssets(deckName);
}
