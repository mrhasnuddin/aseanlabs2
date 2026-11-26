import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, ArrowTopRightIcon, ChevronDownIcon, MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons';
import { Hourglass, Sparkle, Clover } from '@/components/icons/BrandSymbols';
import { useTranslation } from '@/hooks/useTranslation';
import { PROJECTS } from '@/data/ecosystem';
import { PARTNERS } from '@/data/partners';
import { OrbitArtwork } from './OrbitArtwork';
import { CapabilityArtwork, HeviumMark, NetworkArtwork } from './CapabilityArtwork';
import { TEAM, TeamCard } from './TeamCard';
import { CountUp, Reveal, SplitText } from './Motion';
import { ProjectIntake } from './ProjectIntake';
import { EventsSection } from '@/components/events/EventsSection';

const CONTACT = '#contact';
const CAPABILITIES = [
  { id: 'strategy', title: 'strategy', services: ['02'], kind: 'strategy' },
  { id: 'creative', title: 'creative', services: ['03', '04'], kind: 'creative' },
  { id: 'development', title: 'development', services: ['05'], kind: 'development' },
  { id: 'community', title: 'community', services: ['01', '06', '07'], kind: 'community' },
  { id: 'expansion', title: 'expansion', services: ['08', '09'], kind: 'expansion' },
] as const;

