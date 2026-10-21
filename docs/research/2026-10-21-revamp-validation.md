# ASEAN Labs revamp validation

Implementation date: 21 October 2026. Local implementation; no production deployment.

## Implemented

- Gravity-inspired hero with the existing ASEAN Labs mark, independent orbital geometry, short lower-left copy, and lower-right section navigation.
- Solid corn-yellow `#F4BF4B`, paper and white content surfaces, and a cyan ENI feature.
- Galxe-inspired capability mosaic covering all nine existing services in five groups.
- ENI, audience, DAOaaS, process, ecosystem, and contact sections.
- Search/category filtering, no-results/reset behavior, and access to all 19 existing ecosystem projects.
- Shared header/footer, native language selection, keyboard-operated disclosures and reduced-motion behavior.
- All 65 new homepage copy keys translated into the seven existing non-English locales.
- New `DESIGN.md` and CSS token system; public brand palette aligned with the new direction.
- Self-hosted brand fonts, including Vietnamese glyph coverage and license notices.

No new project dependencies were added. Existing route slugs, legal copy and project destinations were retained. Existing marketing metrics remain source-provided claims, rather than newly verified figures.

## Checks

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed |
| `npm run build` | Passed; 90 static pages generated |
| Desktop/mobile browser interactions | Passed |
| Dropdown opening, outside dismissal, Escape and focus return | Passed |
| Capability and audience disclosures | Passed |
| Motion pause/resume and reduced motion | Passed |
| Search, combined category filtering, empty state, reset | Passed |
| Expand/collapse all 19 projects | Passed |
| Existing seven secondary routes | All return HTTP 200 |
| Core content without JavaScript | Visible |
| Locale layouts | Eight locales at 320, 390, 768, 1024 and 1440px |
| Locale selection and document language | Passed |
| Homepage console errors | None observed |
| Missing assets and local anchors | None observed |
| Horizontal overflow at tested widths | None observed |
| ENI diagram mark containment | Passed after a selector correction |
| Axe WCAG A/AA scan in tested state | No violations |

Browser testing used desktop Chrome and mobile viewport emulation. Screenshots were visually reviewed, including English, Vietnamese and Simplified Chinese mobile layouts. This does not establish physical-device or cross-browser coverage, or complete WCAG conformance.

## Lighthouse mobile lab sample

| Category | Score |
| --- | --- |
| Performance | 92 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |

Sample metrics: FCP 1.4s, simulated LCP 3.2s, total blocking time 90ms, CLS 0. The simulated LCP remains above the 2.5s target. This is a local lab sample, not field data or a guarantee for hosted performance.

Separating the pure brand SVG module from legacy animated icon exports and removing global GSAP initialization reduced the homepage's reported first-load JavaScript from 277 kB to 233 kB. Secondary routes retain their own animation imports and registration.

The build retains warnings in legacy components about image optimization and an existing ref cleanup. Next also recommends the optional `sharp` package for production image optimization; the current optimization fallback returned the tested images successfully. No dependency upgrade was included in this visual revamp.

## Review artifacts

- [Desktop hero](</C:/Users/Dean/.codex/visualizations/2026/10/21/01a15dc6-f741-7933-8ebd-79f40865f5fc/revamp-preview/desktop-hero.png>)
- [Full desktop page](</C:/Users/Dean/.codex/visualizations/2026/10/21/01a15dc6-f741-7933-8ebd-79f40865f5fc/revamp-preview/desktop-full.png>)
- [Mobile hero](</C:/Users/Dean/.codex/visualizations/2026/10/21/01a15dc6-f741-7933-8ebd-79f40865f5fc/revamp-preview/mobile-hero.png>)
- [Corrected ENI section](</C:/Users/Dean/.codex/visualizations/2026/10/21/01a15dc6-f741-7933-8ebd-79f40865f5fc/revamp-preview/network.png>)
- [Functional checks](</C:/Users/Dean/.codex/visualizations/2026/10/21/01a15dc6-f741-7933-8ebd-79f40865f5fc/revamp-preview/functional-checks.json>)
- [Locale checks](</C:/Users/Dean/.codex/visualizations/2026/10/21/01a15dc6-f741-7933-8ebd-79f40865f5fc/revamp-preview/locales.json>)
- [Lighthouse report](</C:/Users/Dean/.codex/visualizations/2026/10/21/01a15dc6-f741-7933-8ebd-79f40865f5fc/revamp-preview/lighthouse-mobile.json>)
