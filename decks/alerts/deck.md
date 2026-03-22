<!-- layout: title -->
# Multi-window, Multi-burn-rate Alerts

From error budgets to alert policy. The goal is to page on meaningful user pain, not on every infrastructure tremor.

---

<!-- layout: split:text-text -->
## Core Ideas

Core concepts and ideas.

<div>
  <h3>Start from the error budget</h3>
  <p>A 99.9% SLO leaves only 0.1% room for failure, roughly 43 minutes in 30 days.</p>
  <h3>Burn rate measures speed</h3>
  <p>A burn rate of 1× means you will just meet the SLO. 14.4× spends 2% of the monthly budget in one hour.</p>
</div>

<div>
  <h3>Multiple windows improve signal</h3>
  <p>The long window proves significance, while the short window confirms the issue is still happening.</p>
  <h3>Different severities need different spend</h3>
  <p>Fast pages catch catastrophic issues. Slower tickets keep chronic regressions visible without waking people up at night.</p>
</div>

---

## Why 14.4x, 6x, and 1x

These numbers express budget spend over time.

<div>
  <h3>Fast page: 14.4×</h3>
  <p>Spend <strong>2%</strong> of the budget in <strong>1 hour</strong>.</p>
  <p>That pace burns about <strong>14.4 times faster</strong> than the SLO allows.</p>
  <h3>Steady page: 6×</h3>
  <p>Spend <strong>5%</strong> of the budget across <strong>6 hours</strong>.</p>
  <p>That is still severe enough to justify paging, but less urgent than the 1-hour case.</p>
</div>
<div>
  <h3>Slow ticket: 1×</h3>
  <p>Spend <strong>10%</strong> of the budget across <strong>3 days</strong>.</p>
  <p>This is slow enough for business-hours follow-up rather than an immediate page.</p>
  <h3>The math:</h3>
</div>

---

## Alert Pairs

Start with a small set of alert pairs and keep the short window near one-twelfth of the long window.

Each pair combines a severity, a long window, and a short confirming window.

The short window keeps resets clean. The long window makes sure the alert reflects meaningful budget spend.

---

## Recommended Alert Pairs

Use a small set of pairs that map cleanly to page and ticket policies.

<div class="dz-card-grid" data-dz-columns="3">
  <div class="dz-card dz-tone-danger fragment" data-fragment-index="1">
    <h3>Fast page: 1h / 5m paired windows.</h3>
    <p>Use for catastrophic incidents that spend 2% of the monthly budget in one hour.</p>
  </div>
  <div class="dz-card dz-tone-danger fragment" data-fragment-index="2">
    <h3>Steady page: 6h / 30m paired windows.</h3>
    <p>Use for brownouts that quietly spend 5% of the budget across several hours.</p>
  </div>
  <div class="dz-card dz-tone-warning fragment" data-fragment-index="3">
    <h3>Slow ticket: 3d / 6h paired windows.</h3>
    <p>Use for chronic regressions that consume 10% of the budget without paging overnight.</p>
  </div>
</div>

---

## Scenario Comparison

<div>
  <h3>Acute outage</h3>
  <p>Error rate around 3%.</p>
  <p>Expect immediate paging once the long window catches up.</p>
  <h3>Dependency brownout</h3>
  <p>Error rate around 0.7%.</p>
  <p>Often trips the 6h/30m pair before the fastest page threshold.</p>
</div>
<div>
  <h3>Noisy but acceptable</h3>
  <p>Error rate around 0.05%.</p>
  <p>Minor blips stay far below every burn-rate threshold.</p>
  <h3>Time-varying recovery</h3>
  <p>Short windows calm down first after a surge.</p>
  <p>The long window still shows lingering spend, which is why paired windows make resets cleaner.</p>
</div>
