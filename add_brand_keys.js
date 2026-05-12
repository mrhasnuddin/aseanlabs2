const fs = require('fs');
const path = 'src/locales/en.json';
const en = JSON.parse(fs.readFileSync(path, 'utf8'));

Object.assign(en, {
  "brand.pageTitle": "Visual Identity — ASEAN Labs",
  "brand.pageDesc": "The brand and visual identity guidelines for ASEAN Labs.",
  "brand.backToHome": "Back to Home",
  "brand.heroTitlePart1": "Visual ",
  "brand.heroTitlePart2": "Identity",
  "brand.overviewTitle": "Overview",
  "brand.overviewDesc": "ASEAN Labs seeks to redefine the narrative around Web3 execution in Southeast Asia. We distance ourselves from vague promises and focus on transparent, high-quality, and data-driven delivery. Our visual identity reflects this: Neo-Brutalist, high-contrast, and unapologetically bold.",
  "brand.personalityTitle": "Personality",
  "brand.personality1Title": "Direct & Unapologetic",
  "brand.personality1Sub": "Clarity without coercion",
  "brand.personality1Desc": "We cut through the noise. No fluff, no jargon, just the reality of what it takes to execute on-chain.",
  "brand.personality2Title": "Execution-Oriented",
  "brand.personality2Sub": "Insights without monotony",
  "brand.personality2Desc": "Everything we do is tied to measurable, on-chain outcomes. We value action and results over vanity metrics.",
  "brand.personality3Title": "High-Contrast",
  "brand.personality3Sub": "Standing out in a sea of noise",
  "brand.personality3Desc": "Our aesthetic matches our ethos. Bold, unmistakable, and unwilling to blend into the background.",
  "brand.logosTitle": "Logos",
  "brand.downloadLogoPack": "Download Logo Pack",
  "brand.symbolLabel": "Symbol",
  "brand.wordmarkLabel": "Wordmark",
  "brand.combinedLabel": "Combined Lockup",
  "brand.logosDesc": "The ASEAN Labs symbol embodies our execution layer capabilities—a floral matrix representing growth, resilience, and interconnected infrastructure. Feel free to use the animated logo where applicable. Avoid distorting the core symbol.",
  "brand.colorsTitle": "Colours",
  "brand.colorsDesc": "Our palette is dynamic and supports multiple visual presets. Our variables—Canvas, Struct, Accent, and Relief—map contextually to provide accessibility and high-performance branding depending on the user's preference. Use the switcher in the footer to test them live.",
  "brand.presetSuffix": "Preset",
  "brand.clickToCopy": "Click to copy",
  "brand.copied": "Copied!",
  "brand.typographyTitle": "Typography",
  "brand.primaryTypeface": "Primary Typeface",
  "brand.primaryTypefaceName": "Space Grotesk",
  "brand.primaryTypefaceDesc": "The primary typeface for ASEAN Labs. Used for all titles, headers, and body copy. Neo-brutalist, slightly eccentric, highly readable.",
  "brand.titleDisplay": "Title / Display",
  "brand.bodyCopy": "Body Copy",
  "brand.bodyCopyExample": "ASEAN Labs is the execution layer for ENI builders. We qualify first. Then we build.",
  "brand.downloadFont": "Download Font",
  "brand.secondaryTypeface": "Secondary Typeface",
  "brand.secondaryTypefaceName": "IBM Plex Mono",
  "brand.secondaryTypefaceDesc": "The secondary typeface. Used for technical data, badges, metadata, and UI accents. Reinforces our identity as a technical execution partner.",
  "brand.badgeAccents": "Badge / Accents",
  "brand.badgeAccentsExample": "NETWORK: ENI MAINNET",
  "brand.dataMetrics": "Data / Metrics",
  "brand.dataMetricsExample": "CHAIN_ID: 173",
  "brand.graphicAssetsTitle": "Graphic Assets",
  "brand.graphicAssetsDesc": "Our signature graphic assets include heavy solid borders, sharp offset shadows, and dynamic SVG abstract symbols that react to user interaction. We favor abstract geometric representation over literal illustrations."
});

fs.writeFileSync(path, JSON.stringify(en, null, 2));
console.log("en.json updated");
