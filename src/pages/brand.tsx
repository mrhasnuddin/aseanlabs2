import React, { useEffect, useState, useRef, useCallback } from 'react';
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

const SYMBOL_COUNT = 6;
type PhysicsNode = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isDragging: boolean;
};

function FloatingSymbols() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<PhysicsNode[]>([]);
  const symbolsRef = useRef<(HTMLDivElement | null)[]>([]);
  const animationFrameRef = useRef<number>();
  const dragTargetRef = useRef<{ index: number; offsetX: number; offsetY: number } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    nodesRef.current = Array.from({ length: SYMBOL_COUNT }).map((_, i) => {
      const radius = 32; // w-16 h-16 = 64px, radius = 32
      return {
        id: `sym-${i}`,
        x: radius + Math.random() * Math.max(width - radius * 2, 0),
        y: radius + Math.random() * Math.max(height - radius * 2, 0),
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        radius,
        isDragging: false
      };
    });

    const updatePhysics = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      nodesRef.current.forEach((node) => {
        if (node.isDragging) return;
        node.x += node.vx;
        node.y += node.vy;

        if (node.x - node.radius < 0) { node.x = node.radius; node.vx *= -1; }
        else if (node.x + node.radius > width) { node.x = width - node.radius; node.vx *= -1; }
        
        if (node.y - node.radius < 0) { node.y = node.radius; node.vy *= -1; }
        else if (node.y + node.radius > height) { node.y = height - node.radius; node.vy *= -1; }
      });

      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const n1 = nodesRef.current[i];
          const n2 = nodesRef.current[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minD = n1.radius + n2.radius;

          if (dist < minD && dist > 0) {
            const overlap = minD - dist;
            const nx = dx / dist;
            const ny = dy / dist;
            const massRatio = 0.5;
            
            if (!n1.isDragging) {
              n1.x -= nx * overlap * massRatio;
              n1.y -= ny * overlap * massRatio;
              n1.vx -= nx * overlap * 0.05;
              n1.vy -= ny * overlap * 0.05;
            }
            if (!n2.isDragging) {
              n2.x += nx * overlap * massRatio;
              n2.y += ny * overlap * massRatio;
              n2.vx += nx * overlap * 0.05;
              n2.vy += ny * overlap * 0.05;
            }
          }
        }
      }

      nodesRef.current.forEach(node => {
        const speed = Math.sqrt(node.vx*node.vx + node.vy*node.vy);
        if (speed > 2.5 && !node.isDragging) {
          node.vx *= 0.95;
          node.vy *= 0.95;
        }
      });

      nodesRef.current.forEach((node, i) => {
        const el = symbolsRef.current[i];
        if (el) {
          el.style.transform = `translate(${node.x - node.radius}px, ${node.y - node.radius}px)`;
        }
      });
      animationFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animationFrameRef.current = requestAnimationFrame(updatePhysics);
    return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); };
  }, []);

  const handlePointerDown = (e: React.PointerEvent, index: number) => {
    if (!containerRef.current) return;
    e.preventDefault();
    const node = nodesRef.current[index];
    node.isDragging = true;
    const rect = containerRef.current.getBoundingClientRect();
    dragTargetRef.current = {
      index,
      offsetX: e.clientX - rect.left - node.x,
      offsetY: e.clientY - rect.top - node.y
    };
    node.vx = 0;
    node.vy = 0;
  };

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!dragTargetRef.current || !containerRef.current) return;
    const { index, offsetX, offsetY } = dragTargetRef.current;
    const node = nodesRef.current[index];
    const rect = containerRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left - offsetX;
    const newY = e.clientY - rect.top - offsetY;
    node.vx = newX - node.x;
    node.vy = newY - node.y;
    node.x = newX;
    node.y = newY;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (dragTargetRef.current) {
      const node = nodesRef.current[dragTargetRef.current.index];
      node.isDragging = false;
      dragTargetRef.current = null;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  return (
    <div 
      ref={containerRef}
      className="border-2 border-struct bg-struct p-8 relative overflow-hidden h-[300px] md:h-[400px] text-canvas touch-none shadow-[8px_8px_0_0_var(--color-struct)]"
    >
      <span className="absolute top-4 left-4 font-mono text-xs font-bold uppercase tracking-widest opacity-70 z-10">{t('brand.graphicAssetsTitle') !== 'brand.graphicAssetsTitle' ? t('brand.graphicAssetsTitle') : 'Graphic Assets'}</span>
      {[1, 2, 3, 4, 5, 6].map((num, i) => (
        <div 
          key={num}
          ref={el => { symbolsRef.current[i] = el; }}
          className="absolute top-0 left-0 w-16 h-16 flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 transition-transform duration-100 ease-out z-20"
          onPointerDown={(e) => handlePointerDown(e, i)}
          draggable={false}
        >
          <img 
            src={`/symbols/svg${num}.svg`} 
            alt={`Symbol ${num}`} 
            className="w-16 h-16 object-contain pointer-events-none invert brightness-0" 
          />
        </div>
      ))}
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
                  href="/Brand Kit/AseanLabs Logo.7z" 
                  download
                  className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest border border-struct bg-struct text-canvas px-6 py-3 transition-colors duration-0 hover:bg-transparent hover:text-struct"
                >
                  <Download size={16} /> {t('brand.downloadLogoPack') !== 'brand.downloadLogoPack' ? t('brand.downloadLogoPack') : 'Download Logo Pack'}
                </a>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="border-2 border-struct bg-struct p-8 flex flex-col items-center justify-center min-h-[300px] relative text-canvas text-center overflow-hidden">
                  <span className="absolute top-4 left-4 font-mono text-xs font-bold uppercase tracking-widest opacity-70">{t('brand.symbolLabel') !== 'brand.symbolLabel' ? t('brand.symbolLabel') : 'Symbol'}</span>
                  <img src="/symbols/aseanlabs svg 2.svg" alt="ASEAN Labs Symbol" className="w-24 h-24 md:w-32 md:h-32 object-contain invert brightness-0 shrink-0" />
                </div>
                <div className="border-2 border-struct bg-struct p-8 flex flex-col items-center justify-center min-h-[300px] relative text-canvas text-center overflow-hidden">
                  <span className="absolute top-4 left-4 font-mono text-xs font-bold uppercase tracking-widest opacity-70">{t('brand.wordmarkLabel') !== 'brand.wordmarkLabel' ? t('brand.wordmarkLabel') : 'Wordmark'}</span>
                  <h3 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-widest text-canvas whitespace-nowrap">ASEAN LABS</h3>
                </div>
                <div className="border-2 border-struct bg-struct p-8 flex flex-col items-center justify-center min-h-[300px] relative lg:col-span-2 text-canvas text-center overflow-hidden">
                  <span className="absolute top-4 left-4 font-mono text-xs font-bold uppercase tracking-widest opacity-70">{t('brand.combinedLabel') !== 'brand.combinedLabel' ? t('brand.combinedLabel') : 'Combined Lockup'}</span>
                  <div className="flex items-center justify-center gap-3 sm:gap-6 w-full">
                    <img src="/symbols/aseanlabs svg 2.svg" alt="ASEAN Labs Symbol" className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain invert brightness-0 shrink-0" />
                    <h3 className="font-sans text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-widest text-canvas whitespace-nowrap">ASEAN LABS</h3>
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
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b-2 border-struct pb-4">
                <div className="flex items-center gap-6">
                  <span className="font-mono text-4xl font-bold text-struct/50">06</span>
                  <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">{t('brand.graphicAssetsTitle') !== 'brand.graphicAssetsTitle' ? t('brand.graphicAssetsTitle') : 'Graphic Assets'}</h2>
                </div>
                <a 
                  href="/Brand Kit/Symbols.7z" 
                  download
                  className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest border border-struct bg-struct text-canvas px-6 py-3 transition-colors duration-0 hover:bg-transparent hover:text-struct"
                >
                  <Download size={16} /> {t('brand.downloadGraphicAssets') !== 'brand.downloadGraphicAssets' ? t('brand.downloadGraphicAssets') : 'Download Graphic Assets'}
                </a>
              </div>
              <p className="font-sans text-xl leading-relaxed w-full mb-12 text-struct">
                {t('brand.graphicAssetsDesc') !== 'brand.graphicAssetsDesc' ? t('brand.graphicAssetsDesc') : 'Our signature graphic assets include heavy solid borders, sharp offset shadows, and dynamic SVG abstract symbols that react to user interaction. We favor abstract geometric representation over literal illustrations.'}
              </p>
              
              <FloatingSymbols />
            </section>

          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
