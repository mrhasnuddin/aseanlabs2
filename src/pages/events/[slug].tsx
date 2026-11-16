import type { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { PageIntro, PageShell } from '@/components/PageLayout';
import { EventsMotif } from '@/components/home/CapabilityArtwork';
import { EventCard } from '@/components/events/EventCard';
import { EventCredits } from '@/components/events/EventCredits';
import { EVENTS, eventPhotos, type EventRecord } from '@/data/events';
import { useTranslation } from '@/hooks/useTranslation';
import styles from '@/components/events/Events.module.css';

export default function EventRecap({ event, related }: { event: EventRecord; related: EventRecord[] }) {
  const { t } = useTranslation();
  const photos = eventPhotos(event);
  const text = (field: string) => t(`events.${event.slug}.${field}`);
  const alt = (n: number) => `${event.title} — ${t('events.photoAlt')} ${n}`;
  return <PageShell title={`${event.title} | ASEAN Labs`} description={text('excerpt')} article shareImage={{ ...photos[0], alt: alt(1) }}>
    <article>
      <PageIntro crumb={event.title} parents={[{ label: t('events.nav'), href: '/events' }]} title={event.title} motif={<EventsMotif />}>
        <p>{text('excerpt')}</p>
      </PageIntro>
      <div className={`al-container al-section ${styles.article}`}>
      <div className={styles.heroPhoto}><Image {...photos[0]} alt={alt(1)} priority sizes="(max-width: 1600px) 100vw, 1440px" /></div>
      <div className={styles.articleBody}>
        <aside className={styles.facts}><p className="al-small-label">{t('events.ourRole')}</p><p>{text('role')}</p><p className="al-small-label">{t('events.location')}</p><p>{text('location')}</p></aside>
        <div className={styles.prose}><h2>{t('events.overview')}</h2>{event.note && <p className={styles.participation}>{text('note')}</p>}{['p1', 'p2'].map((p) => <p key={p}>{text(p)}</p>)}<EventCredits slug={event.slug} /></div>
      </div>
      <section className={styles.gallery} aria-labelledby="event-gallery-title"><h2 id="event-gallery-title">{t('events.gallery')}</h2><div className={styles.galleryGrid}>{photos.slice(1).map((photo, i) => <figure key={photo.src}><Image {...photo} alt={alt(i + 2)} sizes="(max-width: 700px) 100vw, 70vw" /><figcaption>{event.title} · {text('location')}</figcaption></figure>)}</div></section>
      <section className={styles.related} aria-labelledby="related-events-title"><h2 id="related-events-title">{t('events.more')}</h2><div className={styles.relatedGrid}>{related.map((item) => <EventCard key={item.slug} event={item} />)}</div></section>
      </div>
    </article>
  </PageShell>;
}

export const getStaticPaths: GetStaticPaths = async ({ locales = ['en'] }) => ({
  paths: locales.flatMap((locale) => EVENTS.map((event) => ({ params: { slug: event.slug }, locale }))),
  fallback: false,
});
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const event = EVENTS.find((item) => item.slug === params?.slug);
  if (!event) return { notFound: true };
  const others = EVENTS.filter((item) => item.slug !== event.slug);
  const related = [...others.filter((item) => item.category === event.category), ...others.filter((item) => item.category !== event.category)].slice(0, 2);
  return { props: { event, related } };
};
