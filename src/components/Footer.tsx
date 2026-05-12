import React from 'react';
import Link from 'next/link';
import { NbButton } from './NbButton';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

const FOOTER_COLUMNS = [
  {
    titleKey: 'footer.colAbout',
    defaultTitle: 'ABOUT',
    links: [
      { labelKey: 'nav.aboutUs', defaultLabel: 'ABOUT US', href: '/#about' },
      { labelKey: 'nav.process', defaultLabel: 'PROCESS', href: '/process' },
      { labelKey: 'nav.whyUs', defaultLabel: 'WHY US', href: '/why-us' },
      { labelKey: 'nav.howXplanWorks', defaultLabel: 'HOW XPLAN WORKS', href: '/how-xplan-works' },
      { labelKey: 'nav.socialProof', defaultLabel: 'SOCIAL PROOF', href: '/#social-proof' },
    ],
  },
  {
    titleKey: 'footer.colProduct',
    defaultTitle: 'PRODUCT',
    links: [
      { labelKey: 'nav.coreCapabilities', defaultLabel: 'CORE CAPABILITIES', href: '/#capabilities' },
      { labelKey: 'nav.integrations', defaultLabel: 'INTEGRATIONS', href: '/#integrations' },
      { labelKey: 'nav.daoaas', defaultLabel: 'DAOaaS', href: '/#dao-as-a-service' },
    ],
  },
  {
    titleKey: 'footer.colNetwork',
    defaultTitle: 'NETWORK',
    links: [
      { labelKey: 'nav.eniMainnet', defaultLabel: 'ENI MAINNET', href: 'https://scan.eniac.network/', external: true },
      { labelKey: 'nav.ecosystem', defaultLabel: 'ECOSYSTEM', href: '/#ecosystem' },
      { labelKey: 'nav.walletTutorial', defaultLabel: 'WALLET TUTORIAL', href: '/onboard' },
    ],
  },
  {
    titleKey: 'footer.colCommunity',
    defaultTitle: 'COMMUNITY',
    links: [
      { labelKey: 'nav.linktree', defaultLabel: 'LINKTREE', href: 'https://linktr.ee/aseanlabs', external: true },
      { labelKey: 'nav.twitter', defaultLabel: 'X (TWITTER)', href: 'https://x.com/AseanLabs_', external: true },
      { labelKey: 'nav.telegram', defaultLabel: 'TELEGRAM', href: 'https://t.me/aseanlabs', external: true },
      { labelKey: 'nav.brand', defaultLabel: 'VISUAL IDENTITY', href: '/brand' },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="relative w-full bg-canvas font-sans pb-10">
      <div className="mx-auto w-full max-w-[1480px] px-6 md:px-10 flex flex-col gap-16 pt-20">
        
        {/* Top Banner (Black Bar) */}
        <div className="w-full bg-struct border-2 border-struct px-6 py-6 md:px-8 md:py-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-canvas font-sans text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-center md:text-left">
            {t('footer.bannerTitle') !== 'footer.bannerTitle' ? t('footer.bannerTitle') : 'ASEAN LABS IS HERE'}
          </h2>
          <NbButton 
            href="mailto:contact@aseanlabs.io"
            variant="primary-black"
            size="md"
            className="!px-8 w-full md:w-auto justify-center !shadow-none hover:!shadow-none !translate-x-0 !translate-y-0"
          >
            {t('footer.bannerCta') !== 'footer.bannerCta' ? t('footer.bannerCta') : 'REACH OUT TO US'}
            <span aria-hidden="true" className="ml-2">→</span>
          </NbButton>
        </div>

        {/* Links Grid and Logo */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 border-b-2 border-struct/10 pb-16">
          
          {/* Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 xl:gap-24 flex-1">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.titleKey} className="flex flex-col gap-6">
                <h4 className="text-struct/60 font-mono text-xs font-bold uppercase tracking-widest">
                  {t(col.titleKey) !== col.titleKey ? t(col.titleKey) : col.defaultTitle}
                </h4>
                <ul className="flex flex-col gap-4">
                  {col.links.map((link) => (
                    <li key={link.labelKey}>
                      {link.external ? (
                        <a 
                          href={link.href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-struct font-sans text-lg lg:text-xl font-medium tracking-tight uppercase hover:text-accent transition-colors"
                        >
                          {t(link.labelKey) !== link.labelKey ? t(link.labelKey) : link.defaultLabel}
                        </a>
                      ) : (
                        <Link 
                          href={link.href}
                          className="text-struct font-sans text-lg lg:text-xl font-medium tracking-tight uppercase hover:text-accent transition-colors"
                        >
                          {t(link.labelKey) !== link.labelKey ? t(link.labelKey) : link.defaultLabel}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Logo (Namada style circle) */}
          <div className="hidden lg:flex items-start justify-end shrink-0">
            <div className="w-44 h-44 border-[6px] border-struct rounded-full flex items-center justify-center p-6 text-struct">
              <img 
                src="/symbols/aseanlabs svg 2.svg" 
                alt="ASEAN Labs" 
                className="w-full h-auto object-contain text-struct"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          <span className="text-struct font-mono text-xs font-bold uppercase tracking-widest text-center">
            © {currentYear} {t('footer.copyright') !== 'footer.copyright' ? t('footer.copyright') : 'ASEAN LABS'}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-6 md:gap-y-3">
            <ThemeSwitcher />
            <LanguageSwitcher variant="footer" />
            <Link href="/privacy-policy" className="text-struct font-mono text-xs font-bold uppercase tracking-widest hover:underline underline-offset-4 text-center">
              {t('footer.privacyPolicy') !== 'footer.privacyPolicy' ? t('footer.privacyPolicy') : 'PRIVACY POLICY'}
            </Link>
            <Link href="/terms-of-service" className="text-struct font-mono text-xs font-bold uppercase tracking-widest hover:underline underline-offset-4 text-center">
              {t('footer.termsOfService') !== 'footer.termsOfService' ? t('footer.termsOfService') : 'TERMS OF SERVICE'}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
