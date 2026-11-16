import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { buildIntakeUrl } from '@/lib/intake';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './ProjectIntake.module.css';

const PACKAGES = [
  { id: 'launch', name: 'Launch Sprint', price: '5,500', duration: 'Four weeks', description: 'A focused engagement for your next launch.' },
  { id: 'community', name: 'Community Growth', price: '4,500', duration: '30 days', description: 'Dedicated support for your community’s next stage.' },
  { id: 'regional', name: 'Regional Market Entry', price: '9,000', duration: 'Eight weeks', description: 'A focused engagement for entering a new regional market.' },
  { id: 'opencrew', name: 'OpenCrew Representation', price: '4,000', duration: 'Per month', description: 'Ongoing representation through a monthly engagement.' },
] as const;
/* Decoration only: one faint line drawing per package, tucked into the card's top-right corner
   (120,0) and cropped by it. Each borrows a motif the site already uses. */
const SHAPES: Record<(typeof PACKAGES)[number]['id'], ReactNode> = {
  // Orbit arcs with the hero's tick scale.
  launch: <>
    <circle cx="120" cy="0" r="40" /><circle cx="120" cy="0" r="68" />
    <circle cx="120" cy="0" r="96" strokeWidth="6" strokeDasharray="1.2 4.8" /><circle cx="120" cy="0" r="89" />
  </>,
  // A cluster of members thinning out from the corner.
  community: [0, 1, 2, 3].flatMap((row) => [0, 1, 2, 3].slice(0, 4 - row).map((col) => (
    <circle key={`${row}-${col}`} cx={104 - col * 28} cy={16 + row * 28} r="9" />
  ))),
  // A globe.
  regional: <>
    <circle cx="80" cy="40" r="64" /><ellipse cx="80" cy="40" rx="24" ry="64" /><ellipse cx="80" cy="40" rx="46" ry="64" />
    <path d="M16 40h128M24.6 8h110.8M24.6 72h110.8" />
  </>,
  // The seam hatch.
  opencrew: <path d="M104 0l16 16M88 0l32 32M72 0l48 48M56 0l64 64M40 0l80 80M24 0l96 96M8 0l112 112" />,
};
const EMAIL = 'contact@aseanlabs.io';

export function ProjectIntake() {
  const { t, locale } = useTranslation();

  return <section id="packages" className={`al-section ${styles.section}`} aria-labelledby="packages-title">
    <div className="al-container">
      <header className={styles.heading}>
        <div><p className="al-small-label">{t('intake.packagesLabel')}</p><h2 id="packages-title">{t('intake.packagesTitle')}</h2></div>
        <p>{t('intake.packagesBody')}</p>
      </header>
      <ul className={styles.packages}>
        {PACKAGES.map((item, index) => <li key={item.id}>
          <svg className={styles.shape} viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{SHAPES[item.id]}</svg>
          <span className={styles.index}>0{index + 1}</span>
          <h3>{item.name}</h3>
          <p className={styles.description}>{item.id === 'opencrew' ? <><a href="https://open-crew.vercel.app/" target="_blank" rel="noopener noreferrer">OpenCrew<ArrowTopRightIcon aria-hidden="true" /></a> {t('intake.opencrewPartner')}</> : t(`intake.${item.id}Desc`)}</p>
          <div className={styles.price}><strong>{item.price}</strong><span>USDT</span></div>
          <p className={styles.duration}>{t(`intake.${item.id}Duration`)}</p>
          <a className="al-text-link" href={buildIntakeUrl(locale, item.id)} target="_blank" rel="noopener noreferrer" aria-label={`${t('intake.discuss')} — ${item.name}`}>
            {t('intake.discuss')}<ArrowTopRightIcon aria-hidden="true" />
          </a>
        </li>)}
      </ul>
      <p className={styles.feeNote}>{t('intake.feeNote')}</p>
      <div id="contact" className={styles.intake}>
        <div className={styles.intro}>
          <p className="al-small-label">{t('intake.briefLabel')}</p>
          <h2 id="intake-title">{t('intake.title')}</h2>
          <p>{t('intake.body')}</p>
        </div>
        <div className={styles.contact}>
          <a className="al-button" href={buildIntakeUrl(locale)} target="_blank" rel="noopener noreferrer">{t('intake.contactCta')}<ArrowTopRightIcon aria-hidden="true" /></a>
          <p className={styles.formHint}>{t('intake.formNote')}</p>
          <p className={styles.privacy}>{t('intake.privacyNote')} <Link href="/privacy-policy">{t('footer.privacyPolicy')}</Link>.</p>
          <div className={styles.alternatives}>
            <p>{t('intake.alternative')}</p>
            <a href={`mailto:${EMAIL}`} className="al-text-link">{EMAIL}<ArrowTopRightIcon aria-hidden="true" /></a>
            <a href="https://www.linkedin.com/company/107538116/" className="al-text-link" target="_blank" rel="noopener noreferrer">{t('contact.linkedin')}<ArrowTopRightIcon aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
