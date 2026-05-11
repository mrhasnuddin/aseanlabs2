import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import createGlobe from 'cobe';
import { useTranslation } from '@/hooks/useTranslation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ADVANTAGES = [
  {
    stat: '10,000+',
    title: 'VERIFIED MEMBERS IN THE ACTIVE LAYER',
    description: "Not followers — verified participants generating on-chain behavior across Southeast Asia's core markets.",
    titleKey: 'why.adv1Title',
    descKey: 'why.adv1Desc'
  },
  {
    stat: '150+',
    title: 'EVENTS. 5,000+ IN-PERSON ATTENDEES',
    description: 'A track record that is public and verifiable — not a slide in a deck.',
    titleKey: 'why.adv2Title',
    descKey: 'why.adv2Desc'
  },
  {
    stat: '7',
    title: 'NATIVE LANGUAGE OPERATIONS',
    description: "English, Chinese, Malay, Thai, Japanese, Korean, and Mandarin — not translated. Native. That's what real regional distribution requires.",
    titleKey: 'why.adv3Title',
    descKey: 'why.adv3Desc'
  }
];

const REGIONS = [
  { country: 'Malaysia', countryKey: 'why.countryMY', languages: 'EN · CN · MY', location: [4.2105, 101.9758] },
  { country: 'Singapore', countryKey: 'why.countrySG', languages: 'EN · CN', location: [1.3521, 103.8198] },
  { country: 'Thailand', countryKey: 'why.countryTH', languages: 'TH · EN', location: [15.8700, 100.9925] },
  { country: 'Vietnam', countryKey: 'why.countryVN', languages: 'EN', location: [14.0583, 108.2772] },
  { country: 'Japan', countryKey: 'why.countryJP', languages: 'JP · EN', location: [36.2048, 138.2529] },
  { country: 'Korea', countryKey: 'why.countryKR', languages: 'KR · EN', location: [35.9078, 127.7669] },
  { country: 'China', countryKey: 'why.countryCN', languages: 'CN · EN', location: [35.8617, 104.1954] }
];

// Globe config constants
const GLOBE_PX = 560;
const DEFAULT_PHI = -3.39;  // phi = -(π/2 + lon_rad); centers on ~104°E (ASEAN core)
const DEFAULT_THETA = 0.28; // Tilt to show the region well
const SPRING_K = 0.04;      // Magnet spring strength (0-1)

// Arc connections between ASEAN countries
const ARCS: Array<{ from: [number, number]; to: [number, number] }> = [
  { from: [1.3521, 103.8198], to: [4.2105, 101.9758] },   // Singapore → Malaysia
  { from: [1.3521, 103.8198], to: [15.87, 100.9925] },    // Singapore → Thailand
  { from: [1.3521, 103.8198], to: [14.0583, 108.2772] },  // Singapore → Vietnam
  { from: [14.0583, 108.2772], to: [35.8617, 104.1954] }, // Vietnam → China
  { from: [35.8617, 104.1954], to: [36.2048, 138.2529] }, // China → Japan
  { from: [35.8617, 104.1954], to: [35.9078, 127.7669] }, // China → Korea
  { from: [36.2048, 138.2529], to: [35.9078, 127.7669] }, // Japan → Korea
];

// Matches cobe v2's projection math, with scale applied for zoomed label positions
function projectGlobePoint(
  lat: number, lon: number, phi: number, theta: number, scale = 1
) {
  const PI = Math.PI;
  const radLat = lat * PI / 180;
  const radLon = lon * PI / 180 - PI;
  const cosLat = Math.cos(radLat);
  const x = -cosLat * Math.cos(radLon);
  const y = Math.sin(radLat);
  const z = cosLat * Math.sin(radLon);
  const r = 0.85; // marker elevation (ee=0.8 + default markerElevation=0.05)
  const vx = x * r, vy = y * r, vz = z * r;
  const cosPhi = Math.cos(phi), sinPhi = Math.sin(phi);
  const cosTheta = Math.cos(theta), sinTheta = Math.sin(theta);
  const cx = cosPhi * vx + sinPhi * vz;
  const cy = sinPhi * sinTheta * vx + cosTheta * vy - cosPhi * sinTheta * vz;
  const cz = -sinPhi * cosTheta * vx + sinTheta * vy + cosPhi * cosTheta * vz;
  // Apply scale to output coordinates (matches cobe's B parameter)
  return {
    x: (cx * scale + 1) / 2,
    y: (-cy * scale + 1) / 2,
    visible: cz >= 0,
  };
}

