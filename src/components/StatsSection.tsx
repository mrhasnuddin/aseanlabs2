import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useTranslation } from '@/hooks/useTranslation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS = [
  { num: '01', value: '100+', labelKey: 'stats.stat1Label', defaultLabel: 'PROJECTS ONBOARDED ONTO ENI THROUGH ASEAN LABS' },
  { num: '02', value: '100,000+', labelKey: 'stats.stat2Label', defaultLabel: 'COMMUNITY MEMBERS ASEAN LABS NETWORK' },
  { num: '03', value: '150+', labelKey: 'stats.stat3Label', defaultLabel: 'EVENTS DELIVERED' },
  { num: '04', value: '5,000+', labelKey: 'stats.stat4Label', defaultLabel: 'IN-PERSON ATTENDEES' },
  { num: '05', value: '6', labelKey: 'stats.stat5Label', defaultLabel: 'REGIONAL MARKETS' },
];

const SYMBOLS: Record<string, React.ReactNode> = {
  'svg1.svg': (
    <svg viewBox="0 0 100 100" fill="currentColor" className="custom-cursor-svg h-full w-full">
      <path d="M50 0C77.6141 0 100 22.3859 100 50C100 77.6141 77.6141 100 50 100C22.3859 100 0 77.6141 0 50C0 22.3859 22.3859 0 50 0ZM50 12.5C29.2891 12.5 12.5 29.2891 12.5 50C12.5 70.7105 29.2891 87.5 50 87.5C70.7105 87.5 87.5 70.7105 87.5 50C87.5 29.2891 70.7105 12.5 50 12.5ZM50 43.75C53.452 43.75 56.25 46.548 56.25 50C56.25 53.452 53.452 56.25 50 56.25C46.548 56.25 43.75 53.452 43.75 50C43.75 46.548 46.548 43.75 50 43.75Z" />
    </svg>
  ),
  'svg2.svg': (
    <svg viewBox="0 0 100 100" fill="currentColor" className="custom-cursor-svg h-full w-full">
      <path d="M89.0625 0C67.4891 0 50 17.4891 50 39.0625V0H0V10.9375C0 32.5109 17.4891 50 39.0625 50H0V100H10.9375C32.5109 100 50 82.5109 50 60.9375V100H100V89.0625C100 67.4891 82.5109 50 60.9375 50H100V0H89.0625Z" />
    </svg>
  ),
  'svg3.svg': (
    <svg viewBox="0 0 100 100" fill="currentColor" className="custom-cursor-svg h-full w-full">
      <path d="M50 25L62.5 12.8906L75.1953 0H100V25L75 50H74.8047L87.5 62.8906L100 75V100H75L50 75L37.5 87.1094L24.8047 100H0V75L25 50H25.1953L12.5 37.1094L0 25V0H25L50 25Z" />
    </svg>
  ),
  'svg4.svg': (
    <svg viewBox="0 0 100 100" fill="currentColor" className="custom-cursor-svg h-full w-full">
      <path d="M50 50C77.6141 50 100 72.3859 100 100H75C75 86.193 63.807 75 50 75C36.193 75 25 86.193 25 100H0C0 72.3859 22.3859 50 50 50ZM100 0C100 27.6141 77.6141 50 50 50C22.3859 50 0 27.6141 0 0H25C25 13.807 36.193 25 50 25C63.807 25 75 13.807 75 0H100Z" />
    </svg>
  ),
  'svg5.svg': (
    <svg viewBox="0 0 100 100" fill="currentColor" className="custom-cursor-svg h-full w-full">
      <path d="M59.375 27.3668L78.7262 8.01523L91.9844 21.2738L72.6332 40.625H100V59.375H72.6332L91.9844 78.7262L78.7262 91.9844L59.375 72.6332V100H40.625V72.6332L21.2734 91.9844L8.01563 78.7262L27.3668 59.375H0V40.625H27.3668L8.01523 21.2734L21.2738 8.01563L40.625 27.3668V0H59.375V27.3668Z" />
    </svg>
  ),
};

