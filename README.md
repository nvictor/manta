# manta

Manta is an AI mentor project.

Right now it contains a small set of [deckzero](https://github.com/nvictor/deckzero) presentation decks. More components will be added over time.

## Available Decks

- [decks/alerts](./decks/alerts): Multi-window burn-rate alerts
- [decks/cujs](./decks/cujs): Critical User Journeys
- [decks/holmes](./decks/holmes): HolmesGPT Architecture
- [decks/threshold](./decks/threshold): SLO vs Threshold Alerting

## Current Format

The current decks are authored in markdown and compiled into self-contained `deckzero` presentations.

## Notes

- The deck compiler lives at [scripts/compile-deck.mjs](/scripts/compile-deck.mjs).
- `manta` consumes `deckzero` as a package from `github:nvictor/deckzero`.
- Run `npm install` to fetch or update `deckzero`, then `npm run sync-deckzero` or `npm run compile:<deck>` to refresh vendored deck assets.
