import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Download } from 'lucide-react';
import { gsap } from 'gsap';
import { useTranslation } from '@/hooks/useTranslation';

const PERSONALITY_TRAITS = [
  {
    title: 'Direct & Unapologetic',
    subtitle: 'Clarity without coercion',
    description: 'We cut through the noise. No fluff, no jargon, just the reality of what it takes to execute on-chain.'
  },
  {
    title: 'Execution-Oriented',
    subtitle: 'Insights without monotony',
    description: 'Everything we do is tied to measurable, on-chain outcomes. We value action and results over vanity metrics.'
  },
  {
    title: 'High-Contrast',
    subtitle: 'Standing out in a sea of noise',
    description: 'Our aesthetic matches our ethos. Bold, unmistakable, and unwilling to blend into the background.'
  }
];

export default function BrandIdentityPage() {
  const { t } = useTranslation();

  useEffect(() => {
    // Mount reveal transition
    gsap.fromTo('#page-wrapper',
      { clipPath: 'circle(0% at 50% 0%)' },
      {
        clipPath: 'circle(150% at 50% 0%)',
        duration: 1.2,
        ease: 'power3.inOut'
      }
    );

    // Generic scroll entrance animations for sections
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
    <div className="bg-[#F4BF4B] text-black overflow-hidden min-h-screen flex flex-col">
      <Head>
        <title>{t('brand.pageTitle') !== 'brand.pageTitle' ? t('brand.pageTitle') : 'Visual Identity — ASEAN Labs'}</title>
        <meta name="description" content={t('brand.pageDesc') !== 'brand.pageDesc' ? t('brand.pageDesc') : 'The brand and visual identity guidelines for ASEAN Labs.'} />
      </Head>

      <Nav />

      <div id="page-wrapper" className="flex-grow">
        {/* Background Dot Grid */}
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: '12px 12px',
          }}
        />

        <main className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-10 py-20 lg:py-32 flex flex-col items-center">
          <div className="w-full">
            {/* Back Button */}
            <Link 
              href="/" 
              className="group mb-12 inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest border border-black px-6 py-3 transition-colors duration-0 hover:bg-black hover:text-[#F4BF4B]"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              {t('brand.backToHome') !== 'brand.backToHome' ? t('brand.backToHome') : 'Back to Home'}
            </Link>

            {/* Header */}
            <header className="mb-24 flex flex-col items-start gap-6 animate-fade-in">
              <span className="font-mono text-lg md:text-xl font-bold uppercase tracking-[0.2em] border-2 border-black px-4 py-2 bg-white shadow-[4px_4px_0_0_#000]">
                {t('brand.badge') !== 'brand.badge' ? t('brand.badge') : 'Brand Guidelines'}
              </span>
              <h1 className="font-sans text-6xl md:text-8xl font-black uppercase leading-[0.95] tracking-tighter">
                Visual <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Identity</span>
              </h1>
            </header>

            {/* 01 Overview */}
            <section className="mb-32 animate-fade-in">
              <div className="flex items-center gap-6 mb-8 border-b-2 border-black pb-4">
                <span className="font-mono text-4xl font-bold text-black opacity-50">01</span>
                <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">Overview</h2>
              </div>
              <p className="font-sans text-xl lg:text-2xl font-medium leading-relaxed max-w-4xl border-l-4 border-black pl-6">
                ASEAN Labs seeks to redefine the narrative around Web3 execution in Southeast Asia. We distance ourselves from vague promises and focus on transparent, high-quality, and data-driven delivery. Our visual identity reflects this: Neo-Brutalist, high-contrast, and unapologetically bold.
              </p>
            </section>

            {/* 02 Personality */}
            <section className="mb-32 animate-fade-in">
              <div className="flex items-center gap-6 mb-12 border-b-2 border-black pb-4">
                <span className="font-mono text-4xl font-bold text-black opacity-50">02</span>
                <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">Personality</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PERSONALITY_TRAITS.map((trait, i) => (
                  <div key={i} className="border-2 border-black bg-white p-8 shadow-[8px_8px_0_0_#000] hover:-translate-y-2 transition-transform duration-300">
                    <h3 className="font-sans text-2xl font-bold uppercase tracking-tight mb-2">{trait.title}</h3>
                    <span className="block font-mono text-xs font-bold text-[#00E5FF] bg-black inline-block px-2 py-1 mb-6 uppercase tracking-widest">{trait.subtitle}</span>
                    <p className="font-sans text-lg font-medium leading-relaxed">{trait.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 03 Logos */}
            <section className="mb-32 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b-2 border-black pb-4">
                <div className="flex items-center gap-6">
                  <span className="font-mono text-4xl font-bold text-black opacity-50">03</span>
                  <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">Logos</h2>
                </div>
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest border border-black bg-black text-[#F4BF4B] px-6 py-3 transition-colors duration-0 hover:bg-transparent hover:text-black"
                >
                  <Download size={16} /> Download Logo Pack
                </a>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Symbol */}
                <div className="border-2 border-black bg-white p-8 shadow-[8px_8px_0_0_#000] flex flex-col items-center justify-center min-h-[300px] relative">
                  <span className="absolute top-4 left-4 font-mono text-xs font-bold uppercase tracking-widest opacity-50">Symbol</span>
                  <img src="/symbols/aseanlabs svg 2.svg" alt="ASEAN Labs Symbol" className="w-32 h-32 object-contain" />
                </div>
                {/* Wordmark (Placeholder if you have an SVG wordmark, otherwise styled text) */}
                <div className="border-2 border-black bg-white p-8 shadow-[8px_8px_0_0_#000] flex flex-col items-center justify-center min-h-[300px] relative">
                  <span className="absolute top-4 left-4 font-mono text-xs font-bold uppercase tracking-widest opacity-50">Wordmark</span>
                  <h3 className="font-sans text-5xl font-black uppercase tracking-widest">ASEAN LABS</h3>
                </div>
                {/* Combined */}
                <div className="border-2 border-black bg-white p-8 shadow-[8px_8px_0_0_#000] flex flex-col items-center justify-center min-h-[300px] relative lg:col-span-2">
                  <span className="absolute top-4 left-4 font-mono text-xs font-bold uppercase tracking-widest opacity-50">Combined Lockup</span>
                  <div className="flex items-center gap-6">
                    <img src="/symbols/aseanlabs svg 2.svg" alt="ASEAN Labs Symbol" className="w-20 h-20 object-contain" />
                    <h3 className="font-sans text-4xl md:text-6xl font-black uppercase tracking-widest">ASEAN LABS</h3>
                  </div>
                </div>
              </div>
              <p className="mt-8 font-mono text-sm max-w-3xl leading-relaxed opacity-80">
                The ASEAN Labs symbol embodies our execution layer capabilities—a floral matrix representing growth, resilience, and interconnected infrastructure. Feel free to use the animated logo where applicable. Avoid distorting the core symbol.
              </p>
            </section>

            {/* 04 Colours */}
            <section className="mb-32 animate-fade-in">
              <div className="flex items-center gap-6 mb-12 border-b-2 border-black pb-4">
                <span className="font-mono text-4xl font-bold text-black opacity-50">04</span>
                <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">Colours</h2>
              </div>
              <p className="font-mono text-sm max-w-3xl leading-relaxed mb-12">
                Our palette is the backbone of the brand. It is designed for maximum contrast and legibility, reflecting the high-performance nature of the ENI ecosystem.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Yellow */}
                <div className="flex flex-col">
                  <div className="w-full h-48 border-2 border-black shadow-[4px_4px_0_0_#000] bg-[#F4BF4B] mb-4"></div>
                  <h4 className="font-sans text-xl font-bold uppercase">Neo Yellow</h4>
                  <span className="font-mono text-sm opacity-60">#F4BF4B</span>
                </div>
                {/* Black */}
                <div className="flex flex-col">
                  <div className="w-full h-48 border-2 border-black shadow-[4px_4px_0_0_#000] bg-[#000000] mb-4"></div>
                  <h4 className="font-sans text-xl font-bold uppercase">Execution Black</h4>
                  <span className="font-mono text-sm opacity-60">#000000</span>
                </div>
                {/* Cyan */}
                <div className="flex flex-col">
                  <div className="w-full h-48 border-2 border-black shadow-[4px_4px_0_0_#000] bg-[#00E5FF] mb-4"></div>
                  <h4 className="font-sans text-xl font-bold uppercase">Accent Cyan</h4>
                  <span className="font-mono text-sm opacity-60">#00E5FF</span>
                </div>
                {/* White / Cream */}
                <div className="flex flex-col">
                  <div className="w-full h-48 border-2 border-black shadow-[4px_4px_0_0_#000] bg-[#FFFFFF] mb-4"></div>
                  <h4 className="font-sans text-xl font-bold uppercase">Canvas White</h4>
                  <span className="font-mono text-sm opacity-60">#FFFFFF</span>
                </div>
              </div>

              {/* Good vs Bad Combinations */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border-2 border-black p-8 bg-black text-[#F4BF4B]">
                  <span className="inline-block bg-[#00E5FF] text-black font-mono text-xs font-bold uppercase tracking-widest px-2 py-1 mb-4">Good</span>
                  <h4 className="font-sans text-3xl font-black uppercase">High Contrast</h4>
                  <p className="font-mono text-sm mt-2">Yellow on Black ensures perfect legibility.</p>
                </div>
                <div className="border-2 border-black p-8 bg-[#00E5FF] text-white">
                  <span className="inline-block bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-widest px-2 py-1 mb-4">Bad</span>
                  <h4 className="font-sans text-3xl font-black uppercase">Low Legibility</h4>
                  <p className="font-mono text-sm mt-2">White on Cyan strains the eyes. Avoid low contrast.</p>
                </div>
              </div>
            </section>

            {/* 05 Typography */}
            <section className="mb-32 animate-fade-in">
              <div className="flex items-center gap-6 mb-12 border-b-2 border-black pb-4">
                <span className="font-mono text-4xl font-bold text-black opacity-50">05</span>
                <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">Typography</h2>
              </div>
              <div className="border-2 border-black bg-white shadow-[8px_8px_0_0_#000] p-8 md:p-12 mb-12">
                <h3 className="font-sans text-6xl md:text-8xl font-black tracking-tighter uppercase mb-4">Space Grotesk</h3>
                <p className="font-sans text-xl md:text-2xl font-medium leading-relaxed max-w-3xl border-l-4 border-[#F4BF4B] pl-6 mb-8">
                  The primary typeface for ASEAN Labs. Used for all titles, headers, and body copy. It brings a neo-brutalist, slightly eccentric yet highly readable aesthetic.
                </p>
                <div className="flex flex-col gap-6 font-sans">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-1 block">Title / Display</span>
                    <div className="text-4xl md:text-5xl font-black uppercase">We Build On-Chain Reality.</div>
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-1 block">Body Copy</span>
                    <div className="text-lg md:text-xl font-medium">ASEAN Labs is the execution layer for ENI builders. We qualify first. Then we build.</div>
                  </div>
                </div>
              </div>

              <div className="border-2 border-black bg-white shadow-[8px_8px_0_0_#000] p-8 md:p-12">
                <h3 className="font-mono text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">IBM Plex Mono</h3>
                <p className="font-sans text-xl md:text-2xl font-medium leading-relaxed max-w-3xl border-l-4 border-[#00E5FF] pl-6 mb-8">
                  The secondary typeface. Used for technical data, badges, metadata, and UI accents. It reinforces our identity as a technical execution partner.
                </p>
                <div className="flex flex-col gap-6 font-mono">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-1 block">Badge / Accents</span>
                    <div className="text-sm font-bold uppercase tracking-widest">NETWORK: ENI MAINNET</div>
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-1 block">Data / Metrics</span>
                    <div className="text-lg">CHAIN_ID: 173</div>
                  </div>
                </div>
              </div>
            </section>

            {/* 06 Graphic Assets */}
            <section className="mb-32 animate-fade-in">
              <div className="flex items-center gap-6 mb-12 border-b-2 border-black pb-4">
                <span className="font-mono text-4xl font-bold text-black opacity-50">06</span>
                <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">Graphic Assets</h2>
              </div>
              <p className="font-sans text-xl leading-relaxed max-w-3xl mb-12">
                Our signature graphic assets include heavy solid borders, sharp offset shadows, and dynamic SVG abstract symbols that react to user interaction. We favor abstract geometric representation over literal illustrations.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className="border-2 border-black bg-[#F4BF4B] aspect-square flex items-center justify-center shadow-[4px_4px_0_0_#000] hover:bg-black group transition-colors">
                    <img 
                      src={`/symbols/svg${num}.svg`} 
                      alt={`Symbol ${num}`} 
                      className="w-16 h-16 md:w-20 md:h-20 object-contain invert group-hover:invert-0 transition-all duration-300" 
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
