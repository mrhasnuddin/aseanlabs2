import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Copy, Check, ArrowLeft } from 'lucide-react';
import { gsap } from 'gsap';
import { useTranslation } from '@/hooks/useTranslation';

const NETWORK_DETAILS = [
  { labelKey: 'onboard.networkName', labelDef: 'Network Name', value: 'ENI Mainnet' },
  { labelKey: 'onboard.chainId', labelDef: 'Chain ID', value: '173', highlight: true },
  { labelKey: 'onboard.explorer', labelDef: 'Explorer', value: 'https://scan.eniac.network' },
  { labelKey: 'onboard.mainnetToken', labelDef: 'Mainnet Token (V0.1-V0.3)', value: 'EGAS (used for gas fees)' },
  { labelKey: 'onboard.tokenId', labelDef: 'Token ID', value: '2730' },
  { 
    labelKey: 'onboard.rpcUrl',
    labelDef: 'RPC URL', 
    value: 'https://rpc.eniac.network',
    backups: [
      'https://rpc1.eniac.network',
      'https://rpc2.eniac.network',
      'https://enirpc.com'
    ]
  },
];

const WALLETS = [
  {
    id: 'metamask',
    name: 'MetaMask',
    iconSrc: '/wallet tutorial/MetaMask-icon-fox 2.svg',
    subtitle: 'Browser Extension or Mobile App',
    href: 'https://metamask.io/download/',
    steps: [
      {
        titleKey: 'onboard.mmStep1Title',
        titleDef: 'Open MetaMask',
        body: (t: any) => <>{t('onboard.mmStep1Body', 'Click the fox icon in your toolbar or open the app. Log in to your account.')}</>
      },
      {
        titleKey: 'onboard.mmStep2Title',
        titleDef: 'Open Network Menu',
        body: (t: any) => <>{t('onboard.mmStep2BodyPart1', 'Click the network selector at the top (usually ')}<span className="text-[#00E5FF]">&quot;{t('onboard.mmStep2BodyPart2', 'Ethereum Mainnet')}&quot;</span>).</>
      },
      {
        titleKey: 'onboard.mmStep3Title',
        titleDef: 'Add Network',
        body: (t: any) => <>{t('onboard.mmStep3BodyPart1', 'Click ')}<span className="text-[#00E5FF] font-bold">{t('onboard.mmStep3BodyPart2', '+ Add network')}</span>{t('onboard.mmStep3BodyPart3', ' at the bottom, then select ')}<span className="text-[#00E5FF] font-bold">{t('onboard.mmStep3BodyPart4', 'Add a network manually')}</span>.</>
      },
      {
        titleKey: 'onboard.mmStep4Title',
        titleDef: 'Enter ENI Details',
        body: (t: any) => <>{t('onboard.mmStep4BodyPart1', 'Copy the values from the ')}<span className="text-[#00E5FF] font-bold">{t('onboard.mmStep4BodyPart2', 'Network Details')}</span>{t('onboard.mmStep4BodyPart3', ' section into the form fields.')}</>
      },
      {
        titleKey: 'onboard.mmStep5Title',
        titleDef: 'Save and Switch',
        body: (t: any) => <>{t('onboard.mmStep5BodyPart1', 'Click ')}<span className="text-[#00E5FF] font-bold">{t('onboard.mmStep5BodyPart2', 'Save')}</span>{t('onboard.mmStep5BodyPart3', '. Accept the prompt to switch to ')}<span className="text-[#00E5FF] font-bold">{t('onboard.mmStep5BodyPart4', 'ENI Mainnet')}</span>.</>
      }
    ]
  },
  {
    id: 'bitget',
    name: 'Bitget Wallet',
    iconSrc: '/wallet tutorial/bitget.svg',
    subtitle: 'Mobile-first Multi-chain Wallet',
    href: 'https://web3.bitget.com/en/wallet-download',
    steps: [
      {
        titleKey: 'onboard.bgStep1Title',
        titleDef: 'Open Bitget Wallet',
        body: (t: any) => <>{t('onboard.bgStep1Body', 'Launch the app and unlock your wallet.')}</>
      },
      {
        titleKey: 'onboard.bgStep2Title',
        titleDef: 'Tap Network Selector',
        body: (t: any) => <>{t('onboard.bgStep2Body', 'Tap the current network name at the top of the home screen.')}</>
      },
      {
        titleKey: 'onboard.bgStep3Title',
        titleDef: 'Add Custom Network',
        body: (t: any) => <>{t('onboard.bgStep3BodyPart1', 'Scroll to the bottom and tap ')}<span className="text-[#00E5FF] font-bold">{t('onboard.bgStep3BodyPart2', '+ Add Custom Network')}</span>{t('onboard.bgStep3BodyPart3', ' or ')}<span className="text-[#00E5FF] font-bold">{t('onboard.bgStep3BodyPart4', 'Manage Networks')}</span>.</>
      },
      {
        titleKey: 'onboard.bgStep4Title',
        titleDef: 'Fill Network Form',
        body: (t: any) => <>{t('onboard.bgStep4BodyPart1', 'Enter the Network Name, RPC URL, Chain ID, and Symbol ')}<span className="text-[#00E5FF] font-bold">({t('onboard.bgStep4BodyPart2', 'EGAS')})</span>.</>
      },
      {
        titleKey: 'onboard.bgStep5Title',
        titleDef: 'Confirm and Switch',
        body: (t: any) => <>{t('onboard.bgStep5BodyPart1', 'Tap ')}<span className="text-[#00E5FF] font-bold">{t('onboard.bgStep5BodyPart2', 'Confirm')}</span>{t('onboard.bgStep5BodyPart3', '. Select ')}<span className="text-[#00E5FF] font-bold">{t('onboard.bgStep5BodyPart4', 'ENI Mainnet')}</span>{t('onboard.bgStep5BodyPart5', ' from the network list to activate.')}</>
      }
    ]
  },
  {
    id: 'tokenpocket',
    name: 'Token Pocket',
    iconSrc: '/wallet tutorial/Token-Pocket-Color-Version03 1.svg',
    subtitle: 'Asia-popular DeFi Wallet',
    href: 'https://www.tokenpocket.pro/en/download/app',
    steps: [
      {
        titleKey: 'onboard.tpStep1Title',
        titleDef: 'Open Token Pocket',
        body: (t: any) => <>{t('onboard.tpStep1Body', 'Launch the app and enter your password.')}</>
      },
      {
        titleKey: 'onboard.tpStep2Title',
        titleDef: 'Select Chain',
        body: (t: any) => <>{t('onboard.tpStep2Body', 'Tap the current chain icon at the top left to open the selector.')}</>
      },
      {
        titleKey: 'onboard.tpStep3Title',
        titleDef: 'Add Custom EVM',
        body: (t: any) => <>{t('onboard.tpStep3BodyPart1', 'Tap the ')}<span className="text-[#00E5FF] font-bold">+</span>{t('onboard.tpStep3BodyPart2', ' icon or ')}<span className="text-[#00E5FF] font-bold">{t('onboard.tpStep3BodyPart3', 'Custom')}</span>{t('onboard.tpStep3BodyPart4', ' tab to add a new EVM-compatible network.')}</>
      },
      {
        titleKey: 'onboard.tpStep4Title',
        titleDef: 'Input Network Specs',
        body: (t: any) => <>{t('onboard.tpStep4BodyPart1', 'Paste the ')}<span className="text-[#00E5FF] font-bold">{t('onboard.tpStep4BodyPart2', 'ENI Mainnet')}</span>{t('onboard.tpStep4BodyPart3', ' details into the provided fields.')}</>
      },
      {
        titleKey: 'onboard.tpStep5Title',
        titleDef: 'Save and Connect',
        body: (t: any) => <>{t('onboard.tpStep5BodyPart1', 'Tap ')}<span className="text-[#00E5FF] font-bold">{t('onboard.tpStep5BodyPart2', 'Save')}</span>{t('onboard.tpStep5BodyPart3', '. Choose ')}<span className="text-[#00E5FF] font-bold">{t('onboard.tpStep5BodyPart4', 'ENI Mainnet')}</span>{t('onboard.tpStep5BodyPart5', ' from your list of chains.')}</>
      }
    ]
  }
];

