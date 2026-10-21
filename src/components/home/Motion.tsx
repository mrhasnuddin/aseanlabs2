import { useEffect, useRef } from 'react';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Content already on screen when the page hydrates stays put; only content scrolled to animates.
const alreadyVisible = (node: Element) => node.getBoundingClientRect().top < window.innerHeight;

export function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || reducedMotion() || alreadyVisible(node)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('al-revealed');
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    node.classList.add('al-reveal-ready');
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`al-reveal ${className}`}>
      {children}
    </div>
  );
}

// Han and kana have no spaces, so each character is its own unit; trailing punctuation, small kana
// and the long-vowel mark stay attached so no line starts with them. Hangul is spaced and splits as words.
const CJK = '\\u3040-\\u30ff\\u3400-\\u9fff\\uf900-\\ufaff';
const TOKENS = new RegExp(
  `[${CJK}][ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶー、。，．！？：；」』）》\\u3001\\u3002\\uff01\\uff09\\uff0c\\uff0e\\uff1a\\uff1b\\uff1f]*|[^\\s${CJK}]+|\\s+`,
  'g',
);

/* Wraps each word so headings can rise word by word inside a Reveal (or on load with .al-split-load). */
export function SplitText({ text, start = 0 }: { text: string; start?: number }) {
  let index = start;
  return (
    <>
      {(text.match(TOKENS) ?? []).map((part, i) =>
        !part.trim() ? (
          ' '
        ) : (
          <span className="al-word" key={i}>
            <span style={{ '--i': index++ } as React.CSSProperties}>{part}</span>
          </span>
        ),
      )}
    </>
  );
}

/* Counts a figure such as "5,000+" up from zero the first time it scrolls into view. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Under JS the figure starts hidden (see .al-count CSS) so the final value never flashes before 0.
    node.classList.add('is-ready');
    const match = value.match(/^(\D*)([\d,]+)(.*)$/);
    if (!match || reducedMotion()) return;
    const [, prefix, digits, suffix] = match;
    const target = Number(digits.replace(/,/g, ''));
    const render = (n: number) => {
      const rounded = Math.round(n);
      node.textContent =
        prefix + (digits.includes(',') ? rounded.toLocaleString('en-US') : rounded) + suffix;
    };
    const duration = parseFloat(getComputedStyle(node).getPropertyValue('--al-count')) || 1600;
    let frame = 0;
    render(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          render(target * (1 - Math.pow(1 - progress, 4)));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      node.textContent = value;
    };
  }, [value]);
  return (
    <>
      <span ref={ref} className="al-count" aria-hidden="true">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
