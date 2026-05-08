import React from 'react';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';

const PARTNERS = [
  { name: 'Bitget', logo: '/partners/Bitget C 3.png', link: 'https://web3.bitget.com/en' },
  { name: 'Certik', logo: '/partners/Certik C 3.png', link: 'https://www.certik.com/' },
  { name: 'DAOaaS', logo: '/partners/DAOaaS C 3.png', link: 'https://daoaas.io/' },
  { name: 'Debox', logo: '/partners/Debox C 3.png', link: 'https://debox.pro/' },
  { name: 'ENI', logo: '/partners/ENI logo white-04.svg', invert: true, scale: 0.7, link: 'https://eni.top/' },
  { name: 'Metamask', logo: '/partners/Metamask.svg', link: 'https://metamask.io/' },
  { name: 'Orbiter', logo: '/partners/Orbiter C 3.png', link: 'https://orbiter.finance/trade/Arbitrum' },
  { name: 'AVE', logo: '/partners/ave C 3.png', link: 'https://ave.ai/' },
  { name: 'Emurgo', logo: '/partners/emurga C 3.png', link: 'https://www.emurgo.io/' },
  { name: 'Filecoin', logo: '/partners/filecoin C 3.png', link: 'https://filecoin.io/' },
  { name: 'GMO', logo: '/partners/gmo C 3.png', link: 'https://group.gmo/en/' },
  { name: 'Safepal', logo: '/partners/safepal.svg', link: 'https://www.safepal.com/en/' },
];

// Shuffle for the bottom row so it doesn't look identical
const BOTTOM_PARTNERS = [...PARTNERS].reverse();

export function PartnersSection() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full overflow-hidden bg-background border-b-2 border-black py-20 flex flex-col items-center">
      
      {/* Background grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--foreground) 1.5px, transparent 1.5px)',
          backgroundSize: '48px 48px',
          backgroundPosition: '0 0'
        }}
      />

      <div className="relative z-10 w-full flex flex-col items-center gap-8 md:gap-12 animate-fade-in">
        <div className="inline-flex flex-col items-center">
          <span className="inline-flex items-center gap-2 border-2 border-foreground bg-cream px-4 py-2 font-mono text-[11px] tracking-widest2 text-foreground uppercase font-bold shadow-[4px_4px_0_0_#000] mb-4">
            {t('partners.badge') !== 'partners.badge' ? t('partners.badge') : 'Backed By Trust'}
          </span>
          <h2 className="font-sans text-3xl md:text-5xl font-bold uppercase tracking-tighter text-foreground text-center">
            {t('partners.title') !== 'partners.title' ? t('partners.title') : 'OUR PARTNERS & ECOSYSTEM'}
          </h2>
        </div>

        {/* Fixed Grid Container */}
        <div className="w-full max-w-[1480px] px-6 md:px-10 z-20 mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 lg:gap-8 w-full">
            {PARTNERS.map((partner, index) => (
              <a 
                key={`partner-${index}`} 
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full aspect-[2.2/1] bg-white border-2 border-black shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:translate-x-1 hover:shadow-none transition-all cursor-pointer p-2 md:p-3 group"
              >
                <div 
                  className={`relative w-full h-full opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0 ${partner.invert ? 'brightness-0' : ''}`}
                  style={partner.scale ? { transform: `scale(${partner.scale})` } : {}}
                >
                  <Image 
                    src={partner.logo} 
                    alt={partner.name} 
                    fill 
                    className="object-contain"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