export default function OnboardPage() {
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
    <>
      <Head>
        <title>{t('onboard.pageTitle') !== 'onboard.pageTitle' ? t('onboard.pageTitle') : 'How to Onboard on ENI — ASEAN Labs'}</title>
        <meta name="description" content={t('onboard.pageDesc') !== 'onboard.pageDesc' ? t('onboard.pageDesc') : 'Step-by-step guide to connecting your wallet to the ENI Mainnet.'} />
      </Head>

      <div className="min-h-screen bg-[#F4BF4B] text-black overflow-hidden">
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
            {/* Back Button */}
            <Link 
              href="/" 
              className="group mb-12 inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest border border-black px-6 py-3 transition-colors duration-0 hover:bg-black hover:text-[#F4BF4B]"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              {t('onboard.backToHome') !== 'onboard.backToHome' ? t('onboard.backToHome') : 'Back to Home'}
            </Link>

            {/* Hero */}
            <header className="mb-20 flex flex-col items-start gap-6">
              <h1 className="font-sans text-5xl md:text-6xl xl:text-7xl font-black uppercase leading-[1.05] tracking-tighter">
                {t('onboard.titlePart1') !== 'onboard.titlePart1' ? t('onboard.titlePart1') : 'How to onboard'} <br />
                {t('onboard.titlePart2') !== 'onboard.titlePart2' ? t('onboard.titlePart2') : 'on'} <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>{t('onboard.titleHighlight') !== 'onboard.titleHighlight' ? t('onboard.titleHighlight') : 'ENI.'}</span>
              </h1>
              <p className="max-w-2xl font-sans text-lg lg:text-xl font-medium leading-relaxed text-black/90">
                {t('onboard.subtitle') !== 'onboard.subtitle' ? t('onboard.subtitle') : 'Connect to ENI Mainnet in under 3 minutes. This guide covers setup for MetaMask, Bitget Wallet, and Token Pocket.'}
              </p>
            </header>

            {/* Network Details */}
            <div className="mb-16">
              <ExpandableNetworkDetails />
            </div>

            {/* Add to Wallet Book Rack */}
            <div className="mb-32">
              <WalletBookRack />
            </div>
          </div>
          
          {/* Final Footer CTA */}
          <div className="w-full mb-20">
            <div className="w-full bg-black p-12 lg:p-20 text-center text-[#F4BF4B] border-2 border-black">
              <h2 className="mb-6 font-sans text-5xl lg:text-7xl font-bold uppercase leading-none tracking-tighter">
                {t('onboard.footerTitle') !== 'onboard.footerTitle' ? t('onboard.footerTitle') : 'Building on ENI?'}
              </h2>
              <p className="mx-auto mb-12 max-w-xl text-lg text-white/70 font-sans font-medium">
                {t('onboard.footerSubtitle') !== 'onboard.footerSubtitle' ? t('onboard.footerSubtitle') : 'ASEAN Labs is the execution layer for ENI builders. We help you launch, grow, and scale.'}
              </p>
              <a 
                href="mailto:info@aseanlabs.io?subject=Apply%20to%20Build%20on%20ENI"
                className="inline-flex items-center gap-4 border border-[#F4BF4B] bg-[#F4BF4B] px-12 py-6 font-sans text-lg font-bold uppercase tracking-widest text-black transition-colors duration-0 hover:bg-transparent hover:text-[#F4BF4B]"
              >
                {t('onboard.footerCta') !== 'onboard.footerCta' ? t('onboard.footerCta') : 'Apply to Build on ENI'}
                <span className="text-2xl">→</span>
              </a>
            </div>
          </div>
        </main>
        <Footer />
        </div>
      </div>
    </>
  );
}

