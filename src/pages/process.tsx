import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { gsap } from 'gsap';
import { useTranslation } from '@/hooks/useTranslation';

const STEPS = [
  {
    id: '01',
    label: 'QUALIFICATION',
    title: '01 — Qualification',
    description: 'We review your project — stage, product readiness, team strength, ENI fit. Clear yes or no within 48 hours.'
  },
  {
    id: '02',
    label: 'SCOPE',
    title: '02 — Scope',
    description: 'Precise engagement definition. What we deliver, the timeline, the measurable outcomes. Nothing begins without a locked scope.'
  },
  {
    id: '03',
    label: 'COMMERCIAL AGREEMENT',
    title: '03 — Commercial Agreement',
    description: 'Every engagement is paid and formally contracted. KPIs agreed in writing. No handshake deals.'
  },
  {
    id: '04',
    label: 'KICKOFF',
    title: '04 — Kickoff',
    description: 'Dedicated team assigned. Operations start immediately. Single point of contact from day one.'
  },
  {
    id: '05',
    label: 'DELIVERY',
    title: '05 — Delivery',
    description: 'We execute and report. Every metric traceable on-chain or documented. You always know what\'s happening.'
  }
];

const STANDARDS = [
  {
    title: 'Paid service only',
    description: 'Every engagement is priced, scoped, and contracted. We do not work on token allocations, equity swaps, or promises of future upside. High-standard execution requires committed resources from both sides.'
  },
  {
    title: 'Zero manufactured metrics',
    description: 'We do not inflate numbers — not community sizes, not event attendance, not on-chain activity. Every figure we report is traceable or documented. Our reputation is built on this.'
  },
  {
    title: 'What ASEAN Labs offers',
    description: 'A structured paid engagement covering community, operations, content, design, development, events, and regional distribution — all accountable to agreed KPIs. We reward real outcomes, not milestone submissions.'
  }
];

