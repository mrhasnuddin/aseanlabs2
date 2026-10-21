# ASEAN Labs website revamp: agent handoff

Updated: 21 October 2026.

The revamp is implemented locally. Continue from the current working tree and the user's next request. Read this file and `DESIGN.md` before changing the interface.

## Current status

- Workspace: `D:\Web3 Work\Vibe Code\aseanlabs`.
- Preview: <http://127.0.0.1:3000/>. The development server was started at the user's request; check whether it is still running before starting another instance. `.claude/launch.json` defines it as `aseanlabs-dev` for the desktop app's preview launcher.
- English marketing and subpage copy was rewritten with the humanize skill and the changed keys re-translated (legal keys untouched; translations not yet reviewed by native speakers). Open copy questions for the owner: "7 languages" lists both Chinese and Mandarin (`why.adv3Desc`); wallet setup is "under 2 minutes" vs "under 3 minutes"; ENI addresses "3.2M" vs "3M+"; community "100K+" vs the why-page "10,000+"; "six regional markets" vs seven listed countries; ms and zh still translate the brand name in `meta.homeTitle` and some legacy keys; unattributed `ecosystem.t*.testimony` quotes exist in the dictionaries (only the unmounted legacy explorer renders them).
- The homepage, shared navigation/footer, design tokens, and homepage translations have been rebuilt.
- The latest change makes the site canvas continuously corn-yellow. It replaces the earlier cream, white, and cyan homepage section backgrounds.
- All seven secondary pages were rebuilt on the homepage system through `src/components/PageLayout.tsx` and `src/styles/pages.css`. Their GSAP page reveals, dot grids, and ink content cards were removed. See "Secondary pages" in `DESIGN.md`.
- Changes are uncommitted. No production deployment or pull request was created.
- `.gitignore` had user changes before this work. Preserve those and inspect the working tree before editing.

The user has asked for this handoff document. This document does not create an additional implementation task or authorize publishing.

## Approved direction

