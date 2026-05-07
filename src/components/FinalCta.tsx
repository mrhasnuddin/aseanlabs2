import React from 'react';
import Link from 'next/link';

const CTA_ITEMS = [
  {
    id: 'wallet',
    titleKey: 'nav.walletTutorial',
    titleDef: 'WALLET TUTORIAL',
    descriptionKey: 'cta.walletDesc',
    descriptionDef: 'Learn how to set up your wallet and manage assets securely on the network.',
    href: '/onboard',
  },
  {
    id: 'dao',
    titleKey: 'nav.daoaas',
    titleDef: 'DAOaaS',
    descriptionKey: 'cta.daoDesc',
    descriptionDef: 'Deploy, manage, and scale your decentralized organization with ease.',
    href: '/#dao-as-a-service',
  },
  {
    id: 'process',
    titleKey: 'nav.process',
    titleDef: 'PROCESS',
    descriptionKey: 'cta.processDesc',
    descriptionDef: 'Discover how Asean Labs accelerates Web3 builders from concept to launch.',
    href: '/process',
  },
  {
    id: 'why-us',
    titleKey: 'nav.whyUs',
    titleDef: 'WHY US',
    descriptionKey: 'cta.whyUsDesc',
    descriptionDef: 'Learn why the biggest projects choose us for Southeast Asian expansion.',
    href: '/why-us',
  },
];

export function FinalCta() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full bg-[#000000] px-6 py-20 md:px-10 font-sans border-t-2 border-[#000000]">
      {/* Outer container to match Namada's "card" style */}
      <div className="mx-auto w-full max-w-[1480px] border border-[#F4BF4B] rounded-sm p-6 md:p-12 flex flex-col gap-12">
        
        {/* Header Section */}
        <div className="border-b border-[#F4BF4B] pb-6">
          <h2 className="text-[#F4BF4B] font-mono text-xl md:text-2xl lg:text-3xl font-medium tracking-tight uppercase">
            {t('cta.headline') !== 'cta.headline' ? t('cta.headline') : 'BUILD AND GROW WITH ASEAN LABS'}
          </h2>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#F4BF4B]">
          {CTA_ITEMS.map((item, index) => (
            <Link
              key={item.id}
              href={item.href}
              className={`group flex flex-col justify-between min-h-[200px] md:min-h-[320px] py-8 lg:py-0 ${
                index === 0 ? 'pt-0 lg:pr-8' : index === CTA_ITEMS.length - 1 ? 'pb-0 lg:pl-8' : 'lg:px-8'
              }`}
            >
              <p className="text-[#F4BF4B]/80 font-mono text-sm leading-relaxed max-w-[280px]">
                {t(item.descriptionKey) !== item.descriptionKey ? t(item.descriptionKey) : item.descriptionDef}
              </p>
              
              <div className="mt-12 flex items-end justify-between transition-transform duration-300 group-hover:-translate-y-2">
                <h3 className="text-[#F4BF4B] font-sans text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight max-w-[80%] leading-none transition-colors duration-300 group-hover:text-[#00E5FF]">
                  {t(item.titleKey) !== item.titleKey ? t(item.titleKey) : item.titleDef}
                </h3>
                <svg 
                  className="w-6 h-6 md:w-8 md:h-8 text-[#F4BF4B] transform transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#00E5FF]" 
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
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-16 pt-12 border-t border-[#F4BF4B]/30">
          {/* Shape 1 - Excited */}
          <div className="group flex flex-col items-center gap-2 cursor-pointer hover:animate-[bounce_0.6s_infinite]" title="Excited">
            <div className="w-5 h-5 border-4 border-[#F4BF4B] rounded-full transition-transform duration-200 group-hover:-translate-y-1"></div>
            <div 
              className="w-10 h-10 bg-[#F4BF4B] transition-transform duration-200 group-hover:scale-105"
              style={{ WebkitMaskImage: 'url(/symbols/svg1.svg)', maskImage: 'url(/symbols/svg1.svg)', WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}
            ></div>
          </div>
          {/* Shape 2 - Confident */}
          <div className="group flex flex-col items-center gap-2 cursor-pointer" title="Confident">
            <div className="w-7 h-7 border-4 border-[#F4BF4B] rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-2 group-hover:-rotate-6 group-hover:scale-105"></div>
            <div 
              className="w-10 h-10 bg-[#F4BF4B] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-y-110 group-hover:scale-x-125 group-hover:-translate-y-1"
              style={{ WebkitMaskImage: 'url(/symbols/svg2.svg)', maskImage: 'url(/symbols/svg2.svg)', WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}
            ></div>
          </div>
          {/* Shape 3 - Playful */}
          <div className="group flex flex-col items-center gap-2 cursor-pointer" title="Playful">
            <div className="w-4 h-4 border-4 border-[#F4BF4B] rounded-full transition-all duration-300 group-hover:-rotate-45 group-hover:-translate-x-2 group-hover:-translate-y-1"></div>
            <div 
              className="w-10 h-10 bg-[#F4BF4B] transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
              style={{ WebkitMaskImage: 'url(/symbols/svg3.svg)', maskImage: 'url(/symbols/svg3.svg)', WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}
            ></div>
          </div>
          {/* Shape 4 - Naughty */}
          <div className="group flex flex-col items-center gap-2 cursor-pointer" title="Naughty">
            <div className="w-8 h-8 border-4 border-[#F4BF4B] rounded-full transition-all duration-300 group-hover:translate-y-1 group-hover:translate-x-2 group-hover:rotate-12"></div>
            <div 
              className="w-10 h-10 bg-[#F4BF4B] transition-all duration-300 group-hover:-scale-x-100 group-hover:-rotate-12"
              style={{ WebkitMaskImage: 'url(/symbols/svg4.svg)', maskImage: 'url(/symbols/svg4.svg)', WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}
            ></div>
          </div>
          {/* Shape 5 - Timid/Shy */}
          <div className="group flex flex-col items-center gap-2 cursor-pointer" title="Shy">
            <div className="w-6 h-6 border-4 border-[#F4BF4B] rounded-full transition-all duration-300 group-hover:translate-y-3 group-hover:scale-75"></div>
            <div 
              className="w-10 h-10 bg-[#F4BF4B] transition-all duration-300 group-hover:scale-y-90 group-hover:scale-x-75 group-hover:opacity-80"
              style={{ WebkitMaskImage: 'url(/symbols/svg5.svg)', maskImage: 'url(/symbols/svg5.svg)', WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}
            ></div>
          </div>
          {/* Shape 6 - Zen/Calm */}
          <div className="group flex flex-col items-center gap-2 cursor-pointer" title="Zen">
            <div className="w-7 h-7 border-4 border-[#F4BF4B] rounded-full transition-all duration-1000 ease-in-out group-hover:-translate-y-4"></div>
            <div 
              className="w-10 h-10 bg-[#F4BF4B] transition-all duration-1000 ease-in-out group-hover:-translate-y-2 group-hover:scale-105"
              style={{ WebkitMaskImage: 'url(/symbols/svg6.svg)', maskImage: 'url(/symbols/svg6.svg)', WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}
            ></div>
          </div>
        </div>

      </div>
    </section>
  );
}
