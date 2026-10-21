import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Check, Copy } from 'lucide-react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { SplitText } from '@/components/home/Motion';
import { useTranslation } from '@/hooks/useTranslation';

type Children = { children?: React.ReactNode };

/* Secondary routes share the homepage shell: skip link, header, al-* scope, footer. */
export function PageShell({
  title,
  description,
  children,
}: Children & { title: string; description: string }) {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
      </Head>
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
  eyebrow,
  title,
  highlight,
  motif,
  children,
}: Children & {
  crumb: string;
  eyebrow?: string;
  title: string;
  highlight?: string;
  motif?: React.ReactNode;
}) {
  const { t } = useTranslation();
  return (
    <header className="al-page-intro al-container">
      <nav className="al-breadcrumb" aria-label={t('page.breadcrumb')}>
        <ol>
          <li>
            <Link href="/">ASEAN Labs</Link>
          </li>
          <li aria-current="page">{crumb}</li>
        </ol>
      </nav>
      <div className="al-page-intro-main">
        {motif}
        {eyebrow && <p className="al-eyebrow al-load-fade">{eyebrow}</p>}
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
      {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
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
      <PageIntro crumb={crumb} eyebrow={t(`${ns}.lastUpdated`)} title={title} motif={motif} />
      <div className="al-container al-legal-layout">
        <p className="al-legal-aside">{t(`${ns}.introText`)}</p>
        <div className="al-legal">
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