The references are [Gravity](https://gravity.xyz/) and [Galxe](https://www.galxe.com/). The user preferred Galxe's overall content organization and selected Gravity elements. Their later hero request included a screenshot of Gravity, although they used the word "galaxy" in the message. Follow the screenshot and the agreed Gravity hero composition.

The homepage combines:

- A central ASEAN Labs mark with animated orbital SVG lines and nodes.
- Short positioning copy and a business CTA at the lower left on desktop.
- Section navigation at the lower right on desktop.
- Galxe-inspired progression through proof, capabilities, infrastructure, audiences, process, ecosystem, and contact.

Retain ASEAN Labs' original mark, geometric SVG vocabulary, and solid corn-yellow identity. Use spacing, type hierarchy, line work, and restrained hard shadows to refine the existing neobrutalist character.

The latest explicit preference is: "i want the whole site canvas to use primary color". The canvas is `#F4BF4B` throughout, including header, footer, section backgrounds, capability cards, menus, expanded details, and directory controls. Small cyan or paper details within illustrations remain. Ink fills support buttons and interaction states; the only ink panel on secondary pages is the reversed logo lockup on `/brand`.

Gradients, atmospheric glows, glass panels, and a dark overall theme are outside the approved direction. Keep the ASEAN Labs logo still and animate the geometry around it. A full-screen loading sequence is unnecessary.

## Design system

`DESIGN.md` is the current design specification. The old unrelated Namada specification was replaced.

`src/styles/tokens.css` defines the `--al-*` system. `src/styles/home.css` implements the homepage and shared header/footer styles.

| Role | Current value |
| --- | --- |
| Primary and canvas | `--al-yellow: #F4BF4B` |
| Semantic surface | `--al-surface: var(--al-yellow)` |
| Text and structural ink | `--al-ink: #171914` |
| Original asset black | `--al-black: #000000` |
| Supporting text | `--al-muted: #554724` (warm ink at 72%, 5.4:1 on yellow) |
| Structural divider | `--al-rule: #9C792E` |
| Illustration accent | `--al-cyan: #00E5FF` |
| Small illustration fills | `--al-paper: #F5F2E7`, `--al-white: #FFFFFF` |
| Main font | Space Grotesk |
| Functional labels | IBM Plex Mono |
| Type scale | Seven `--al-text-*` roles: 50 / 38 / 28 / 20 / 16 / 14 / 12px at 1440 (38 / 28 / 20 / 18 / 16 / 14 / 12px at 390), weight 400 headings, measured against Gravity and Galxe |
| Spacing | 4px base; 4, 8, 12, 16, 24, 32, 48, 64, 96px; sections use `--al-section` (80 → 112px) |
| Container | Maximum 1600px; fluid 24px to 80px gutters |
| Borders and corners | 1px rules; square corners |
| Selective hard shadow | 4px 4px ink |
| Motion | 160ms feedback, 240ms transitions, 650ms optional reveals |
| Easing | `cubic-bezier(0.23, 1, 0.32, 1)` |

Fonts are self-hosted in `public/fonts/`, including Vietnamese coverage and license notices. Preserve those files and licenses.

Legacy Tailwind aliases remain for the old components in `src/components/`, which no route imports any more. New work should use the `--al-*` tokens. Keep literal palette tokens meaningful: changing the canvas should use the semantic surface token rather than redefining white or cyan as yellow.

The audience accordion uses an inset ink rule for the open row. Muted text was darkened after the yellow canvas change because its previous color fell below the small-text AA contrast threshold.

## Homepage structure and content

The main implementation is `src/components/home/HomePage.tsx`.

1. Orbital hero: "We Build On-Chain Reality.", short supporting copy, "Work with us", and a section index.
2. Six existing partner logos and existing track-record metrics: 100+, 100K+, 150+, and 5,000+.
3. Short explanation of ASEAN Labs' role.
4. Five capability groups covering all nine original services: Strategy & launch, Brand & creative, Build & deploy, Community & growth, and Regional expansion.
5. ENI infrastructure feature with an original explanatory SVG composition.
6. Audience disclosures for builders, ecosystems, and enterprises.
7. DAOaaS participation and rewards feature.
8. Three-step engagement summary with a link to the full process page.
9. Searchable ecosystem directory containing all 19 original project records.
10. Closing contact CTA and grouped footer.

The principal business action is `mailto:contact@aseanlabs.io`, labelled "Work with us" in English. Preserve the real ENI, DAOaaS, social, and project destinations.

Metrics are existing marketing claims, not independently verified research. Do not invent clients, testimonials, press mentions, market counts, or performance claims. Legal copy was retained.

## Implementation map

| File or directory | Responsibility |
| --- | --- |
| `src/pages/index.tsx` | Homepage composition, metadata, skip link |
| `src/components/home/HomePage.tsx` | Sections, disclosures, directory interaction |
| `src/components/home/OrbitArtwork.tsx` | Original logo with independent orbital geometry |
| `src/components/home/CapabilityArtwork.tsx` | Original SVG diagrams using brand symbols |
| `src/components/icons/BrandSymbols.tsx` | Pure logo and geometric SVG components |
| `src/components/Nav.tsx` | Shared desktop groups and mobile navigation |
| `src/components/Footer.tsx` | Shared grouped footer and legal links |
| `src/components/LanguageSwitcher.tsx` | Native language select preserving the route |
| `src/data/ecosystem.ts` | Shared original 19-project dataset |
| `src/components/EcosystemSection.tsx` | Legacy explorer, now importing shared data |
| `src/styles/tokens.css` | New semantic design tokens |
| `src/styles/home.css` | Homepage and shared shell styling |
| `src/styles/globals.css` | Existing Tailwind foundations and legacy aliases |
| `src/pages/_app.tsx` | Styles and client-side document language updates |
| `src/pages/_document.tsx` | Initial document language and font preload |
| `src/pages/brand.tsx` | Public brand palette aligned with the revamp |
| `src/pages/why-us.tsx` | Existing page with latest yellow canvas adjustments |
| `src/locales/*.json` | Existing dictionaries plus new homepage copy |

New SVG components import `BrandSymbols.tsx` directly. This avoids pulling legacy animated icon modules and their side effects into the homepage. Logo clip-path IDs use React `useId` to avoid collisions.

Global GSAP initialization and the timed preloader were removed from the shared app. Secondary routes no longer use GSAP; `/why-us` keeps its Cobe globe and `/brand` its draggable symbol field. No new project dependencies were added.

Preserve existing routes: `/`, `/why-us`, `/process`, `/onboard`, `/brand`, `/how-xplan-works`, `/privacy-policy`, and `/terms-of-service`. Existing homepage anchor aliases were retained for old links; check them before removing or renaming section IDs.

## Interaction, motion, and localization

Desktop navigation uses button-controlled disclosures. Escape closes the active panel and returns focus to its trigger; outside clicks dismiss it. Mobile navigation scrolls within the viewport and is hidden at desktop widths.

Capability details and audience rows use native buttons with `aria-expanded` and controlled panels. Keep touch and keyboard access. The ecosystem search combines with its category filter, shows a no-results state with reset, and initially shows eight projects with an option to reveal all 19.

Hero orbits rotate independently at slow linear speeds. The on-page pause control was removed at the owner's request; all illustration motion pauses offscreen and when the tab is hidden, and the logo marquee pauses on hover and focus. Reduced motion stops continuous animation and reveals content immediately. Core content remains available without JavaScript.

The eight locales are `en`, `ms`, `id`, `zh-TW`, `zh-CN`, `vi`, `ja`, and `ko`. All 65 new `home.*` keys were translated into the seven non-English dictionaries while retaining existing entries. Add copy through translation keys and preserve route-aware language switching and `<html lang>` updates.

## Stack and local commands

The project uses Next.js 14 with the Pages Router, React 18, TypeScript, and Tailwind CSS 3. Existing dependencies include GSAP, SplitType, Cobe, and Pixi. Cobe is used on the existing `/why-us` page. Homepage orbit motion uses CSS and SVG rather than a new rendering engine.

Run commands from the repository root:

```powershell
npm run dev -- --hostname 127.0.0.1 --port 3000
npm run typecheck
npm run build
```

Check for an existing preview before starting another server. Keep the user's preview available when they are reviewing changes.

## Reference research and tools

The research report is `docs/research/2026-10-21-gravity-galxe.md`. It records REA browser captures, exported script evidence, screenshots, and interaction probes.

The sampled public homepages showed Framer, React 18.2 indicators, SVG/DOM motion, Framer motion, and Lottie code. These findings concern their marketing pages. Their linked apps, backend architecture, CMS workflows, and original authoring files were not inspected. The reference appearance does not require migrating this repository to Framer.

REA's MCP transport closed during broad CDN analysis. Subsequent captures and script exports succeeded through REA 6.7.0 CLI. Do not describe the failed full analysis as completed or treat captured third-party scripts as application source to copy.

The user requested global setup and use of UI Skills, humanize, landing-page, emil-design-eng, REA, and Ponytail. Setup was handled earlier; inspect availability before reinstalling. Relevant local skill paths on this machine include:

- `C:/Users/Dean/.codex/skills/ui-skills-root/SKILL.md`
- `C:/Users/Dean/.codex/skills/humanize/SKILL.md`
- `C:/Users/Dean/.agents/skills/landing-page/SKILL.md`
- `C:/Users/Dean/.agents/skills/emil-design-eng/SKILL.md`
- `C:/Users/Dean/.agents/skills/reverse-engineer-anything/SKILL.md`
- `C:/Users/Dean/.claude/plugins/cache/ponytail/ponytail/5.2.0/skills/ponytail/SKILL.md`

Ponytail was present as a Claude plugin; that does not imply another agent runtime exposes it as a native tool. Use the capabilities available in the receiving environment.

## Validation and limits

The initial implementation passed `npm run typecheck` and `npm run build`, which generated 90 static pages. Browser checks covered navigation, disclosures, motion controls, project search/filter/reset/show-all, anchors, assets, no-JavaScript content, and the seven secondary routes. Eight locales were checked at 320, 390, 768, 1024, and 1440px. An axe WCAG A/AA scan reported no violations in the tested homepage state.

The initial production Lighthouse mobile sample scored 92 performance, 100 accessibility, 100 best practices, and 100 SEO. FCP was 1.4s, simulated LCP 3.2s, TBT 90ms, and CLS 0. LCP remained above the 2.5s target. These are local lab results from before the latest canvas adjustment, not fresh scores or field data.

After the continuous-yellow change:

- TypeScript passed again.
- Desktop and mobile screenshots were reviewed.
- No homepage console errors, missing images, missing local anchors, or desktop/mobile horizontal overflow were observed in the preview check.
- Targeted axe text-contrast scans passed at 1440px and 390px after darkening supporting text.
- The `/why-us` yellow canvas and foreground were visually checked.
- The production build, complete locale matrix, and Lighthouse were not rerun for this final color adjustment.

Testing used desktop Chrome and viewport emulation. Physical-device testing, Safari coverage, and complete WCAG conformance have not been established. Legacy lint warnings and the optional Next.js `sharp` recommendation remain.

`docs/research/2026-10-21-revamp-validation.md` records the earlier implementation checks. Its opening palette description predates the continuous-yellow request. Use this handoff, `DESIGN.md`, and the current CSS for the latest palette decision; retain the older report as historical evidence.

Screenshots and raw reports are stored outside the repository on this machine:

```text
C:/Users/Dean/.codex/visualizations/2026/10/21/01a15dc6-f741-7933-8ebd-79f40865f5fc/
  reference-research/
  revamp-preview/
```

The preview folder includes `desktop-full.png`, `desktop-hero.png`, `mobile-hero.png`, section screenshots, locale screenshots, `why-us-yellow.png`, and earlier JSON validation reports. These files may not exist on another machine, and their capture dates/states vary.

## Continuing the work

Start by inspecting the current source and preview. The research report contains proposals and open questions from before approval; the user's later decisions and the implemented design supersede those earlier suggestions.

For subsequent changes, preserve the approved yellow canvas, logo, working links, translated copy, and accessible controls. Validate the changed behavior and review relevant desktop/mobile states. If a change affects shared components or the design system, also check secondary routes and longer translations.

Further performance tuning, physical-device testing, and deployment remain possible follow-up work. Choose the next task from the user's instructions rather than assuming this handoff requests those changes.
