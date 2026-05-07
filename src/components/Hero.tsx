import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { CursorMaskGrid } from '@/components/CursorMaskGrid';
import { NbButton } from '@/components/NbButton';
import { Chevrons } from '@/components/icons';
import { useTranslation } from '@/hooks/useTranslation';

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const taglineRef = useRef<HTMLHeadingElement | null>(null);
  const subheadRef = useRef<HTMLParagraphElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const ctasRef = useRef<HTMLDivElement | null>(null);
  const declarationRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const headline = headlineRef.current;
    const tagline = taglineRef.current;
    const subhead = subheadRef.current;
    const eyebrow = eyebrowRef.current;
    const ctas = ctasRef.current;
    const declaration = declarationRef.current;
    if (!headline || !tagline || !subhead || !eyebrow || !ctas || !declaration) return;

    if (prefersReducedMotion()) {
      gsap.set([eyebrow, headline, tagline, subhead, ctas, declaration], { opacity: 1, y: 0 });
      return;
    }

    const split = new SplitType(headline, { types: 'chars,words', tagName: 'span' });

    const ctx = gsap.context(() => {
      gsap.set([eyebrow, tagline, subhead, ctas, declaration], { opacity: 1, y: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(eyebrow, { y: -12, opacity: 0, duration: 0.5 })
        .from(
          split.chars ?? [],
          { yPercent: 110, opacity: 0, stagger: 0.018, duration: 0.6 },
          '-=0.2'
        )
        .from(tagline, { y: 14, opacity: 0, duration: 0.5 }, '-=0.3')
        .from(subhead, { y: 14, opacity: 0, duration: 0.5 }, '-=0.3')
        .from(ctas, { y: 14, opacity: 0, duration: 0.5 }, '-=0.3')
        .from(declaration, { y: 10, opacity: 0, duration: 0.5 }, '-=0.3');
    });

    return () => {
      ctx.revert();
      split.revert();
    };
  }, []);

  return (
    <section
      className="relative isolate min-h-screen w-full overflow-hidden bg-background"
    >
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1480px] flex-col items-center justify-center gap-6 px-6 pt-28 pb-28 text-center md:px-10">
        <div ref={eyebrowRef} className="inline-flex">
          <span className="inline-flex items-center gap-2 border-nb border-foreground bg-cream px-4 py-2 font-mono text-[11px] tracking-widest2 text-foreground">
            {t('hero.badge') !== 'hero.badge' ? t('hero.badge') : 'Build on ENI Mainnet'}
          </span>
        </div>

        <h1
          ref={headlineRef}
          className="max-w-5xl text-balance font-sans font-bold leading-[1.05] text-foreground drop-shadow-sm text-5xl md:text-6xl xl:text-7xl uppercase"
        >
          {t('hero.headline') !== 'hero.headline' ? t('hero.headline') : 'We Build On-Chain Reality.'}
        </h1>

        <h2
          ref={taglineRef}
          className="max-w-3xl text-balance font-sans text-lg font-medium tracking-tight text-foreground md:text-xl xl:text-2xl"
        >
          {t('hero.tagline') !== 'hero.tagline' ? t('hero.tagline') : 'The Execution Layer for ENI Builders.'}
        </h2>

        <p
          ref={subheadRef}
          className="max-w-2xl font-mono text-sm leading-relaxed text-foreground/80 md:text-base"
        >
          {t('hero.subhead') !== 'hero.subhead' ? t('hero.subhead') : "Asean Labs takes serious projects from concept to deployed product, driving real users and verifiable activity. We are not a VC or a marketing agency—we are a paid execution partner operating inside Southeast Asia's most active Web3 ecosystem."}
        </p>

        <div ref={ctasRef} className="mt-2 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8">
          <NbButton
            href="https://scan.eniac.network/"
            external
            variant="primary-yellow"
            size="lg"
            className="w-full sm:w-auto justify-center"
          >
            {t('hero.ctaPrimary') !== 'hero.ctaPrimary' ? t('hero.ctaPrimary') : 'ENI Network'}
            <span aria-hidden="true" className="ml-2">→</span>
          </NbButton>
          <NbButton
            href="https://eni.top/"
            external
            variant="secondary-yellow"
            size="lg"
            className="w-full sm:w-auto justify-center"
          >
            {t('hero.ctaSecondary') !== 'hero.ctaSecondary' ? t('hero.ctaSecondary') : 'Learn about ENI'}
            <span aria-hidden="true" className="ml-2">→</span>
          </NbButton>
        </div>

        <div ref={declarationRef} className="mt-14 flex flex-col items-center gap-4 border-t border-foreground pt-8 opacity-80 sm:flex-row">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground/60">
            {t('hero.declaration') !== 'hero.declaration' ? t('hero.declaration') : 'Official Web3 Incubator on'}
          </span>
          <a href="https://eni.top/" target="_blank" rel="noopener noreferrer" className="group relative flex cursor-pointer items-center justify-center">
            <img
              src="/logo/ENI logo Black 1.png"
              alt="ENI Network"
              className="h-5 w-auto object-contain transition-all duration-500 ease-out group-hover:opacity-0 md:h-6"
            />
            <img
              src="/logo/ENI logo final 260301-10.png"
              alt="ENI Network Neon"
              className="absolute left-1/2 top-1/2 h-5 w-auto -translate-x-1/2 -translate-y-1/2 object-contain opacity-0 drop-shadow-[0_0_12px_rgba(255,0,255,0.6)] transition-all duration-500 ease-out group-hover:scale-125 group-hover:opacity-100 md:h-6"
            />
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 flex h-[88px] flex-col items-center justify-center gap-2 text-mono">
        <span className="font-mono text-[11px] tracking-widest2 uppercase text-foreground">{t('hero.scroll') !== 'hero.scroll' ? t('hero.scroll') : 'Scroll to explore'}</span>
        <span className="block animate-bob-y" style={{ transform: 'rotate(90deg)' }}>
          <Chevrons size={20} className="text-foreground" />
        </span>
      </div>

      <CursorMaskGrid />
    </section>
  );
}
