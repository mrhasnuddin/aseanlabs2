import React, { useRef } from 'react';
import { DaoaaSIcon } from '@/components/icons';
import { NbButton } from './NbButton';
import { useTranslation } from '@/hooks/useTranslation';

const PRODUCES_LIST = [
  { key: 'daoaas.produce1', default: "On-chain activity that shows up in block explorers — not just in community dashboards." },
  { key: 'daoaas.produce2', default: "TVL growth tied to real user behavior. Measurable via wallet interactions and contract calls." },
  { key: 'daoaas.produce3', default: "A community with governance rights and long-term protocol alignment — users who stay." },
  { key: 'daoaas.produce4', default: "Metrics your investors can verify without asking for screenshots." }
];

export function DaoaaSSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  return (
    <section ref={sectionRef} className="relative isolate w-full overflow-hidden bg-background pt-20 pb-40 lg:min-h-screen lg:flex lg:items-center">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--foreground) 1.5px, transparent 1.5px)',
          backgroundSize: '48px 48px',
          backgroundPosition: '0 0'
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-6 md:px-10">
        <div className="flex flex-col gap-16 lg:gap-24 w-full">
          
          {/* Top Section: Copywriting & CTAs & Icon */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 w-full">
            {/* Left: Text & CTAs */}
            <div className="flex flex-col items-start gap-8 w-full max-w-xl xl:max-w-2xl">
              {/* Badge */}
              <div className="inline-flex">
                <span className="inline-flex items-center gap-2 border-nb border-foreground bg-cream px-4 py-2 font-mono text-[11px] tracking-widest2 text-foreground uppercase font-bold">
                  {t('daoaas.badge') !== 'daoaas.badge' ? t('daoaas.badge') : 'DAOaaS'}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-sans text-6xl md:text-8xl lg:text-[7rem] font-bold uppercase leading-[0.9] tracking-tighter text-foreground text-balance">
                {t('daoaas.headlinePart1') !== 'daoaas.headlinePart1' ? t('daoaas.headlinePart1') : 'REAL ON-CHAIN'}<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--foreground)' }}>{t('daoaas.headlineHighlight') !== 'daoaas.headlineHighlight' ? t('daoaas.headlineHighlight') : 'GROWTH.'}</span>
              </h2>

              {/* Body */}
              <div className="flex flex-col gap-5 font-mono text-sm sm:text-base lg:text-lg leading-relaxed text-foreground/80 mt-2">
                <p>
                  {t('daoaas.body') !== 'daoaas.body' ? t('daoaas.body') : "Most growth programs create activity in dashboards. DAOaaS creates activity on-chain. ASEAN Labs operates ENI's native DAO-as-a-Service platform — connecting verified user behavior to on-chain rewards, protocol adoption, and real TVL growth."}
                </p>
              </div>

              {/* CTAs */}
              <div className="mt-8 w-full flex flex-col sm:flex-row gap-6">
                <NbButton
                  href="/process"
                  variant="primary-yellow"
                  size="lg"
                  className="!px-8 !py-4 w-full sm:w-auto justify-center"
                >
                  {t('daoaas.ctaPrimary') !== 'daoaas.ctaPrimary' ? t('daoaas.ctaPrimary') : 'HOW WE WORK'}
                  <span aria-hidden="true" className="ml-2">→</span>
                </NbButton>
                <NbButton
                  href="https://daoaas.io/"
                  external
                  variant="secondary-yellow"
                  size="lg"
                  className="!px-8 !py-4 w-full sm:w-auto justify-center"
                >
                  {t('daoaas.ctaSecondary') !== 'daoaas.ctaSecondary' ? t('daoaas.ctaSecondary') : 'DAOaaS.io'}
                  <span aria-hidden="true" className="ml-2">↗</span>
                </NbButton>
              </div>
            </div>

            {/* Right: DaoaaS Animated Icon */}
            <div className="w-full max-w-sm lg:max-w-md xl:max-w-xl hidden md:flex items-center justify-center">
              <DaoaaSIcon className="w-full h-auto drop-shadow-[8px_8px_0_rgba(0,0,0,1)] transition-all duration-300" trackRef={sectionRef} />
            </div>
          </div>

          {/* Bottom Section: Features Checklist */}
          <div className="flex flex-col gap-8 w-full border-t-[3px] border-black pt-16">
            <h3 className="font-sans text-xl lg:text-2xl font-bold uppercase tracking-widest text-foreground">
              {t('daoaas.producesTitle') !== 'daoaas.producesTitle' ? t('daoaas.producesTitle') : 'What this produces:'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {PRODUCES_LIST.map((item, idx) => (
                <div key={idx} className="flex items-start gap-5 p-6 md:p-8 border-2 border-foreground bg-transparent hover:bg-foreground hover:text-background group transition-colors duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <div className="shrink-0 font-black text-2xl group-hover:text-background">
                    ✓
                  </div>
                  <p className="font-mono text-base lg:text-lg leading-relaxed text-foreground group-hover:text-background transition-colors duration-300 font-medium">
                    {t(item.key) !== item.key ? t(item.key) : item.default}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
