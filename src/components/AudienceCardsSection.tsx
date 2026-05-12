import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { EcosystemIcon } from './icons/EcosystemIcon';
import { BuilderIcon } from './icons/BuilderIcon';
import { EnterpriseIcon } from './icons/EnterpriseIcon';
import { NbButton } from './NbButton';
import { Copy, Check } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AudienceCard {
  titleKey: string;
  defaultTitle: string;
  bodyKey: string;
  defaultBody: string;
  ctaKey: string;
  defaultCta: string;
  ctaHref: string;
  img: string;
  bg: string;
  text: string;
  /** px offset from top — creates Namada's descending staircase */
  topOffset: string;
  /** Optional: override card border for visual distinction */
  cardBorder?: string;
  /** Optional: mark CTA as disabled/coming soon */
  disabled?: boolean;
}

const CARDS: AudienceCard[] = [
  {
    titleKey: 'audience.buildersTitle', defaultTitle: 'For Builders',
    bodyKey: 'audience.buildersDesc', defaultBody: 'Ready to deploy on ENI? You have the product — we execute the launch. Community built, operations live, users on-chain, metrics verifiable. Paid, scoped, and fully accountable.',
    ctaKey: 'audience.buildersCta', defaultCta: 'Apply to Build',
    ctaHref: 'mailto:Info@aseanlabs.io?subject=Build%20Inquiry%20-%20ASEAN%20Labs',
    disabled: false,
    img: '/cards/builder.svg',
    bg: 'var(--color-canvas)',
    text: 'var(--color-struct)',
    topOffset: '0px',
  },
  {
    titleKey: 'audience.ecosystemTitle', defaultTitle: 'For Ecosystems',
    bodyKey: 'audience.ecosystemDesc', defaultBody: 'ENI has 3.2M registered addresses and 200k+ daily transactions. ASEAN Labs operates the active layer inside that network — 100k+ community members across six regional markets already building and transacting. We are your access to that distribution.',
    ctaKey: 'audience.ecosystemCta', defaultCta: 'Explore the Ecosystem',
    ctaHref: '#ecosystem',
    img: '/cards/Ecosystem.svg',
    bg: 'var(--color-accent)',
    text: 'var(--color-struct)',
    topOffset: '80px',
  },
  {
    titleKey: 'audience.enterpriseTitle', defaultTitle: 'For Enterprises',
    bodyKey: 'audience.enterpriseDesc', defaultBody: 'Evaluating blockchain for your business? ENI is enterprise-grade with native MiCA, GDPR, and PDPO compliance — built for real commercial deployment, not adapted to it. ASEAN Labs is your introduction and your operator.',
    ctaKey: 'audience.enterpriseCta', defaultCta: 'Talk to the Team',
    ctaHref: 'https://calendly.com/aseanlabs1/30min',
    img: '/cards/enterprise.svg',
    bg: 'var(--color-struct)',
    text: 'var(--color-canvas)',
    topOffset: '160px',
    cardBorder: '3px solid #F4BF4B',
  },
];



export function AudienceCardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ecosystemCardRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { y: -140, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.18,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-struct py-20 lg:min-h-screen lg:flex lg:flex-col lg:justify-start lg:py-24">
      <div className="mx-auto w-full max-w-[1480px] px-6 md:px-10 lg:flex lg:flex-col lg:flex-1">
        {/* Section label */}
        <p className="mb-12 font-mono text-sm font-bold uppercase tracking-[0.4em] text-canvas/60">
          {t('audience.badge') !== 'audience.badge' ? t('audience.badge') : 'Who We Work With'}
        </p>

        {/* 
          Desktop: absolutely-positioned staircase inside a relative container
          that fills the remaining viewport height.
          Mobile: normal stacked flow.
        */}

        {/* Mobile layout */}
        <div className="flex flex-col gap-6 lg:hidden">
          {CARDS.map((card, i) => (
            <div
              key={i}
              ref={el => {
                cardRefs.current[i] = el;
                if (card.defaultTitle === 'For Ecosystems') (ecosystemCardRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
              }}
              className="flex flex-col overflow-hidden"
              style={{
                backgroundColor: card.bg,
                color: card.text,
                border: card.cardBorder ?? '1px solid rgba(0,0,0,0.1)',
              }}
            >
              <CardContent card={card} cardRef={card.defaultTitle === 'For Ecosystems' ? ecosystemCardRef : undefined} />
            </div>
          ))}
        </div>

        {/* Desktop layout — staircase */}
        <div
          className="hidden lg:flex lg:flex-row lg:items-start lg:gap-5 lg:flex-1"
          style={{ minHeight: '620px' }}
        >
          {CARDS.map((card, i) => (
            <div
              key={i}
              ref={el => {
                cardRefs.current[i] = el;
                if (card.defaultTitle === 'For Ecosystems') (ecosystemCardRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
              }}
              className="flex-1 flex flex-col overflow-hidden"
              style={{
                marginTop: card.topOffset,
                backgroundColor: card.bg,
                color: card.text,
                border: card.cardBorder ?? '1px solid rgba(0,0,0,0.1)',
                /* each card fills height from its own top down to 0px bottom padding of section */
                height: `calc(100% - ${card.topOffset})`,
              }}
            >
              <CardContent card={card} cardRef={card.defaultTitle === 'For Ecosystems' ? ecosystemCardRef : undefined} />
            </div>
          ))}
        </div>

        {/* Wallet Onboarding Banner */}
        <div className="mt-32 w-full">
          <WalletOnboardingBanner />
        </div>
      </div>
    </section>
  );
}

function WalletOnboardingBanner() {
  const { t } = useTranslation();

  return (
    <div className="relative w-full border-[3px] border-struct bg-canvas p-10 lg:p-14 overflow-hidden group">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#000 1.5px, transparent 1.5px)`,
          backgroundSize: '32px 32px',
        }} 
      />
      
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="flex-1">
          <div className="inline-block bg-struct text-canvas px-3 py-1 font-mono text-xs font-black uppercase tracking-widest mb-6">
            {t('audience.walletBadge') !== 'audience.walletBadge' ? t('audience.walletBadge') : 'Documentation Layer'}
          </div>
          <h2 className="font-sans text-5xl lg:text-7xl font-black uppercase tracking-tighter text-struct mb-4 leading-[0.85]">
            {t('audience.walletTitle1') !== 'audience.walletTitle1' ? t('audience.walletTitle1') : 'SETUP YOUR'}<br />
            {t('audience.walletTitle2') !== 'audience.walletTitle2' ? t('audience.walletTitle2') : 'WALLET'}
          </h2>
          <p className="font-mono text-sm sm:text-base lg:text-lg leading-relaxed text-struct/80 mt-2 max-w-2xl">
            {t('audience.walletBody') !== 'audience.walletBody' ? t('audience.walletBody') : 'Ready to build? Follow our step-by-step tutorial to configure your environment and connect to the ENI Mainnet in under 2 minutes.'}
          </p>
        </div>
        
        <div className="w-full lg:flex-shrink-0 lg:w-auto">
          <NbButton
            href="/onboard"
            variant="primary-yellow"
            size="lg"
            className="!px-10 !py-6 !text-lg !font-black !tracking-widest w-full lg:w-auto justify-center !shadow-none hover:!shadow-none !translate-x-0 !translate-y-0"
          >
            {t('audience.walletCta') !== 'audience.walletCta' ? t('audience.walletCta') : 'Go to Tutorial'}
            <span aria-hidden="true" className="ml-2">→</span>
          </NbButton>
        </div>
      </div>
    </div>
  );
}

