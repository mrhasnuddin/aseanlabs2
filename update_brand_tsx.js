const fs = require('fs');

let content = fs.readFileSync('src/pages/brand.tsx', 'utf8');

content = content.replace(/const PERSONALITY_TRAITS = \[[\s\S]*?\];/, `const PERSONALITY_TRAITS = (t: any) => [
  {
    title: t('brand.personality1Title') !== 'brand.personality1Title' ? t('brand.personality1Title') : 'Direct & Unapologetic',
    subtitle: t('brand.personality1Sub') !== 'brand.personality1Sub' ? t('brand.personality1Sub') : 'Clarity without coercion',
    description: t('brand.personality1Desc') !== 'brand.personality1Desc' ? t('brand.personality1Desc') : 'We cut through the noise. No fluff, no jargon, just the reality of what it takes to execute on-chain.'
  },
  {
    title: t('brand.personality2Title') !== 'brand.personality2Title' ? t('brand.personality2Title') : 'Execution-Oriented',
    subtitle: t('brand.personality2Sub') !== 'brand.personality2Sub' ? t('brand.personality2Sub') : 'Insights without monotony',
    description: t('brand.personality2Desc') !== 'brand.personality2Desc' ? t('brand.personality2Desc') : 'Everything we do is tied to measurable, on-chain outcomes. We value action and results over vanity metrics.'
  },
  {
    title: t('brand.personality3Title') !== 'brand.personality3Title' ? t('brand.personality3Title') : 'High-Contrast',
    subtitle: t('brand.personality3Sub') !== 'brand.personality3Sub' ? t('brand.personality3Sub') : 'Standing out in a sea of noise',
    description: t('brand.personality3Desc') !== 'brand.personality3Desc' ? t('brand.personality3Desc') : 'Our aesthetic matches our ethos. Bold, unmistakable, and unwilling to blend into the background.'
  }
];`);

content = content.replace(
  `function ColorSwatch({ color }: { color: typeof PRESETS[0]['colors'][0] }) {`,
  `function ColorSwatch({ color }: { color: typeof PRESETS[0]['colors'][0] }) {\n  const { t } = useTranslation();`
);

content = content.replace(
  `{copied ? 'Copied!' : 'Click to copy'}`,
  `{copied ? (t('brand.copied') !== 'brand.copied' ? t('brand.copied') : 'Copied!') : (t('brand.clickToCopy') !== 'brand.clickToCopy' ? t('brand.clickToCopy') : 'Click to copy')}`
);

content = content.replace(
  `<h1 className="font-sans text-6xl md:text-8xl font-black uppercase leading-[0.95] tracking-tighter">
                Visual <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--color-struct)' }}>Identity</span>
              </h1>`,
  `<h1 className="font-sans text-6xl md:text-8xl font-black uppercase leading-[0.95] tracking-tighter">
                {t('brand.heroTitlePart1') !== 'brand.heroTitlePart1' ? t('brand.heroTitlePart1') : 'Visual '} 
                <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--color-struct)' }}>{t('brand.heroTitlePart2') !== 'brand.heroTitlePart2' ? t('brand.heroTitlePart2') : 'Identity'}</span>
              </h1>`
);

content = content.replace(
  `<h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">Overview</h2>`,
  `<h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">{t('brand.overviewTitle') !== 'brand.overviewTitle' ? t('brand.overviewTitle') : 'Overview'}</h2>`
);

content = content.replace(
  `ASEAN Labs seeks to redefine the narrative around Web3 execution in Southeast Asia. We distance ourselves from vague promises and focus on transparent, high-quality, and data-driven delivery. Our visual identity reflects this: Neo-Brutalist, high-contrast, and unapologetically bold.`,
  `{t('brand.overviewDesc') !== 'brand.overviewDesc' ? t('brand.overviewDesc') : 'ASEAN Labs seeks to redefine the narrative around Web3 execution in Southeast Asia. We distance ourselves from vague promises and focus on transparent, high-quality, and data-driven delivery. Our visual identity reflects this: Neo-Brutalist, high-contrast, and unapologetically bold.'}`
);

content = content.replace(
  `<h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">Personality</h2>`,
  `<h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">{t('brand.personalityTitle') !== 'brand.personalityTitle' ? t('brand.personalityTitle') : 'Personality'}</h2>`
);

content = content.replace(
  `{PERSONALITY_TRAITS.map((trait, i) => (`,
  `{PERSONALITY_TRAITS(t).map((trait, i) => (`
);

content = content.replace(
  `<h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">Logos</h2>`,
  `<h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">{t('brand.logosTitle') !== 'brand.logosTitle' ? t('brand.logosTitle') : 'Logos'}</h2>`
);

