<!-- layout: title -->
# HolmesGPT Architecture

Learn why HolmesGPT works for incident debugging, where general agent stacks win, and how to choose the right operating model.

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

<p>Use the architecture map as a reminder of where investigation context actually comes from during RCA.</p>
<ul>
  <li>Alerting and collaboration systems provide the starting signal.</li>
  <li>Observability, infrastructure, and runbooks supply evidence.</li>
  <li>The model layer turns structured evidence into diagnosis and next actions.</li>
</ul>

---

<!-- layout: image-caption -->
<img src="assets/media/holmes-architecture.png" alt="HolmesGPT architecture showing model providers, runbooks, observability sources, cloud infrastructure, and incident outputs." />

---

## Evidence Inputs

These are the main input classes HolmesGPT pulls together during incident analysis.

<div class="source-grid">
  <div class="source-card fragment" data-fragment-index="1">
    <h3>Alerting and on-call systems</h3>
    <p>Paged incidents and alert signals entering the workflow.</p>
    <p><strong>Examples:</strong> PagerDuty, Opsgenie, New Relic alerts</p>
  </div>
  <div class="source-card fragment" data-fragment-index="2">
    <h3>Developer questions and APIs</h3>
    <p>Interactive questions from responders and external API requests.</p>
    <p><strong>Examples:</strong> Slack, web UI, HTTP API</p>
  </div>
  <div class="source-card fragment" data-fragment-index="3">
    <h3>Metrics, logs, and traces</h3>
    <p>Core observability telemetry queried during investigation.</p>
    <p><strong>Examples:</strong> Prometheus, Loki, Tempo, Elasticsearch</p>
  </div>
  <div class="source-card fragment" data-fragment-index="4">
    <h3>Cloud, cluster, and knowledge context</h3>
    <p>Infrastructure state and runbooks that turn raw signals into operational judgment.</p>
    <p><strong>Examples:</strong> Kubernetes, AWS, Argo, Confluence, internal docs</p>
  </div>
</div>

---

## Concept Modules

<div class="concept-grid">
  <div class="concept-card fragment" data-fragment-index="1">
    <strong>Purpose-built troubleshooting agent</strong>
    <small>Hypothesis-driven investigation beats generic model-wrapper behavior during incidents.</small>
  </div>
  <div class="concept-card fragment" data-fragment-index="2">
    <strong>Embedded runbooks and incident patterns</strong>
    <small>Prepackaged playbooks reduce how much reasoning infrastructure teams must build themselves.</small>
  </div>
  <div class="concept-card fragment" data-fragment-index="3">
    <strong>Tooling control over tool explosion</strong>
    <small>Curated commands and guided query plans improve consistency under pressure.</small>
  </div>
  <div class="concept-card fragment" data-fragment-index="4">
    <strong>Cross-signal correlation</strong>
    <small>Real incidents require chaining metrics, logs, traces, events, and deploy history.</small>
  </div>
  <div class="concept-card fragment" data-fragment-index="5">
    <strong>Integrated incident operations</strong>
    <small>Diagnosis should connect directly to paging, collaboration, tickets, and remediation workflows.</small>
  </div>
  <div class="concept-card fragment" data-fragment-index="6">
    <strong>Product vs platform tradeoff</strong>
    <small>The architecture choice depends on domain fit, breadth, and the cost of custom playbooks.</small>
  </div>
</div>

---

## Investigation Loop

The loop enforces evidence-backed progress instead of repetitive tool chatter.

<div class="concept-grid">
  <div class="concept-card fragment" data-fragment-index="1">
    <span>1</span>
    <strong>Hypothesis</strong>
    <small>Start with candidate causes from user symptoms and alert metadata.</small>
  </div>
  <div class="concept-card fragment" data-fragment-index="2">
    <span>2</span>
    <strong>Targeted query</strong>
    <small>Pull only the most relevant metrics, logs, traces, and cluster events.</small>
  </div>
  <div class="concept-card fragment" data-fragment-index="3">
    <span>3</span>
    <strong>Evidence check</strong>
    <small>Validate or reject each hypothesis using observed signal alignment.</small>
  </div>
  <div class="concept-card fragment" data-fragment-index="4">
    <span>4</span>
    <strong>Refine and branch</strong>
    <small>Promote likely causes, drop weak leads, and test the next branch.</small>
  </div>
  <div class="concept-card fragment" data-fragment-index="5">
    <span>5</span>
    <strong>RCA and remediation</strong>
    <small>Publish root cause, confidence, and next actions for responders.</small>
  </div>
</div>

---

## Cross-Signal Reasoning Path

A good RCA chain moves from symptom to infrastructure evidence to the actual change that broke the system.

<div class="path-grid">
  <article class="path-node fragment" data-fragment-index="1">
    <span>1</span>
    <p>API latency spike</p>
  </article>
  <article class="path-node fragment" data-fragment-index="2">
    <span>2</span>
    <p>Pod CPU saturation</p>
  </article>
  <article class="path-node fragment" data-fragment-index="3">
    <span>3</span>
    <p>Node pressure events</p>
  </article>
  <article class="path-node fragment" data-fragment-index="4">
    <span>4</span>
    <p>Recent deployment diff</p>
  </article>
  <article class="path-node fragment" data-fragment-index="5">
    <span>5</span>
    <p>Bad config and memory leak</p>
  </article>
</div>

---

## Tool Load Scenarios

<div class="scenario-grid">
  <div class="scenario-card fragment is-load-low" data-fragment-index="1">
    <strong>Low tool load</strong>
    <small>Roughly 20 to 40 total tools. Generic MCP-style setups are usually manageable.</small>
  </div>
  <div class="scenario-card fragment is-load-medium" data-fragment-index="2">
    <strong>Rising coordination cost</strong>
    <small>Roughly 50 to 80 total tools. Curated tool plans and guardrails start to pay off.</small>
  </div>
  <div class="scenario-card fragment is-load-high" data-fragment-index="3">
    <strong>Tool explosion zone</strong>
    <small>100 or more total tools. Structured workflows like HolmesGPT become much more reliable.</small>
  </div>
</div>

---

## Practical Rule

Choose HolmesGPT when guided cloud-native RCA is the product you need now. Choose a broader agent platform when customization pressure is the main constraint. Use a hybrid model when both are true.
