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

const REVERSE_PARTNERS = [...PARTNERS].reverse();

export function PartnersSection() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full overflow-hidden bg-background border-b-2 border-struct py-24 flex flex-col items-center">
      
      {/* Inline styles for Marquee Animations */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 25s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 25s linear infinite;
        }
      `}</style>

      {/* Background grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--foreground) 1.5px, transparent 1.5px)',
          backgroundSize: '48px 48px',
          backgroundPosition: '0 0'
        }}
      />

      <div className="relative z-10 w-full flex flex-col items-center gap-12 md:gap-16 animate-fade-in">
        <div className="inline-flex flex-col items-center">
          <span className="inline-flex items-center gap-2 border-2 border-foreground bg-cream px-4 py-2 font-mono text-[11px] tracking-widest2 text-foreground uppercase font-bold mb-4">
            {t('partners.badge') !== 'partners.badge' ? t('partners.badge') : 'Backed By Trust'}
          </span>
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-foreground text-center">
            {t('partners.title') !== 'partners.title' ? t('partners.title') : 'OUR PARTNERS & ECOSYSTEM'}
          </h2>
        </div>

        {/* --- DESKTOP VIEW: Text Wall Container --- */}
        <div className="hidden md:block w-full max-w-[1480px] px-10 z-20 mt-4">
          <div className="flex flex-wrap justify-between items-center gap-y-6 lg:gap-y-10 w-full text-center">
            {PARTNERS.map((partner, index) => (
              <React.Fragment key={`partner-desktop-${index}`}>
                <a 
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group block"
                >
                  <h3 className="text-5xl lg:text-6xl xl:text-[5rem] leading-none font-black font-sans uppercase tracking-tight text-foreground transition-all duration-200 group-hover:text-transparent group-hover:[-webkit-text-stroke:2px_var(--color-struct)] xl:group-hover:[-webkit-text-stroke:3px_var(--color-struct)] z-10 relative">
                    {partner.name}
                  </h3>

                  {/* Pop-up Image Card */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-40 md:w-[22rem] md:h-48 bg-relief border-4 border-struct shadow-[8px_8px_0px_0px_var(--color-struct)] opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 scale-75 group-hover:scale-100 z-[60] flex items-center justify-center p-6 md:p-8 rotate-0 group-hover:-rotate-3 group-hover:z-[60]">
                    <div 
                      className={`relative w-full h-full ${partner.invert ? 'brightness-0' : ''}`}
                      style={partner.scale ? { transform: `scale(${partner.scale})` } : {}}
                    >
                      <Image 
                        src={partner.logo} 
                        alt={partner.name} 
                        fill 
                        className="object-contain"
                      />
                    </div>
                  </div>
                </a>
                
                {/* Separator Slash */}
                {index < PARTNERS.length - 1 && (
                  <span className="text-5xl lg:text-6xl xl:text-[5rem] leading-none font-black text-foreground/20 select-none px-4 lg:px-8">
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* --- MOBILE VIEW: Auto-Scrolling Marquee --- */}
        <div className="flex md:hidden flex-col gap-4 w-full z-20 py-4">
          
          {/* Top Row (Scrolls Left) */}
          <div className="flex overflow-hidden whitespace-nowrap w-full">
            <div className="flex w-max animate-marquee-left">
              {[...PARTNERS, ...PARTNERS].map((partner, index) => (
                <a 
                  key={`marquee-top-${index}`}
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 flex items-center justify-center w-48 aspect-[1.6/1] bg-relief border-2 border-struct mx-2 p-4 transition-transform active:scale-95 shadow-[4px_4px_0px_0px_var(--color-struct)]"
                >
                  <div 
                    className={`relative w-full h-full ${partner.invert ? 'brightness-0' : ''}`}
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

          {/* Bottom Row (Scrolls Right) */}
          <div className="flex overflow-hidden whitespace-nowrap w-full">
            <div className="flex w-max animate-marquee-right">
              {[...REVERSE_PARTNERS, ...REVERSE_PARTNERS].map((partner, index) => (
                <a 
                  key={`marquee-bottom-${index}`}
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 flex items-center justify-center w-48 aspect-[1.6/1] bg-relief border-2 border-struct mx-2 p-4 transition-transform active:scale-95 shadow-[4px_4px_0px_0px_var(--color-struct)]"
                >
                  <div 
                    className={`relative w-full h-full ${partner.invert ? 'brightness-0' : ''}`}
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

      </div>
    </section>
  );
}
