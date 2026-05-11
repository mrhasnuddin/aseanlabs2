import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { gsap } from 'gsap';
import { useTranslation } from '@/hooks/useTranslation';

const XPLAN_STEPS = [
  {
    id: 'setup',
    titleKey: 'xplan.step1Title',
    defaultTitle: 'Custom Quest Zone Setup',
    body: (t: any) => <>{t('xplan.step1BodyPart1', 'Each project gets a ')}<span className="text-[#00E5FF] font-bold">{t('xplan.step1BodyPart2', 'dedicated DAOaaS zone')}</span>{t('xplan.step1BodyPart3', '. Quests are built around your ')}<span className="text-[#00E5FF] font-bold">{t('xplan.step1BodyPart4', 'specific protocol actions')}</span>{t('xplan.step1BodyPart5', ' and user journey — ')}<span className="text-[#00E5FF] font-bold">{t('xplan.step1BodyPart6', 'not generic templates')}</span>.</>,
  },
  {
    id: 'completion',
    titleKey: 'xplan.step2Title',
    defaultTitle: 'Verified Task Completion',
    body: (t: any) => <>{t('xplan.step2BodyPart1', 'Users earn ')}<span className="text-[#00E5FF] font-bold">{t('xplan.step2BodyPart2', 'Xplan points')}</span>{t('xplan.step2BodyPart3', ' by completing ')}<span className="text-[#00E5FF] font-bold">{t('xplan.step2BodyPart4', 'real actions')}</span>{t('xplan.step2BodyPart5', ' — ')}<span className="text-[#00E5FF] font-bold">{t('xplan.step2BodyPart6', 'on-chain interactions')}</span>{t('xplan.step2BodyPart7', ', protocol usage, referrals, and content contribution. ')}<span className="text-[#00E5FF] font-bold">{t('xplan.step2BodyPart8', 'Not passive follows')}</span>.</>,
  },
  {
    id: 'accrual',
    titleKey: 'xplan.step3Title',
    defaultTitle: 'On-chain Point Accrual',
    body: (t: any) => <>{t('xplan.step3BodyPart1', 'Points tie directly to ')}<span className="text-[#00E5FF] font-bold">{t('xplan.step3BodyPart2', 'gas spent')}</span>{t('xplan.step3BodyPart3', ', tasks completed, and ')}<span className="text-[#00E5FF] font-bold">{t('xplan.step3BodyPart4', 'users invited')}</span>{t('xplan.step3BodyPart5', '. Every point connected to a ')}<span className="text-[#00E5FF] font-bold">{t('xplan.step3BodyPart6', 'verified, traceable action')}</span>.</>,
  },
  {
    id: 'rewards',
    titleKey: 'xplan.step4Title',
    defaultTitle: 'Ecosystem Rewards Distributed',
    body: (t: any) => <>{t('xplan.step4BodyPart1', 'Points distribute ')}<span className="text-[#00E5FF] font-bold">{t('xplan.step4BodyPart2', 'airdrop weight')}</span>{t('xplan.step4BodyPart3', ', governance rights, and ')}<span className="text-[#00E5FF] font-bold">{t('xplan.step4BodyPart4', 'ecosystem access')}</span>{t('xplan.step4BodyPart5', '. Users ')}<span className="text-[#00E5FF] font-bold">{t('xplan.step4BodyPart6', 'embedded in the protocol')}</span>{t('xplan.step4BodyPart7', ' — not just subscribed to a channel.')}</>,
  }
];

