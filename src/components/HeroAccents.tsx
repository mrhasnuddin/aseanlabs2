import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { Iris, Clover, Sparkle, Hourglass, Burst, Chevrons } from '@/components/icons';

type Accent = {
  Component: React.ComponentType<{ size?: number | string; className?: string }>;
  // position as percentage of container
  top: string;
  left: string;
  size: number;
  rotateDuration: number;
  driftX: number;
  driftY: number;
  driftDuration: number;
  initialRotate: number;
  className?: string;
};

const ACCENTS: Accent[] = [
  { Component: Sparkle,   top: '14%', left: '8%',  size: 56, rotateDuration: 18, driftX: 12, driftY: -10, driftDuration: 6.5, initialRotate: 8 },
  { Component: Iris,      top: '22%', left: '88%', size: 44, rotateDuration: 22, driftX: -14, driftY: 8,  driftDuration: 7.5, initialRotate: 0 },
  { Component: Clover,    top: '70%', left: '12%', size: 64, rotateDuration: 28, driftX: 10, driftY: -8,  driftDuration: 8.0, initialRotate: -12 },
  { Component: Hourglass, top: '76%', left: '78%', size: 48, rotateDuration: 20, driftX: -10, driftY: -6, driftDuration: 5.5, initialRotate: 24 },
  { Component: Burst,     top: '40%', left: '94%', size: 36, rotateDuration: 14, driftX: -8, driftY: 12,  driftDuration: 6.0, initialRotate: -8 },
  { Component: Chevrons,  top: '52%', left: '4%',  size: 40, rotateDuration: 26, driftX: 14, driftY: 6,   driftDuration: 7.0, initialRotate: 0 },
];

export function HeroAccents() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion()) return;

    const items = Array.from(container.children) as HTMLElement[];
    const tweens: gsap.core.Tween[] = [];

    items.forEach((el, i) => {
      const a = ACCENTS[i];
      tweens.push(
        gsap.to(el, {
          rotation: `+=360`,
          duration: a.rotateDuration,
          ease: 'none',
          repeat: -1,
        })
      );
      tweens.push(
        gsap.to(el, {
          x: a.driftX,
          y: a.driftY,
          duration: a.driftDuration,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      );
    });

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {ACCENTS.map((a, i) => {
        const Cmp = a.Component;
        return (
          <span
            key={i}
            className="absolute block text-relief/30 will-change-transform"
            style={{
              top: a.top,
              left: a.left,
              transform: `translate(-50%, -50%) rotate(${a.initialRotate}deg)`,
            }}
          >
            <Cmp size={a.size} className="text-relief/30 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]" />
          </span>
        );
      })}
    </div>
  );
}
