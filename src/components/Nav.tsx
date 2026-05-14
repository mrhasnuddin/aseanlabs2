import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { LogoMark } from '@/components/icons';
import { NbButton } from '@/components/NbButton';
import { WordmarkScramble } from '@/components/WordmarkScramble';
import {
  NavDropdownTrigger,
  NavMegaPanel,
  type NavItem,
} from '@/components/NavDropdown';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ChevronDown } from 'lucide-react';

const ENI_HREF = 'https://scan.eniac.network/';
const LINKTREE_HREF = 'https://linktr.ee/aseanlabs';
const HOVER_CLOSE_DELAY = 220;

type MenuId = 'about' | 'product' | 'network';

const ABOUT_ITEMS = [
  {
    labelKey: 'nav.aboutUs',
    descKey: 'nav.desc.aboutUs',
    defaultLabel: 'About Us',
    defaultDesc: 'Who ASEAN Labs is, why we exist, and how we work with builders.',
    href: '/#about',
  },
  {
    labelKey: 'nav.process',
    descKey: 'nav.desc.process',
    defaultLabel: 'Process',
    defaultDesc: 'How we qualify, build, and deliver results for every engagement.',
    href: '/process',
  },
  {
    labelKey: 'nav.socialProof',
    descKey: 'nav.desc.socialProof',
    defaultLabel: 'Social Proof',
    defaultDesc: 'Teams, projects, and partners that have shipped through us.',
    href: '/#social-proof',
  },
  {
    labelKey: 'nav.whyUs',
    descKey: 'nav.desc.whyUs',
    defaultLabel: 'Why Us',
    defaultDesc: 'Why top protocols and builders choose ASEAN Labs as their execution partner.',
    href: '/why-us',
  },
  {
    labelKey: 'nav.howXplanWorks',
    descKey: 'nav.desc.howXplanWorks',
    defaultLabel: 'How XPlan Works',
    defaultDesc: 'Every action verified. Every reward earned. Every metric on-chain.',
    href: '/how-xplan-works',
  },
  {
    labelKey: 'nav.brand',
    descKey: 'nav.desc.brand',
    defaultLabel: 'Visual Identity',
    defaultDesc: 'Brand guidelines, logos, and visual assets for ASEAN Labs.',
    href: '/brand',
  },
];

const PRODUCT_ITEMS = [
  {
    labelKey: 'nav.coreCapabilities',
    descKey: 'nav.desc.coreCapabilities',
    defaultLabel: 'Core Capabilities',
    defaultDesc: 'Incubation, launch, and ecosystem services we deliver end-to-end.',
    href: '/#capabilities',
  },
  {
    labelKey: 'nav.integrations',
    descKey: 'nav.desc.integrations',
    defaultLabel: 'Integrations',
    defaultDesc: 'Tools, infrastructure, and partners we plug into your stack.',
    href: '/#integrations',
  },
  {
    labelKey: 'nav.daoaas',
    descKey: 'nav.desc.daoaas',
    defaultLabel: 'DAOaaS',
    defaultDesc: 'Launch your DAO, manage treasury, and scale your governance.',
    href: '/#dao-as-a-service',
  },
];

const NETWORK_ITEMS = [
  {
    labelKey: 'nav.eniMainnet',
    descKey: 'nav.desc.eniMainnet',
    defaultLabel: 'ENI Mainnet',
    defaultDesc: 'The execution-ready Layer 1 we build on, with on-chain accountability.',
    href: 'https://scan.eniac.network/',
    external: true,
  },
  {
    labelKey: 'nav.ecosystem',
    descKey: 'nav.desc.ecosystem',
    defaultLabel: 'Ecosystem',
    defaultDesc: 'Projects and infrastructure shipping across the ENI network.',
    href: '/#ecosystem',
  },
  {
    labelKey: 'nav.walletTutorial',
    descKey: 'nav.desc.walletTutorial',
    defaultLabel: 'Wallet Tutorial',
    defaultDesc: 'Learn how to set up your wallet and connect to the ENI Mainnet.',
    href: '/onboard',
  },
];

const MENU_DATA: Record<MenuId, { labelKey: string; defaultLabel: string; items: typeof ABOUT_ITEMS }> = {
  about: { labelKey: 'nav.about', defaultLabel: 'About', items: ABOUT_ITEMS },
  product: { labelKey: 'nav.product', defaultLabel: 'Product', items: PRODUCT_ITEMS },
  network: { labelKey: 'nav.network', defaultLabel: 'Network', items: NETWORK_ITEMS },
};

