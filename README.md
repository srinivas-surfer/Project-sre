# Srinivas Pitchubabu — engineering case studies

Portfolio, public resume, seven detailed engineering case studies, and original architecture diagrams. The case-study collection replaces the earlier synthetic browser demonstrations.

## What each project includes

- Overview: operating context and the implemented change.
- Case study: why it started, the problem, design decisions, execution, and outcomes.
- Architecture: source-informed component diagram, responsibilities, processing sequence, and boundaries.
- Outcomes: resume-reported effects separated from implemented capabilities and unmeasured benefits.
- `images/`: original architecture SVG and LinkedIn cards.
- `content/`: full narrative, post draft, carousel copy, and alt text.

The old `demo.html` routes redirect to the case studies. Demo scripts, sample stores, synthetic charts, and smoke-test runners are removed from the public collection.

## Evidence

Six architectures were reconstructed from reviewed local implementation. Peak Traffic Metrics Collector correctly describes the OpenSearch histogram/max-bucket collector, not CPU/memory gauges. Cloud Portfolio Platform is explicitly resume-based; its compute target and undocumented deployment internals are not invented.

The resume supports reduced MTTD through order-flow anomaly detection, reduced manual effort through broader observability/synthetic-monitoring work, independent no-downtime service deployments, and N-1 rollback readiness. No before/after percentages, incident counts, time savings, or financial figures were supplied; none are fabricated.

Problem statements describe the operational need addressed by each tool. They do not invent a specific outage, date, customer, or incident that supposedly triggered the project.

## Public content boundary

All narrative and diagrams are newly authored. No original client application code, names, hostnames, real ticket identifiers, configuration, credentials, operational exports, raw resume PDF, or private source history is copied into this repository. Component diagrams generalize environment identity while preserving documented technologies and responsibilities.

## Hosting

Uses the existing `srinivas-surfer/Project-sre` repository and GitHub Pages publishing from `main` at the repository root. Push the committed update through GitHub Desktop. No custom deployment workflow is required for the active branch-based hosting configuration.

Public address: https://srinivas-surfer.github.io/Project-sre/.

Standalone sibling repositories are maintained locally. They have not been published individually on GitHub. TechOps remains excluded.

## Preview

Open `index.html` or serve this directory with `python3 -m http.server 8000`. The publication is static and requires no browser-side application code or backend.
