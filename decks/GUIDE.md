# Deck Guide

Use this when authoring `deckzero` decks under `manta/decks/`.

## Authoring model

- Use a short lowercase slug for each deck, for example `design`.
- Create each deck at `decks/<slug>/`.
- Add a matching npm script in `package.json`: `build:<slug>`.
- Treat `deck.md` as the source of truth.
- Keep deck-local metadata in `deck.config.json`.
- Keep deck-local overrides in `deck.css`.
- Treat `index.html` as generated output. Rebuild it with `npm run build:<deck>` or `npm run build`.
- Treat `assets/deckzero/` as vendored output copied from the installed `deckzero` package.

Every deck should start with this shape:

```text
decks/<slug>/
├── deck.md
├── deck.css
└── deck.config.json
```

## Visual conventions

- Use `assets/media/default.svg` as the default brandmark unless there is a clear reason not to.
- Prefer simple card grids and split layouts over custom one-off structures.
- Prefer `dz-card-grid`, `dz-card`, `dz-tone-info`, `dz-tone-success`, and `dz-tone-muted` before adding custom HTML or CSS.
- Use color semantically and sparingly, for example to separate alert classes, signal types, or decision categories.

## Rhythm and typography

- Start `deck.md` with `<!-- layout: title -->`.
- Separate slides with `---`.
- Use existing `deckzero` layouts such as `split:text-text` where they fit.
- Use fragments deliberately for progressive reveal, not for every line.
- If spacing issues recur across decks, fix them in `deckzero`, not per deck.
- Keep deck-local CSS focused on layout and semantic treatments, not base typography overrides.

## Generated files

- Do not hand-edit `index.html`.
- Do not hand-edit `assets/deckzero/`.
- Build the deck to create or refresh generated output:

```sh
npm run build:<slug>
```

The build script will also copy missing `assets/reveal/` and `assets/media/default.svg` files from the installed `deckzero` package.

## Operational checklist

1. Read the source content to extract information, lessons, examples, instructions, etc.
2. Decide what should become fragments, cards, or direct answer slides.
3. Create `deck.md`, `deck.css`, and `deck.config.json`.
4. Vendor or reuse local assets under the deck folder.
5. Add the deck to the "Available Decks" list in `README.md`.
6. Mention the source concept or audience in one short phrase.
7. Run `npm install` after local `deckzero` changes.
8. Run `npm run sync` or just build the deck to refresh `assets/deckzero/`.
9. Build and inspect `decks/<slug>/index.html`.
10. Check `git status --short` so only the intended source, generated deck files, and README/script updates are included.
11. Record any `deckzero` gaps that are exposed.
