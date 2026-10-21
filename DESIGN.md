# ASEAN Labs design system

ASEAN Labs is an execution partner for Web3 builders, ecosystems, and enterprises in Southeast Asia. The website should explain the offering, show the network around it, and make starting an engagement straightforward.

## Visual direction

Use a continuous solid corn-yellow canvas throughout the site, with precise geometric illustrations and generous, editorial spacing. The hero borrows Gravity's composition: a central brand mark with orbital geometry, short copy at the lower left, and section navigation at the lower right. The rest of the homepage follows Galxe's progression through proof, offerings, audience paths, and reasons to engage.

The ASEAN Labs mark must remain unchanged. Animate its surrounding geometry, not the mark itself. Gradients, glows, glass panels, a dark theme, and artificial loading screens are outside this direction.

## Source of truth

- `src/styles/tokens.css`: the new design tokens.
- `src/styles/home.css`: the homepage and shared header/footer components.
- `src/components/home/`: hero, illustrations, page sections and interactions.
- `src/locales/*.json`: translated copy, with English fallback supplied by `useTranslation`.
- `src/data/ecosystem.ts`: shared project data used by both the new directory and legacy explorer.

The existing Tailwind color aliases remain for secondary pages. New components must use the `--al-*` semantic system. They must not depend on section scripts mutating document-wide foreground/background variables.

## Foundations

| Token         | Value     | Role                                                      |
| ------------- | --------- | --------------------------------------------------------- |
| `--al-yellow` | `#F4BF4B` | Primary brand color and continuous site canvas             |
| `--al-ink`    | `#171914` | Text, illustration strokes, primary actions               |
| `--al-black`  | `#000000` | Original brand black, retained for asset compatibility    |
| `--al-paper`  | `#F5F2E7` | Small illustration fills                                  |
| `--al-white`  | `#FFFFFF` | Asset compatibility and small illustration details        |
| `--al-cyan`   | `#00E5FF` | Small illustration accents                                |
| `--al-muted`  | `#554724` | Supporting copy: warm ink at 72% on yellow, 5.4:1 contrast |
| `--al-rule`   | `#9C792E` | Structural dividers on the yellow canvas                   |

`--al-surface` resolves to `--al-yellow`. All page and section backgrounds, header/footer, menus, capability cards, expanded details, and directory controls use this canvas. Distinguish sections through spacing, typography, and ink rules rather than alternate background bands. Cyan and paper are limited to small illustration details. Ink action fills and subtle ink hover tints remain available for clear interaction feedback.

Use Space Grotesk for headings, navigation and body text. Use IBM Plex Mono for small functional labels, numerical steps, and illustration annotations. Fonts are self-hosted under `public/fonts/`; preserve the included license notices.

Type uses seven roles from `tokens.css`, measured against Gravity and Galxe and fluid between 390px and 1440px viewports:

| Token | Size | Use |
| --- | --- | --- |
| `--al-text-display` | 38 → 50px | Page H1, hero, large figures |
| `--al-text-h2` | 28 → 38px | Section titles |
| `--al-text-h3` | 20 → 28px | Card, row and legal section titles |
| `--al-text-lead` | 18 → 20px | Lead copy under a heading; compact titles in dense rows |
| `--al-text-body` | 16px | Paragraphs, card copy, inputs |
| `--al-text-ui` | 14px | Navigation, buttons, links, metadata |
| `--al-text-label` | 12px | Mono uppercase labels; nothing is smaller |

Headings and figures use weight 400 and let size carry the hierarchy; buttons and links use 500. Tracking is −0.02em for display, −0.01em for headings, 0 for body and +0.08em for mono labels. Line-heights are 1.1 display, 1.2 headings, 1.5 lead, 1.6 body. Cap paragraphs at `--al-measure` (about 65 characters). Do not add one-off font sizes; pick the nearest role.

Spacing follows a 4px base: 4, 8, 12, 16, 24, 32, 48, 64 and 96px. Containers have a 1600px maximum width and fluid gutters from 24px to 80px (80px at 1440). Sections use `--al-section` block padding (80 → 112px). A heading sits 16px above its lead, a heading block sits 48px above its content (32px on mobile), and buttons are at least 44px tall.

Corners are square. Use 1px rules to organize content. Hard shadows are reserved for interactive elevation and dropdowns; static grids rely on outlines and spacing. Round shapes belong to logos, nodes and orbit diagrams, not generic card containers.

## Page structure

1. Orbital hero: positioning, one primary business action, and four section links.
2. Partner logo marquee.
3. About (`#about`): the ASEAN Labs role statement on the left, the four track-record figures as a 2×2 grid on the right; stacked below 800px.
4. Five capability groups covering all nine existing services.
5. ENI infrastructure feature.
6. Builder, ecosystem and enterprise audience paths.
7. DAOaaS participation and rewards feature.
8. Three-part summary of the existing engagement process.
9. Searchable, filterable ecosystem directory.
10. Grouped footer. There is no separate closing CTA band on any page: the footer carries the statement and contact email, and the legacy `#contact`, `#final-cta` and `#faq` anchors land on it.

