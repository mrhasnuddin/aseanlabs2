import Link from 'next/link';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { useTranslation } from '@/hooks/useTranslation';
import { FEATURED_EVENTS } from '@/data/events';
import { EventCard } from './EventCard';
import styles from './Events.module.css';

export function EventsSection() {
  const { t } = useTranslation();
  return <section id="events" className={`al-section ${styles.homeSection}`} aria-labelledby="events-title">
    <div className="al-container">
      <header className={styles.sectionHeading}><div><h2 id="events-title">{t('events.title')}</h2></div><div><p>{t('events.homeIntro')}</p><Link href="/events" className="al-text-link">{t('events.viewAll')}<ArrowRightIcon aria-hidden="true" /></Link></div></header>
      <div className={styles.grid}>{FEATURED_EVENTS.map((event) => <EventCard key={event.slug} event={event} />)}</div>
    </div>
  </section>;
}
