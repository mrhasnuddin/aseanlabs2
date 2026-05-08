import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '@/hooks/useTranslation';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: '01',
    titleKey: 'services.svc01Title', defaultTitle: 'COMMUNITY',
    descKey: 'services.svc01Desc', defaultDesc: 'Verified, active participants who generate on-chain behavior. Not Telegram member counts.',
    subKey: 'services.svc01Sub', defaultSub: 'Token Launch · Ambassadors · Node Activation',
  },
  {
    id: '02',
    titleKey: 'services.svc02Title', defaultTitle: 'CONSULTING',
    descKey: 'services.svc02Desc', defaultDesc: 'Product positioning, GTM architecture, competitive strategy. Grounded in regional market reality.',
    subKey: 'services.svc02Sub', defaultSub: 'GTM Strategy · Token Architecture · Positioning',
  },
  {
    id: '03',
    titleKey: 'services.svc03Title', defaultTitle: 'CONTENT & CREATIVE',
    descKey: 'services.svc03Desc', defaultDesc: 'Multilingual infrastructure built for the actual audience — not translated after the fact.',
    subKey: 'services.svc03Sub', defaultSub: 'EN · CN · MY · TH · JP · KR',
  },
  {
    id: '04',
    titleKey: 'services.svc04Title', defaultTitle: 'DESIGN',
    descKey: 'services.svc04Desc', defaultDesc: 'Brand and visual systems built to hold from pre-launch to mainnet, whitepaper to exchange listing.',
    subKey: 'services.svc04Sub', defaultSub: 'Brand Identity · UI/UX · Visual Systems',
  },
  {
    id: '05',
    titleKey: 'services.svc05Title', defaultTitle: 'DEVELOPMENT',
    descKey: 'services.svc05Desc', defaultDesc: 'Smart contracts, AppChain config, integration, and full deployment from testnet to live mainnet.',
    subKey: 'services.svc05Sub', defaultSub: 'Smart Contracts · AppChain · Mainnet Deploy',
  },
  {
    id: '06',
    titleKey: 'services.svc06Title', defaultTitle: 'EVENTS & ACTIVATION',
    descKey: 'services.svc06Desc', defaultDesc: '150+ events. 5,000+ in-person attendees. Online and offline. Regional and international.',
    subKey: 'services.svc06Sub', defaultSub: 'Conferences · AMAs · IRL Roadshows',
  },
  {
    id: '07',
    titleKey: 'services.svc07Title', defaultTitle: 'DAOaaS — GROWTH',
    descKey: 'services.svc07Desc', defaultDesc: "Task-based user acquisition via ENI's DAOaaS platform. Real users. No manufactured metrics.",
    subKey: 'services.svc07Sub', defaultSub: 'Xplan Points · Quests · On-Chain Rewards',
  },
  {
    id: '08',
    titleKey: 'services.svc08Title', defaultTitle: 'EDUCATION',
    descKey: 'services.svc08Desc', defaultDesc: 'Web3 literacy and technical onboarding for Southeast Asia, Japan, and Korea. Users who stay.',
    subKey: 'services.svc08Sub', defaultSub: 'Dev Workshops · KOL Training · Web3 Literacy',
  },
  {
    id: '09',
    titleKey: 'services.svc09Title', defaultTitle: 'EXPANSION',
    descKey: 'services.svc09Desc', defaultDesc: 'Market penetration across seven regional markets. Core cities to broad adoption. Executed, not planned.',
    subKey: 'services.svc09Sub', defaultSub: 'MY · SG · TH · VN · JP · KR · CN',
  },
];

const gridPlacements = [
  "lg:col-start-1 lg:row-start-1", // 01
  "lg:col-start-2 lg:row-start-1", // 02
  "lg:col-start-2 lg:row-start-2", // 03
  "lg:col-start-1 lg:row-start-2", // 04
  "lg:col-start-1 lg:row-start-3", // 05
  "lg:col-start-2 lg:row-start-3", // 06
  "lg:col-start-2 lg:row-start-4", // 07
  "lg:col-start-1 lg:row-start-4", // 08
  "lg:col-start-1 lg:row-start-5", // 09
];

