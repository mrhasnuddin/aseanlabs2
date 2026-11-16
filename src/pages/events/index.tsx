import { useState } from 'react';
import { PageIntro, PageShell } from '@/components/PageLayout';
import { EventsMotif } from '@/components/home/CapabilityArtwork';
import { EventCard } from '@/components/events/EventCard';
import { EVENTS, type EventCategory } from '@/data/events';
import { useTranslation } from '@/hooks/useTranslation';
import styles from '@/components/events/Events.module.css';

const FILTERS = ['all', 'community', 'speaking', 'launches'] as const;
export default function EventsPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<EventCategory | 'all'>('all');
  const visible = filter === 'all' ? EVENTS : EVENTS.filter((event) => event.category === filter);
  return <PageShell title={`${t('events.title')} | ASEAN Labs`} description={t('events.archiveIntro')}>
    <PageIntro crumb={t('events.nav')} title={t('events.title')} motif={<EventsMotif />}>
      <p>{t('events.archiveIntro')}</p>
    </PageIntro>
    <div className={`al-container al-section ${styles.archive}`}>
      <div className={styles.filterRow}><div className={styles.filters} role="group" aria-label={t('events.filterLabel')}>
        {FILTERS.map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{t(`events.category.${item}`)}</button>)}
      </div><span className={styles.count} role="status">{visible.length} {t(visible.length === 1 ? 'events.recap' : 'events.recaps')}</span></div>
      <div className={styles.grid}>{visible.map((event) => <EventCard key={event.slug} event={event} headingLevel="h2" />)}</div>
      <p className={styles.archiveNote}>{t('events.archiveNote')}</p>
    </div>
  </PageShell>;
}
