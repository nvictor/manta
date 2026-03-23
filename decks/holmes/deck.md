<!-- layout: title -->
# HolmesGPT Architecture

Learn why HolmesGPT works for incident debugging, where general agent stacks win.

---

<!-- layout: split:text-image -->
## What HolmesGPT Optimizes For

HolmesGPT is strongest when incident response needs guided investigation rather than open-ended chat.

<div>
  <ul>
    <li>It starts from hypotheses instead of random tool calls.</li>
    <li>It loops through logs, metrics, traces, and cluster events with a troubleshooting plan.</li>
    <li>It aims to produce RCA and remediation actions, not just descriptive answers.</li>
  </ul>
</div>

<div>
  <img src="assets/media/holmes-icon.svg" alt="HolmesGPT icon" />
</div>

---

## Architecture and Data Sources

The system works because it can correlate incident evidence from multiple channels, not because it has one smart model prompt.

<div class="dz-card-grid" data-dz-columns="3">
  <div class="dz-card fragment" data-fragment-index="1">
    <p>Alerting and collaboration systems provide the starting signal.</p>
  </div>
  <div class="dz-card fragment" data-fragment-index="2">
    <p>Observability, infrastructure, and runbooks supply evidence.</p>
  </div>
  <div class="dz-card fragment" data-fragment-index="3">
    <p>The model layer turns structured evidence into diagnosis and next actions.</p>
  </div>
</div>

---

<!-- layout: image-caption -->
<img src="assets/media/holmes-architecture.png" alt="HolmesGPT architecture showing model providers, runbooks, observability sources, cloud infrastructure, and incident outputs." />

---

## Evidence Inputs

These are the main input classes HolmesGPT pulls together during incident analysis.

<div class="dz-card-grid" data-dz-columns="2">
  <div class="dz-card fragment" data-fragment-index="1">
    <h3>Alerting and on-call systems</h3>
    <p>Paged incidents and alert signals entering the workflow.</p>
    <p><strong>Examples:</strong> PagerDuty, Opsgenie, New Relic alerts</p>
  </div>
  <div class="dz-card fragment" data-fragment-index="2">
    <h3>Developer questions and APIs</h3>
    <p>Interactive questions from responders and external API requests.</p>
    <p><strong>Examples:</strong> Slack, web UI, HTTP API</p>
  </div>
  <div class="dz-card fragment" data-fragment-index="3">
    <h3>Metrics, logs, and traces</h3>
    <p>Core observability telemetry queried during investigation.</p>
    <p><strong>Examples:</strong> Prometheus, Loki, Tempo, Elasticsearch</p>
  </div>
  <div class="dz-card fragment" data-fragment-index="4">
    <h3>Cloud, cluster, and knowledge context</h3>
    <p>Infrastructure state and runbooks that turn raw signals into operational judgment.</p>
    <p><strong>Examples:</strong> Kubernetes, AWS, Argo, Confluence, internal docs</p>
  </div>
</div>

---

## Investigation Loop

The loop enforces evidence-backed progress instead of repetitive tool chatter.

<div class="dz-card-grid" data-dz-columns="3">
  <div class="dz-card fragment" data-fragment-index="1">
    <span class="dz-step-badge">1</span>
    <strong>Hypothesis</strong>
    <small>Start with candidate causes from user symptoms and alert metadata.</small>
  </div>
  <div class="dz-card fragment" data-fragment-index="2">
    <span class="dz-step-badge">2</span>
    <strong>Targeted query</strong>
    <small>Pull only the most relevant metrics, logs, traces, and cluster events.</small>
  </div>
  <div class="dz-card fragment" data-fragment-index="3">
    <span class="dz-step-badge">3</span>
    <strong>Evidence check</strong>
    <small>Validate or reject each hypothesis using observed signal alignment.</small>
  </div>
  <div class="dz-card fragment" data-fragment-index="4">
    <span class="dz-step-badge">4</span>
    <strong>Refine and branch</strong>
    <small>Promote likely causes, drop weak leads, and test the next branch.</small>
  </div>
  <div class="dz-card fragment" data-fragment-index="5">
    <span class="dz-step-badge">5</span>
    <strong>RCA and remediation</strong>
    <small>Publish root cause, confidence, and next actions for responders.</small>
  </div>
</div>
