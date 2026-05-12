import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Download, Check, Copy } from 'lucide-react';
import { gsap } from 'gsap';
import { useTranslation } from '@/hooks/useTranslation';

const PERSONALITY_TRAITS = (t: any) => [
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
];

const PRESETS = [
  {
    name: 'Neo-Brutalist',
    colors: [
      { name: 'Canvas (Yellow)', hex: '#F4BF4B', bg: 'bg-[#F4BF4B]', textColor: 'text-black', hoverOverlay: 'bg-black/20' },
      { name: 'Struct (Black)', hex: '#000000', bg: 'bg-[#000000]', textColor: 'text-[#F4BF4B]', hoverOverlay: 'bg-white/10' },
      { name: 'Accent (Cyan)', hex: '#00E5FF', bg: 'bg-[#00E5FF]', textColor: 'text-black', hoverOverlay: 'bg-black/20' },
      { name: 'Relief (White)', hex: '#FFFFFF', bg: 'bg-[#FFFFFF]', textColor: 'text-black', hoverOverlay: 'bg-black/10' },
    ]
  },
  {
    name: 'Acid Cyber-Minimal',
    colors: [
      { name: 'Canvas (Light Grey)', hex: '#EAEAEA', bg: 'bg-[#EAEAEA]', textColor: 'text-[#0F172A]', hoverOverlay: 'bg-[#0F172A]/10' },
      { name: 'Struct (Slate)', hex: '#0F172A', bg: 'bg-[#0F172A]', textColor: 'text-[#D9F844]', hoverOverlay: 'bg-white/10' },
      { name: 'Accent (Acid Green)', hex: '#D9F844', bg: 'bg-[#D9F844]', textColor: 'text-[#0F172A]', hoverOverlay: 'bg-[#0F172A]/10' },
      { name: 'Relief (Off White)', hex: '#F8FAFC', bg: 'bg-[#F8FAFC]', textColor: 'text-[#0F172A]', hoverOverlay: 'bg-[#0F172A]/10' },
    ]
  }
];

function ColorSwatch({ color }: { color: typeof PRESETS[0]['colors'][0] }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      const el = document.createElement('textarea');
      el.value = color.hex;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={handleCopy}
        title={`Copy ${color.hex}`}
        className={`
          group relative w-full h-40 md:h-52 border-2 border-struct mb-4
          ${color.bg}
          transition-all duration-200
          hover:-translate-y-1
          active:translate-y-0
          cursor-pointer focus:outline-none focus:ring-2 focus:ring-struct focus:ring-offset-2
        `}
        aria-label={`Copy ${color.name} color code ${color.hex}`}
      >
        <span className={`
          absolute inset-0 flex flex-col items-center justify-center gap-2
          opacity-0 group-hover:opacity-100 transition-opacity duration-200
          ${color.hoverOverlay}
        `}>
          {copied
            ? <Check size={28} className={color.textColor} strokeWidth={3} />
            : <Copy size={28} className={color.textColor} strokeWidth={2} />
          }
          <span className={`font-mono text-xs font-bold uppercase tracking-widest ${color.textColor}`}>
            {copied ? (t('brand.copied') !== 'brand.copied' ? t('brand.copied') : 'Copied!') : (t('brand.clickToCopy') !== 'brand.clickToCopy' ? t('brand.clickToCopy') : 'Click to copy')}
          </span>
        </span>

        {copied && (
          <span className="absolute inset-0 border-4 border-struct animate-pulse pointer-events-none" />
        )}
      </button>
      <h4 className="font-sans text-lg md:text-xl font-bold uppercase tracking-tight text-struct">{color.name}</h4>
      <span className="font-mono text-sm md:text-base opacity-70 mt-0.5 text-struct">{color.hex}</span>
    </div>
  );
}

