# manta

Manta is an AI mentor project.

Right now it contains a small set of [@deckzero](https://github.com/nvictor/deckzero) presentation decks. More components will be added over time.

## Available Decks

- [decks/alerts](./decks/alerts): Multi-window burn-rate alerts
- [decks/bookmarks](./decks/bookmarks): Two-tier Bookmarks System
- [decks/cujs](./decks/cujs): Critical User Journeys
- [decks/design](./decks/design): State-based design folder reorganization
- [decks/folders](./decks/folders): Design Folder Organization
- [decks/holmes](./decks/holmes): HolmesGPT Architecture
- [decks/intent](./decks/intent): Reliability through Critical User Journeys
- [decks/parc](./decks/parc): PARC design principles
- [decks/threshold](./decks/threshold): SLO vs Threshold Alerting

## Current Format

The current decks are authored in markdown and compiled into self-contained `@deckzero` presentations.

## Adding a New Deck

Follow the deck authoring checklist in [decks/GUIDE.md](./decks/GUIDE.md).

## Notes

- The deck compiler lives at [scripts/build.mjs](./scripts/build.mjs).
- Deck authoring instructions live at [decks/GUIDE.md](./decks/GUIDE.md).
- `manta` consumes the local `deckzero` package from `file:../deckzero`.
- Run `npm install` after local `deckzero` changes, then `npm run sync` or `npm run build:<deck>` to refresh vendored deck assets.
