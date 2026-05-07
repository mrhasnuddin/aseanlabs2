import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { ChevronDown } from '@/components/icons';

export type NavItem = {
  label: string;
  description: string;
  href: string;
  external?: boolean;
};

/* ------------------------------- Trigger ------------------------------- */

type TriggerProps = {
  label: string;
  isOpen: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  onClickToggle: () => void;
  panelId: string;
};

export function NavDropdownTrigger({
  label,
  isOpen,
  onActivate,
  onDeactivate,
  onClickToggle,
  panelId,
}: TriggerProps) {
  return (
    <button
      type="button"
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onClick={onClickToggle}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      aria-controls={panelId}
      className="inline-flex items-center gap-1.5 rounded-nb px-3 py-2 font-sans text-sm font-medium uppercase tracking-wide text-ink transition-colors duration-150 hover:text-ink/70 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      {label}
      <ChevronDown
        size={11}
        className={`text-ink transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
      />
    </button>
  );
}

/* ------------------------------- MegaPanel ------------------------------- */

type PanelProps = {
  panelId: string;
  title: string | null;
  items: NavItem[];
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onItemClick: () => void;
};

export function NavMegaPanel({
  panelId,
  title,
  items,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onItemClick,
}: PanelProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  // open / close animation
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (prefersReducedMotion()) {
      gsap.set(panel, {
        display: isOpen ? 'block' : 'none',
        opacity: isOpen ? 1 : 0,
        y: 0,
      });
      return;
    }
    if (isOpen) {
      gsap.killTweensOf(panel);
      gsap.set(panel, { display: 'block' });
      gsap.fromTo(
        panel,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }
      );
    } else {
      gsap.killTweensOf(panel);
      gsap.to(panel, {
        opacity: 0,
        y: -8,
        duration: 0.16,
        ease: 'power2.in',
        onComplete: () => gsap.set(panel, { display: 'none' }),
      });
    }
  }, [isOpen]);

  // crossfade column items when openMenu swaps (not on initial open)
  const itemsRef = useRef<HTMLDivElement | null>(null);
  const lastTitle = useRef<string | null>(null);
  useEffect(() => {
    const grid = itemsRef.current;
    if (!grid) return;
    if (!isOpen) {
      lastTitle.current = null;
      return;
    }
    if (prefersReducedMotion()) return;
    if (lastTitle.current !== null && lastTitle.current !== title) {
      gsap.fromTo(
        grid,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' }
      );
    }
    lastTitle.current = title;
  }, [title, isOpen]);

  return (
    <div
      ref={panelRef}
      id={panelId}
      role="region"
      aria-label={title ?? 'Navigation menu'}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute left-0 right-0 top-[calc(100%-1px)] z-40 hidden border-y border-foreground bg-background transition-colors duration-300"
      style={{ opacity: 0 }}
    >
      <div className="mx-auto w-full max-w-[1480px] border-x border-b border-foreground bg-background">
        {title && (
          <div className="border-b border-foreground px-6 py-4 md:px-10 md:py-6">
            <p className="font-sans text-sm font-bold uppercase tracking-widest text-mono">
              {title}
            </p>
          </div>
        )}
        <div
          ref={itemsRef}
          className="grid grid-cols-1 gap-px bg-foreground sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item, index) => (
            <NavMegaItem key={item.label} item={item} index={index} onClick={onItemClick} />
          ))}
        </div>
      </div>
    </div>
  );
}

function NavMegaItem({ item, onClick, index }: { item: NavItem; onClick: () => void; index: number }) {
  const linkProps = item.external
    ? { target: '_blank' as const, rel: 'noopener noreferrer' as const }
    : {};
  return (
    <div className="bg-background">
      <Link
        href={item.href}
        role="menuitem"
        onClick={onClick}
        className="group flex h-full flex-col justify-between p-6 transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-nb-lg focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-foreground bg-background hover:bg-foreground hover:text-background"
        {...linkProps}
      >
        <div className="mb-12 flex items-start justify-between gap-4">
          <h3 className="font-sans text-2xl font-bold uppercase tracking-widest transition-colors duration-150 md:text-3xl">
            {item.label}
          </h3>
          <span
            aria-hidden="true"
            className="text-2xl transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            ↗
          </span>
        </div>
        <p className="font-mono text-xs leading-relaxed opacity-80 md:text-sm">{item.description}</p>
      </Link>
    </div>
  );
}
