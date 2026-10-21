import Image from 'next/image';
import Link from 'next/link';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslation } from '@/hooks/useTranslation';

const columns = [
  {
    title: 'footer.colAbout',
    links: [
      ['nav.aboutUs', '/#about'],
      ['nav.process', '/process'],
      ['nav.whyUs', '/why-us'],
      ['nav.brand', '/brand'],
    ],
  },
  {
    title: 'footer.colProduct',
    links: [
      ['nav.coreCapabilities', '/#capabilities'],
      ['nav.daoaas', '/#dao-as-a-service'],
      ['nav.howXplanWorks', '/how-xplan-works'],
    ],
  },
  {
    title: 'footer.colNetwork',
    links: [
      ['nav.ecosystem', '/#ecosystem'],
      ['nav.eniMainnet', 'https://scan.eniac.network/'],
      ['nav.walletTutorial', '/onboard'],
    ],
  },
  {
    title: 'footer.colCommunity',
    links: [
      ['nav.twitter', 'https://x.com/AseanLabs_'],
      ['nav.telegram', 'https://t.me/aseanlabs'],
      ['nav.linktree', 'https://linktr.ee/aseanlabs'],
    ],
  },
];

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="al-footer" id="footer">
      <span id="contact" className="al-anchor-alias" />
      <span id="final-cta" className="al-anchor-alias" />
      <span id="faq" className="al-anchor-alias" />
      <div className="al-container">
        <div className="al-footer-grid">
          <div className="al-footer-brand">
            <p>{t('home.footerBody')}</p>
            <p className="al-footer-built">
              {t('footer.builtOn')}
              <Image src="/partners/mono/eni.svg" alt="ENI" width={45} height={14} />
            </p>
            <a href="mailto:contact@aseanlabs.io" className="al-button">
              contact@aseanlabs.io
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
          {columns.map((column) => (
            <div className="al-footer-column" key={column.title}>
              <h3>{t(column.title)}</h3>
              <ul>
                {column.links.map(([key, href]) => (
                  <li key={key}>
                    <Link
                      href={href}
                      {...(href.startsWith('https')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {t(key)}
                      {href.startsWith('https') && <ArrowUpRight size={14} aria-hidden="true" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="al-footer-bottom">
          <p>© {new Date().getFullYear()} ASEAN Labs</p>
          <div>
            <Link href="/privacy-policy">{t('footer.privacyPolicy')}</Link>
            <Link href="/terms-of-service">{t('footer.termsOfService')}</Link>
            <LanguageSwitcher variant="footer" />
            <a href="#top" className="al-back-top" aria-label={t('home.backToTop')}>
              <ArrowUp size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