content = content.replace(
  `<Download size={16} /> Download Logo Pack`,
  `<Download size={16} /> {t('brand.downloadLogoPack') !== 'brand.downloadLogoPack' ? t('brand.downloadLogoPack') : 'Download Logo Pack'}`
);

content = content.replace(
  `<span className="absolute top-4 left-4 font-mono text-xs font-bold uppercase tracking-widest opacity-70">Symbol</span>`,
  `<span className="absolute top-4 left-4 font-mono text-xs font-bold uppercase tracking-widest opacity-70">{t('brand.symbolLabel') !== 'brand.symbolLabel' ? t('brand.symbolLabel') : 'Symbol'}</span>`
);

content = content.replace(
  `<span className="absolute top-4 left-4 font-mono text-xs font-bold uppercase tracking-widest opacity-70">Wordmark</span>`,
  `<span className="absolute top-4 left-4 font-mono text-xs font-bold uppercase tracking-widest opacity-70">{t('brand.wordmarkLabel') !== 'brand.wordmarkLabel' ? t('brand.wordmarkLabel') : 'Wordmark'}</span>`
);

content = content.replace(
  `<span className="absolute top-4 left-4 font-mono text-xs font-bold uppercase tracking-widest opacity-70">Combined Lockup</span>`,
  `<span className="absolute top-4 left-4 font-mono text-xs font-bold uppercase tracking-widest opacity-70">{t('brand.combinedLabel') !== 'brand.combinedLabel' ? t('brand.combinedLabel') : 'Combined Lockup'}</span>`
);

content = content.replace(
  `The ASEAN Labs symbol embodies our execution layer capabilities—a floral matrix representing growth, resilience, and interconnected infrastructure. Feel free to use the animated logo where applicable. Avoid distorting the core symbol.`,
  `{t('brand.logosDesc') !== 'brand.logosDesc' ? t('brand.logosDesc') : 'The ASEAN Labs symbol embodies our execution layer capabilities—a floral matrix representing growth, resilience, and interconnected infrastructure. Feel free to use the animated logo where applicable. Avoid distorting the core symbol.'}`
);

content = content.replace(
  `<h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">Colours</h2>`,
  `<h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">{t('brand.colorsTitle') !== 'brand.colorsTitle' ? t('brand.colorsTitle') : 'Colours'}</h2>`
);

content = content.replace(
  `Our palette is dynamic and supports multiple visual presets. Our variables—Canvas, Struct, Accent, and Relief—map contextually to provide accessibility and high-performance branding depending on the user's preference. Use the switcher in the footer to test them live.`,
  `{t('brand.colorsDesc') !== 'brand.colorsDesc' ? t('brand.colorsDesc') : 'Our palette is dynamic and supports multiple visual presets. Our variables—Canvas, Struct, Accent, and Relief—map contextually to provide accessibility and high-performance branding depending on the user's preference. Use the switcher in the footer to test them live.'}`
);

content = content.replace(
  `{preset.name} Preset`,
  `{preset.name} {t('brand.presetSuffix') !== 'brand.presetSuffix' ? t('brand.presetSuffix') : 'Preset'}`
);

content = content.replace(
  `<h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">Typography</h2>`,
  `<h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">{t('brand.typographyTitle') !== 'brand.typographyTitle' ? t('brand.typographyTitle') : 'Typography'}</h2>`
);

content = content.replace(
  `<span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-3 block text-canvas">Primary Typeface</span>`,
  `<span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-3 block text-canvas">{t('brand.primaryTypeface') !== 'brand.primaryTypeface' ? t('brand.primaryTypeface') : 'Primary Typeface'}</span>`
);

content = content.replace(
  `<h3 className="font-sans text-5xl md:text-6xl font-black tracking-tighter uppercase mb-4 text-canvas">Space Grotesk</h3>`,
  `<h3 className="font-sans text-5xl md:text-6xl font-black tracking-tighter uppercase mb-4 text-canvas">{t('brand.primaryTypefaceName') !== 'brand.primaryTypefaceName' ? t('brand.primaryTypefaceName') : 'Space Grotesk'}</h3>`
);

content = content.replace(
  `The primary typeface for ASEAN Labs. Used for all titles, headers, and body copy. Neo-brutalist, slightly eccentric, highly readable.`,
  `{t('brand.primaryTypefaceDesc') !== 'brand.primaryTypefaceDesc' ? t('brand.primaryTypefaceDesc') : 'The primary typeface for ASEAN Labs. Used for all titles, headers, and body copy. Neo-brutalist, slightly eccentric, highly readable.'}`
);

content = content.replace(
  `<span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-1 block text-canvas">Title / Display</span>`,
  `<span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-1 block text-canvas">{t('brand.titleDisplay') !== 'brand.titleDisplay' ? t('brand.titleDisplay') : 'Title / Display'}</span>`
);

