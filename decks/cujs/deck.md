<!-- layout: title -->
# Critical User Journeys

Define the path that creates user value, then measure the path instead of isolated components.

---

<!-- layout: split:text-image -->
## What Counts as a CUJ

A critical user journey is the sequence of interactions a user must complete to get real value from the system.

<div>
  <ul>
    <li>It starts from the user goal, not the service topology.</li>
    <li>It includes front-end actions and backend dependencies.</li>
    <li>It becomes the frame for SLO design and incident priority.</li>
  </ul>
</div>

<div>
  <img src="assets/media/cujs-journey.svg" alt="A simplified browse to purchase journey diagram" />
</div>

---

<!-- layout: split:text-text -->
## Core Concepts

These concepts give you a practical frame for defining and measuring a critical journey.

<div>
  <h3>Start with the journey</h3>
  <p>Reliability should protect what users are trying to accomplish.</p>
  <h3>Model dependencies</h3>
  <p>Include both visible interactions and required systems behind them.</p>
</div>

<div>
  <h3>Grade importance</h3>
  <p>Differentiate common tasks from moments where value is actually delivered.</p>
  <h3>Measure the full path</h3>
  <p>Track the whole journey so completion failures show up as user-visible reliability issues.</p>
</div>

---

<!-- layout: split:text-text -->
## Why CUJs Matter

CUJs make reliability work legible to both engineering and the business.

<div>
  <h3>Better SLO alignment</h3>
  <p>Objectives stay tied to user success instead of internal subsystem metrics.</p>
  <h3>Clearer incident triage</h3>
  <p>A broken purchase flow deserves a different response than degraded browsing.</p>
</div>

<div>
  <h3>Hidden weak-link discovery</h3>
  <p>Journey maps expose dependencies that can break completion even when single services look healthy.</p>
  <h3>Sharper tradeoffs</h3>
  <p>Critical paths justify stricter targets and faster response.</p>
</div>

---

## Example Journey: Online Shopping

Not every shopping action carries the same reliability weight. Focus on the steps where user intent turns into completed value.

<div class="dz-card-grid" data-dz-columns="2">
  <div class="dz-card dz-tone-neutral">
    <strong>Browse product catalog</strong>
    <small>Useful, but not where user value is completed.</small>
  </div>
  <div class="dz-card dz-tone-neutral">
    <strong>Search by keyword</strong>
    <small>Important discovery aid, but still pre-transaction.</small>
  </div>
  <div class="dz-card dz-tone-success fragment">
    <strong>Add item to cart</strong>
    <small>Begins the committed purchase path.</small>
  </div>
  <div class="dz-card dz-tone-success fragment">
    <strong>Complete purchase and payment</strong>
    <small>Value is realized here. This is the core critical activity.</small>
  </div>
  <div class="dz-card dz-tone-neutral">
    <strong>Receive order confirmation</strong>
    <small>Important feedback, but secondary to transaction completion.</small>
  </div>
</div>

---

## Signal Mapping

Each step should be paired with the signal that best exposes user-visible failure along the journey.

<div class="dz-card-grid" data-dz-columns="2">
  <div class="dz-card dz-tone-info fragment" data-fragment-index="1">
    <strong>Latency: Checkout submit</strong>
    <small>Slow submit flow is directly user-visible friction.</small>
  </div>
  <div class="dz-card dz-tone-success fragment" data-fragment-index="2">
    <strong>Availability: Payment authorization</strong>
    <small>Success or failure matters more than minor speed variation.</small>
  </div>
  <div class="dz-card dz-tone-info fragment" data-fragment-index="3">
    <strong>Latency: Checkout page load</strong>
    <small>Load time is a front-door signal for the purchase path.</small>
  </div>
</div>
