<!-- layout: title -->
# State-Based Folder Reorg

Use one question to file everything:
what is this doing in my life right now?

---

<!-- layout: split:text-text -->
## The Current Friction

The old system is not under-designed. It has too many competing dimensions.

<div>
  <h3>Too many axes</h3>
  <p>Type, time, state, domain, and format all compete at the moment you need to file something.</p>
  <h3>Every save becomes a classification task</h3>
  <p>The folder tree asks several questions before the document has earned that precision.</p>
</div>

<div>
  <h3>The inbox already works</h3>
  <p>It succeeds because it has one rule: put it here.</p>
  <h3>The rest should copy that simplicity</h3>
  <p>Every top-level folder should answer exactly one operational question.</p>
</div>

---

## Core Principle

Organize by state, not category.

<div class="dz-card-grid" data-dz-columns="2">
  <div class="dz-card dz-tone-muted fragment" data-fragment-index="1">
    <h3>Do not ask</h3>
    <p>What topic is it? What format is it? What year is it?</p>
  </div>
  <div class="dz-card dz-tone-success fragment" data-fragment-index="2">
    <h3>Ask once</h3>
    <p>What is this doing in my life right now?</p>
  </div>
</div>

---

## Four Folders Only

Replace the competing taxonomy with four states.

<div class="dz-card-grid" data-dz-columns="4">
  <div class="dz-card dz-tone-info fragment" data-fragment-index="1">
    <strong><code>inbox/</code></strong>
    <small>Unsure, unprocessed, or captured fast.</small>
  </div>
  <div class="dz-card dz-tone-success fragment" data-fragment-index="2">
    <strong><code>active/</code></strong>
    <small>Anything you would open this week.</small>
  </div>
  <div class="dz-card fragment" data-fragment-index="3">
    <strong><code>reference/</code></strong>
    <small>Useful material you mostly look up.</small>
  </div>
  <div class="dz-card dz-tone-muted fragment" data-fragment-index="4">
    <strong><code>archive/</code></strong>
    <small>Done, stale, or no longer part of the working set.</small>
  </div>
</div>

---

## The Shape

Keep the top level boring.

<div>
  <pre><code>design/
├── inbox/
├── active/
├── reference/
└── archive/</code></pre>
</div>

---

## One Decision Rule

When saving or processing a file, use a single pass.

<div class="decision-grid">
  <div class="dz-card decision-card dz-tone-info fragment" data-fragment-index="1">
    <strong>Unsure?</strong>
    <small>Put it in <code>inbox/</code>.</small>
  </div>
  <div class="dz-card decision-card dz-tone-success fragment" data-fragment-index="2">
    <strong>Working on it?</strong>
    <small>Put it in <code>active/</code>.</small>
  </div>
  <div class="dz-card decision-card fragment" data-fragment-index="3">
    <strong>Looking it up later?</strong>
    <small>Put it in <code>reference/</code>.</small>
  </div>
  <div class="dz-card decision-card dz-tone-muted fragment" data-fragment-index="4">
    <strong>Done?</strong>
    <small>Put it in <code>archive/</code>.</small>
  </div>
</div>

---

## What Goes Away

The reorg removes folders that create ambiguous ownership.

<div class="dz-card-grid" data-dz-columns="2">
  <div class="dz-card dz-tone-muted fragment" data-fragment-index="1">
    <h3>No <code>areas/</code></h3>
    <p>Everything can become an area, so the folder stops making decisions easier.</p>
  </div>
  <div class="dz-card dz-tone-muted fragment" data-fragment-index="2">
    <h3>No deep <code>library/</code> taxonomy</h3>
    <p>Creative, engineering, and life categories add precision before retrieval needs it.</p>
  </div>
</div>

---

## Naming Carries the Meaning

Use searchable filenames instead of deep trees.

<div class="file-map">
  <div class="dz-card fragment" data-fragment-index="1">
    <h3>Pattern</h3>
    <p><code>&lt;domain&gt;-&lt;specific&gt;.md</code></p>
    <small>Domain first, then the thing you are likely to remember.</small>
  </div>
  <div class="dz-card fragment" data-fragment-index="2">
    <h3>Examples</h3>
    <p><code>comedy-gag-pad.md</code><br><code>music-orchestra-ranges.md</code><br><code>ai-agent-instructions.md</code></p>
  </div>
</div>

---

## Concrete Moves

The migration is mechanical.

<div class="dz-card-grid" data-dz-columns="2">
  <div class="dz-card fragment" data-fragment-index="1">
    <h3><code>projects/comedy/GagPad.md</code></h3>
    <p>Move to <code>active/comedy-gag-pad.md</code>.</p>
  </div>
  <div class="dz-card fragment" data-fragment-index="2">
    <h3><code>library/creative/StoryStructure.md</code></h3>
    <p>Move to <code>reference/writing-story-structure.md</code>.</p>
  </div>
  <div class="dz-card fragment" data-fragment-index="3">
    <h3><code>areas/goals/Goals2026.md</code></h3>
    <p>Move to <code>active/goals-2026.md</code>.</p>
  </div>
  <div class="dz-card fragment" data-fragment-index="4">
    <h3><code>archive/goals/Goals2022.md</code></h3>
    <p>Move to <code>archive/2022-goals.md</code>.</p>
  </div>
</div>

---

## State Machine

The system is deterministic.

<div class="state-flow">
  <div class="dz-card dz-tone-info fragment" data-fragment-index="1">
    <strong>Inbox</strong>
    <small>Capture</small>
  </div>
  <div class="arrow fragment" data-fragment-index="2">→</div>
  <div class="dz-card dz-tone-success fragment" data-fragment-index="3">
    <strong>Active</strong>
    <small>Work now</small>
  </div>
  <div class="arrow fragment" data-fragment-index="4">→</div>
  <div class="dz-card dz-tone-muted fragment" data-fragment-index="5">
    <strong>Archive</strong>
    <small>Done</small>
  </div>
</div>

<div class="state-branch">
  <div class="dz-card fragment" data-fragment-index="6">
    <strong>Reference</strong>
    <small>Useful, but not active</small>
  </div>
</div>

---

## Optional Active Groups

Only add one layer inside <code>active/</code> if it lowers friction.

<div>
  <pre><code>active/
├── comedy/
├── music/
└── work/</code></pre>
</div>

<p>Use light grouping when it feels natural. Do not force it.</p>

---

## Bottom Line

You do not need a better taxonomy.

<div class="dz-card-grid" data-dz-columns="3">
  <div class="dz-card dz-tone-success fragment" data-fragment-index="1">
    <strong>Fewer decisions</strong>
    <small>One question at filing time.</small>
  </div>
  <div class="dz-card dz-tone-info fragment" data-fragment-index="2">
    <strong>Fewer folders</strong>
    <small>Four states at the top level.</small>
  </div>
  <div class="dz-card fragment" data-fragment-index="3">
    <strong>Stronger names</strong>
    <small>Searchable prefixes instead of deep taxonomies.</small>
  </div>
</div>
