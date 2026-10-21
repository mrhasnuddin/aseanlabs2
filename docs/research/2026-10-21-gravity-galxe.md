# ASEAN Labs reference study

Research date: 21 October 2026. Status: research for discussion, not an approved redesign.

The strongest starting point is Galxe's content organization, with selected Gravity interactions, expressed through ASEAN Labs' solid colors and custom SVGs. Retain corn-yellow `#F4BF4B` as the primary brand color. The reference sites' dark surfaces and gradients are outside the brief.

## Scope and method

Inspected the public [Gravity homepage](https://gravity.xyz/) and [Galxe homepage](https://www.galxe.com/). Used REA for browser discovery, passive DOM/accessibility/script captures, digest-verified script exports, and declared navigation/keyboard-scroll scenarios. Supplemented this with Playwright screenshots, computed-style measurements, hover/tap probes, and reduced-motion samples. Audited the existing ASEAN Labs source separately.

Desktop samples used a 1440 x 1000 viewport; mobile samples used 390 x 844. Captured both homepages through their footers. Hovered navigation, tested Gravity's first feature on desktop and mobile, and inspected selected shipped animation modules. Mobile means viewport emulation, not a physical-device test.

REA's MCP transport closed during full CDN bundle analysis. The public REA 6.7.0 CLI successfully completed subsequent captures and exports. No setup or registration changes were needed. The report does not claim that the failed full static analysis completed.

Evidence and screenshots are retained in this chat's [research directory](</C:/Users/Dean/.codex/visualizations/2026/10/21/01a15dc6-f741-7933-8ebd-79f40865f5fc/reference-research/>). Website scripts were captured as evidence, not added to ASEAN Labs' application.

## What the sites are built with

| Layer | Gravity | Galxe | Implication for ASEAN Labs |
| --- | --- | --- | --- |
| Site publishing | Framer generator and server-rendered/hydrated page markers | Same | The reference appearance does not require moving ASEAN Labs to Framer. |
| UI runtime | React 18.2.0 indicators; separate React, Framer and motion modules | Same | Keep the current Next.js/React application unless a later requirement changes that decision. |
| Animation | Framer motion code, Lottie runtime, SVG/DOM animation, custom scramble and counter code | Same; separately named `Scramble` and `NumberCounter` modules | Existing GSAP plus CSS/SVG can reproduce the selected behaviors. A new animation library is not presently justified. |
| Assets | Framer CDN images, SVGs and font files | Same | Separate illustration design from animation implementation. |
| Type | Galxe Lader regular/medium; Roboto Mono supporting labels | Galxe Lader regular/medium; mono labels in illustrations | Similar type hierarchy is possible with the existing Space Grotesk and IBM Plex Mono. |
| Analytics indicators | Google tag script and Framer events | Google tag script, Framer events and Microsoft Clarity scripts | Tracking is independent of the visual direction; copying it is unnecessary. |

These are observations about the public marketing homepages. Their linked apps, dashboards, infrastructure, backend frameworks, CMS workflows and internal design files were not inspected.

Neither rendered homepage exposed a `canvas` or `video` element in the sampled DOM. Exported scripts contain Lottie code, and Galxe has a named Lottie container. This supports an SVG/DOM/Lottie explanation for much of the illustration work. It does not prove every asset uses Lottie or that WebGL is absent from every page or state.

Bounded searches of the captured scripts found no `gsap`, `lenis`, or `THREE.WebGLRenderer` indicators. Those searches do not establish global absence. The earlier same-origin-only REA static analysis covered inline scripts, not the Framer CDN application.

## Content architecture

Galxe's sequence is:

1. Brand hero, short positioning statement and business/app entry points.
2. Trusted-brand ticker and scale metrics.
3. Product mosaic: three cards, then two wider cards, each combining a visual, explanation and selective proof.
4. Gravity spotlight.
5. Audience split for enterprise clients and everyday users.
6. Reasons to choose the platform.
7. Press and investor proof, company link and grouped footer.

The useful pattern is that visitors see the offering before receiving audience-specific guidance and further reassurance. The product cards also carry more meaning than an icon and title: each illustration explains part of the product.

Gravity's sequence is:

1. Orbital brand hero, announcement strip, CTAs and a section jump list.
2. Network metrics and a large positioning paragraph.
3. Six full-width technical feature rows.
4. Ecosystem logos, use cases and a building CTA.
5. A numbered getting-started sequence.
6. News cards, rollout timeline and grouped footer.

Gravity is the better reference for technical explanation and staged onboarding. Galxe is the better reference for showing a portfolio of offerings. ASEAN Labs already has services, audiences and proof material that fit the latter structure.

## Visual and interaction findings

| Pattern | Observed behavior | Suitable translation |
| --- | --- | --- |
| Hero | Both allocate substantial space to a central brand symbol, line geometry and atmospheric backgrounds. Positioning copy sits relatively low. | One original ASEAN Labs SVG composition on a flat yellow field. Keep the message and principal action visible earlier, especially on mobile. |
| Navigation | Centered capsule navigation, logo left, actions right; desktop menus expose grouped links. Navigation remains visible during sampled scrolling. | Clear, compact solid-color navigation with explicit focus and touch states. Capsule shape is optional, not essential to the pattern. |
| Galxe mosaic | Bordered, edge-to-edge cells; three columns followed by two wider columns. Large illustrations sit above copy and small proof lines. Mobile stacks the offerings. | Group the current nine services into fewer outcome-oriented modules. Use original SVG diagrams and verified proof where available. |
| Gravity feature rows | Large titles and short technical labels. Desktop hover reveals description and an orange background treatment; mobile tap toggles Expand/Close. | Solid yellow/cream active states, black dividers, a visible trigger and tap/keyboard support. Essential information must remain reachable without hover. |
| Tickers | Repeated logo groups move with linear transform animations. | Use a restrained partner ticker or static strip, depending on the number of credible partners. |
| Counters | Numbers animate after entering the viewport. Galxe's captured counter code uses an IntersectionObserver and timer-driven increments. | Display the actual number immediately for reduced motion and no-JS fallbacks; animation may enhance it. |
| Scramble | Captured code replaces unrevealed characters with random symbols and resolves them over time, triggered by viewport intersection. | Optional short labels or a single brand moment. Keep body text, navigation and primary actions readable. |
| Explanatory art | Fine lines, nodes, rings, procedural-looking shapes and animated SVG illustrations. | Reuse ASEAN Labs' geometric vocabulary to explain execution, distribution and infrastructure. Match illustration content to each claim. |
| Onboarding | Gravity uses numbered steps with distinct supporting graphics. | A short engagement process, if that is useful to prospective clients. |

Measurements show 50px desktop hero headings on both sites and 38px mobile hero headings in the sampled layouts. Desktop Galxe product titles were 28px, versus 18px on mobile. These values explain the references' hierarchy; they are not proposed ASEAN Labs tokens.

The styles contain multiple responsive variants. Gravity includes an approximately 810px mobile boundary; Galxe also includes approximately 800px and 950px variant boundaries. A deliberate ASEAN Labs responsive system is preferable to copying all those generated breakpoints.

The sampled Galxe ticker animations disappeared with reduced motion enabled. Gravity's sampled transform entrance shortened to approximately 0.001ms, while opacity transitions remained. These are bounded observations, not a complete accessibility audit. Canvas inspection and `document.getAnimations()` also do not enumerate every JavaScript-driven SVG animation.

## What can transfer, and what needs redesign

| Candidate | Feasibility | Decision for discussion |
| --- | --- | --- |
| Galxe's section sequence | High | Use as the main content reference, adjusted to ASEAN Labs' business. |
| Product/service mosaic | High | Build with CSS Grid and existing React components. Decide grouping before designing cards. |
| Audience split | High | Map to builders, ecosystems and enterprises; avoid reproducing Galxe's consumer audience without a reason. |
| Gravity's feature reveal | High | Use a solid-color state change. Include keyboard and mobile equivalents. |
| Numbered process | High | Adapt to ASEAN Labs' real engagement steps. |
| Orbital/technical hero art | Medium | Requires an original composition and motion study, not a new rendering engine by default. |
| Animated explanatory SVGs | Medium | Asset creation is the main work. GSAP/CSS is sufficient for many versions; evaluate Lottie only for a specific authored asset. |
| Gradient glows and grain | Technically feasible, outside the brief | Replace their depth cues with line density, overlap, solid contrast and controlled hard shadows. |
| Exact logo animation and custom font identity | Poor brand fit | Create ASEAN Labs versions using its own symbols and current type families. |
| Reference metrics, investor panels and network claims | Content-dependent | Use only ASEAN Labs evidence. A matching section requires real material. |
| Pixel-identical effect from minified production code | Not established | Original source, authoring timelines and all responsive states are unavailable. Reproduce the useful behavior in the current stack. |

The main limitation is visual translation: an effect built around light glowing on black will not keep the same appearance on flat yellow. Its purpose can transfer, but its composition and contrast need to be redesigned.

## ASEAN Labs baseline and issues to resolve

Current source uses Next 14, React 18, TypeScript and Tailwind 3. GSAP, SplitType, Cobe and Pixi are installed. Cobe is used on `/why-us`; the bounded source search found no Pixi import. An installed dependency alone does not mean it powers the current homepage.

The homepage already contains a hero, partners, metrics, audiences, nine capabilities, ENI infrastructure, DAOaaS, an ecosystem explorer, a closing navigation panel and footer. Existing custom capability/audience SVGs, geometric symbols, buttons and navigation provide reusable material.

| Before | Proposed direction for discussion | Why |
| --- | --- | --- |
| `DESIGN.md` describes Namada and its URL | Replace with the agreed ASEAN Labs design system | It conflicts with both the source and this brief. |
| Primary hero actions lead to ENI destinations | Establish a clear ASEAN Labs business action | Prospective clients need a direct next step. |
| Nine services appear as a long sequence | Group services by client outcome, with detail available deeper in the site | Supports Galxe's faster scanning without deleting offerings. |
| Final CTA presents four navigation choices | Repeat the principal engagement action | Provides a clear close after the argument. |
| `primary`, `background` and canvas aliases overlap | Define separate brand, surface, text, border and action roles | Makes section variation predictable. |
| Motion handling varies across components | Define one motion policy, including reduced-motion and touch behavior | Prevents each section from making incompatible choices. |

Existing marketing metrics are hardcoded. Source also contains six-versus-seven-market inconsistencies, a Malay description in the English dictionary, and testimonials without named attribution metadata. These need checking before becoming prominent proof blocks. The audit establishes that the copy exists, not that the claims are verified.

Relevant source: `src/styles/globals.css`, `tailwind.config.js`, `src/pages/index.tsx`, `src/components/Hero.tsx`, `StatsSection.tsx`, `ServicesSection.tsx`, `EcosystemSection.tsx`, `FinalCta.tsx`, and `src/locales/en.json`.

## Design system work after the brainstorm

The future system must replace the Namada specification. This research does not overwrite the active theme or commit a visual direction before discussion.

Confirmed foundations from the brief and current source:

| Role | Existing value or constraint |
| --- | --- |
| Primary brand | Corn-yellow `#F4BF4B` |
| Structural ink | Black `#000000` |
| Existing supporting colors | Cyan `#00E5FF`, white `#FFFFFF`, cream `#F5F2E7` |
| Surface treatment | Solid fills; gradients and a dark theme excluded |
| Illustration | Original custom SVG language |
| Typography starting point | Space Grotesk with IBM Plex Mono |

The next specification should define semantic color roles, a responsive type scale, spacing/container rules, borders, corners, hard-shadow levels, illustration rules, motion durations/easings, and component states. Confirm whether the redesign retains strongly offset shadows everywhere or uses them selectively around actions and featured content.

A sensible motion starting point from the Emil design-engineering skill is short press/menu feedback, purposeful section motion, and transform/opacity animation where practical. Exact timings belong in the agreed token system. The reference sites' animation values should not become defaults merely because they were observed.

Three business decisions will materially affect the design: ASEAN Labs' principal visitor and action; how the nine services should be grouped; and the relative prominence of ENI, DAOaaS and regional expansion. These remain open for the brainstorm.

## Evidence ledger

All evidence files below are in the research directory linked above. REA IDs refer to the complete local records, including limitations.

| Evidence | Record | Scope |
| --- | --- | --- |
| Gravity passive capture | `gravity-rea-cdn.json`, `ev_e2c8bf20791d34ec2f673d280f58ddc3e01e317e1322af881ee8704fd723bc6f` | Page, Framer CDN scripts, accessibility and resources |
| Galxe passive capture | `galxe-rea-cdn.json`, `ev_aaa55befae24dc850d05f9372d6e4632552e9937307e6197b6f7ff3dbb83789b` | Same |
| Gravity verified export | `gravity-rea-export.json`, `ev_3e2e823006955ba84ecdada7dbfa2a8913f83f96e5e2a194fe1d342ffc6ea559` | Retained script bytes and manifest digests |
| Galxe verified export | `galxe-rea-export.json`, `ev_837b21a5b74caf44700b2476b147ccf57ec6a5a2d5cfff12b9e0a70940a3c0ee` | Same |
| Gravity declared scenario | `gravity-rea-scenario.json`, `ev_713119fca0551ba1b9897175cdca9f515bfa0b82c3ce032d9afd8f86bbc6c9d0` | Navigation, two PageDown actions and final capture |
| Galxe declared scenario | `galxe-rea-scenario.json`, `ev_efa520eaedbba73a28962efa43babf13fef61a05cecc3df0a10795ece6298c22` | Same |
| Supplementary measurements | `*-dom-style-observations.json`, `interaction-observations.json`, `*-bundle-indicators.json` | DOM/CSS, hover/tap, sampled animation behavior and bounded source searches |

Capture limitations: passive network evidence begins at attachment; selected origins exclude unrelated analytics destinations; no source maps were fetched; server code and internal authoring data remain unknown. Both declared scenarios completed every action, but REA marks their aggregate completeness as incomplete because of missing event coverage; they do not establish a complete network history or behavioral equivalence. No physical-device, Safari, performance-budget or full keyboard/screen-reader audit was performed. The scope is sufficient for this design comparison, not a production implementation specification.

## Visual references

- [Comparison sheet](</C:/Users/Dean/.codex/visualizations/2026/10/21/01a15dc6-f741-7933-8ebd-79f40865f5fc/reference-research/reference-contact-sheet.jpg>)
- [Galxe product mosaic](</C:/Users/Dean/.codex/visualizations/2026/10/21/01a15dc6-f741-7933-8ebd-79f40865f5fc/reference-research/galxe-section-02.png>)
- [Gravity desktop feature reveal](</C:/Users/Dean/.codex/visualizations/2026/10/21/01a15dc6-f741-7933-8ebd-79f40865f5fc/reference-research/gravity-feature-hover.png>)
- [Gravity mobile expanded feature](</C:/Users/Dean/.codex/visualizations/2026/10/21/01a15dc6-f741-7933-8ebd-79f40865f5fc/reference-research/gravity-mobile-feature-expanded.png>)
- [Galxe mobile hero](</C:/Users/Dean/.codex/visualizations/2026/10/21/01a15dc6-f741-7933-8ebd-79f40865f5fc/reference-research/galxe-mobile-hero.png>)

Applied the requested skills as follows: REA for evidence collection; UI Skills routing for selecting relevant motion/design context; landing-page for message/proof/CTA analysis, while treating these as multi-intent homepages; Emil design engineering for interaction and motion review; humanize for the written brief; Ponytail for reusing the existing stack and keeping this phase limited to research. No website redesign code or active design tokens changed.
