import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowTopRightIcon, ChevronDownIcon, Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { LogoMark } from '@/components/icons/BrandSymbols';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslation } from '@/hooks/useTranslation';

const groups = [
  {
    key: 'nav.about',
    links: [
      ['nav.aboutUs', '/#about'],
      ['nav.whyUs', '/why-us'],
      ['nav.process', '/process'],
      ['nav.brand', '/brand'],
    ],
  },
  {
    key: 'nav.product',
    links: [
      ['nav.coreCapabilities', '/#capabilities'],
      ['nav.integrations', '/#integrations'],
      ['nav.daoaas', '/#dao-as-a-service'],
      ['nav.howXplanWorks', '/how-xplan-works'],
    ],
  },
  {
    key: 'nav.network',
    links: [
      ['nav.ecosystem', '/#ecosystem'],
      ['nav.eniMainnet', 'https://scan.eniac.network/'],
      ['nav.walletTutorial', '/onboard'],
    ],
  },
];

export function Nav() {
  const { t } = useTranslation();
  const router = useRouter();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      const trigger = root.current?.querySelector<HTMLButtonElement>('[aria-expanded="true"]');
      setOpenGroup(null);
      setMobileOpen(false);
      trigger?.focus();
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', escape);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [router.asPath]);

  return (
    <header className="al-header" ref={root}>
      <div className="al-header-inner">
        <Link href="/" className="al-wordmark">
          <LogoMark size={29} className="al-nav-symbol" aria-hidden="true" />
          <span>
            ASEAN<span className="al-wordmark-labs">LABS</span>
          </span>
        </Link>
        <nav className="al-desktop-nav" aria-label={t('home.mainNavigation')}>
          {groups.map((group) => (
            <div className="al-nav-group" key={group.key}>
              <button
                type="button"
                aria-expanded={openGroup === group.key}
                aria-controls={`nav-${group.key}`}
                onClick={() => setOpenGroup(openGroup === group.key ? null : group.key)}
              >
                {t(group.key)}
                <ChevronDownIcon width={13} height={13} aria-hidden="true" />
              </button>
              {openGroup === group.key && (
                <div
                  className="al-nav-dropdown"
                  id={`nav-${group.key}`}
                  onBlur={(event) => {
                    if (!event.currentTarget.parentElement?.contains(event.relatedTarget))
                      setOpenGroup(null);
                  }}
                >
                  {group.links.map(([key, href]) => (
                    <Link
                      key={key}
                      href={href}
                      onClick={() => setOpenGroup(null)}
                      {...(href.startsWith('https')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {t(key)}
                      <ArrowTopRightIcon width={15} height={15} aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="https://linktr.ee/aseanlabs" target="_blank" rel="noopener noreferrer">
            {t('footer.colCommunity')}
          </Link>
        </nav>
        <div className="al-header-actions">
          <div className="al-header-language">
            <LanguageSwitcher />
          </div>
          <a href="mailto:contact@aseanlabs.io" className="al-button al-button-sm al-header-contact">
            {t('home.contact')}
            <ArrowTopRightIcon width={15} height={15} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="al-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={t(mobileOpen ? 'home.closeMenu' : 'home.openMenu')}
          >
            {mobileOpen ? <Cross1Icon width={25} height={25} /> : <HamburgerMenuIcon width={25} height={25} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav
          className="al-mobile-nav"
          id="mobile-navigation"
          aria-label={t('home.mainNavigation')}
          onBlur={(event) => {
            if (!root.current?.contains(event.relatedTarget)) setMobileOpen(false);
          }}
        >
          {groups.map((group) => (
            <div key={group.key}>
              <p>{t(group.key)}</p>
              {group.links.map(([key, href]) => (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  {...(href.startsWith('https')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {t(key)}
                  <ArrowTopRightIcon width={16} height={16} aria-hidden="true" />
                </Link>
              ))}
            </div>
          ))}
          <LanguageSwitcher variant="mobile" />
        </nav>
      )}
    </header>
  );
}