export function Nav() {
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<MenuId | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);
  const panelId = useId();
  const { t } = useTranslation();

  const getTranslatedItems = (items: typeof ABOUT_ITEMS): NavItem[] => {
    return items.map(item => ({
      ...item,
      label: t(item.labelKey) !== item.labelKey ? t(item.labelKey) : item.defaultLabel,
      description: t(item.descKey) !== item.descKey ? t(item.descKey) : item.defaultDesc,
    }));
  };

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), HOVER_CLOSE_DELAY);
  };

  useEffect(() => {
    return () => cancelClose();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openMenu]);

  useEffect(() => {
    import('@/lib/gsap').then(({ gsap }) => {
      const children = navRef.current?.querySelectorAll('.nav-child-animate');
      if (children && children.length > 0) {
        gsap.from(children, {
          y: -10,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'all',
        });
      }
    });
  }, []);

  // Body scroll lock for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Hide nav on scroll down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (openMenu !== null || isMobileMenuOpen) {
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 88) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY.current) {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [openMenu, isMobileMenuOpen]);

  const triggerProps = (id: MenuId) => ({
    isOpen: openMenu === id,
    onActivate: () => {
      cancelClose();
      setOpenMenu(id);
    },
    onDeactivate: scheduleClose,
    onClickToggle: () => {
      cancelClose();
      setOpenMenu((prev) => (prev === id ? null : id));
    },
    panelId,
  });

  const toggleMobileSection = (id: MenuId) => {
    setOpenMobileSection(prev => prev === id ? null : id);
  };

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className={`fixed inset-x-0 top-0 z-50 h-[88px] border-b border-foreground bg-nav-bg transition-transform duration-300 ease-in-out ${isHidden ? '-translate-y-full' : 'translate-y-0'
        }`}
    >
      <div className={`mx-auto flex h-full w-full max-w-[1480px] items-center justify-between gap-6 px-5 transition-colors duration-200 md:px-10 ${isMobileMenuOpen ? 'bg-background' : 'bg-transparent'}`}>
        <Link
          href="/"
          aria-label="ASEAN Labs home"
          className="nav-child-animate inline-flex items-center gap-3 text-ink"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <LogoMark size={36} className="text-ink shrink-0" />
          <WordmarkScramble className="hidden font-geist text-base font-bold tracking-[0.18em] text-ink sm:inline-block" />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <div className="nav-child-animate"><NavDropdownTrigger label={t('nav.about') !== 'nav.about' ? t('nav.about') : 'About'} {...triggerProps('about')} /></div>
          <div className="nav-child-animate"><NavDropdownTrigger label={t('nav.product') !== 'nav.product' ? t('nav.product') : 'Product'} {...triggerProps('product')} /></div>
          <div className="nav-child-animate"><NavDropdownTrigger label={t('nav.network') !== 'nav.network' ? t('nav.network') : 'Network'} {...triggerProps('network')} /></div>
          <Link
            href={LINKTREE_HREF}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={scheduleClose}
            className="nav-child-animate inline-flex items-center rounded-nb px-3 py-2 font-sans text-sm font-medium uppercase tracking-wide text-ink transition-colors duration-150 hover:text-ink/70 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Linktree
          </Link>
        </div>

        <div className="nav-child-animate hidden items-center gap-3 md:flex">
          <LanguageSwitcher variant="nav" />
          <NbButton href={ENI_HREF} external variant="primary-yellow" size="md">
            {t('nav.eniNetwork') !== 'nav.eniNetwork' ? t('nav.eniNetwork') : 'ENI Network'}
            <span aria-hidden="true" className="ml-1">→</span>
          </NbButton>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center border-2 border-foreground text-foreground bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
            aria-label="Toggle Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[-1] flex h-[100dvh] flex-col overflow-y-auto overflow-x-hidden bg-background px-5 pb-20 pt-[100px] md:hidden">
          <div className="flex flex-col gap-6">
            {(['about', 'product', 'network'] as const).map((menuId) => {
              const isOpen = openMobileSection === menuId;
              const items = getTranslatedItems(MENU_DATA[menuId].items);
              const label = t(MENU_DATA[menuId].labelKey) !== MENU_DATA[menuId].labelKey 
                ? t(MENU_DATA[menuId].labelKey) 
                : MENU_DATA[menuId].defaultLabel;

              return (
                <div key={menuId} className="flex flex-col border-b border-foreground/10 pb-4">
                  <button 
                    onClick={() => toggleMobileSection(menuId)}
                    className="flex items-center justify-between py-2 text-left"
                  >
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground/50">{label}</span>
                    <ChevronDown size={16} className={`text-foreground/50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] mt-4 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-4">
                        {items.map((item) => (
                          <Link 
                            key={item.href} 
                            href={item.href} 
                            className="break-words text-2xl font-bold text-foreground leading-tight" 
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="mt-2 flex flex-col gap-6 pt-2">
              <NbButton href={ENI_HREF} external variant="primary-yellow" size="lg" className="w-full justify-center !py-4 text-xl">
                {t('nav.eniNetwork') !== 'nav.eniNetwork' ? t('nav.eniNetwork') : 'ENI Network'} <span aria-hidden="true" className="ml-2">→</span>
              </NbButton>
              <Link href={LINKTREE_HREF} target="_blank" className="font-sans text-xl font-medium text-foreground underline underline-offset-4" onClick={() => setIsMobileMenuOpen(false)}>Linktree</Link>
            </div>

            <div className="mt-4 border-t border-foreground/10 pt-8">
              <LanguageSwitcher variant="mobile" />
            </div>
          </div>
        </div>
      )}

      <NavMegaPanel
        panelId={panelId}
        title={openMenu ? (t(MENU_DATA[openMenu].labelKey) !== MENU_DATA[openMenu].labelKey ? t(MENU_DATA[openMenu].labelKey) : MENU_DATA[openMenu].defaultLabel) : null}
        items={openMenu ? getTranslatedItems(MENU_DATA[openMenu].items) : []}
        isOpen={openMenu !== null}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        onItemClick={() => setOpenMenu(null)}
      />
    </nav>
  );
}
