# manta

Manta is an AI mentor project.

Right now it contains a small set of [deckzero](https://github.com/nvictor/deckzero) presentation decks. More components will be added over time.

## Available Decks

- [decks/alerts](./decks/alerts): Multi-window burn-rate alerts
- [decks/bookmarks](./decks/bookmarks): Two-tier Bookmarks System
- [decks/cujs](./decks/cujs): Critical User Journeys
- [decks/folders](./decks/folders): Design Folder Organization
- [decks/holmes](./decks/holmes): HolmesGPT Architecture
- [decks/parc](./decks/parc): PARC design principles
- [decks/threshold](./decks/threshold): SLO vs Threshold Alerting

## Current Format

The current decks are authored in markdown and compiled into self-contained `deckzero` presentations.

## Notes

- The deck compiler lives at [scripts/build.mjs](/scripts/build.mjs).
- `manta` consumes `deckzero` as a package from `github:nvictor/deckzero`.
- Run `npm install` to fetch or update `deckzero`, then `npm run sync` or `npm run build:<deck>` to refresh vendored deck assets.