export default function BrandIdentityPage() {
  const { t } = useTranslation();

  useEffect(() => {
    gsap.fromTo('#page-wrapper',
      { clipPath: 'circle(0% at 50% 0%)' },
      {
        clipPath: 'circle(150% at 50% 0%)',
        duration: 1.2,
        ease: 'power3.inOut'
      }
    );

    const fadeElements = gsap.utils.toArray('.animate-fade-in');
    fadeElements.forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          }
        }
      );
    });
  }, []);

  return (
    <div className="bg-canvas text-struct overflow-hidden min-h-screen flex flex-col">
      <Head>
        <title>{t('brand.pageTitle') !== 'brand.pageTitle' ? t('brand.pageTitle') : 'Visual Identity — ASEAN Labs'}</title>
        <meta name="description" content={t('brand.pageDesc') !== 'brand.pageDesc' ? t('brand.pageDesc') : 'The brand and visual identity guidelines for ASEAN Labs.'} />
      </Head>

      <Nav />

      <div id="page-wrapper" className="flex-grow">
        <div 
          className="fixed inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(var(--color-struct) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: '12px 12px',
          }}
        />

        <main className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-10 py-20 lg:py-32">
          <div className="w-full">
            <Link 
              href="/" 
              className="group mb-12 inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest border border-struct px-6 py-3 transition-colors duration-0 hover:bg-struct hover:text-canvas"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              {t('brand.backToHome') !== 'brand.backToHome' ? t('brand.backToHome') : 'Back to Home'}
            </Link>

            <header className="mb-24 flex flex-col items-start gap-4 animate-fade-in">
              <h1 className="font-sans text-6xl md:text-8xl font-black uppercase leading-[0.95] tracking-tighter">
                {t('brand.heroTitlePart1') !== 'brand.heroTitlePart1' ? t('brand.heroTitlePart1') : 'Visual '} 
                <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--color-struct)' }}>{t('brand.heroTitlePart2') !== 'brand.heroTitlePart2' ? t('brand.heroTitlePart2') : 'Identity'}</span>
              </h1>
            </header>

            <section className="mb-32 animate-fade-in">
              <div className="flex items-center gap-6 mb-8 border-b-2 border-struct pb-4">
                <span className="font-mono text-4xl font-bold text-struct/50">01</span>
                <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">{t('brand.overviewTitle') !== 'brand.overviewTitle' ? t('brand.overviewTitle') : 'Overview'}</h2>
              </div>
              <p className="font-sans text-xl lg:text-2xl font-medium leading-relaxed w-full border-l-4 border-struct pl-6 text-struct">
                {t('brand.overviewDesc') !== 'brand.overviewDesc' ? t('brand.overviewDesc') : 'ASEAN Labs seeks to redefine the narrative around Web3 execution in Southeast Asia. We distance ourselves from vague promises and focus on transparent, high-quality, and data-driven delivery. Our visual identity reflects this: Neo-Brutalist, high-contrast, and unapologetically bold.'}
              </p>
            </section>

            <section className="mb-32 animate-fade-in">
              <div className="flex items-center gap-6 mb-12 border-b-2 border-struct pb-4">
                <span className="font-mono text-4xl font-bold text-struct/50">02</span>
                <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">{t('brand.personalityTitle') !== 'brand.personalityTitle' ? t('brand.personalityTitle') : 'Personality'}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PERSONALITY_TRAITS(t).map((trait, i) => (
                  <div key={i} className="border-2 border-struct bg-struct text-canvas p-8 hover:-translate-y-2 transition-transform duration-300">
                    <h3 className="font-sans text-2xl font-bold uppercase tracking-tight mb-2 text-canvas">{trait.title}</h3>
                    <span className="block font-mono text-xs font-bold text-struct bg-accent inline-block px-2 py-1 mb-6 uppercase tracking-widest">{trait.subtitle}</span>
                    <p className="font-sans text-lg font-medium leading-relaxed text-canvas">{trait.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-32 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b-2 border-struct pb-4">
                <div className="flex items-center gap-6">
                  <span className="font-mono text-4xl font-bold text-struct/50">03</span>
                  <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">{t('brand.logosTitle') !== 'brand.logosTitle' ? t('brand.logosTitle') : 'Logos'}</h2>
                </div>
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest border border-struct bg-struct text-canvas px-6 py-3 transition-colors duration-0 hover:bg-transparent hover:text-struct"
                >
                  <Download size={16} /> {t('brand.downloadLogoPack') !== 'brand.downloadLogoPack' ? t('brand.downloadLogoPack') : 'Download Logo Pack'}
                </a>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="border-2 border-struct bg-struct p-8 flex flex-col items-center justify-center min-h-[300px] relative text-canvas">
                  <span className="absolute top-4 left-4 font-mono text-xs font-bold uppercase tracking-widest opacity-70">{t('brand.symbolLabel') !== 'brand.symbolLabel' ? t('brand.symbolLabel') : 'Symbol'}</span>
                  <img src="/symbols/aseanlabs svg 2.svg" alt="ASEAN Labs Symbol" className="w-32 h-32 object-contain text-canvas" />
                </div>
                <div className="border-2 border-struct bg-struct p-8 flex flex-col items-center justify-center min-h-[300px] relative text-canvas">
                  <span className="absolute top-4 left-4 font-mono text-xs font-bold uppercase tracking-widest opacity-70">{t('brand.wordmarkLabel') !== 'brand.wordmarkLabel' ? t('brand.wordmarkLabel') : 'Wordmark'}</span>
                  <h3 className="font-sans text-5xl font-black uppercase tracking-widest text-canvas">ASEAN LABS</h3>
                </div>
                <div className="border-2 border-struct bg-struct p-8 flex flex-col items-center justify-center min-h-[300px] relative lg:col-span-2 text-canvas">
                  <span className="absolute top-4 left-4 font-mono text-xs font-bold uppercase tracking-widest opacity-70">{t('brand.combinedLabel') !== 'brand.combinedLabel' ? t('brand.combinedLabel') : 'Combined Lockup'}</span>
                  <div className="flex items-center gap-6">
                    <img src="/symbols/aseanlabs svg 2.svg" alt="ASEAN Labs Symbol" className="w-20 h-20 object-contain text-canvas" />
                    <h3 className="font-sans text-4xl md:text-6xl font-black uppercase tracking-widest text-canvas">ASEAN LABS</h3>
                  </div>
                </div>
              </div>
              <p className="mt-8 font-sans text-lg leading-relaxed w-full opacity-80 text-struct">
                {t('brand.logosDesc') !== 'brand.logosDesc' ? t('brand.logosDesc') : 'The ASEAN Labs symbol embodies our execution layer capabilities—a floral matrix representing growth, resilience, and interconnected infrastructure. Feel free to use the animated logo where applicable. Avoid distorting the core symbol.'}
              </p>
            </section>

            <section className="mb-32 animate-fade-in">
              <div className="flex items-center gap-6 mb-12 border-b-2 border-struct pb-4">
                <span className="font-mono text-4xl font-bold text-struct/50">04</span>
                <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">{t('brand.colorsTitle') !== 'brand.colorsTitle' ? t('brand.colorsTitle') : 'Colours'}</h2>
              </div>
              <p className="font-sans text-xl leading-relaxed w-full mb-12 text-struct">
                {t('brand.colorsDesc') !== 'brand.colorsDesc' ? t('brand.colorsDesc') : "Our palette is dynamic and supports multiple visual presets. Our variables—Canvas, Struct, Accent, and Relief—map contextually to provide accessibility and high-performance branding depending on the user's preference. Use the switcher in the footer to test them live."}
              </p>
              
              <div className="flex flex-col gap-16">
                {PRESETS.map((preset) => (
                  <div key={preset.name}>
                    <h3 className="font-mono text-2xl font-bold uppercase tracking-tight mb-8 text-struct border-l-4 border-accent pl-4">
                      {preset.name} {t('brand.presetSuffix') !== 'brand.presetSuffix' ? t('brand.presetSuffix') : 'Preset'}
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {preset.colors.map((color) => (
                        <ColorSwatch key={color.hex} color={color} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-32 animate-fade-in">
              <div className="flex items-center gap-6 mb-12 border-b-2 border-struct pb-4">
                <span className="font-mono text-4xl font-bold text-struct/50">05</span>
                <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">{t('brand.typographyTitle') !== 'brand.typographyTitle' ? t('brand.typographyTitle') : 'Typography'}</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="border-2 border-struct bg-struct text-canvas p-8 md:p-10 flex flex-col">
                  <div className="flex-grow">
                    <span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-3 block text-canvas">{t('brand.primaryTypeface') !== 'brand.primaryTypeface' ? t('brand.primaryTypeface') : 'Primary Typeface'}</span>
                    <h3 className="font-sans text-5xl md:text-6xl font-black tracking-tighter uppercase mb-4 text-canvas">{t('brand.primaryTypefaceName') !== 'brand.primaryTypefaceName' ? t('brand.primaryTypefaceName') : 'Space Grotesk'}</h3>
                    <p className="font-sans text-base md:text-lg font-medium leading-relaxed border-l-4 border-canvas pl-5 mb-8 text-canvas/80">
                      {t('brand.primaryTypefaceDesc') !== 'brand.primaryTypefaceDesc' ? t('brand.primaryTypefaceDesc') : 'The primary typeface for ASEAN Labs. Used for all titles, headers, and body copy. Neo-brutalist, slightly eccentric, highly readable.'}
                    </p>
                    <div className="flex flex-col gap-5 font-sans mb-8">
                      <div>
                        <span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-1 block text-canvas">{t('brand.titleDisplay') !== 'brand.titleDisplay' ? t('brand.titleDisplay') : 'Title / Display'}</span>
                        <div className="text-3xl md:text-4xl font-black uppercase text-canvas">{t('hero.headline') !== 'hero.headline' ? t('hero.headline') : 'We Build On-Chain Reality.'}</div>
                      </div>
                      <div>
                        <span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-1 block text-canvas">{t('brand.bodyCopy') !== 'brand.bodyCopy' ? t('brand.bodyCopy') : 'Body Copy'}</span>
                        <div className="text-base md:text-lg font-medium text-canvas">{t('brand.bodyCopyExample') !== 'brand.bodyCopyExample' ? t('brand.bodyCopyExample') : 'ASEAN Labs is the execution layer for ENI builders. We qualify first. Then we build.'}</div>
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://fonts.google.com/download?family=Space+Grotesk"
                    download
                    className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest border border-canvas text-canvas px-6 py-3 transition-colors duration-0 hover:bg-canvas hover:text-struct self-start mt-auto"
                  >
                    <Download size={16} /> {t('brand.downloadFont') !== 'brand.downloadFont' ? t('brand.downloadFont') : 'Download Font'}
                  </a>
                </div>

                <div className="border-2 border-struct bg-struct text-canvas p-8 md:p-10 flex flex-col">
                  <div className="flex-grow">
                    <span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-3 block text-canvas">{t('brand.secondaryTypeface') !== 'brand.secondaryTypeface' ? t('brand.secondaryTypeface') : 'Secondary Typeface'}</span>
                    <h3 className="font-mono text-5xl md:text-6xl font-bold uppercase tracking-tight mb-4 text-canvas">{t('brand.secondaryTypefaceName') !== 'brand.secondaryTypefaceName' ? t('brand.secondaryTypefaceName') : 'IBM Plex Mono'}</h3>
                    <p className="font-sans text-base md:text-lg font-medium leading-relaxed border-l-4 border-accent pl-5 mb-8 text-canvas/80">
                      {t('brand.secondaryTypefaceDesc') !== 'brand.secondaryTypefaceDesc' ? t('brand.secondaryTypefaceDesc') : 'The secondary typeface. Used for technical data, badges, metadata, and UI accents. Reinforces our identity as a technical execution partner.'}
                    </p>
                    <div className="flex flex-col gap-5 font-mono mb-8">
                      <div>
                        <span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-1 block text-canvas">{t('brand.badgeAccents') !== 'brand.badgeAccents' ? t('brand.badgeAccents') : 'Badge / Accents'}</span>
                        <div className="text-sm font-bold uppercase tracking-widest text-accent">{t('brand.badgeAccentsExample') !== 'brand.badgeAccentsExample' ? t('brand.badgeAccentsExample') : 'NETWORK: ENI MAINNET'}</div>
                      </div>
                      <div>
                        <span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-1 block text-canvas">{t('brand.dataMetrics') !== 'brand.dataMetrics' ? t('brand.dataMetrics') : 'Data / Metrics'}</span>
                        <div className="text-xl text-canvas">{t('brand.dataMetricsExample') !== 'brand.dataMetricsExample' ? t('brand.dataMetricsExample') : 'CHAIN_ID: 173'}</div>
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://fonts.google.com/download?family=IBM+Plex+Mono"
                    download
                    className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest border border-canvas text-canvas px-6 py-3 transition-colors duration-0 hover:bg-canvas hover:text-struct self-start mt-auto"
                  >
                    <Download size={16} /> {t('brand.downloadFont') !== 'brand.downloadFont' ? t('brand.downloadFont') : 'Download Font'}
                  </a>
                </div>
              </div>
            </section>

            <section className="mb-32 animate-fade-in">
              <div className="flex items-center gap-6 mb-12 border-b-2 border-struct pb-4">
                <span className="font-mono text-4xl font-bold text-struct/50">06</span>
                <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">{t('brand.graphicAssetsTitle') !== 'brand.graphicAssetsTitle' ? t('brand.graphicAssetsTitle') : 'Graphic Assets'}</h2>
              </div>
              <p className="font-sans text-xl leading-relaxed w-full mb-12 text-struct">
                {t('brand.graphicAssetsDesc') !== 'brand.graphicAssetsDesc' ? t('brand.graphicAssetsDesc') : 'Our signature graphic assets include heavy solid borders, sharp offset shadows, and dynamic SVG abstract symbols that react to user interaction. We favor abstract geometric representation over literal illustrations.'}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className="border-2 border-struct bg-canvas aspect-square flex items-center justify-center hover:bg-struct group transition-colors">
                    <img 
                      src={`/symbols/svg${num}.svg`} 
                      alt={`Symbol ${num}`} 
                      className="w-16 h-16 md:w-20 md:h-20 object-contain text-struct group-hover:text-canvas transition-all duration-300" 
                    />
                  </div>
                ))}
              </div>
            </section>

          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
