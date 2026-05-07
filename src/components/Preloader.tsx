import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { LogoMark } from './icons';
import { WordmarkScramble } from './WordmarkScramble';

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only run the preloader once per session to avoid annoying users
    if (sessionStorage.getItem('hasPreloaded')) {
      return;
    }
    setMounted(true);

    const ctx = gsap.context(() => {
      // Keep it on screen for 2 seconds, then slide up like a curtain
      gsap.to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: 'power4.inOut',
        delay: 2.2,
        onComplete: () => {
          sessionStorage.setItem('hasPreloaded', 'true');
          setMounted(false);
        }
      });
    });

    return () => ctx.revert();
  }, []);

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-accent text-ink"
    >
      <div className="flex flex-col items-center gap-6">
        <LogoMark size={96} className="text-ink" />
        <WordmarkScramble className="text-4xl font-bold tracking-[0.18em] font-geist" />
      </div>
    </div>
  );
}