Keep existing routes and deep links working. The principal contact action is `mailto:contact@aseanlabs.io`; use the same label, "Work with us", for that intent throughout the English experience. Links to ENI, DAOaaS, social channels and project websites retain their actual destinations.

## Components and behavior

### Header and footer

The desktop header is 80px high; the mobile header is 64px. Keep the brand at the left, grouped navigation in the middle, and language/contact controls at the right. Desktop groups are button-controlled disclosures. Escape closes the active panel and returns focus to its trigger; clicking outside closes it. The mobile panel must scroll within the available viewport.

The language selector is a disclosure of real links (`next/link` with `locale`), never a native `<select>`: a globe, the short locale code and a chevron in the header; the full language name opening upward in the footer; a two-column list in the mobile menu. The current language carries `aria-current` and an inset ink rule. Switching keeps the current route.

The footer has two bands: a 28px statement, a small mono "Built on" tag with the ENI mark, and the contact email as a button, beside four 16px link columns under 12px mono labels; then a mono legal row with the language selector and a 44px back-to-top control. Footer navigation must retain company, product, network and community destinations, plus privacy and terms pages. Legal copy must not change as part of a visual update.

### Calls to action

| Tier | Class | Look | Hover (fine pointers only) |
| --- | --- | --- | --- |
| Primary | `.al-button` | 1px ink outline, ink text, 48px (`.al-button-sm` 40px in the header) | Ink fills up from the bottom and text turns yellow |
| Secondary | `.al-text-link` | Medium text with a 1px underline | Underline retracts and redraws left to right |

There are only these two tiers; don't add a solid-fill or shadowed variant. Both nudge their arrow up and right on hover, and the primary scales to 0.97 on press. Pair a primary with a secondary rather than placing two primaries side by side. Long translated labels wrap inside the button instead of widening the layout.

### Partner logos

Partners run as a full-bleed marquee directly under the hero. Logos are one-colour SVG traces in `public/partners/mono/` (PNG sources traced with knocked-out details; vector sources recoloured), listed in `src/data/partners.ts`. Size them by equal visual area, not equal height: store each trace's width/height ratio and let the data file derive the height. The duplicate copy that closes the loop is `aria-hidden` and unfocusable; the strip pauses on hover and keyboard focus and becomes a static wrapped row under reduced motion.

### Hero

Use the original mark with layered, independently moving orbit lines and nodes. The logo is still. Orbit motion pauses outside the viewport and while the tab is hidden; there is no on-page pause control by owner decision. On load, the headline rises word by word and the copy, action and section index fade up after it. On mobile, stack the illustration, copy/action, then section links.

### Capabilities

The desktop mosaic uses three cells followed by two wider cells. Each group has an explanatory SVG, outcome-oriented copy, original service labels, and a details disclosure. Details must preserve the services' meaning. Tablet layouts use two columns; small screens use one. Every disclosure uses a native button, `aria-expanded`, and a corresponding controlled panel.

### Audiences

Audience rows reveal supporting copy and a relevant action. A selected row uses an inset ink rule on the yellow canvas. Selection must work with tap and keyboard; essential content cannot depend on hover. At most one audience row is expanded at a time.

### Ecosystem

Keep all 19 existing project records and their real destinations. Search matches names and tags; category selection combines with search. Display an explicit no-results state and a reset control. Show eight projects initially, with an action to reveal the rest. Filtering and counts must remain usable without animation. Do not present unattributed project testimonials as verified customer proof.

### Secondary pages

`/why-us`, `/process`, `/onboard`, `/how-xplan-works`, `/brand`, `/privacy-policy` and `/terms-of-service` use `src/components/PageLayout.tsx` and `src/styles/pages.css`. Each page opens like the homepage hero: a breadcrumb at top left, then a turning orbit motif with a page-specific brand symbol centred on the page at every width, with the optional mono label and a display-size H1 that rises word by word on load centred under it (a second phrase may sit below it in the supporting color). A single lead paragraph stays centred under the H1; two or more become left-aligned columns under a rule. Legal pages carry a motif too. No page closes with a separate contact block; the footer carries that role.

Show sequences in full: process and wallet steps use one ordered timeline that becomes vertical on small screens. Network values and colors are visible without interaction, and every copy button names what it copies. The wallet guide is the only selector; it uses native buttons with `aria-pressed`. The `/why-us` globe is decorative and hidden from assistive technology; the region buttons beside it carry the same information. Legal copy comes only from the dictionaries and must not change during visual work.

## Motion