export function ServicesSection() {
  const [authCode, setAuthCode] = useState('------');
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileProgressRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    setAuthCode(Math.random().toString(36).substring(2, 8).toUpperCase());
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP ANIMATION (Snake Timeline)
      mm.add("(min-width: 1024px)", () => {
        gsap.to({}, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 50%",
            end: "bottom 60%",
            scrub: true,
            onUpdate: (self) => {
              // We have 9 boxes and 8 lines, so 17 sequential activation steps
              const currentSegment = self.progress * 17;
              
              // Update boxes
              itemRefs.current.forEach((item, i) => {
                if (!item) return;
                const boxActivationProgress = i * 2;
                if (currentSegment >= boxActivationProgress) {
                  item.classList.add('is-active');
                } else {
                  item.classList.remove('is-active');
                }
              });
              
              // Update connecting lines
              lineRefs.current.forEach((line, i) => {
                if (!line) return;
                const lineStartProgress = i * 2 + 1;
                const lineEndProgress = i * 2 + 2;
                
                let fill = 0;
                if (currentSegment >= lineEndProgress) {
                  fill = 1;
                } else if (currentSegment >= lineStartProgress) {
                  fill = currentSegment - lineStartProgress;
                }
                
                const isBottomConnecting = i % 2 !== 0; // 1, 3, 5, 7
                if (isBottomConnecting) {
                  gsap.set(line, { scaleY: fill });
                } else {
                  gsap.set(line, { scaleX: fill });
                }
              });
            }
          }
        });
      });

      // MOBILE ANIMATION (Vertical Timeline)
      mm.add("(max-width: 1023px)", () => {
        gsap.to({}, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 50%",
            end: "bottom 50%",
            scrub: true,
            onUpdate: (self) => {
              // Fill mobile line
              if (mobileProgressRef.current) {
                gsap.set(mobileProgressRef.current, { scaleY: self.progress });
              }
              
              // Activate boxes sequentially
              const currentSegment = self.progress * 9;
              itemRefs.current.forEach((item, i) => {
                if (!item) return;
                if (currentSegment >= i) {
                  item.classList.add('is-active');
                } else {
                  item.classList.remove('is-active');
                }
              });
            }
          }
        });
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-10 w-full bg-black px-6 py-32 md:px-10 lg:py-48 overflow-hidden"
    >
      <style>{`
        .timeline-box {
          background-color: black;
          border: 1px solid var(--accent, #F4BF4B);
          color: white;
          transform: translate(0, 0);
          box-shadow: 0px 0px 0px #000;
          transition: all 0.3s ease;
        }
        .timeline-box.is-active, .timeline-box:hover {
          background-color: var(--accent, #F4BF4B);
          border-color: black;
          color: black;
          transform: translate(-6px, -6px);
          box-shadow: 8px 8px 0px #000;
          z-index: 20;
        }
        @media (min-width: 1024px) {
          .timeline-box.is-active, .timeline-box:hover {
            transform: translate(-10px, -10px);
            box-shadow: 12px 12px 0px #000;
          }
        }
        .box-number {
          background-color: black;
          border: 1px solid var(--accent, #F4BF4B);
          color: white;
          transition: all 0.3s ease;
        }
        .timeline-box.is-active .box-number, .timeline-box:hover .box-number {
          background-color: black;
          border-color: black;
          color: var(--accent, #F4BF4B);
        }
        .timeline-desc {
          color: rgba(255, 255, 255, 0.7);
        }
        .timeline-box.is-active .timeline-desc, .timeline-box:hover .timeline-desc {
          color: rgba(0, 0, 0, 0.8);
        }
        .timeline-accent-line {
          background-color: var(--accent, #F4BF4B);
        }
        .timeline-box.is-active .timeline-accent-line, .timeline-box:hover .timeline-accent-line {
          background-color: black;
        }
        .timeline-sub-line {
          background-color: #00E5FF;
        }
        .timeline-box.is-active .timeline-sub-line, .timeline-box:hover .timeline-sub-line {
          background-color: black;
        }
        .timeline-subtext {
          color: #00E5FF;
        }
        .timeline-box.is-active .timeline-subtext, .timeline-box:hover .timeline-subtext {
          color: black;
        }
      `}</style>

      <div className="mx-auto max-w-[1480px] relative">
        {/* Section header */}
        <div className="mb-32 lg:mb-48 flex flex-col xl:flex-row gap-16 xl:gap-24 items-stretch animate-fade-in">
          {/* Headline Column */}
          <div className="flex-1 max-w-4xl flex flex-col justify-between py-1">
            <div>
              <p className="mb-4 font-mono text-sm font-bold uppercase tracking-[0.4em] text-accent/80">{t('services.badge') !== 'services.badge' ? t('services.badge') : 'Services'}</p>
              <h2 className="mb-8 font-sans text-6xl font-bold uppercase leading-[0.9] tracking-tighter text-white md:text-8xl lg:text-9xl">
                {t('services.headlinePart1') !== 'services.headlinePart1' ? t('services.headlinePart1') : 'HOW WE'}<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px #F4BF4B' }}>{t('services.headlineHighlight') !== 'services.headlineHighlight' ? t('services.headlineHighlight') : 'HELP YOU WIN'}</span>
              </h2>
            </div>
            <p className="font-sans text-2xl md:text-3xl font-medium text-accent leading-tight max-w-2xl mt-12 xl:mt-0">
              {t('services.tagline') !== 'services.tagline' ? t('services.tagline') : 'Comprehensive execution for projects building on ENI.'}
            </p>
          </div>

          {/* Body & Highlight Column */}
          <div className="flex-1 flex flex-col justify-between py-1 max-w-3xl">
            {/* Body Text Stacked */}
            <div className="flex flex-col gap-6 text-white/70 font-mono text-xs md:text-sm leading-relaxed mb-12 xl:mb-0">
              <p>
                {t('services.body1') !== 'services.body1' ? t('services.body1') : 'ASEAN Labs does not offer a menu of optional services. We offer a coordinated operational system — all of it deployed for your project, accountable to your KPIs. When you work with us, you engage the full machine.'}
              </p>
              <p>
                {t('services.body2') !== 'services.body2' ? t('services.body2') : 'Every metric is verifiable on-chain or documented in the field. We operate as a high-accountability execution partnership, ensuring absolute transparency and measurable results at every step.'}
              </p>
            </div>

            {/* Highlight Box - Interactive Easter Egg */}
            <div className="border border-accent bg-black p-6 md:p-8 relative group cursor-crosshair overflow-hidden transition-colors duration-0 hover:bg-accent hover:border-black">
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h4 className="font-sans text-lg md:text-xl font-bold text-accent uppercase tracking-wide mb-3 group-hover:text-black transition-colors duration-0">
                    {t('services.highlightTitle') !== 'services.highlightTitle' ? t('services.highlightTitle') : 'Paid. Structured. Accountable.'}
                  </h4>
                  <p className="font-mono text-xs md:text-sm text-white/90 leading-relaxed group-hover:text-black/90 transition-colors duration-0">
                    {t('services.highlightBody') !== 'services.highlightBody' ? t('services.highlightBody') : 'Not a retainer for access. Every engagement is priced, scoped, and contracted before anything begins.'}
                  </p>
                </div>
                
                {/* Hidden Easter Egg Content - Execution Receipt */}
                <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-6 transition-all duration-300 ease-out">
                  <div className="overflow-hidden flex flex-col gap-2">
                    <div className="w-full border-t-2 border-dashed border-black mb-2" />
                    <div className="flex justify-between items-end font-mono text-[10px] text-black font-bold uppercase leading-tight">
                      <div className="flex flex-col gap-[2px]">
                        <span>{'// STATUS: ACTIVE'}</span>
                        <span>{'// TARGET: ENI_MAINNET'}</span>
                        <span>{'// CLEARANCE: L9'}</span>
                      </div>
                      <div className="text-right flex flex-col gap-[2px]">
                        <span className="animate-pulse">ENGAGE_FULL_MACHINE_</span>
                        <span>AUTH_CODE: {authCode}</span>
                      </div>
                    </div>
                    {/* Scannable Barcode */}
                    <div className="flex h-16 w-full mt-3 justify-center items-end overflow-hidden">
                      <div className="flex h-full gap-0 items-end bg-white px-4 py-1 origin-bottom">
                        {(() => {
                          // Complete Code 39 encoding: each char = 9 elements (bars+spaces), 
                          // odd positions = bars, even = spaces, 1=narrow 2=wide
                          const CODE39: Record<string, string> = {
                            '0': '111221211', '1': '211211112', '2': '112211112',
                            '3': '212211111', '4': '111221112', '5': '211221111',
                            '6': '112221111', '7': '111211212', '8': '211211211',
                            '9': '112211211', 'A': '211112112', 'B': '112112112',
                            'C': '212112111', 'D': '111122112', 'E': '211122111',
                            'F': '112122111', 'G': '111112212', 'H': '211112211',
                            'I': '112112211', 'J': '111122211', 'K': '211111122',
                            'L': '112111122', 'M': '212111121', 'N': '111121122',
                            'O': '211121121', 'P': '112121121', 'Q': '111111222',
                            'R': '211111221', 'S': '112111221', 'T': '111121221',
                            'U': '221111112', 'V': '122111112', 'W': '222111111',
                            'X': '121121112', 'Y': '221121111', 'Z': '122121111',
                            '-': '121111212', '.': '221111211', ' ': '122111211',
                            '*': '121121211',
                          };
                          const text = "*ASEAN LABS X ENI*";
                          const NARROW = 2;
                          const WIDE = 5;
                          return text.split('').map((char, charIdx) => {
                            const pattern = CODE39[char] || CODE39[' '];
                            return (
                              <div key={charIdx} className="flex h-full">
                                {pattern.split('').map((p, pIdx) => (
                                  <div 
                                    key={pIdx} 
                                    className={`h-full ${pIdx % 2 === 0 ? 'bg-black' : 'bg-transparent'}`}
                                    style={{ width: p === '1' ? `${NARROW}px` : `${WIDE}px` }}
                                  />
                                ))}
                                <div className="h-full bg-transparent" style={{ width: `${NARROW}px` }} />
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Scanline effect */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.03] z-0" 
                   style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }}>
              </div>
            </div>
          </div>
        </div>

        {/* Snake Timeline Grid */}
        <div ref={gridRef} className="relative grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-32 lg:gap-y-24 pl-12 lg:pl-0 w-full mt-16 lg:mt-32">
          
          {/* Mobile Progress Line */}
          <div className="lg:hidden absolute left-[15px] top-8 bottom-8 w-[2px] bg-[#F4BF4B]/10 z-0">
            <div ref={mobileProgressRef} className="h-full w-full bg-accent origin-top scale-y-0" />
          </div>

          {SERVICES.map((svc, i) => {
            const isRightConnecting = i % 4 === 0; // 0, 4 (connect to right)
            const isBottomConnecting = i % 2 !== 0; // 1, 3, 5, 7 (connect to bottom)
            const isLeftConnecting = i % 4 === 2; // 2, 6 (connect to left)

            return (
              <div
                key={svc.id}
                ref={(el: HTMLDivElement | null) => { itemRefs.current[i] = el; }}
                className={`timeline-box relative flex flex-col p-8 lg:p-12 w-full ${gridPlacements[i]} cursor-default`}
              >
                {/* Box Number */}
                <div className="box-number absolute top-1/2 -left-[49px] lg:-top-5 lg:-left-5 lg:top-auto flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 font-mono text-xs lg:text-sm font-bold z-30 -translate-y-1/2 lg:translate-y-0">
                  {svc.id}
                </div>

                <h3 className="mb-6 font-sans text-3xl lg:text-4xl xl:text-5xl font-bold uppercase leading-none tracking-tight timeline-title">
                  {t(svc.titleKey) !== svc.titleKey ? t(svc.titleKey) : svc.defaultTitle}
                </h3>
                
                <div className="mb-8 h-[2px] w-16 timeline-accent-line" />
                
                <p className="mb-10 font-mono text-base lg:text-lg xl:text-xl leading-relaxed timeline-desc flex-1">
                  {t(svc.descKey) !== svc.descKey ? t(svc.descKey) : svc.defaultDesc}
                </p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <div className="h-[2px] w-8 timeline-sub-line" />
                  <p className="font-sans text-xs lg:text-sm xl:text-base font-black uppercase tracking-widest timeline-subtext">
                    {t(svc.subKey) !== svc.subKey ? t(svc.subKey) : svc.defaultSub}
                  </p>
                </div>

                {/* Desktop Connecting Lines */}
                {i < 8 && (
                  <>
                    {isRightConnecting && (
                      <div className="hidden lg:block absolute top-1/2 left-full w-32 h-[2px] bg-[#F4BF4B]/10 -translate-y-1/2 -z-10">
                        <div ref={(el: HTMLDivElement | null) => { lineRefs.current[i] = el; }} className="h-full w-full bg-accent origin-left scale-x-0" />
                      </div>
                    )}
                    {isLeftConnecting && (
                      <div className="hidden lg:block absolute top-1/2 right-full w-32 h-[2px] bg-[#F4BF4B]/10 -translate-y-1/2 -z-10">
                        <div ref={(el: HTMLDivElement | null) => { lineRefs.current[i] = el; }} className="h-full w-full bg-accent origin-right scale-x-0" />
                      </div>
                    )}
                    {isBottomConnecting && (
                      <div className="hidden lg:block absolute top-full left-1/2 w-[2px] h-24 bg-[#F4BF4B]/10 -translate-x-1/2 -z-10">
                        <div ref={(el: HTMLDivElement | null) => { lineRefs.current[i] = el; }} className="h-full w-full bg-accent origin-top scale-y-0" />
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
