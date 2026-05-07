import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { NbButton } from './NbButton';
import { useTranslation } from '@/hooks/useTranslation';



export function FoundationSection() {
  const { t } = useTranslation();

  return (
    <section className="relative isolate w-full overflow-hidden bg-background py-20 lg:min-h-screen lg:flex lg:items-center lg:py-24">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Copywriting */}
          <div className="flex flex-col items-start gap-8">
            {/* Badge */}
            <div className="inline-flex">
              <span className="inline-flex items-center gap-2 border-nb border-foreground bg-cream px-4 py-2 font-mono text-[11px] tracking-widest2 text-foreground uppercase font-bold">
                {t('foundation.badge') !== 'foundation.badge' ? t('foundation.badge') : 'ENI Foundation'}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-sans text-6xl md:text-8xl lg:text-9xl font-bold uppercase leading-[0.95] tracking-tighter text-foreground text-balance">
              {t('foundation.headlinePart1') !== 'foundation.headlinePart1' ? t('foundation.headlinePart1') : 'BUILT FOR'}<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--foreground)' }}>{t('foundation.headlineHighlight') !== 'foundation.headlineHighlight' ? t('foundation.headlineHighlight') : 'REALITY.'}</span>
            </h2>

            {/* Body */}
            <div className="flex flex-col gap-5 max-w-xl font-mono text-sm sm:text-base lg:text-lg leading-relaxed text-foreground/80 mt-2">
              <p>
                {t('foundation.body1') !== 'foundation.body1' ? t('foundation.body1') : "ENI wasn't built to launch a token. It was built to run real commercial systems at enterprise scale."}
              </p>
              <p>
                {t('foundation.body2') !== 'foundation.body2' ? t('foundation.body2') : 'Full EVM compatibility, 1-click AppChains, and native MiCA/GDPR compliance. Complete with an SDK, API suite, and governance templates from day one.'}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 w-full">
              <NbButton
                href="https://scan.eniac.network/"
                external
                variant="primary-yellow"
                size="lg"
                className="w-full sm:w-auto justify-center"
              >
                {t('foundation.cta') !== 'foundation.cta' ? t('foundation.cta') : 'EXPLORE ENI MAINNET'}
                <span
                  aria-hidden="true"
                  className="ml-2"
                >
                  →
                </span>
              </NbButton>
            </div>
          </div>

          {/* Right Column: Asset */}
          <div className="flex items-center justify-center relative w-full h-[320px] lg:h-[500px] pointer-events-none">
            {/* Animated SVG Asset */}
            <AnimatedEniAseanLogo />
          </div>

        </div>

        {/* Stats / Interactive Cards */}
        <div className="mt-20 lg:mt-32 w-full border border-foreground flex flex-col">
          {/* Top Row: 4 Proof Cards */}
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-foreground">
            {[
              { 
                titleKey: 'foundation.stat1Title', defaultTitle: '3M+ ADDRESSES', 
                descKey: 'foundation.stat1Desc', defaultDesc: 'Registered on the network', 
                icon: 'svg1.svg',
                containerClasses: 'hover:bg-foreground hover:text-background',
                iconClasses: 'group-hover:bg-background'
              },
              { 
                titleKey: 'foundation.stat2Title', defaultTitle: '200k+ DAILY TX', 
                descKey: 'foundation.stat2Desc', defaultDesc: 'Operating at scale', 
                icon: 'svg3.svg',
                containerClasses: 'hover:bg-foreground hover:text-background',
                iconClasses: 'group-hover:bg-background'
              },
              { 
                titleKey: 'foundation.stat3Title', defaultTitle: 'NTT PARTNERSHIP', 
                descKey: 'foundation.stat3Desc', defaultDesc: 'Fortune 500 backed', 
                icon: 'svg4.svg',
                url: 'https://www.nttdata.com/global/en/',
                containerClasses: 'hover:bg-[#00E5FF] hover:text-black hover:scale-105 hover:-rotate-2 hover:shadow-[8px_8px_0px_#000] hover:z-10',
                iconClasses: 'group-hover:bg-black',
                titleClasses: 'group-hover:italic group-hover:font-black'
              },
              { 
                titleKey: 'foundation.stat4Title', defaultTitle: 'CERTIK AUDITED', 
                descKey: 'foundation.stat4Desc', defaultDesc: 'Zero critical issues', 
                icon: 'svg5.svg',
                url: 'https://www.certik.com/',
                containerClasses: 'hover:bg-[#FF0055] hover:text-white hover:scale-105 hover:rotate-2 hover:shadow-[-8px_8px_0px_#000] hover:z-10',
                iconClasses: 'group-hover:bg-white',
                titleClasses: 'group-hover:italic group-hover:font-black'
              }
            ].map((stat, i) => {
              const Wrapper = stat.url ? 'a' : 'div';
              const wrapperProps = stat.url ? { href: stat.url, target: '_blank', rel: 'noopener noreferrer' } : {};
              
              return (
                <Wrapper 
                  key={i} 
                  {...wrapperProps}
                  className={`group relative flex-1 p-6 lg:p-8 min-h-[180px] lg:min-h-[220px] flex flex-col cursor-pointer transition-all duration-300 ${stat.containerClasses}`}
                >
                  <h3 className={`font-sans text-2xl lg:text-3xl font-normal uppercase leading-none tracking-tight mb-8 text-foreground group-hover:text-current transition-all duration-300 ${stat.titleClasses || ''}`}>
                    {t(stat.titleKey) !== stat.titleKey ? t(stat.titleKey) : stat.defaultTitle}
                  </h3>
                  <div className="mt-auto flex items-end justify-between font-sans text-sm md:text-base">
                    <span className="text-foreground/80 group-hover:text-current opacity-90 transition-colors pr-4 leading-tight">
                      {t(stat.descKey) !== stat.descKey ? t(stat.descKey) : stat.defaultDesc}
                    </span>
                    <div 
                      className={`w-8 h-8 shrink-0 transform transition-all duration-500 group-hover:rotate-90 group-hover:scale-125 bg-foreground ${stat.iconClasses}`}
                      style={{
                        WebkitMaskImage: `url('/symbols/${stat.icon}')`,
                        WebkitMaskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskImage: `url('/symbols/${stat.icon}')`,
                        maskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center',
                      }}
                    />
                  </div>
                </Wrapper>
              );
            })}
          </div>

          {/* Bottom Row: Bridge Note */}
          <div className="bg-foreground text-background p-8 lg:px-10 lg:py-12 border-t border-foreground relative overflow-hidden group/note">
            <p className="font-mono text-sm md:text-base lg:text-lg leading-relaxed max-w-5xl relative z-10">
              <span className="font-bold text-accent">{t('foundation.bridgeNoteBadge') !== 'foundation.bridgeNoteBadge' ? t('foundation.bridgeNoteBadge') : 'BRIDGE NOTE:'}</span>{' '}
              {t('foundation.bridgeNotePrefix') !== 'foundation.bridgeNotePrefix' ? t('foundation.bridgeNotePrefix') : "ENI's"}{' '}
              <span className="text-[#00E5FF]">{t('foundation.bridgeNoteHigh1') !== 'foundation.bridgeNoteHigh1' ? t('foundation.bridgeNoteHigh1') : '3.2M addresses'}</span>{' '}
              {t('foundation.bridgeNoteMid') !== 'foundation.bridgeNoteMid' ? t('foundation.bridgeNoteMid') : 'represent the total network. ASEAN Labs operates the curated, executing layer inside it —'}{' '}
              <span className="text-[#00E5FF]">{t('foundation.bridgeNoteHigh2') !== 'foundation.bridgeNoteHigh2' ? t('foundation.bridgeNoteHigh2') : '100,000+ community members'}</span>{' '}
              {t('foundation.bridgeNoteSuffix') !== 'foundation.bridgeNoteSuffix' ? t('foundation.bridgeNoteSuffix') : 'who are active, onboarded, and building.'}
            </p>
            
            {/* Corner Branded Icon */}
            <div 
              className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 w-10 h-10 lg:w-14 lg:h-14 bg-accent opacity-90 transition-all duration-1000 group-hover/note:rotate-180 group-hover/note:scale-110"
              style={{
                WebkitMaskImage: "url('/symbols/svg2.svg')",
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: "url('/symbols/svg2.svg')",
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
              }}
            />
          </div>
        </div>

        {/* Core Architecture Pillars */}
        <div className="mt-12 lg:mt-16 w-full bg-foreground text-background border border-foreground px-6 py-16 lg:px-12 lg:py-24">
          <h2 className="text-center font-sans text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-widest text-accent mb-20">
            {t('foundation.archTitle') !== 'foundation.archTitle' ? t('foundation.archTitle') : 'NETWORK ARCHITECTURE'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-12 gap-y-16 relative">
            {/* Dashed line behind circles - only visible on xl screens */}
            <div className="hidden xl:block absolute top-4 left-[12.5%] right-[12.5%] h-[1px] border-t border-dashed border-accent/50 z-0" />
            
            {[
              {
                num: '01',
                titleKey: 'foundation.arch01Title', defaultTitle: '20K+ TPS — Unlimited throughput',
                descKey: 'foundation.arch01Desc', defaultDesc: 'Parallel computing + three-layer composite consensus (EPoS + VRF + ETurboBFT). Each AppChain independently exceeds 10,000 TPS. Cluster scale unlimited.',
                icon: 'tps.svg'
              },
              {
                num: '02',
                titleKey: 'foundation.arch02Title', defaultTitle: '~0.01s — Near-instant finality',
                descKey: 'foundation.arch02Desc', defaultDesc: 'RWA settlement, high-frequency clearing, payments, IoT event processing. Use cases ENI was designed for — not adapted to.',
                icon: 'Instant.svg'
              },
              {
                num: '03',
                titleKey: 'foundation.arch03Title', defaultTitle: 'Full EVM — One-click AppChains',
                descKey: 'foundation.arch03Desc', defaultDesc: 'Existing contracts migrate at zero cost. SDK, API, governance templates, and monitoring all included.',
                icon: 'evm.svg'
              },
              {
                num: '04',
                titleKey: 'foundation.arch04Title', defaultTitle: 'MiCA · GDPR · PDPO — Compliance built in',
                descKey: 'foundation.arch04Desc', defaultDesc: 'Enterprise compliance ships with the chain — not retrofitted after deployment.',
                icon: 'COmpliance.svg'
              }
            ].map((pillar, idx) => {
              const displayTitle = t(pillar.titleKey) !== pillar.titleKey ? t(pillar.titleKey) : pillar.defaultTitle;
              const displayDesc = t(pillar.descKey) !== pillar.descKey ? t(pillar.descKey) : pillar.defaultDesc;
              const [titlePart1, titlePart2] = displayTitle.split(' — ');
              
              return (
              <div key={idx} className="flex flex-col relative z-10 w-full">
                {/* Circle Number */}
                <div className="w-8 h-8 rounded-full border-2 border-accent bg-foreground text-accent flex items-center justify-center font-mono text-xs font-bold mb-10 mx-auto">
                  {pillar.num}
                </div>
                
                {/* Icon */}
                <div className="w-40 h-40 mb-10 mx-auto flex items-center justify-center">
                  <img 
                    src={`/network arch/${pillar.icon}`} 
                    alt={pillar.defaultTitle}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Title */}
                <h3 className="font-sans text-lg font-bold text-accent mb-4 text-left">
                  <span className="text-xl">{titlePart1}</span>
                  <br />
                  <span className="font-medium opacity-90">{titlePart2}</span>
                </h3>
                
                {/* Description */}
                <p className="font-sans text-sm leading-relaxed text-background/80 text-left pr-4">
                  {displayDesc}
                </p>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedEniAseanLogo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const groups = containerRef.current.querySelectorAll('.float-group');
    
    groups.forEach((group, i) => {
      // Randomize to create natural floating sequence
      const duration = 2.5 + Math.random() * 2; // 2.5s to 4.5s
      const delay = Math.random() * -2; // Start at different phases immediately
      const yOffset = 4 + Math.random() * 4; // 4px to 8px float
      const isReversed = Math.random() > 0.5; // Random initial direction for 'mirror' effect
      
      gsap.to(group, {
        y: isReversed ? -yOffset : yOffset,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay
      });
    });
    
    return () => {
      groups.forEach(g => gsap.killTweensOf(g));
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-[420px] aspect-square flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 177 104" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible scale-125 lg:scale-[1.35]">
        {/* Top Left Decoration */}
        <g className="float-group origin-center">
          <path d="M19.3877 0.5C13.3756 0.5 8.50119 5.37372 8.50098 11.3857C8.50098 17.398 13.3755 22.2725 19.3877 22.2725C25.3997 22.2722 30.2734 17.3978 30.2734 11.3857C30.2732 5.37385 25.3996 0.500214 19.3877 0.5ZM19.3877 2.34668C24.3799 2.34689 28.4265 6.39356 28.4268 11.3857C28.4268 16.378 24.38 20.4256 19.3877 20.4258C14.3953 20.4258 10.3477 16.3781 10.3477 11.3857C10.3479 6.39343 14.3954 2.34668 19.3877 2.34668ZM19.3877 10.4629C18.8779 10.4629 18.4641 10.876 18.4639 11.3857C18.4639 11.8957 18.8777 12.3096 19.3877 12.3096C19.8975 12.3094 20.3105 11.8956 20.3105 11.3857C20.3103 10.8761 19.8973 10.4631 19.3877 10.4629Z" fill="#F4BF4B" stroke="black"/>
        </g>
        {/* Top Right Decoration */}
        <g className="float-group origin-center">
          <path d="M157.794 10.2261C161.794 11.3003 164.21 15.3278 163.326 19.331L160.108 18.4667C160.52 16.2396 159.157 14.0352 156.932 13.4375C154.707 12.8399 152.423 14.0651 151.663 16.1987L148.445 15.3344C149.686 11.4273 153.795 9.15206 157.794 10.2261ZM155.664 1.30083C155.253 3.5279 156.616 5.73243 158.841 6.33002C161.066 6.92751 163.349 5.70223 164.109 3.56885L167.327 4.4331C166.126 8.21455 162.238 10.4678 158.364 9.63482L157.978 9.54141L157.597 9.42889C153.827 8.2084 151.592 4.31084 152.446 0.436587L155.664 1.30083Z" fill="#F4BF4B" stroke="black" strokeWidth="0.708509"/>
        </g>
        {/* Bottom Right Decoration */}
        <g className="float-group origin-center">
          <path d="M158.984 79.3963L161.804 85.2016L163.915 79.1027L166.691 80.0633L164.58 86.1622L170.386 83.3419L171.669 85.9841L165.864 88.8044L171.963 90.9149L171.002 93.691L164.903 91.5804L167.724 97.3857L165.082 98.6693L162.261 92.8641L160.151 98.963L157.375 98.0023L159.485 91.9034L153.68 94.7238L152.396 92.0816L158.202 89.2612L152.103 87.1507L153.063 84.3747L159.162 86.4852L156.342 80.68L158.984 79.3963Z" fill="#F4BF4B" stroke="black"/>
        </g>
        {/* Bottom Left Decoration */}
        <g className="float-group origin-center">
          <path d="M25.7786 78.6017L16.4683 83.5841L21.4058 92.8104L17.8405 94.7184L13.872 87.3028L16.371 79.0498L23.8706 75.0364L25.7786 78.6017ZM13.5998 78.224L11.1082 86.4527L3.68406 90.4257L1.77605 86.8604L10.995 81.9268L6.01644 72.6239L9.58176 70.7159L13.5998 78.224Z" fill="#F4BF4B" stroke="black"/>
        </g>
        {/* Left Circle (ASEAN Labs) */}
        <g className="float-group origin-center">
          <circle cx="65.0611" cy="50.3195" r="35" transform="rotate(18.0154 65.0611 50.3195)" fill="black"/>
          <circle cx="64.7252" cy="48.1086" r="34.5" transform="rotate(18.0154 64.7252 48.1086)" fill="#F4BF4B" stroke="black"/>
          <path d="M58.1688 32.6992C58.4406 31.8635 59.4053 31.499 60.1647 31.9353L77.2337 41.771C78.5285 42.5145 77.887 44.4871 76.4022 44.3279L56.816 42.232C55.9453 42.1382 55.3799 41.2747 55.6513 40.4402L58.1684 32.7004L58.1688 32.6992ZM52.9639 48.7036C53.2357 47.8679 54.2004 47.5033 54.9598 47.9397L72.0288 57.7754C73.3236 58.5188 72.6821 60.4914 71.1973 60.3322L51.6111 58.2363C50.7404 58.1425 50.175 57.2791 50.4464 56.4446L52.9635 48.7048L52.9639 48.7036ZM77.0359 57.6107C77.7952 58.047 78.7635 57.6715 79.0317 56.8468L81.5196 49.1969C81.7914 48.3612 81.2256 47.4989 80.3549 47.4051L60.8425 45.2889C59.3581 45.1285 58.713 47.112 60.0109 47.8457L77.0355 57.6119L77.0359 57.6107Z" fill="black"/>
        </g>
        {/* Right Circle (ENI) */}
        <g className="float-group origin-center">
          <circle cx="118.323" cy="50.0658" r="35" transform="rotate(-7.14435 118.323 50.0658)" fill="black"/>
          <circle cx="117.081" cy="48.2054" r="34.5" transform="rotate(-7.14435 117.081 48.2054)" fill="#F4BF4B" stroke="black"/>
          <g clipPath="url(#clip0_1639_2095)">
            <path fillRule="evenodd" clipRule="evenodd" d="M130.389 33.4195C129.669 33.509 129.364 34.0542 129.336 34.7296C129.243 36.9672 128.786 39.1518 127.926 41.2225C127.118 43.1675 125.91 44.9266 124.315 46.2958C123.821 46.72 123.333 47.0901 122.82 47.4841C122.307 47.878 122.304 48.1642 122.367 48.7051C122.433 49.2771 122.812 49.4834 123.313 49.6917C125.134 50.4493 126.511 51.2592 127.929 52.6459C128.795 53.4926 129.54 54.3988 130.196 55.4215C131.159 56.9207 131.881 58.5226 132.391 60.2531C132.517 60.682 132.779 60.9978 133.165 61.168C133.401 61.272 133.649 61.2614 133.914 61.2282L139.869 60.4818C140.087 60.4544 140.296 60.3598 140.403 60.1834C140.529 59.9736 140.515 59.7206 140.44 59.4779C139.552 56.6312 137.723 54.2388 135.408 52.3837C133.963 51.2263 132.358 50.3268 130.624 49.6695C128.56 48.8873 126.399 48.4575 124.193 48.4214C124.063 48.4192 123.968 48.4069 123.866 48.3745C127.327 47.4849 130.507 45.656 132.931 43.0476C134.869 40.9605 136.292 38.4188 136.91 35.6336C137.077 34.8761 137.181 34.1497 137.208 33.3748C137.222 32.9606 136.899 32.6106 136.456 32.6657L130.389 33.4195ZM126.754 50.111C126.501 49.9561 126.607 49.5687 126.901 49.6062C132.166 50.2766 136.596 55.1094 138.831 58.3745C139.062 58.7129 138.847 59.1675 138.44 59.2185L134.268 59.7414C133.979 59.7776 133.713 59.5871 133.636 59.3064C132.936 56.7293 130.729 52.5425 126.754 50.111ZM135.306 34.2141C135.713 34.1631 136.034 34.5506 135.893 34.9356C134.533 38.6512 131.433 44.428 126.496 46.377C126.22 46.4859 126.023 46.1365 126.23 45.924C129.481 42.5868 130.587 37.9847 130.629 35.3146C130.634 35.0237 130.845 34.7733 131.134 34.7371L135.306 34.2141Z" fill="black"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M101.431 37.0483C102.151 36.9573 102.581 37.4103 102.775 38.0579C103.417 40.2035 104.399 42.2076 105.744 44.002C107.007 45.6875 108.612 47.094 110.495 48.0271C111.079 48.3162 111.643 48.5544 112.238 48.8096C112.832 49.0648 112.905 49.3414 112.978 49.8811C113.055 50.4518 112.738 50.7452 112.305 51.0705C110.727 52.2542 109.592 53.379 108.56 55.0728C107.93 56.1071 107.432 57.169 107.048 58.322C106.486 60.0124 106.181 61.7431 106.114 63.5459C106.097 63.9927 105.922 64.3633 105.59 64.6235C105.387 64.7825 105.144 64.8335 104.879 64.8667L98.9241 65.613C98.7056 65.6404 98.4795 65.6004 98.3329 65.4557C98.1587 65.2835 98.1095 65.035 98.1229 64.7812C98.2803 61.8034 99.4626 59.0336 101.249 56.6644C102.363 55.1862 103.696 53.9185 105.214 52.8536C107.021 51.5862 109.01 50.6363 111.138 50.0569C111.263 50.0227 111.353 49.9873 111.444 49.9307C107.87 49.9229 104.337 48.9354 101.345 47.0058C98.9506 45.4618 96.9443 43.3499 95.659 40.8031C95.3093 40.1105 95.03 39.4321 94.8126 38.6878C94.6965 38.29 94.9231 37.8711 95.3663 37.8151L101.431 37.0483ZM109.073 52.3263C109.28 52.1138 109.082 51.7644 108.806 51.8734C103.87 53.8224 100.769 59.5992 99.4099 63.3147C99.269 63.6998 99.5898 64.0872 99.9966 64.0362L104.169 63.5133C104.457 63.4771 104.669 63.2267 104.674 62.9358C104.716 60.2656 105.822 55.6635 109.073 52.3263ZM96.8625 39.0319C96.4557 39.0829 96.2404 39.5375 96.472 39.8759C98.7064 43.141 103.137 47.9738 108.401 48.6442C108.696 48.6817 108.801 48.2942 108.548 48.1394C104.574 45.7078 102.367 41.521 101.666 38.944C101.59 38.6633 101.323 38.4728 101.035 38.509L96.8625 39.0319Z" fill="black"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M109.539 36.0331C110.25 35.9438 110.732 36.4767 110.86 37.1454C111.163 38.7248 111.565 40.2511 112.099 41.7664C113.165 44.7336 114.814 47.1885 117.23 49.223C115.03 52.307 114.149 55.5562 114.007 59.2802C113.967 60.3101 113.984 61.3003 114.029 62.33C114.043 62.6492 114.01 62.9481 113.851 63.2237C113.68 63.5193 113.4 63.7929 113.007 63.8426L107.871 64.4908C107.623 64.5221 107.379 64.4558 107.225 64.2711C107.093 64.1133 107.032 63.8908 107.035 63.6674C107.071 60.6434 107.839 57.6403 109.465 55.0779C110.058 54.1418 110.754 53.3266 111.576 52.5813C113.039 51.2576 114.659 50.2142 116.494 49.3177C114.716 48.9557 113.067 48.4576 111.463 47.7076C110.635 47.3206 109.88 46.882 109.145 46.3409C106.801 44.5831 105.159 42.0183 104.148 39.2951C103.933 38.7148 103.743 38.1688 103.595 37.5729C103.495 37.1716 103.766 36.7586 104.193 36.7051L109.539 36.0331ZM114.045 52.4466C114.158 52.1825 113.864 51.921 113.636 52.0963C109.897 54.9794 108.698 60.0445 108.49 62.6437C108.476 62.8175 108.626 62.9556 108.799 62.934L112.374 62.4859C112.521 62.4675 112.628 62.3399 112.621 62.1924C112.519 60.076 112.626 55.7561 114.045 52.4466ZM105.526 37.947C105.353 37.9687 105.241 38.1398 105.298 38.3047C106.141 40.772 108.553 45.3847 112.888 47.2556C113.152 47.3693 113.373 47.0433 113.198 46.8153C111.006 43.9583 109.837 39.7984 109.412 37.7225C109.383 37.5779 109.248 37.4806 109.101 37.4989L105.526 37.947Z" fill="black"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M122.211 34.4473C121.5 34.5363 121.165 35.1716 121.206 35.8513C121.302 37.4565 121.289 39.0349 121.145 40.6351C120.845 43.7737 119.852 46.5596 118.013 49.1275C120.907 51.5731 122.562 54.5043 123.619 58.078C123.912 59.0663 124.14 60.0301 124.35 61.0389C124.416 61.3516 124.521 61.6332 124.744 61.861C124.982 62.1052 125.321 62.3013 125.714 62.2525L130.851 61.6129C131.099 61.5821 131.319 61.4577 131.423 61.2406C131.512 61.0552 131.516 60.8245 131.458 60.6087C130.677 57.6871 129.191 54.9666 126.983 52.8847C126.177 52.124 125.302 51.5059 124.321 50.9865C122.577 50.0646 120.749 49.4536 118.749 49.0376C120.383 48.2481 121.859 47.3581 123.228 46.2356C123.935 45.6562 124.558 45.0449 125.137 44.3389C126.974 42.0572 127.932 39.1666 128.24 36.278C128.306 35.6624 128.355 35.0866 128.351 34.4725C128.349 34.0591 127.984 33.7257 127.557 33.7792L122.211 34.4473ZM121.896 51.4652C121.721 51.2372 121.941 50.9111 122.205 51.0249C126.541 52.8958 128.952 57.5084 129.796 59.9758C129.852 60.1407 129.74 60.3118 129.567 60.3335L125.992 60.7815C125.846 60.7999 125.711 60.7026 125.681 60.5579C125.257 58.482 124.087 54.3222 121.896 51.4652ZM126.572 35.3117C126.745 35.29 126.896 35.4282 126.882 35.6019C126.673 38.2011 125.475 43.2663 121.735 46.1493C121.508 46.3247 121.213 46.0632 121.326 45.799C122.745 42.4895 122.852 38.1697 122.751 36.0533C122.744 35.9058 122.851 35.7782 122.997 35.7598L126.572 35.3117Z" fill="black"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M119.321 34.8078C119.942 34.73 120.321 35.2414 120.365 35.8369C120.481 37.4191 120.497 38.974 120.369 40.5551C120.152 43.219 119.391 45.8886 117.931 48.1491L117.588 48.6805C116.429 47.6635 115.437 46.5174 114.63 45.2031C113.996 44.173 113.484 43.1177 113.062 41.9852C112.449 40.3384 112 38.535 111.7 36.8017C111.602 36.2346 111.914 35.7362 112.526 35.6595L119.321 34.8078ZM113.631 36.6638C113.181 36.7203 112.862 37.1239 112.95 37.5696C113.421 39.9637 115.069 45.4396 117.445 46.6269C119.388 44.5713 119.62 38.9704 119.524 36.5125C119.511 36.1933 119.226 35.9626 118.909 36.0023L113.631 36.6638Z" fill="black"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M117.716 49.6681C119.382 51.1563 120.615 52.7692 121.575 54.7515C122.063 55.7747 122.451 56.7927 122.761 57.8842C123.098 59.0698 123.372 60.2275 123.57 61.446C123.659 61.9936 123.302 62.5489 122.714 62.6232L116.051 63.4608C115.634 63.513 115.262 63.2531 115.079 62.9209C114.973 62.7278 114.921 62.5139 114.914 62.2982L114.862 60.8215C114.72 56.796 115.398 53.0249 117.716 49.6681ZM118.071 51.6277C116.062 53.3647 115.816 59.0779 115.951 61.5142C115.976 61.9677 116.384 62.2802 116.835 62.2238L122.113 61.5623C122.43 61.5225 122.649 61.2285 122.583 60.9161C122.069 58.5105 120.462 53.1402 118.071 51.6277Z" fill="black"/>
          </g>
        </g>
        
        <defs>
          <clipPath id="clip0_1639_2095">
            <rect width="42.6512" height="28" fill="white" transform="translate(94.625 37.918) rotate(-7.14435)"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
