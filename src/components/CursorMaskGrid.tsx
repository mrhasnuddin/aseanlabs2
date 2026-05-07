import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { ALL_ACCENT_SYMBOLS } from '@/components/icons';

const CELL = 48;
const SYMBOL_SIZE = 28;
const DOT_SIZE = 3;
const REVEAL_RADIUS = 160;
const SWAP_MIN = 6000;
const SWAP_MAX = 12000;
const SYMBOL_COUNT = ALL_ACCENT_SYMBOLS.length;

type SymbolCellProps = {
  initial: number;
  delayMs: number;
};

function SymbolCell({ initial, delayMs }: SymbolCellProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [idx, setIdx] = useState(initial);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let active = true;

    const swap = () => {
      const el = ref.current;
      if (!active || !el) return;
      gsap.to(el, {
        opacity: 0,
        scale: 0.4,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          if (!active) return;
          setIdx((prev) => {
            let next = Math.floor(Math.random() * SYMBOL_COUNT);
            if (next === prev) next = (next + 1) % SYMBOL_COUNT;
            return next;
          });
          gsap.to(el, {
            opacity: 1,
            scale: 1,
            duration: 0.28,
            ease: 'back.out(1.8)',
          });
          if (active) {
            timer = setTimeout(swap, SWAP_MIN + Math.random() * (SWAP_MAX - SWAP_MIN));
          }
        },
      });
    };

    timer = setTimeout(swap, delayMs);
    return () => {
      active = false;
      if (timer) clearTimeout(timer);
    };
  }, [delayMs]);

  const Symbol = ALL_ACCENT_SYMBOLS[idx];
  return (
    <span ref={ref} className="block">
      <Symbol size={SYMBOL_SIZE} className="block text-ink" />
    </span>
  );
}

export function CursorMaskGrid() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  // size tracking
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!wrap) return;
      setDims({ w: wrap.clientWidth, h: wrap.clientHeight });
    };
    const ro = new ResizeObserver(() => {
      if (!raf) raf = requestAnimationFrame(update);
    });
    ro.observe(wrap);
    update();
    return () => {
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // cursor tracking and repulsion
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (prefersReducedMotion()) return;
    const target = wrap.parentElement;
    if (!target) return;

    let raf = 0;
    const pending = { x: 0, y: 0, has: false };

    const apply = () => {
      raf = 0;
      if (!pending.has || !wrap) return;
      
      const mx = pending.x;
      const my = pending.y;
      
      wrap.style.setProperty('--mouse-x', `${mx}px`);
      wrap.style.setProperty('--mouse-y', `${my}px`);
      
      // Disable symbol collision (repulsion) on mobile for performance
      if (window.innerWidth < 768) {
        pending.has = false;
        return;
      }
      
      const maxDist = REVEAL_RADIUS * 1.8;
      // Only animate symbols!
      const items = wrap.querySelectorAll<HTMLSpanElement>('.symbol-item');
      
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        const cx = parseFloat(el.getAttribute('data-x') || '0');
        const cy = parseFloat(el.getAttribute('data-y') || '0');
        
        const dx = cx - mx;
        const dy = cy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < maxDist && dist > 0) {
          const force = Math.pow((maxDist - dist) / maxDist, 2);
          const repel = force * 50; // push distance
          const angle = Math.atan2(dy, dx);
          const tx = Math.cos(angle) * repel;
          const ty = Math.sin(angle) * repel;
          
          el.dataset.active = 'true';
          gsap.to(el, {
            x: tx,
            y: ty,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        } else {
          if (el.dataset.active === 'true') {
            el.dataset.active = 'false';
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          }
        }
      }
      
      pending.has = false;
    };
    
    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      pending.x = e.clientX - rect.left;
      pending.y = e.clientY - rect.top;
      pending.has = true;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    target.addEventListener('mousemove', onMove);
    return () => {
      target.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const cells: { key: string; x: number; y: number; isSymbol: boolean; symIndex: number }[] = [];

  if (dims.w > 0 && dims.h > 0) {
    const cols = Math.ceil(dims.w / CELL) + 2;
    const rows = Math.ceil(dims.h / CELL) + 2;
    let symCounter = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * CELL;
        const y = r * CELL;
        
        let isSymbol = false;
        const isMobile = dims.w < 768;

        if (isMobile) {
          // Precisely 4 symbols for mobile: 2 around headline, 2 around CTAs
          // Structured to avoid Nav (top 88px) and Scroll bar (bottom 88px)
          const cRight = cols - 3;
          if ((r === 4 && c === 1) || (r === 7 && c === cRight)) isSymbol = true;
          if ((r === 13 && c === cRight) || (r === 16 && c === 1)) isSymbol = true;
        } else {
          // Desktop: symbols in the middle where the mask will hide them
          if (y > 180 && y < dims.h - 180) {
            if (r % 2 === 0) {
              const offset = (Math.abs((r / 2) % 4 - 2)) * 2;
              if (c % 8 === offset) {
                isSymbol = true;
              }
            }
          }
        }

        cells.push({
          key: `${r}-${c}`,
          x,
          y,
          isSymbol,
          symIndex: isSymbol ? symCounter++ : -1,
        });
      }
    }
  }

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-transparent md:z-20 md:bg-background"
      style={dims.w >= 768 ? {
        maskImage: `radial-gradient(circle at var(--mouse-x, -999px) var(--mouse-y, -999px), transparent 0px, transparent ${REVEAL_RADIUS}px, black ${REVEAL_RADIUS + 1}px, black 100%)`,
        WebkitMaskImage: `radial-gradient(circle at var(--mouse-x, -999px) var(--mouse-y, -999px), transparent 0px, transparent ${REVEAL_RADIUS}px, black ${REVEAL_RADIUS + 1}px, black 100%)`,
      } : {}}
      aria-hidden="true"
    >
      <div className="absolute inset-0 pointer-events-none">
        {cells.map((cell) => {
          if (cell.isSymbol) {
            return (
              <span
                key={cell.key}
                className="symbol-item absolute"
                data-x={cell.x}
                data-y={cell.y}
                style={{
                  left: cell.x,
                  top: cell.y,
                  marginLeft: -(SYMBOL_SIZE / 2),
                  marginTop: -(SYMBOL_SIZE / 2),
                }}
              >
                <SymbolCell
                  initial={(cell.symIndex * 7) % SYMBOL_COUNT}
                  delayMs={(cell.symIndex * 137) % 4000}
                />
              </span>
            );
          }

          return (
            <span
              key={cell.key}
              className="absolute"
              style={{
                left: cell.x,
                top: cell.y,
                marginLeft: -(DOT_SIZE / 2),
                marginTop: -(DOT_SIZE / 2),
              }}
            >
              <span
                className="block rounded-full bg-foreground"
                style={{ width: DOT_SIZE, height: DOT_SIZE, opacity: 0.15 }}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
}