content = content.replace(
  `<span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-1 block text-canvas">Body Copy</span>`,
  `<span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-1 block text-canvas">{t('brand.bodyCopy') !== 'brand.bodyCopy' ? t('brand.bodyCopy') : 'Body Copy'}</span>`
);

content = content.replace(
  `<div className="text-3xl md:text-4xl font-black uppercase text-canvas">We Build On-Chain Reality.</div>`,
  `<div className="text-3xl md:text-4xl font-black uppercase text-canvas">{t('hero.headline') !== 'hero.headline' ? t('hero.headline') : 'We Build On-Chain Reality.'}</div>`
);

content = content.replace(
  `<div className="text-base md:text-lg font-medium text-canvas">ASEAN Labs is the execution layer for ENI builders. We qualify first. Then we build.</div>`,
  `<div className="text-base md:text-lg font-medium text-canvas">{t('brand.bodyCopyExample') !== 'brand.bodyCopyExample' ? t('brand.bodyCopyExample') : 'ASEAN Labs is the execution layer for ENI builders. We qualify first. Then we build.'}</div>`
);

content = content.replace(
  `<span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-3 block text-canvas">Secondary Typeface</span>`,
  `<span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-3 block text-canvas">{t('brand.secondaryTypeface') !== 'brand.secondaryTypeface' ? t('brand.secondaryTypeface') : 'Secondary Typeface'}</span>`
);

content = content.replace(
  `<h3 className="font-mono text-5xl md:text-6xl font-bold uppercase tracking-tight mb-4 text-canvas">IBM Plex Mono</h3>`,
  `<h3 className="font-mono text-5xl md:text-6xl font-bold uppercase tracking-tight mb-4 text-canvas">{t('brand.secondaryTypefaceName') !== 'brand.secondaryTypefaceName' ? t('brand.secondaryTypefaceName') : 'IBM Plex Mono'}</h3>`
);

content = content.replace(
  `The secondary typeface. Used for technical data, badges, metadata, and UI accents. Reinforces our identity as a technical execution partner.`,
  `{t('brand.secondaryTypefaceDesc') !== 'brand.secondaryTypefaceDesc' ? t('brand.secondaryTypefaceDesc') : 'The secondary typeface. Used for technical data, badges, metadata, and UI accents. Reinforces our identity as a technical execution partner.'}`
);

content = content.replace(
  `<span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-1 block text-canvas">Badge / Accents</span>`,
  `<span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-1 block text-canvas">{t('brand.badgeAccents') !== 'brand.badgeAccents' ? t('brand.badgeAccents') : 'Badge / Accents'}</span>`
);

content = content.replace(
  `<div className="text-sm font-bold uppercase tracking-widest text-accent">NETWORK: ENI MAINNET</div>`,
  `<div className="text-sm font-bold uppercase tracking-widest text-accent">{t('brand.badgeAccentsExample') !== 'brand.badgeAccentsExample' ? t('brand.badgeAccentsExample') : 'NETWORK: ENI MAINNET'}</div>`
);

content = content.replace(
  `<span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-1 block text-canvas">Data / Metrics</span>`,
  `<span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-1 block text-canvas">{t('brand.dataMetrics') !== 'brand.dataMetrics' ? t('brand.dataMetrics') : 'Data / Metrics'}</span>`
);

content = content.replace(
  `<div className="text-xl text-canvas">CHAIN_ID: 173</div>`,
  `<div className="text-xl text-canvas">{t('brand.dataMetricsExample') !== 'brand.dataMetricsExample' ? t('brand.dataMetricsExample') : 'CHAIN_ID: 173'}</div>`
);

content = content.replace(
  /<Download size=\{16\} \/> Download Font/g,
  `<Download size={16} /> {t('brand.downloadFont') !== 'brand.downloadFont' ? t('brand.downloadFont') : 'Download Font'}`
);

content = content.replace(
  `<h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">Graphic Assets</h2>`,
  `<h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">{t('brand.graphicAssetsTitle') !== 'brand.graphicAssetsTitle' ? t('brand.graphicAssetsTitle') : 'Graphic Assets'}</h2>`
);

content = content.replace(
  `Our signature graphic assets include heavy solid borders, sharp offset shadows, and dynamic SVG abstract symbols that react to user interaction. We favor abstract geometric representation over literal illustrations.`,
  `{t('brand.graphicAssetsDesc') !== 'brand.graphicAssetsDesc' ? t('brand.graphicAssetsDesc') : 'Our signature graphic assets include heavy solid borders, sharp offset shadows, and dynamic SVG abstract symbols that react to user interaction. We favor abstract geometric representation over literal illustrations.'}`
);


fs.writeFileSync('src/pages/brand.tsx', content);
console.log('brand.tsx updated!');
