<!-- layout: title -->
# SLO-Based vs Threshold-Based Alerting

Learn when to page, when to warn, and when to debug. The operating pattern is simple: SLO alerts for paging, threshold alerts for early warning.

---

<!-- layout: split:text-image -->
## What Changes Between Alert Types

SLO alerts and threshold alerts answer different questions, so they should route to humans differently.

<div>
  <ul>
    <li>SLO alerts ask whether users are meaningfully impacted.</li>
    <li>Threshold alerts ask whether the system looks abnormal.</li>
    <li>Diagnostic signals explain why the condition is happening.</li>
  </ul>
</div>

<div>
  <img src="assets/media/threshold-icon.svg" alt="Threshold and SLO alerting icon" />
</div>

---

<!-- layout: split:text-text -->
## Core Differences

These distinctions keep paging tied to user pain instead of raw infrastructure noise.

<div>
  <h3>SLO alerts ask user-impact questions</h3>
  <p>They page when reliability objectives are burning too fast and users are likely feeling it.</p>
  <h3>Threshold alerts ask system-abnormal questions</h3>
  <p>They are strong early warnings and usually route to Slack, ticketing, or office-hours investigation.</p>
</div>

<div>
  <h3>Both are useful in mature systems</h3>
  <p>SLO alerts drive paging. Threshold alerts help prevent incidents and speed diagnosis.</p>
  <h3>Diagnostics explain the cause</h3>
  <p>Use supporting signals to understand why saturation, latency, or burn changed.</p>
</div>

---

## Routing Logic

The routing rule depends on burn rate, impact, and whether the condition is sustained across windows.

<div class="scenario-grid">
  <div class="scenario-card fragment is-observe" data-fragment-index="1">
    <strong>Observe</strong>
    <small>No urgent page signal. Keep diagnostics visible and monitor for trend changes.</small>
  </div>
  <div class="scenario-card fragment is-investigate" data-fragment-index="2">
    <strong>Investigate</strong>
    <small>The system is abnormal, but SLO burn is not yet severe and sustained. Route as warning, not a page.</small>
  </div>
  <div class="scenario-card fragment is-page" data-fragment-index="3">
    <strong>Page now</strong>
    <small>Users are likely feeling pain and the SLO burn is sustained. This is a paging event.</small>
  </div>
</div>

---

## Practical Rule

Only SLO alerts should page humans. Threshold alerts should inform humans so teams can prevent incidents earlier.