function CardContent({ card, cardRef }: { card: AudienceCard; cardRef?: React.RefObject<HTMLDivElement | null> }) {
  const { t } = useTranslation();

  return (
    <>
      {/* Image area */}
      <div className="w-full flex items-center justify-center px-6 pt-8 pb-8" style={{ minHeight: '220px' }}>
        {card.defaultTitle === 'For Ecosystems' ? (
          <EcosystemIcon className="h-[140px] w-auto" trackRef={cardRef} />
        ) : card.defaultTitle === 'For Builders' ? (
          <BuilderIcon className="h-[140px] w-auto" />
        ) : card.defaultTitle === 'For Enterprises' ? (
          <EnterpriseIcon className="h-[140px] w-auto" />
        ) : (
          <img
            src={card.img}
            alt={card.defaultTitle}
            className="h-[140px] w-auto object-contain"
          />
        )}
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-4 p-8 pt-0 flex-1">
        <h3 className="font-sans text-3xl lg:text-4xl font-bold uppercase leading-none tracking-tight">
          {t(card.titleKey) !== card.titleKey ? t(card.titleKey) : card.defaultTitle}
        </h3>

        <p className="font-mono text-sm lg:text-base leading-relaxed flex-1" style={{ opacity: 0.75 }}>
          {t(card.bodyKey) !== card.bodyKey ? t(card.bodyKey) : card.defaultBody}
        </p>

        {/* CTA Area */}
        <div className="mt-8">
          {card.disabled ? (
            <div
              className="flex items-center justify-center w-full gap-2 border-nb font-sans text-sm font-bold uppercase tracking-widest select-none px-6 py-4 opacity-40 grayscale"
              style={{
                backgroundColor: 'transparent',
                color: card.text,
                borderColor: card.text,
                borderStyle: 'dashed',
                borderRadius: '0px',
              }}
            >
              {t(card.ctaKey) !== card.ctaKey ? t(card.ctaKey) : card.defaultCta}
            </div>
          ) : (
            <a
              href={card.ctaHref}
              target={card.ctaHref.startsWith('http') ? '_blank' : undefined}
              rel={card.ctaHref.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex items-center justify-center w-full gap-2 border-nb font-sans text-sm font-bold uppercase tracking-widest transition-all duration-150 select-none px-6 py-4
                hover:-translate-x-1 hover:-translate-y-1 
                active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
              style={{
                // Design rule: fill = bg (card.bg), text = contrast (card.text),
                // stroke = contrast (card.text), shadow = contrast (card.text)
                backgroundColor: card.bg,
                color: card.text,
                borderColor: card.text,
                boxShadow: `6px 6px 0 0 ${card.text}`,
                borderRadius: '0px', // rounded-nb
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `8px 8px 0 0 ${card.text}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `6px 6px 0 0 ${card.text}`;
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.boxShadow = `8px 8px 0 0 ${card.text}`;
              }}
            >
              {t(card.ctaKey) !== card.ctaKey ? t(card.ctaKey) : card.defaultCta}
              <span
                aria-hidden="true"
                className="transition-transform duration-150 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          )}
        </div>
      </div>
    </>
  );
}