export function Globe({ activeRegion, t }: { activeRegion: string | null, t: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const phiRef = useRef(DEFAULT_PHI);
  // Ref so animation loop always reads latest activeRegion without stale closure
  const activeRegionRef = useRef(activeRegion);
  // Spring target phi — updated when country is clicked or deselected
  const targetPhiRef = useRef(DEFAULT_PHI);

  // Keep refs in sync with props/state
  useEffect(() => {
    activeRegionRef.current = activeRegion;
    if (activeRegion) {
      const region = REGIONS.find(r => r.country === activeRegion);
      if (region) {
        // Correct formula: phi = -(PI/2 + lon_rad) — centers longitude on the globe face
        targetPhiRef.current = -(Math.PI / 2 + region.location[1] * Math.PI / 180);
      }
    } else {
      targetPhiRef.current = DEFAULT_PHI;
    }
  }, [activeRegion]);

  useEffect(() => {
    if (!canvasRef.current) return;

    let globe: ReturnType<typeof createGlobe> | undefined;
    let animFrameId: number;
    let cancelled = false;

    const initRafId = requestAnimationFrame(() => {
      if (cancelled || !canvasRef.current) return;

      const ARC_COLOR: [number, number, number] = [0.96, 0.75, 0.29];

      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: GLOBE_PX,
        height: GLOBE_PX,
        phi: phiRef.current,
        theta: DEFAULT_THETA,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.12, 0.12, 0.12],
        markerColor: [0.1, 0.8, 1],
        glowColor: [0.9, 0.75, 0.2],
        markers: REGIONS.map((r) => ({
          location: r.location as [number, number],
          size: 0.04,
        })),
        arcs: ARCS.map((a) => ({ ...a, color: ARC_COLOR })),
        arcColor: ARC_COLOR,
        arcWidth: 1,
        arcHeight: 0.4,
      } as any);

      // Direct DOM label update — no React re-renders per frame
      const updateLabels = (phi: number, active: string | null) => {
        if (!labelsRef.current) return;
        const els = labelsRef.current.children;
        REGIONS.forEach((region, i) => {
          const el = els[i] as HTMLElement | undefined;
          if (!el) return;
          const [lat, lon] = region.location;
          const pos = projectGlobePoint(lat, lon, phi, DEFAULT_THETA);
          el.style.left = `${pos.x * 100}%`;
          el.style.top = `${pos.y * 100}%`;
          el.style.opacity = pos.visible ? '1' : '0';

          const isActive = region.country === active;
          const span = el.querySelector('[data-label-span]') as HTMLElement | null;
          const dot = el.querySelector('[data-label-dot]') as HTMLElement | null;
          if (span) {
            span.style.background = isActive ? '#000' : '#F4BF4B';
            span.style.color = isActive ? '#F4BF4B' : '#000';
            span.style.border = isActive ? '1px solid #F4BF4B' : '1px solid transparent';
            span.style.boxShadow = isActive
              ? '0 0 10px rgba(244,191,75,0.7), 2px 2px 0 #F4BF4B'
              : '2px 2px 0 rgba(0,0,0,0.6)';
          }
          if (dot) {
            dot.style.background = isActive ? '#F4BF4B' : '#00ccff';
            dot.style.boxShadow = isActive ? '0 0 6px #F4BF4B' : 'none';
            dot.style.width = isActive ? '7px' : '5px';
            dot.style.height = isActive ? '7px' : '5px';
          }
        });
      };

      const animate = () => {
        if (cancelled) return;

        // No auto-rotate. Spring/magnet: ease toward targetPhi (country or default)
        if (pointerInteracting.current === null) {
          phiRef.current += (targetPhiRef.current - phiRef.current) * SPRING_K;
        }

        const active = activeRegionRef.current;

        // Update marker sizes + colors based on active region
        globe!.update({
          phi: phiRef.current,
          markers: REGIONS.map((r) => ({
            location: r.location as [number, number],
            size: r.country === active ? 0.08 : 0.04,
            color: (r.country === active
              ? [0.96, 0.75, 0.29]   // gold — active
              : [0.1, 0.8, 1]        // cyan — default
            ) as [number, number, number],
          })),
        });

        updateLabels(phiRef.current, active);
        animFrameId = requestAnimationFrame(animate);
      };
      animFrameId = requestAnimationFrame(animate);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(initRafId);
      cancelAnimationFrame(animFrameId);
      globe?.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center items-center relative">
      {/* Brutalist corner ticks framing the globe */}
      {(['tl','tr','bl','br'] as const).map((pos) => (
        <div key={pos} className="absolute pointer-events-none z-30" style={{
          top:    pos.startsWith('t') ? 0 : undefined,
          bottom: pos.startsWith('b') ? 0 : undefined,
          left:   pos.endsWith('l')  ? 0 : undefined,
          right:  pos.endsWith('r')  ? 0 : undefined,
          width: 28, height: 28,
          borderTop:    pos.startsWith('t') ? '3px solid #F4BF4B' : undefined,
          borderBottom: pos.startsWith('b') ? '3px solid #F4BF4B' : undefined,
          borderLeft:   pos.endsWith('l')  ? '3px solid #F4BF4B' : undefined,
          borderRight:  pos.endsWith('r')  ? '3px solid #F4BF4B' : undefined,
        }} />
      ))}
      {/* Outer scan-line ring — two concentric dashed rings for brutalist depth */}
      <div className="absolute inset-[-18px] rounded-full pointer-events-none z-10"
        style={{ border: '1px dashed rgba(244,191,75,0.25)' }} />
      <div className="absolute inset-[-36px] rounded-full pointer-events-none z-10"
        style={{ border: '1px solid rgba(244,191,75,0.10)' }} />
      <div
        className="cursor-grab active:cursor-grabbing relative"
        style={{ width: GLOBE_PX, height: GLOBE_PX }}
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          pointerInteracting.current = e.clientX;
        }}
        onPointerUp={() => { pointerInteracting.current = null; }}
        onPointerOut={() => { pointerInteracting.current = null; }}
        onPointerMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteracting.current = e.clientX;
            phiRef.current += delta * 0.004;
          }
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />

        {/* Country labels — positions updated via direct DOM manipulation each frame */}
        <div ref={labelsRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 20 }}>
          {REGIONS.map((region) => (
            <div
              key={region.country}
              className="absolute"
              style={{ transform: 'translate(-50%, calc(-100% - 8px))', opacity: 0 }}
            >
              <div className="flex flex-col items-center" style={{ gap: '3px' }}>
                <span
                  data-label-span
                  className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 leading-tight whitespace-nowrap"
                  style={{
                    background: '#F4BF4B',
                    color: '#000',
                    border: '1px solid transparent',
                    boxShadow: '2px 2px 0 rgba(0,0,0,0.6)',
                    transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
                  }}
                >
                  {t(region.countryKey) !== region.countryKey ? t(region.countryKey) : region.country}
                </span>
                <div
                  data-label-dot
                  style={{
                    width: '5px', height: '5px',
                    borderRadius: '50%',
                    background: '#00ccff',
                    transition: 'background 0.2s, box-shadow 0.2s, width 0.2s, height 0.2s',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WhyUsPage() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const advantagesRef = useRef<HTMLDivElement>(null);
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

    // Counter animation for stat numbers
    const ctx = gsap.context(() => {
      const numElements = advantagesRef.current?.querySelectorAll('.stat-number');
      numElements?.forEach((el) => {
        const target = parseInt(el.getAttribute('data-target') || '0');
        const suffix = el.getAttribute('data-suffix') || '';
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val).toLocaleString() + suffix;
          }
        });
      });
    }, advantagesRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black text-white overflow-hidden min-h-screen flex flex-col selection:bg-[#F4BF4B] selection:text-black">
      <Head>
        <title>{t('why.pageTitle') !== 'why.pageTitle' ? t('why.pageTitle') : 'Why Us — ASEAN Labs'}</title>
        <meta name="description" content={t('why.pageDesc') !== 'why.pageDesc' ? t('why.pageDesc') : "Southeast Asia is not an emerging market for Web3. It's an active one."} />
      </Head>

      <Nav />

      <div id="page-wrapper" className="flex-grow">
        {/* Background Dot Grid */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(rgba(244, 191, 75, 0.4) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: '12px 12px',
          }}
        />

        <main className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-10 py-20 lg:py-32 flex flex-col items-center">
          <div className="w-full">
            {/* Back Button */}
            <Link 
              href="/" 
              className="group mb-12 inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest border border-[#F4BF4B] text-[#F4BF4B] px-6 py-3 transition-colors duration-200 hover:bg-[#F4BF4B] hover:text-black"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              {t('why.backToHome') !== 'why.backToHome' ? t('why.backToHome') : 'Back to Home'}
            </Link>

            {/* Header Section */}
            <header className="mb-24 flex flex-col gap-6">
              <span className="font-mono text-lg md:text-xl font-bold uppercase tracking-[0.2em] text-[#F4BF4B]">
                {t('why.badge') !== 'why.badge' ? t('why.badge') : 'The Advantage'}
              </span>
              <h1 className="font-sans text-5xl md:text-7xl font-black uppercase leading-[1.05] tracking-tighter max-w-5xl text-[#F4BF4B]">
                {t('why.titlePart1') !== 'why.titlePart1' ? t('why.titlePart1') : 'Southeast Asia is not an emerging market for Web3.'}<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px #F4BF4B' }}>{t('why.titleHighlight') !== 'why.titleHighlight' ? t('why.titleHighlight') : "It's an active one."}</span>
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mt-8">
                <p className="font-sans text-lg lg:text-xl font-medium leading-relaxed text-white/90">
                  {t('why.desc1') !== 'why.desc1' ? t('why.desc1') : 'ASEAN Labs has spent years building here — not positioning. The distribution is structural. The community is verified. The language is native. The relationships exist at every layer: retail users, institutional partners, developer communities, regional KOLs.'}
                </p>
                <p className="font-sans text-lg lg:text-xl font-medium leading-relaxed text-white/70">
                  {t('why.desc2') !== 'why.desc2' ? t('why.desc2') : 'This cannot be replicated by a project arriving with a marketing budget and no context. When you work with ASEAN Labs, you enter a network of 100+ ecosystem projects, an event infrastructure that has run 150+ activations, and operators who know this market because they built it.'}
                </p>
              </div>
            </header>

            {/* Advantage Grid Section */}
            <div ref={advantagesRef} className="w-full mb-32 border-t-2 border-[#F4BF4B]/30 pt-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {ADVANTAGES.map((adv, index) => {
                  const numericValue = parseInt(adv.stat.replace(/,/g, ''));
                  const suffix = adv.stat.includes('+') ? '+' : '';
                  
                  return (
                    <div 
                      key={index} 
                      className="group bg-black border-2 border-[#F4BF4B] p-8 md:p-10 flex flex-col transition-transform duration-300 hover:-translate-y-1 shadow-[8px_8px_0_0_#F4BF4B]"
                    >
                      <div 
                        className="stat-number text-5xl lg:text-6xl xl:text-[4.5rem] font-black font-sans text-[#F4BF4B] mb-6 tracking-tighter group-hover:scale-105 origin-left transition-transform duration-300"
                        data-target={numericValue}
                        data-suffix={suffix}
                      >
                        0{suffix}
                      </div>
                      <div className="w-12 h-1.5 bg-[#F4BF4B] mb-6" />
                      <h3 className="font-sans text-2xl font-black uppercase tracking-tight text-white mb-4">
                        {t(adv.titleKey) !== adv.titleKey ? t(adv.titleKey) : adv.title}
                      </h3>
                      <p className="font-sans text-lg font-medium text-white/80 leading-relaxed">
                        {t(adv.descKey) !== adv.descKey ? t(adv.descKey) : adv.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Regional Presence Section with Globe */}
            <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-16 border-t-2 border-[#F4BF4B]/30 pt-16 mb-24">
              {/* Globe */}
              <div className="w-full lg:w-1/2 flex items-center justify-center relative">
                {/* Decorative background glow behind globe */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#F4BF4B]/10 rounded-full blur-[100px] pointer-events-none" />
                <Globe activeRegion={activeRegion} t={t} />
              </div>

              {/* Regions List */}
              <div className="w-full lg:w-1/2 flex flex-col gap-10">
                <div className="mb-4">
                  <h2 className="font-sans text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#F4BF4B] mb-4">
                    {t('why.regionTitle')}
                  </h2>
                  <p className="font-sans text-lg font-medium text-white/80 leading-relaxed">
                    {t('why.regionDesc')}
                  </p>
                </div>

                <div className="flex flex-col gap-0 border-t border-b border-white/20">
                  {REGIONS.map((region, index) => {
                    const isActive = activeRegion === region.country;
                    return (
                      <button 
                        key={index}
                        onClick={() => setActiveRegion(isActive ? null : region.country)}
                        className={`group flex items-center justify-between py-6 border-b border-white/10 last:border-b-0 transition-colors px-4 -mx-4 cursor-pointer text-left
                          ${isActive ? 'bg-[#F4BF4B]/10 border-l-4 border-l-[#F4BF4B]' : 'hover:bg-white/5 border-l-4 border-l-transparent'}`}
                      >
                        <span className={`font-sans text-2xl md:text-3xl font-black uppercase tracking-wide transition-colors
                          ${isActive ? 'text-[#F4BF4B]' : 'text-white group-hover:text-[#F4BF4B]'}`}>
                          {t(region.countryKey) !== region.countryKey ? t(region.countryKey) : region.country}
                        </span>
                        <span className={`font-mono text-sm md:text-base font-bold tracking-widest transition-colors
                          ${isActive ? 'text-[#F4BF4B]' : 'text-white/50 group-hover:text-white'}`}>
                          {region.languages}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
