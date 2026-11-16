import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowTopRightIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslation } from '@/hooks/useTranslation';

const columns = [
  {
    title: 'footer.colAbout',
    links: [
      ['nav.aboutUs', '/#about'],
      ['nav.team', '/#team'],
      ['nav.whyUs', '/why-us'],
      ['nav.process', '/process'],
      ['nav.brand', '/brand'],
    ],
  },
  {
    title: 'nav.product',
    links: [
      ['nav.coreCapabilities', '/#capabilities'],
      ['nav.integrations', '/#integrations'],
      ['nav.ecosystem', '/#ecosystem'],
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
  const { pathname } = useRouter();
  return (
    <footer className="al-footer" id="footer">
      {pathname !== '/' && <span id="contact" className="al-anchor-alias" />}
      <span id="final-cta" className="al-anchor-alias" />
      <span id="faq" className="al-anchor-alias" />
      <div className="al-container">
        <div className="al-footer-grid">
          <div className="al-footer-brand">
            <p>{t('home.footerBody')}</p>
            <a href="mailto:contact@aseanlabs.io" className="al-button">
              contact@aseanlabs.io
              <ArrowTopRightIcon width={17} height={17} aria-hidden="true" />
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
                      {href.startsWith('https') && <ArrowTopRightIcon width={14} height={14} aria-hidden="true" />}
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
              <ArrowUpIcon width={18} height={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
