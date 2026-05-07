import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { Iris, Clover, Sparkle, Hourglass, Burst, Chevrons } from '@/components/icons';

const TEXT = 'ASEAN LABS';
const SYMBOLS = [Iris, Clover, Sparkle, Hourglass, Burst, Chevrons];

type Props = {
  className?: string;
};

export function WordmarkScramble({ className }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (prefersReducedMotion()) return;

    const cells = Array.from(root.querySelectorAll<HTMLElement>('[data-cell="char"]'));
    const timers: ReturnType<typeof setTimeout>[] = [];
    let active = true;

    const scheduleSwap = (cell: HTMLElement, initialDelay: number) => {
      const t = setTimeout(() => {
        if (!active) return;
        const letter = cell.querySelector<HTMLElement>('[data-letter]');
        const symbols = cell.querySelectorAll<HTMLElement>('[data-sym]');
        if (!letter || symbols.length === 0) {
          scheduleSwap(cell, 2500 + Math.random() * 3500);
          return;
        }
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];

        const tl = gsap.timeline({
          onComplete: () => {
            if (active) scheduleSwap(cell, 2500 + Math.random() * 4000);
          },
        });
        tl.to(letter, { opacity: 0, scale: 0.5, duration: 0.16, ease: 'power2.in' })
          .fromTo(
            symbol,
            { opacity: 0, scale: 0.5, rotation: -25 },
            { opacity: 1, scale: 1, rotation: 0, duration: 0.22, ease: 'back.out(2)' },
            '-=0.05'
          )
          .to(symbol, { opacity: 0, scale: 0.5, rotation: 25, duration: 0.18, ease: 'power2.in' }, '+=0.55')
          .to(letter, { opacity: 1, scale: 1, duration: 0.18, ease: 'power2.out' }, '-=0.05');
      }, initialDelay);
      timers.push(t);
    };

    cells.forEach((cell, i) => scheduleSwap(cell, 600 + i * 220 + Math.random() * 800));

    return () => {
      active = false;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <span ref={ref} className={className} aria-label="ASEAN Labs">
      <span aria-hidden="true">
        {Array.from(TEXT).map((char, i) => {
          if (char === ' ') {
            return (
              <span key={i} className="inline-block w-[0.4em]">
                &nbsp;
              </span>
            );
          }
          return (
            <span
              key={i}
              data-cell="char"
              className="relative inline-flex items-center justify-center"
              style={{ minWidth: '0.7em' }}
            >
              <span data-letter className="inline-block leading-none">
                {char}
              </span>
              {SYMBOLS.map((Sym, si) => (
                <span
                  key={si}
                  data-sym
                  className="absolute inset-0 inline-flex items-center justify-center opacity-0"
                >
                  <Sym size="0.85em" />
                </span>
              ))}
            </span>
          );
        })}
      </span>
    </span>
  );
}