export function HeroSection() {
  const { t } = useTranslation();
  const links = [
    ['capabilities', 'home.capabilitiesLink'],
    ['process', 'nav.process'],
    ['ecosystem', 'nav.ecosystem'],
    ['contact', 'home.contact'],
  ];

  return (
    <section id="hero" className="al-hero" aria-labelledby="hero-title">
      <div className="al-hero-art">
        <OrbitArtwork />
      </div>
      <div className="al-hero-bottom al-container">
        <div className="al-hero-copy">
          <h1 id="hero-title" className="al-split-load">
            <SplitText text={t('hero.headline')} />
          </h1>
          <div className="al-load-fade">
            <p className="al-hero-description">{t('home.heroBody')}</p>
            <a href={CONTACT} className="al-button">
              {t('home.contact')}
              <ArrowTopRightIcon width={18} height={18} aria-hidden="true" />
            </a>
          </div>
        </div>
        <nav className="al-hero-index al-load-fade" aria-label={t('home.exploreLabel')}>
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              <span>{t(label)}</span>
              <ArrowRightIcon width={17} height={17} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}

function LogoMarquee() {
  // The second copy only completes the loop; assistive tech and keyboard users see one list.
  return (
    <div className="al-marquee al-motion">
      <ul className="al-marquee-track">
        {[0, 1].map((copy) =>
          PARTNERS.map((partner) => (
            <li key={`${copy}-${partner.name}`} aria-hidden={copy === 1 || undefined}>
              <a
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={copy === 1 ? -1 : undefined}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  style={{ '--h': `${partner.height}px` } as React.CSSProperties}
                />
              </a>
            </li>
          )),
        )}
      </ul>
    </div>
  );
}

function ProofSection() {
  const { t } = useTranslation();
  return (
    <section id="social-proof" className="al-proof" aria-label={t('partners.title')}>
      <LogoMarquee />
    </section>
  );
}

/* Who we are, with the track record beside it. Nav and footer "About Us" link here (/#about). */
function AboutSection() {
  const { t } = useTranslation();
  const stats = [
    ['100+', 'home.projects'],
    ['100K+', 'home.members'],
    ['150+', 'home.events'],
    ['5,000+', 'home.attendees'],
  ];
  return (
    <section id="about" className="al-about al-container" aria-labelledby="about-title">
      <Reveal className="al-about-copy">
        <h2 id="about-title">
          <SplitText text={t('home.introTitle')} />
        </h2>
        <p>{t('home.introBody')}</p>
      </Reveal>
      <Reveal className="al-stat-grid">
        {stats.map(([value, label]) => (
          <div className="al-stat" key={label}>
            <span>
              <CountUp value={value} />
            </span>
            <p>{t(label)}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

function CapabilitiesSection() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <section
      id="capabilities"
      className="al-section al-capabilities"
      aria-labelledby="capabilities-title"
    >
      <div className="al-container">
        <Reveal className="al-section-heading">
          <h2 id="capabilities-title">
            <SplitText text={t('home.capabilitiesTitle')} />
          </h2>
          <p>{t('home.capabilitiesBody')}</p>
        </Reveal>
        <div className="al-cap-grid">
          {CAPABILITIES.map((cap) => {
            const open = selected === cap.id;
            return (
              <article
                className={`al-cap-cell al-cap-${cap.id}${open ? ' is-open' : ''}`}
                key={cap.id}
              >
                <CapabilityArtwork kind={cap.kind} />
                <div className="al-cap-content">
                  <h3>{t(`home.${cap.title}Title`)}</h3>
                  <p>{t(`home.${cap.title}Body`)}</p>
                </div>
                <button
                  type="button"
                  className="al-cap-toggle"
                  onClick={() => setSelected(open ? null : cap.id)}
                  aria-expanded={open}
                  aria-controls={`cap-detail-${cap.id}`}
                >
                  <span>{t(open ? 'home.closeDetails' : 'home.viewDetails')}</span>
                  <PlusIcon className="al-plus" width={18} height={18} aria-hidden="true" />
                </button>
                <div id={`cap-detail-${cap.id}`} className="al-cap-detail al-collapse">
                  <div>
                    <div className="al-cap-detail-body">
                      {cap.services.map((n) => (
                        <div key={n}>
                          <h4>{t(`services.svc${n}Title`)}</h4>
                          <p>{t(`services.svc${n}Desc`)}</p>
                        </div>
                      ))}
                      {cap.id === 'development' && (
                        <p className="al-cap-partner">
                          <a href="https://hevium.xyz/" target="_blank" rel="noopener noreferrer">
                            Hevium
                            <ArrowTopRightIcon width={14} height={14} aria-hidden="true" />
                          </a>{' '}
                          {t('home.dexCapabilityNote')}
                        </p>
                      )}
                      <a href={CONTACT} className="al-text-link">
                        {t('home.contact')}
                        <ArrowTopRightIcon width={16} height={16} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function NetworkSection() {
  const { t } = useTranslation();
  return (
    <section id="integrations" className="al-network" aria-labelledby="network-title">
      <div className="al-container al-network-layout" id="foundation-section-wrapper">
        <Reveal className="al-network-copy">
          <h2 id="network-title">
            <SplitText text={t('home.networkTitle')} />
          </h2>
          <p>{t('home.networkBody')}</p>
          <a
            href="https://hevium.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="al-network-partner"
          >
            <span className="al-network-partner-mark" aria-hidden="true">
              <HeviumMark />
            </span>
            <span className="al-network-partner-body">
              <span className="al-network-partner-title">Hevium</span>
              <span className="al-small-label al-network-partner-role">{t('home.dexPartnerLabel')}</span>
              <span className="al-network-partner-desc">{t('home.dexPartnerBody')}</span>
              <span className="al-network-partner-url">
                hevium.xyz
                <ArrowTopRightIcon width={15} height={15} aria-hidden="true" />
              </span>
            </span>
          </a>
          <a href={CONTACT} className="al-text-link">
            {t('home.networkCta')}
            <ArrowTopRightIcon width={17} height={17} aria-hidden="true" />
          </a>
        </Reveal>
        <div className="al-network-art" aria-hidden="true">
          <NetworkArtwork />
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  const { t } = useTranslation();
  const [active, setActive] = useState<string | null>('builders');
  return (
    <section id="why-us" className="al-section al-audience" aria-labelledby="audience-title">
      <div className="al-container al-audience-layout">
        <Reveal className="al-section-heading">
          <h2 id="audience-title">
            <SplitText text={t('home.audienceTitle')} />
          </h2>
          <p>{t('home.audienceBody')}</p>
          <Link href="/why-us" className="al-text-link">
            {t('nav.whyUs')}
            <ArrowRightIcon width={17} height={17} aria-hidden="true" />
          </Link>
        </Reveal>
        <div className="al-audience-list">
          {(['builders', 'ecosystem', 'enterprise'] as const).map((kind) => {
            const open = active === kind;
            return (
              <div key={kind} className={`al-audience-row${open ? ' is-open' : ''}`}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setActive(open ? null : kind)}
                    aria-expanded={open}
                    aria-controls={`audience-${kind}`}
                  >
                    <span>{t(`audience.${kind}Title`)}</span>
                    <PlusIcon className="al-plus" width={22} height={22} aria-hidden="true" />
                  </button>
                </h3>
                <div id={`audience-${kind}`} className="al-audience-detail al-collapse">
                  <div>
                    <div className="al-audience-detail-body">
                      <p>
                        {t(kind === 'ecosystem' ? 'home.ecosystemAudienceBody' : `home.${kind}Body`)}
                      </p>
                      <a
                        href={kind === 'ecosystem' ? '#ecosystem' : CONTACT}
                        className="al-text-link"
                      >
                        {t(kind === 'ecosystem' ? 'home.exploreEcosystem' : 'home.contact')}
                        <ArrowTopRightIcon width={16} height={16} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Who does the work: three stepped cards (ink, paper, outline), each with a collection-style avatar. */
function TeamSection() {
  const { t } = useTranslation();
  return (
    <section id="team" className="al-section al-team" aria-labelledby="team-title">
      <div className="al-container">
        <Reveal className="al-section-heading">
          <h2 id="team-title">
            <SplitText text={t('home.teamTitle')} />
          </h2>
          <p>{t('home.teamBody')}</p>
        </Reveal>
        <ul className="al-team-grid al-team-collection">
          {TEAM.map((member) => (
            <li key={member.id}>
              <TeamCard id={member.id} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProcessSection() {
  const { t } = useTranslation();
  const symbols = [Hourglass, Sparkle, Clover];
  return (
    <section id="process" className="al-section al-process" aria-labelledby="process-title">
      <div className="al-container">
        <Reveal className="al-section-heading">
          <h2 id="process-title">
            <SplitText text={t('home.processTitle')} />
          </h2>
          <p>{t('home.processBody')}</p>
        </Reveal>
        <div className="al-process-grid">
          {symbols.map((Symbol, i) => (
            <Reveal key={i} className="al-process-step">
              <div className="al-process-step-top">
                <Symbol size={44} className="al-step-symbol" aria-hidden="true" />
              </div>
              <h3>{t(`home.process${i + 1}Title`)}</h3>
              <p>{t(`home.process${i + 1}Body`)}</p>
            </Reveal>
          ))}
        </div>
        <Link href="/process" className="al-button al-process-link">
          {t('home.fullProcess')}
          <ArrowRightIcon width={17} height={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

interface FilterOption {
  value: string;
  label: string;
  count: number;
}

function CategoryFilter({
  value,
  options,
  label,
  onChange,
}: {
  value: string;
  options: FilterOption[];
  label: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const menuId = useId();
  const currentLabel = options.find((opt) => opt.value === value)?.label ?? value;

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  const focusOption = (index: number) => {
    const items = menuRef.current?.querySelectorAll<HTMLButtonElement>('button');
    if (!items?.length) return;
    const clamped = (index + items.length) % items.length;
    items[clamped]?.focus();
  };

  const select = (next: string) => {
    onChange(next);
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div
      className="al-filter"
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${label}: ${currentLabel}`}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (!open) {
              setOpen(true);
              const selectedIdx = Math.max(
                0,
                options.findIndex((opt) => opt.value === value),
              );
              requestAnimationFrame(() => focusOption(selectedIdx));
            } else {
              focusOption(0);
            }
          } else if (event.key === 'ArrowUp' && !open) {
            event.preventDefault();
            setOpen(true);
            requestAnimationFrame(() => focusOption(options.length - 1));
          }
        }}
      >
        <span>{currentLabel}</span>
        <ChevronDownIcon width={18} height={18} aria-hidden="true" />
      </button>
      {open && (
        <ul ref={menuRef} id={menuId} role="listbox" aria-label={label} className="al-filter-menu">
          {options.map((opt, idx) => (
            <li key={opt.value} role="option" aria-selected={opt.value === value}>
              <button
                type="button"
                onClick={() => select(opt.value)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    focusOption(idx + 1);
                  } else if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    focusOption(idx - 1);
                  } else if (event.key === 'Home') {
                    event.preventDefault();
                    focusOption(0);
                  } else if (event.key === 'End') {
                    event.preventDefault();
                    focusOption(options.length - 1);
                  }
                }}
              >
                <span>{opt.label}</span>
                <span>{opt.count}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EcosystemSection() {
  const { t } = useTranslation();
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(false);
  const tags = Array.from(new Set(PROJECTS.flatMap((project) => project.tags))).sort();
  const filterOptions: FilterOption[] = [
    { value: 'All', label: t('ecosystem.filterAll'), count: PROJECTS.length },
    ...tags.map((tag) => ({
      value: tag,
      label: tag,
      count: PROJECTS.filter((project) => project.tags.includes(tag)).length,
    })),
  ];
  const filtered = PROJECTS.filter(
    (project) =>
      (category === 'All' || project.tags.includes(category)) &&
      `${project.name} ${project.tags.join(' ')}`
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );
  const visible = expanded ? filtered : filtered.slice(0, 8);
  return (
    <section id="ecosystem" className="al-section al-ecosystem" aria-labelledby="ecosystem-title">
      <span id="ecosystem-snap" className="al-anchor-alias" />
      <div className="al-container">
        <Reveal className="al-section-heading">
          <h2 id="ecosystem-title">
            <SplitText text={t('home.ecosystemTitle')} />
          </h2>
          <p>{t('home.ecosystemBody')}</p>
        </Reveal>
        <div className="al-ecosystem-controls">
          <label className="al-search">
            <MagnifyingGlassIcon width={18} height={18} aria-hidden="true" />
            <span className="sr-only">{t('ecosystem.searchPlaceholder')}</span>
            <input
              type="search"
              value={search}
              placeholder={t('ecosystem.searchPlaceholder')}
              onChange={(event) => {
                setSearch(event.target.value);
                setExpanded(false);
              }}
            />
          </label>
          <CategoryFilter
            value={category}
            options={filterOptions}
            label={t('home.filterCategory')}
            onChange={(next) => {
              setCategory(next);
              setExpanded(false);
            }}
          />
          <span className="al-result-count" aria-live="polite">
            {filtered.length} {t('home.projectsLabel')}
          </span>
        </div>
        <div className="al-project-grid">
          {visible.map((project, index) => (
            <a
              href={project.url}
              key={project.id}
              className="al-project"
              target="_blank"
              rel="noopener noreferrer"
              style={{ '--i': index % 8 } as React.CSSProperties}
            >
              <div className="al-project-top">
                <Image src={project.logo} alt="" width={48} height={48} sizes="44px" />
                <ArrowTopRightIcon width={18} height={18} aria-hidden="true" />
              </div>
              <h3>{project.name}</h3>
              <p>{project.tags.join(' / ')}</p>
            </a>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="al-empty">
            <p>{t('home.noProjects')}</p>
            <button
              type="button"
              className="al-text-link"
              onClick={() => {
                setSearch('');
                setCategory('All');
              }}
            >
              {t('ecosystem.reset')}
              <ArrowRightIcon width={16} height={16} aria-hidden="true" />
            </button>
          </div>
        )}
        {filtered.length > 8 && (
          <button
            type="button"
            className="al-text-link al-more-projects"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            {t(expanded ? 'home.showLess' : 'home.showAllProjects')}
            <PlusIcon className="al-plus" width={17} height={17} aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <div className="al-home">
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <ProofSection />
        <AboutSection />
        <AudienceSection />
        <CapabilitiesSection />
        <ProcessSection />
        <TeamSection />
        <NetworkSection />
        <EcosystemSection />
        <EventsSection />
        <ProjectIntake />
      </main>
    </div>
  );
}
