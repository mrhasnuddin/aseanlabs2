import { useState } from 'react';
import Link from 'next/link';
import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Seo } from '@/components/Seo';
import { SplitText } from '@/components/home/Motion';
import { useTranslation } from '@/hooks/useTranslation';

type Children = { children?: React.ReactNode };

/* Secondary routes share the homepage shell: skip link, header, al-* scope, footer. */
export function PageShell({
  title,
  description,
  children,
  shareImage,
  article = false,
}: Children & { title: string; description: string; shareImage?: { src: string; alt: string; width: number; height: number }; article?: boolean }) {
  const { t } = useTranslation();
  return (
    <>
      <Seo title={title} description={description} image={shareImage?.src} imageAlt={shareImage?.alt} imageWidth={shareImage?.width} imageHeight={shareImage?.height} type={article ? 'article' : 'website'} />
      <a className="al-skip-link" href="#main-content">
        {t('home.skipContent')}
      </a>
      <Nav />
      <div className="al-home al-page">
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}

export function PageIntro({
  crumb,
  title,
  highlight,
  motif,
  parents = [],
  children,
}: Children & {
  crumb: string;
  title: string;
  highlight?: string;
  motif?: React.ReactNode;
  parents?: { label: string; href: string }[];
}) {
  const { t } = useTranslation();
  return (
    <header className="al-page-intro al-container">
      <nav className="al-breadcrumb" aria-label={t('page.breadcrumb')}>
        <ol>
          <li>
            <Link href="/">ASEAN Labs</Link>
          </li>
          {parents.map((parent) => <li key={parent.href}><Link href={parent.href}>{parent.label}</Link></li>)}
          <li aria-current="page">{crumb}</li>
        </ol>
      </nav>
      <div className="al-page-intro-main">
        {motif}
        <h1 className="al-split-load">
          <SplitText text={title} />
          {highlight && (
            <span className="al-page-highlight">
              {' '}
              <SplitText text={highlight} start={title.split(/\s+/).length} />
            </span>
          )}
        </h1>
      </div>
      {children && <div className="al-page-lead al-load-fade">{children}</div>}
    </header>
  );
}

export function useCopy(value: string) {
  const [copied, setCopied] = useState(false);
  const copy = () =>
    navigator.clipboard
      ?.writeText(value)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      // The value stays visible and selectable when clipboard access is refused.
      .catch(() => {});
  return [copied, copy] as const;
}

export function CopyButton({ value, label }: { value: string; label: string }) {
  const { t } = useTranslation();
  const [copied, copy] = useCopy(value);
  return (
    <button
      type="button"
      className="al-copy"
      onClick={copy}
      data-copied={copied || undefined}
      aria-label={`${t('brand.clickToCopy')}: ${label}`}
    >
      {copied ? <CheckIcon width={16} height={16} aria-hidden="true" /> : <CopyIcon width={16} height={16} aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {copied ? t('brand.copied') : ''}
      </span>
    </button>
  );
}

/* Privacy and terms share one layout; their wording comes only from the dictionaries. */
export function LegalPage({
  ns,
  crumb,
  title,
  motif,
  children,
}: Children & { ns: 'privacy' | 'tos'; crumb: string; title: string; motif?: React.ReactNode }) {
  const { t } = useTranslation();
  const email = 'Info@aseanlabs.io';
  return (
    <PageShell title={t(`${ns}.pageTitle`)} description={t(`${ns}.pageDesc`)}>
      <PageIntro crumb={crumb} title={title} motif={motif} />
      <div className="al-container al-legal-layout">
        <p className="al-legal-aside">{t(`${ns}.introText`)}</p>
        <div className="al-legal">
          <p className="al-legal-updated">{t(`${ns}.lastUpdated`)}</p>
          {children}
          <div className="al-legal-contact">
            <div>
              <a href={`mailto:${email}`}>{email}</a>
              <CopyButton value={email} label={email} />
            </div>
            <p>
              {t(`${ns}.aseanLabs`)}
              <br />
              {t(`${ns}.incubating`)}
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