| Token         | Value                            | Use                                  |
| ------------- | -------------------------------- | ------------------------------------ |
| `--al-fast`   | 160ms                            | Press and hover feedback             |
| `--al-normal` | 240ms                            | Disclosures and color transitions    |
| `--al-reveal` | 650ms                            | Optional once-only section entrances |
| `--al-ease`   | `cubic-bezier(0.23, 1, 0.32, 1)` | Responsive easing                    |
| `--al-word-stagger` | 40ms | Delay between heading words |
| `--al-count`  | 1600ms                           | Figure count-up                      |
| `--al-marquee`| 48s                              | One full partner-logo loop           |

The pieces live in `src/components/home/Motion.tsx` (`Reveal`, `SplitText`, `CountUp`) and the motion section of `home.css`:

- **Headings** rise word by word inside a masked line. Wrap the text in `SplitText` inside a `Reveal` for scroll entrances, or give the H1 `.al-split-load` for the on-load entrance (hero and page intros). `.al-load-fade` fades supporting copy up after it.
- **Figures** count up from zero with an ease-out when they first come on screen. Under JS they start hidden so the final value never flashes; screen readers get the final value once.
- **Illustrations** use slow spins (`.al-spin`, `.al-spin-rev`), packets travelling along paths (`.al-flow` with `pathLength="100"`), pulsing rings (`.al-pulse`) and small floats (`.al-float`). Mark the container `.al-motion`; `_app.tsx` pauses it off-screen and in hidden tabs. Keep each drawing to two or three moving things.
- A `js` class set before first paint lets load animations start hidden without flashing; content already on screen at hydration never re-hides.

Use CSS transforms and IntersectionObserver; do not add a motion dependency for behaviour the platform or the installed GSAP already provides. Reduced motion stops every continuous movement, shows final figures and copy immediately, turns the marquee into a static row and disables smooth scrolling. Pointer-only decoration must be gated behind `hover: hover` and `pointer: fine`. Content must be visible if JavaScript is unavailable.

### Illustrations

Card and section drawings are flat 2D thin-line technical diagrams in the Galxe manner: 1px ink strokes, 11px mono annotations, and brand symbols nested as SVG at exact coordinates. No tilted ellipses, perspective or isometric shapes; orbits are concentric circles. Colour follows 60-30-10: the yellow canvas about 60%, ink about 30% as the main contrast (filled blocks, discs, terminals, key nodes), and paper plus cyan together at most 10% as small accents. Symbols on ink fills turn yellow (`.al-art-inverse`). Each drawing explains its section (positioning map, construction grid, build pipeline, community network, regional hub map, ENI lane with AppChains and tool feeds, participate–verify–reward, and the hero's flat orbit). Round computed coordinates to two decimals so server and browser output match during hydration. Under reduced motion the travelling packets (`.al-flow`) are hidden.

### Texture

The canvas stays solid yellow wherever people read. Two ink tiles from `tokens.css` add depth at the edges only:

- `--al-texture-grid` (a plus mark every 48px at 20% ink) is a corner vignette, masked to fade out before it reaches the copy: top-left and bottom-right in the homepage hero, mirrored to top-right and bottom-left in subpage intros so the breadcrumb stays clean. It stops at the rule above a two-column lead.
- `--al-texture-hatch` (45° hairlines at 28% ink) is the only section divider: a 14px band between two rules, owned by the section below it. Every divider between top-level sections uses it, including the end of each subpage intro and the top of the footer; sections carry no top or bottom borders of their own. The logo marquee's top and bottom rules frame that band and are not dividers. The /process steps run straight into Standards without a seam, since the timeline already separates them.

Do not add texture behind body copy, cards or forms.

## Content and accessibility

Write in short, concrete sentences. Explain what ASEAN Labs does and what the visitor should do next. Preserve the direct voice while removing vague superlatives and unsupported compliance or performance claims. Existing track-record metrics remain existing marketing copy, not newly verified research.

New interactive components must have visible keyboard focus, descriptive labels, and touch equivalents. Use semantic sections and a single homepage H1. Decorative SVGs must be hidden from assistive technology; linked project names must identify destinations. Text/action contrast must meet WCAG AA. Do not rely on color alone for selection or hide overflow to conceal layout defects.

Layout, controls and copy must remain usable at 320px, 390px, 768px, 1024px and desktop widths. New copy must use translation keys; dictionaries fall back to English when a translation is not present. Long translations must wrap without clipping navigation, controls or cards.

## Validation

Before delivery, check the production build and TypeScript; inspect desktop/mobile screenshots; exercise navigation, disclosures, the language selector, marquee pause on hover and focus, count-ups, project search/filter/reset, and locale switching. Check reduced-motion and no-JavaScript behavior. Review console errors, missing assets, anchor destinations, focus, horizontal overflow, and the existing secondary routes affected by shared navigation.

Performance checks should use a production server. Treat a local Lighthouse run as a lab sample, not a field-performance guarantee.