export function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeCursor, setActiveCursor] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'power3' });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX - 48);
      yTo(e.clientY - 48);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useEffect(() => {
    if (activeCursor) {
      gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.5)', overwrite: 'auto' });
      gsap.killTweensOf('.custom-cursor-svg');
      
      // Shape-specific animations
      if (activeCursor === 'svg1.svg') {
        // Circle: Higher density pulsing
        gsap.to('.custom-cursor-svg', { 
          scale: 1.5, 
          duration: 0.4, 
          repeat: -1, 
          yoyo: true, 
          ease: 'power2.inOut' 
        });
      } else if (activeCursor === 'svg2.svg') {
        // Geometric cross: Fast Spin
        gsap.to('.custom-cursor-svg', { rotation: 360, duration: 2, repeat: -1, ease: 'none' });
      } else if (activeCursor === 'svg3.svg') {
        // X shape: Smooth sleek rotation
        gsap.to('.custom-cursor-svg', { rotation: 180, duration: 2, repeat: -1, ease: 'power2.inOut' });
      } else if (activeCursor === 'svg4.svg') {
        // Arcs: Sleek breathing pulse + subtle float
        gsap.to('.custom-cursor-svg', { 
          scale: 1.15, 
          y: -8,
          duration: 1.2, 
          repeat: -1, 
          yoyo: true, 
          ease: 'sine.inOut' 
        });
      } else if (activeCursor === 'svg5.svg') {
        // Snowflake: Slow Spin
        gsap.to('.custom-cursor-svg', { rotation: -360, duration: 10, repeat: -1, ease: 'none' });
      }
    } else {
      gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.2, overwrite: 'auto' });
      gsap.killTweensOf('.custom-cursor-svg');
    }
  }, [activeCursor]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animate text columns
      const headers = textRef.current?.children;
      if (headers) {
        gsap.from(headers, {
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        });
      }

      // Animate stat rows
      const rows = listRef.current?.querySelectorAll('.stat-row');
      if (rows) {
        gsap.from(rows, {
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 85%',
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        });
      }

      // Counter animation for numbers
      const numElements = listRef.current?.querySelectorAll('.stat-number');
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle re-triggering animation on hover for interactivity
  const handleStatHover = (statNum: string, index: number) => {
    if (window.innerWidth < 768) return;
    setActiveCursor(`svg${parseInt(statNum)}.svg`);
    
    // Re-animate the specific counter
    const el = listRef.current?.querySelectorAll('.stat-number')[index];
    if (el) {
      const target = parseInt(el.getAttribute('data-target') || '0');
      const suffix = el.getAttribute('data-suffix') || '';
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = Math.floor(obj.val).toLocaleString() + suffix;
        }
      });
    }
  };

  return (
    <section ref={containerRef} className="relative z-10 w-full bg-transparent px-6 py-32 md:px-10 lg:py-48">
      {/* Custom Hover Cursor */}
      <div 
        ref={cursorRef} 
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-24 w-24 items-center justify-center text-background md:flex"
        style={{ opacity: 0, transform: 'scale(0)' }}
      >
        {activeCursor && SYMBOLS[activeCursor]}
      </div>

      <div className="mx-auto max-w-[1480px]">
        {/* Headers */}
        <div ref={textRef} className="flex flex-col gap-12 lg:flex-row lg:gap-24">
          <h2 className="flex-1 text-balance font-sans text-4xl font-bold uppercase leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            {t('stats.headlinePart1') !== 'stats.headlinePart1' ? t('stats.headlinePart1') : 'Built for '}
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px var(--color-canvas)' }}>{t('stats.headlineHighlight') !== 'stats.headlineHighlight' ? t('stats.headlineHighlight') : 'builders'}</span>
            {t('stats.headlinePart2') !== 'stats.headlinePart2' ? t('stats.headlinePart2') : ' who are done making the standard mistakes.'}
          </h2>
          <div className="flex-1 space-y-6 font-mono text-sm leading-relaxed text-foreground/80 md:text-base">
            <p>
              {t('stats.body1') !== 'stats.body1' ? t('stats.body1') : "Most Web3 projects don't fail at the idea stage. They fail because they build on the wrong infrastructure, partner with the wrong operators, and mistake activity for traction."}
            </p>
            <p>
              {t('stats.body2') !== 'stats.body2' ? t('stats.body2') : 'ASEAN Labs is the official incubator of ENI the enterprise-grade modular Layer 1 built for real-world commercial deployment. We are the execution layer. Selective. Paid. Accountable to results.'}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div ref={listRef} className="mt-24 flex flex-col border-t-4 border-foreground">
          {STATS.map((stat, index) => {
            const numericValue = parseInt(stat.value.replace(/,/g, ''));
            const suffix = stat.value.includes('+') ? '+' : '';
            
            return (
              <div 
                key={stat.num}
                onMouseEnter={() => handleStatHover(stat.num, index)}
                onMouseLeave={() => window.innerWidth >= 768 && setActiveCursor(null)}
                className="stat-row group relative flex flex-col justify-between border-b-4 border-foreground bg-transparent p-6 transition-colors duration-300 hover:bg-foreground hover:text-background sm:flex-row sm:items-center sm:p-10 md:hover:cursor-none"
              >
                <div className="flex items-baseline gap-6 sm:gap-16">
                  <span className="font-mono text-sm font-bold opacity-50 transition-opacity group-hover:opacity-80">{stat.num}</span>
                  <span 
                    className="stat-number font-sans text-5xl font-bold tracking-tighter md:text-7xl lg:text-8xl"
                    data-target={numericValue}
                    data-suffix={suffix}
                  >
                    0{suffix}
                  </span>
                </div>
                <div className="mt-6 max-w-[250px] text-left font-mono text-[10px] font-bold uppercase leading-tight tracking-widest sm:mt-0 sm:text-right sm:text-xs">
                  {t(stat.labelKey) !== stat.labelKey ? t(stat.labelKey) : stat.defaultLabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