export default function ProcessPage() {
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    // Mount reveal transition to standardize site aesthetics
    gsap.fromTo('#page-wrapper',
      { clipPath: 'circle(0% at 50% 0%)' },
      {
        clipPath: 'circle(150% at 50% 0%)',
        duration: 1.2,
        ease: 'power3.inOut'
      }
    );
  }, []);

  return (
    <div className="bg-[#F4BF4B] text-black overflow-hidden min-h-screen flex flex-col">
      <Head>
        <title>{t('process.pageTitle') !== 'process.pageTitle' ? t('process.pageTitle') : 'Process — ASEAN Labs'}</title>
        <meta name="description" content={t('process.pageDesc') !== 'process.pageDesc' ? t('process.pageDesc') : 'We qualify first. Then we build. Discover how ASEAN Labs engages with projects.'} />
      </Head>

      <Nav />

      <div id="page-wrapper" className="flex-grow">
        {/* Background Dot Grid */}
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: '12px 12px',
          }}
        />

        <main className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-10 py-20 lg:py-32 flex flex-col items-center">
          <div className="w-full max-w-[1200px]">
            {/* Back Button */}
            <Link 
              href="/" 
              className="group mb-12 inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest border border-black px-6 py-3 transition-colors duration-0 hover:bg-black hover:text-[#F4BF4B]"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              {t('process.backToHome') !== 'process.backToHome' ? t('process.backToHome') : 'Back to Home'}
            </Link>

            {/* Header */}
            <header className="mb-24 flex flex-col items-center text-center gap-6">
              <span className="font-mono text-lg md:text-xl font-bold uppercase tracking-[0.2em]">
                {t('process.badge') !== 'process.badge' ? t('process.badge') : 'How We Work'}
              </span>
              <h1 className="font-sans text-5xl md:text-7xl font-black uppercase leading-[1.05] tracking-tighter max-w-4xl">
                {t('process.titlePart1') !== 'process.titlePart1' ? t('process.titlePart1') : 'We qualify first.'}<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>{t('process.titleHighlight') !== 'process.titleHighlight' ? t('process.titleHighlight') : 'Then we build.'}</span>
              </h1>
              <p className="max-w-3xl font-sans text-lg lg:text-xl font-medium leading-relaxed text-black/80 mt-4">
                {t('process.subtitle') !== 'process.subtitle' ? t('process.subtitle') : "ASEAN Labs doesn't take every project. We take projects we can deliver results for — and we're direct about which ones those are. If your project doesn't qualify, we tell you in the first call. We also tell you what would need to change."}
              </p>
            </header>

            {/* Interactive Timeline */}
            <div className="w-full mb-16 relative">
              {/* Connecting Line */}
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-black z-0 hidden md:block" />
              
              <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
                {STEPS.map((step, index) => {
                  const isActive = activeStep === index;
                  return (
                    <div 
                      key={step.id} 
                      onClick={() => setActiveStep(index)}
                      className="flex flex-col items-center cursor-pointer group flex-1"
                    >
                      {/* Node */}
                      <div className="relative flex items-center justify-center w-16 h-16 mb-4">
                        <div className={`w-12 h-12 rounded-full border-2 border-black flex items-center justify-center transition-all duration-300 ${isActive ? 'scale-110 bg-black text-[#F4BF4B]' : 'bg-[#F4BF4B] text-black group-hover:scale-105'}`}>
                          <span className="font-mono text-lg font-bold">{step.id}</span>
                        </div>
                        {/* Pulse Ring for Active State */}
                        {isActive && (
                          <div className="absolute inset-0 border border-black rounded-full animate-ping opacity-50" />
                        )}
                        {isActive && (
                          <div className="absolute inset-[-4px] border border-black rounded-full" />
                        )}
                      </div>
                      
                      {/* Label */}
                      <div className={`text-center transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
                        <span className="font-mono text-sm md:text-xs lg:text-sm font-bold uppercase tracking-widest block max-w-[150px]">
                          {t(`process.step${index + 1}Label`) !== `process.step${index + 1}Label` ? t(`process.step${index + 1}Label`) : step.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Content Box */}
            <div className="w-full bg-black border-2 border-black p-10 md:p-16 lg:p-24 shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-all duration-500 min-h-[400px] flex flex-col justify-center mb-32 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <span className="font-sans text-[12rem] font-black leading-none">{STEPS[activeStep].id}</span>
              </div>
              
              <div className="relative z-10 max-w-4xl">
                <h2 className="text-[#F4BF4B] font-sans text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-8">
                  {t(`process.step${activeStep + 1}Title`) !== `process.step${activeStep + 1}Title` ? t(`process.step${activeStep + 1}Title`) : STEPS[activeStep].title}
                </h2>
                <div className="w-24 h-1.5 bg-[#F4BF4B] mb-8" />
                <p className="text-white font-mono text-xl lg:text-2xl leading-relaxed opacity-90">
                  {t(`process.step${activeStep + 1}Desc`) !== `process.step${activeStep + 1}Desc` ? t(`process.step${activeStep + 1}Desc`) : STEPS[activeStep].description}
                </p>
              </div>
            </div>

            {/* Standards Section */}
            <div className="w-full mt-20">
              <div className="mb-12 border-b-2 border-black pb-4">
                <h3 className="font-sans text-3xl md:text-4xl font-black uppercase tracking-tighter">
                  {t('process.standardsTitle') !== 'process.standardsTitle' ? t('process.standardsTitle') : 'Standards'}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                {STANDARDS.map((standard, i) => (
                  <div key={i} className="flex flex-col gap-6 group">
                    <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center font-mono font-bold text-lg mb-2 group-hover:bg-black group-hover:text-[#F4BF4B] transition-colors">
                      {i + 1}
                    </div>
                    <h4 className="font-sans text-2xl font-black uppercase tracking-tight">
                      {t(`process.standard${i + 1}Title`) !== `process.standard${i + 1}Title` ? t(`process.standard${i + 1}Title`) : standard.title}
                    </h4>
                    <p className="font-sans text-lg font-medium leading-relaxed text-black border-l-2 border-black pl-4">
                      {t(`process.standard${i + 1}Desc`) !== `process.standard${i + 1}Desc` ? t(`process.standard${i + 1}Desc`) : standard.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