export default function HowXplanWorksPage() {
  const { t, locale } = useTranslation();

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
    <div className="bg-[#F4BF4B] text-black overflow-hidden">
      <Head>
        <title>{t('xplan.pageTitle') !== 'xplan.pageTitle' ? t('xplan.pageTitle') : 'How XPLAN Works — ASEAN Labs'}</title>
        <meta name="description" content={t('xplan.pageDesc') !== 'xplan.pageDesc' ? t('xplan.pageDesc') : "Every action is verified. Every reward is earned. Every metric is on-chain."} />
      </Head>

      <Nav />

      <div id="page-wrapper" className="min-h-screen">
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
          <div className="w-full">
            {/* Back Button / Breadcrumbs */}
            <Link 
              href="/" 
              className="group mb-12 inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest border border-black px-6 py-3 transition-colors duration-0 hover:bg-black hover:text-[#F4BF4B]"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              {t('xplan.backToHome') !== 'xplan.backToHome' ? t('xplan.backToHome') : 'Back to Home'}
            </Link>

            {/* Hero */}
            <header className="mb-20 flex flex-col items-start gap-6">
              <h1 className="font-sans text-5xl md:text-6xl xl:text-7xl font-black uppercase leading-[1.05] tracking-tighter">
                {t('xplan.titlePart1') !== 'xplan.titlePart1' ? t('xplan.titlePart1') : 'HOW THE XPLAN'}<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>{t('xplan.titlePart2') !== 'xplan.titlePart2' ? t('xplan.titlePart2') : 'SYSTEM WORKS.'}</span>
              </h1>
              <p className="max-w-2xl font-sans text-lg lg:text-xl font-medium leading-relaxed text-black/90">
                {t('xplan.subtitle') !== 'xplan.subtitle' ? t('xplan.subtitle') : 'Every action is verified. Every reward is earned. Every metric is on-chain.'}
              </p>
            </header>

            {/* Interactive Book Rack */}
            <div className="mb-32">
              <XplanBookRack />
            </div>
          </div>
          
          {/* Final Footer CTA */}
          <div className="w-full mb-20">
            <div className="w-full bg-black p-12 lg:p-20 text-center text-[#F4BF4B] border-2 border-black">
              <h2 className="mb-6 font-sans text-5xl lg:text-7xl font-bold uppercase leading-none tracking-tighter">
                {t('xplan.footerTitle') !== 'xplan.footerTitle' ? t('xplan.footerTitle') : 'Ready to grow?'}
              </h2>
              <p className="mx-auto mb-12 max-w-xl text-lg text-white/70 font-sans font-medium">
                {t('xplan.footerSubtitle') !== 'xplan.footerSubtitle' ? t('xplan.footerSubtitle') : 'Integrate DAOaaS and connect verified user behavior to on-chain rewards and real TVL growth.'}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a 
                  href="mailto:info@aseanlabs.io?subject=Inquiry%20about%20DAOaaS"
                  className="inline-flex items-center gap-4 border border-[#F4BF4B] bg-[#F4BF4B] px-10 py-5 font-sans text-lg font-bold uppercase tracking-widest text-black transition-colors duration-0 hover:bg-transparent hover:text-[#F4BF4B]"
                >
                  {t('xplan.footerCta1') !== 'xplan.footerCta1' ? t('xplan.footerCta1') : 'Contact Us'}
                </a>
                <a 
                  href="https://daoaas.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 border border-[#F4BF4B] bg-transparent px-10 py-5 font-sans text-lg font-bold uppercase tracking-widest text-[#F4BF4B] transition-colors duration-0 hover:bg-[#F4BF4B] hover:text-black"
                >
                  {t('xplan.footerCta2') !== 'xplan.footerCta2' ? t('xplan.footerCta2') : 'Visit DAOaaS.io'}
                  <span className="text-xl">↗</span>
                </a>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function XplanBookRack() {
  const [activeTab, setActiveTab] = useState('setup');
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row w-full h-[700px] lg:h-[550px] gap-4">
        {XPLAN_STEPS.map((step, i) => {
          const isActive = activeTab === step.id;
          return (
            <div 
              key={step.id}
              onClick={() => setActiveTab(step.id)}
              className={`relative flex flex-col transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border-2 border-black bg-black overflow-hidden ${isActive ? 'flex-[10] cursor-default' : 'flex-[1] lg:flex-[1.2] cursor-pointer hover:bg-black/90 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}
            >
              {/* Inactive State */}
              <div 
                className={`absolute inset-0 flex lg:flex-col items-center justify-between p-6 lg:py-10 transition-all ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'opacity-0 -translate-y-8 pointer-events-none duration-200 delay-0' : 'opacity-100 translate-y-0 duration-700 delay-300'}`}
              >
                <div className="flex flex-col items-center gap-6 lg:gap-10 w-full">
                  <span className="font-mono text-xl font-bold text-[#F4BF4B]">0{i + 1}</span>
                  <span 
                    className="font-sans text-lg font-bold uppercase tracking-widest text-white whitespace-nowrap lg:hidden"
                    style={{ writingMode: 'horizontal-tb' }}
                  >
                    {t('xplan.stepPrefix') !== 'xplan.stepPrefix' ? t('xplan.stepPrefix') : 'STEP'} 0{i + 1}
                  </span>
                  <span 
                    className="hidden lg:block font-sans text-xl font-bold uppercase tracking-widest text-white whitespace-nowrap"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    {t('xplan.stepPrefix') !== 'xplan.stepPrefix' ? t('xplan.stepPrefix') : 'STEP'} 0{i + 1}
                  </span>
                </div>
              </div>

              {/* Active State */}
              <div className={`absolute top-0 left-0 h-full w-full lg:w-[800px] xl:w-[900px] p-8 md:p-12 lg:p-16 transition-all ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-center overflow-y-auto ${isActive ? 'opacity-100 translate-y-0 z-10 duration-700 delay-300' : 'opacity-0 translate-y-8 pointer-events-none z-0 duration-200 delay-0'}`}>
                 <div className="flex flex-col gap-6 max-w-3xl">
                   <span className="font-mono text-5xl lg:text-6xl font-bold text-[#F4BF4B]">0{i + 1}</span>
                   <h3 className="font-sans text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[1.1]">
                     {t(step.titleKey) !== step.titleKey ? t(step.titleKey) : step.defaultTitle}
                   </h3>
                   <div className="h-1 w-16 bg-[#F4BF4B] mt-2 mb-4" />
                   <p className="font-mono text-lg lg:text-xl leading-relaxed text-[#F4BF4B]">
                     {step.body((key: string, def: string) => t(key) !== key ? t(key) : def)}
                   </p>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
