import Image from 'next/image';
import Link from 'next/link';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { useTranslation } from '@/hooks/useTranslation';
import { eventPhotos, type EventRecord } from '@/data/events';
import styles from './Events.module.css';

export function EventCard({ event, headingLevel = 'h3' }: { event: EventRecord; headingLevel?: 'h2' | 'h3' }) {
  const { t } = useTranslation();
  const Heading = headingLevel;
  const photo = eventPhotos(event)[0];
  return <article className={styles.card}>
    <Link href={`/events/${event.slug}`} className={styles.cardLink} aria-label={`${t('events.readRecap')}: ${event.title}`}>
      <div className={styles.thumbnail}><Image src={photo.src} alt={`${event.title} — ${t('events.photoAlt')} 1`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" /></div>
      <Heading className={styles.cardTitle}>{event.title}</Heading>
      <div className={styles.meta}><span>{t(`events.category.${event.category}`)}</span><span>{t(`events.${event.slug}.location`)}</span></div>
      <p className={styles.excerpt}>{t(`events.${event.slug}.excerpt`)}</p>
      <span className={styles.cardAction}>{t('events.readRecap')}<ArrowTopRightIcon width={18} height={18} aria-hidden="true" /></span>
    </Link>
  </article>;
}
