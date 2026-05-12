import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

const CTA_ITEMS = [
  {
    id: 'wallet',
    titleKey: 'cta.walletTitle',
    descriptionKey: 'cta.walletDesc',
    href: '/onboard',
  },
  {
    id: 'dao',
    titleKey: 'cta.daoTitle',
    descriptionKey: 'cta.daoDesc',
    href: '/#dao-as-a-service',
  },
  {
    id: 'process',
    titleKey: 'cta.processTitle',
    descriptionKey: 'cta.processDesc',
    href: '/process',
  },
  {
    id: 'why-us',
    titleKey: 'cta.whyUsTitle',
    descriptionKey: 'cta.whyUsDesc',
    href: '/why-us',
  },
];

export function FinalCta() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full bg-canvas py-20 font-sans">
      <div className="mx-auto w-full max-w-[1480px] px-6 md:px-10">
        {/* Outer container to match Namada's "card" style */}
        <div className="w-full bg-struct border-2 border-struct p-6 md:p-12 flex flex-col gap-12 animate-fade-in">
          
        {/* Header Section */}
        <div className="border-b border-canvas pb-6">
          <h2 className="text-canvas font-mono text-xl md:text-2xl lg:text-3xl font-medium tracking-tight uppercase">
            {t('cta.headline')}
          </h2>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-canvas">
          {CTA_ITEMS.map((item, index) => (
            <Link
              key={item.id}
              href={item.href}
              className={`group flex flex-col justify-between min-h-[200px] md:min-h-[320px] py-8 lg:py-0 ${
                index === 0 ? 'pt-0 lg:pr-8' : index === CTA_ITEMS.length - 1 ? 'pb-0 lg:pl-8' : 'lg:px-8'
              }`}
            >
              <p className="text-canvas/80 font-mono text-sm leading-relaxed max-w-[280px]">
                {t(item.descriptionKey)}
              </p>
              
              <div className="mt-12 flex items-end justify-between transition-transform duration-300 group-hover:-translate-y-2">
                <h3 className="text-canvas font-sans text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight max-w-[80%] leading-none transition-colors duration-300 group-hover:text-accent">
                  {t(item.titleKey)}
                </h3>
                <svg 
                  className="w-6 h-6 md:w-8 md:h-8 text-canvas transform transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Abstract Geometric Shapes (Namada Style) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-16 pt-12 border-t border-canvas/30">
          {/* Shape 1 - Excited */}
          <div
            className="group flex flex-col items-center gap-2 cursor-pointer"
            title="Excited"
            style={{ animation: 'bounce 0.6s infinite', animationPlayState: 'paused' }}
            onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'running')}
            onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'paused')}
          >
            <div className="w-5 h-5 border-4 border-canvas rounded-full"></div>
            <div 
              className="w-10 h-10 bg-canvas"
              style={{ WebkitMaskImage: 'url(/symbols/svg1.svg)', maskImage: 'url(/symbols/svg1.svg)', WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}
            ></div>
          </div>
          {/* Shape 2 - Confident */}
          <div className="group flex flex-col items-center gap-2 cursor-pointer" title="Confident">
            <div className="w-7 h-7 border-4 border-canvas rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-2 group-hover:-rotate-6 group-hover:scale-105"></div>
            <div 
              className="w-10 h-10 bg-canvas transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-y-110 group-hover:scale-x-125 group-hover:-translate-y-1"
              style={{ WebkitMaskImage: 'url(/symbols/svg2.svg)', maskImage: 'url(/symbols/svg2.svg)', WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}
            ></div>
          </div>
          {/* Shape 3 - Playful */}
          <div className="group flex flex-col items-center gap-2 cursor-pointer" title="Playful">
            <div className="w-4 h-4 border-4 border-canvas rounded-full transition-all duration-300 group-hover:-rotate-45 group-hover:-translate-x-2 group-hover:-translate-y-1"></div>
            <div 
              className="w-10 h-10 bg-canvas transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
              style={{ WebkitMaskImage: 'url(/symbols/svg3.svg)', maskImage: 'url(/symbols/svg3.svg)', WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}
            ></div>
          </div>
          {/* Shape 4 - Naughty */}
          <div className="group flex flex-col items-center gap-2 cursor-pointer" title="Naughty">
            <div className="w-8 h-8 border-4 border-canvas rounded-full transition-all duration-300 group-hover:translate-y-1 group-hover:translate-x-2 group-hover:rotate-12"></div>
            <div 
              className="w-10 h-10 bg-canvas transition-all duration-300 group-hover:-scale-x-100 group-hover:-rotate-12"
              style={{ WebkitMaskImage: 'url(/symbols/svg4.svg)', maskImage: 'url(/symbols/svg4.svg)', WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}
            ></div>
          </div>
          {/* Shape 5 - Timid/Shy */}
          <div className="group flex flex-col items-center gap-2 cursor-pointer" title="Shy">
            <div className="w-6 h-6 border-4 border-canvas rounded-full transition-all duration-300 group-hover:translate-y-3 group-hover:scale-75"></div>
            <div 
              className="w-10 h-10 bg-canvas transition-all duration-300 group-hover:scale-y-90 group-hover:scale-x-75 group-hover:opacity-80"
              style={{ WebkitMaskImage: 'url(/symbols/svg5.svg)', maskImage: 'url(/symbols/svg5.svg)', WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}
            ></div>
          </div>
          {/* Shape 6 - Zen/Calm */}
          <div className="group flex flex-col items-center gap-2 cursor-pointer" title="Zen">
            <div className="w-7 h-7 border-4 border-canvas rounded-full transition-all duration-1000 ease-in-out group-hover:-translate-y-4"></div>
            <div 
              className="w-10 h-10 bg-canvas transition-all duration-1000 ease-in-out group-hover:-translate-y-2 group-hover:scale-105"
              style={{ WebkitMaskImage: 'url(/symbols/svg6.svg)', maskImage: 'url(/symbols/svg6.svg)', WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}
            ></div>
          </div>
        </div>

      </div>
      </div>
    </section>
  );
}