function ExpandableNetworkDetails() {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!contentRef.current || !gridRef.current) return;
    if (isExpanded) {
      gsap.to(contentRef.current, { height: 'auto', duration: 0.6, ease: 'power3.inOut' });
      gsap.fromTo(gridRef.current.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.2 });
    } else {
      gsap.to(contentRef.current, { height: 0, duration: 0.5, ease: 'power3.inOut' });
    }
  }, [isExpanded]);

  return (
    <div className="w-full border border-[#F4BF4B] bg-black p-8 lg:p-12 overflow-hidden relative">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative z-20 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer text-left focus:outline-none"
      >
        <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tighter text-[#F4BF4B]">
          {t('onboard.networkDetailsTitle') !== 'onboard.networkDetailsTitle' ? t('onboard.networkDetailsTitle') : 'Network Details'}
        </h2>
        <div className="flex items-center gap-4 text-[#F4BF4B]">
          <span className="font-mono text-sm font-bold uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">
            {isExpanded ? (t('onboard.hideParams') !== 'onboard.hideParams' ? t('onboard.hideParams') : 'Hide Parameters') : (t('onboard.viewParams') !== 'onboard.viewParams' ? t('onboard.viewParams') : 'View Parameters')}
          </span>
          <DoubleChevron isExpanded={isExpanded} />
        </div>
      </button>

      <div ref={contentRef} className="h-0 overflow-hidden relative z-10">
        <div ref={gridRef} className="pt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {NETWORK_DETAILS.map((item, i) => (
            <div key={i} className="flex flex-col gap-3 border-b border-[#F4BF4B]/10 pb-6">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#00E5FF]">
                {t(item.labelKey) !== item.labelKey ? t(item.labelKey) : item.labelDef}
              </span>
              <div className="flex items-center justify-between gap-6">
                <span className={`font-mono text-xl md:text-2xl font-bold break-all text-[#F4BF4B]`}>
                  {item.value}
                </span>
                <CopyButton value={item.value} />
              </div>
              {item.backups && (
                <div className="mt-4 flex flex-col gap-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#00E5FF]/60">
                    {t('onboard.backupRpcs') !== 'onboard.backupRpcs' ? t('onboard.backupRpcs') : 'Backup RPCs'}
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {item.backups.map((rpc, rIdx) => (
                      <div key={rIdx} className="flex items-center justify-between gap-3 bg-white/5 px-4 py-2 border border-[#F4BF4B]/10 hover:border-[#F4BF4B]/30 transition-colors duration-0">
                        <span className="font-mono text-[12px] text-[#F4BF4B]/80">{rpc}</span>
                        <CopyButton value={rpc} small />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WalletBookRack() {
  const [activeTab, setActiveTab] = useState('metamask');
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tighter mb-8 text-black">
        {t('onboard.addToWallet') !== 'onboard.addToWallet' ? t('onboard.addToWallet') : 'Add to Wallet'}
      </h2>
      <div className="flex flex-col lg:flex-row w-full h-[750px] lg:h-[600px] gap-4">
        {WALLETS.map((wallet, i) => {
          const isActive = activeTab === wallet.id;
          return (
            <div 
              key={wallet.id}
              onClick={() => setActiveTab(wallet.id)}
              className={`relative flex flex-col transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border-2 border-black bg-black overflow-hidden ${isActive ? 'flex-[10] cursor-default' : 'flex-[1] lg:flex-[1.2] cursor-pointer hover:bg-black/90 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}
            >
              {/* Inactive State */}
              <div 
                className={`absolute inset-0 flex lg:flex-col items-center justify-between p-6 lg:py-10 transition-all ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'opacity-0 -translate-y-8 pointer-events-none duration-200 delay-0' : 'opacity-100 translate-y-0 duration-700 delay-300'}`}
              >
                <div className="flex flex-col items-center gap-6 lg:gap-10 w-full">
                  <span className="font-mono text-xl font-bold text-[#F4BF4B]">0{i + 1}</span>
                  <span 
                    className="font-sans text-xl font-bold uppercase tracking-widest text-white whitespace-nowrap lg:hidden"
                    style={{ writingMode: 'horizontal-tb' }}
                  >
                    {wallet.name}
                  </span>
                  <span 
                    className="hidden lg:block font-sans text-xl font-bold uppercase tracking-widest text-white whitespace-nowrap"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    {wallet.name}
                  </span>
                </div>
                {/* Logo boxed at the bottom in collapsed view */}
                <div className="hidden lg:flex shrink-0 h-16 w-16 border border-[#F4BF4B] items-center justify-center p-3 mt-auto">
                  <img src={wallet.iconSrc} alt={wallet.name} className="w-full h-full object-contain" />
                </div>
              </div>

              {/* Active State */}
              <div className={`absolute top-0 left-0 h-full w-full p-6 md:p-10 lg:p-12 transition-all ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col overflow-y-auto ${isActive ? 'opacity-100 translate-y-0 z-10 duration-700 delay-300' : 'opacity-0 translate-y-8 pointer-events-none z-0 duration-200 delay-0'}`}>
                 <div className="flex items-center justify-between mb-8 border-b border-[#F4BF4B]/20 pb-6 shrink-0">
                   <div className="flex items-center gap-6">
                     <span className="font-mono text-4xl font-bold text-[#F4BF4B]">0{i + 1}</span>
                     <h3 className="font-sans text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white">{wallet.name}</h3>
                   </div>
                   <div className="hidden sm:flex h-20 w-20 border border-[#F4BF4B] p-4 items-center justify-center shrink-0">
                     <img src={wallet.iconSrc} alt={wallet.name} className="w-full h-full object-contain" />
                   </div>
                 </div>

                 <div className="flex flex-col gap-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                   {wallet.steps.map((step, sIdx) => (
                     <div key={sIdx} className="flex gap-5 shrink-0">
                       <span className="font-mono text-lg font-bold text-[#F4BF4B] pt-0.5">{(sIdx + 1).toString().padStart(2, '0')}</span>
                       <div className="flex flex-col gap-1.5">
                         <h4 className="font-sans text-lg lg:text-xl font-bold uppercase tracking-tight text-[#F4BF4B]">
                           {t(step.titleKey) !== step.titleKey ? t(step.titleKey) : step.titleDef}
                         </h4>
                         <p className="font-mono text-sm leading-relaxed text-[#F4BF4B]">
                           {step.body((key: string, def: string) => t(key) !== key ? t(key) : def)}
                         </p>
                       </div>
                     </div>
                   ))}
                 </div>

                 <div className="mt-8 pt-6 border-t border-[#F4BF4B]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
                   <span className="font-mono text-sm text-[#F4BF4B]/60">{t('onboard.noWallet') !== 'onboard.noWallet' ? t('onboard.noWallet') : 'No wallet? Install provider.'}</span>
                   <a 
                     href={wallet.href} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="font-sans text-sm font-bold uppercase tracking-widest text-black bg-[#F4BF4B] border border-[#F4BF4B] px-6 py-3 transition-colors duration-0 hover:bg-transparent hover:text-[#F4BF4B]"
                   >
                     {t('onboard.getWallet') !== 'onboard.getWallet' ? t('onboard.getWallet').replace('{wallet}', wallet.name) : `Get ${wallet.name}`} ↗
                   </a>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CopyButton({ value, small }: { value: string; small?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`${small ? 'h-8 w-8' : 'h-10 w-10'} flex flex-shrink-0 items-center justify-center border border-[#F4BF4B]/30 bg-transparent text-[#F4BF4B] transition-colors duration-0 hover:bg-[#F4BF4B] hover:text-black`}
      title="Copy to clipboard"
    >
      {copied ? <Check size={small ? 14 : 18} /> : <Copy size={small ? 14 : 18} />}
    </button>
  );
}

function DoubleChevron({ isExpanded }: { isExpanded: boolean }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        display: 'block',
        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease',
      }}
    >
      <path d="M4 7l8 6 8-6" />
      <path d="M4 12l8 6 8-6" opacity="0.5" />
    </svg>
  );
}
