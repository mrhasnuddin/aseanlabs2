import Image from 'next/image';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { EVENT_CREDITS } from '@/data/event-partners';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './Events.module.css';

export function EventCredits({ slug }: { slug: string }) {
  const { t } = useTranslation();
  const credits = EVENT_CREDITS[slug] || [];
  if (!credits.length) return null;
  return <section className={styles.credits} aria-labelledby="event-credits-title">
    <h2 id="event-credits-title">{t('events.partners')}</h2>
    <ul className={styles.partnerGrid}>{credits.map((partner) => {
      const contents = <>
        <div className={styles.partnerLogo} data-theme={partner.theme || 'light'}>
          {partner.logo ? <Image src={partner.logo} alt="" fill sizes="(max-width: 700px) 80vw, 240px" style={partner.logoWidth ? { maxWidth: partner.logoWidth, maxHeight: partner.logoHeight, padding: 0, margin: 'auto' } : undefined} /> : <strong>{partner.name}</strong>}
        </div>
        <div className={styles.partnerCaption}><span>{partner.name}</span>{partner.url && <ArrowTopRightIcon width={16} height={16} aria-hidden="true" />}<small>{t(`events.role.${partner.role}`)}</small></div>
      </>;
      return <li key={partner.name}>{partner.url ? <a href={partner.url} target="_blank" rel="noopener noreferrer" className={styles.partner} aria-label={`${partner.name} — ${t(`events.role.${partner.role}`)} (opens in a new tab)`}>{contents}</a> : <div className={styles.partner}>{contents}</div>}</li>;
    })}</ul>
  </section>;
}
