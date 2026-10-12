# Srinivas Pitchubabu — SRE portfolio

Portfolio, public resume, and six independently authored browser demonstrations.

## Hosting

Uses the existing `srinivas-surfer/Project-sre` repository. GitHub Pages was configured to publish from the `main` branch root; the successful built-in Pages run confirmed that configuration. The redundant custom deployment workflow was removed to avoid competing deployments. Keep Settings → Pages → Deploy from a branch → main → /(root).

Expected public URL: https://srinivas-surfer.github.io/Project-sre/.

## Projects

- Order Anomaly Detection: synthetic hourly counts and transparent Z-score thresholds.
- Ticket Label Manager: fictional ticket rules, editing, and bulk repair.
- Service Performance Reporting: generated request records, channel filters, P90, and export.
- Browser Automation Showcase: fictional storefront, DOM smoke checks, and a local Playwright example.
- Observability Command Center: scripted incidents, service filters, and evidence inspection.
- Application Metrics Explorer: synthetic gauges, request-weighted error rates, and export.

Each project has Overview, Demo, Architecture, and Case Study pages under `projects/<slug>/`. The standalone sibling folders outside this repository are independently publishable local Git repositories. They are not yet separate repositories on GitHub; this portfolio embeds their public site files so every demo works under the existing hosting address.

TechOps is excluded from this portfolio at the owner's request; its existing separate local folder is retained. Infrastructure assessment material is not included.

## Preview

Open `index.html`, or run `python3 -m http.server 8000` in this directory. The static sites require no dependencies.

## Content and assets

Each project contains `images/linkedin/` with four original SVG cards and PNG exports, plus `content/` with case-study text, carousel copy, image alt text, and a LinkedIn draft. Drafts require the verified live URL before posting. Nothing is posted to LinkedIn automatically. All committed files are public and may be served by branch-based Pages hosting.

## Public content boundary

All demo code, input data, illustrations and exercises were newly authored. No original operational source, client identifiers, credentials, production exports, screenshots, raw resume PDF, or private Git histories were imported. Demo limitations are explicitly described on each project page. No client performance or impact figures are claimed.

## Validation

All six interaction flows were checked in a real headless browser, including thresholds, CSV downloads, selected-ticket repairs, report aggregation, cart checkout, scenario inspection, and metric weighting. All 24 project pages were checked at a mobile viewport. Local links and the deployment package are validated before publication.
