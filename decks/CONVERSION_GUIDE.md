# Interactive To deckzero Conversion Guide

Use this when converting interactive educational apps into markdown-authored `deckzero` decks under `manta/decks/`.

## Authoring model

- Treat `deck.md` as the source of truth.
- Keep deck-local metadata in `deck.config.json`.
- Keep deck-local overrides in `deck.css`.
- Treat `index.html` as generated output. Rebuild it with `npm run compile:<deck>` or `npm run compile-decks`.

## Content strategy

- Preserve the teaching model, not the original UI.
- Replace quizzes, sliders, and selectors with static comparisons, progressive reveal, or scenario cards.
- Prefer a small number of high-signal slides over mirroring every original interaction.
- Remove PWA shell details, service workers, reset mechanics, and offline-specific behavior unless they are part of the lesson itself.

## Visual conventions

- Use `assets/media/default.svg` as the default brandmark unless there is a clear reason not to.
- Prefer simple card grids and split layouts over custom one-off structures.
- Keep explanatory copy content-first. Avoid “the original app did X” unless the conversion itself is the subject.
- Use color semantically and sparingly, for example to separate alert classes, signal types, or decision categories.

## Rhythm and typography

- When a slide stacks `h3/p/h3/p` inside panes or cards, check the rendered spacing in GrandReveal.
- If spacing issues recur across decks, fix them in `deckzero`, not per deck.
- Keep deck-local CSS focused on layout and semantic treatments, not base typography overrides.

## Interactivity fallback patterns

- Checkbox or matching exercise -> progressive reveal or answer-key cards.
- Slider or continuum -> named scenarios, bands, or rubric cards.
- Multi-input simulator -> preset scenario sequence.
- Dynamic recommendation engine -> scenario-to-decision slides.

## Operational checklist

1. Read the source app logic to extract the lesson, state model, and decision rules.
2. Decide which interactions become fragments, cards, or direct answer slides.
3. Create `deck.md`, `deck.css`, and `deck.config.json`.
4. Vendor or reuse local assets under the deck folder.
5. Compile and inspect the result.
6. Record any `deckzero` gaps if the conversion exposes them.
