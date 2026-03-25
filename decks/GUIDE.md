# Deck Guide

Use this when authoring `deckzero` decks under `manta/decks/`.

## Authoring model

- Treat `deck.md` as the source of truth.
- Keep deck-local metadata in `deck.config.json`.
- Keep deck-local overrides in `deck.css`.
- Treat `index.html` as generated output. Rebuild it with `npm run build:<deck>` or `npm run build`.
- Treat `assets/deckzero/` as vendored output copied from the installed `deckzero` package.

## Visual conventions

- Use `assets/media/default.svg` as the default brandmark unless there is a clear reason not to.
- Prefer simple card grids and split layouts over custom one-off structures.
- Use color semantically and sparingly, for example to separate alert classes, signal types, or decision categories.

## Rhythm and typography

- If spacing issues recur across decks, fix them in `deckzero`, not per deck.
- Keep deck-local CSS focused on layout and semantic treatments, not base typography overrides.

## Operational checklist

1. Read the source content to extract information, lessons, examples, instructions, etc.
2. Decide which what become fragments, cards, or direct answer slides.
3. Create `deck.md`, `deck.css`, and `deck.config.json`.
4. Vendor or reuse local assets under the deck folder.
5. Run `npm install` if you need the latest `deckzero` package from GitHub.
6. Run `npm run sync` or just build the deck to refresh `assets/deckzero/`.
7. Build and inspect the result.
8. Record any `deckzero` gaps that are exposed.
