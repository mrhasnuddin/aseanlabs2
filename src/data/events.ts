import imageSizes from './event-images.json';

export type EventCategory = 'community' | 'speaking' | 'launches';
export type EventRecord = {
  slug: string;
  title: string;
  category: EventCategory;
  photoCount: number;
  note?: true;
};

// The write-ups live in the locale files as events.<slug>.role, .location, .excerpt, .p1, .p2 and,
// where `note` is set, .note. They were rewritten from the owner's Dean Studio event archive.
// Preserve the actual participation role; founder appearances are not presented as events we hosted.
// Dates are omitted where the source does not supply a confirmed event date.
// Titles are event names and stay in English in every language.
export const EVENTS: EventRecord[] = [
  { slug: 'aisem-selangor', title: 'Selangor AI & Semiconductor Summit 2026', category: 'speaking', photoCount: 3 },
  { slug: 'changsha', title: 'ENI DeFi Week World Tour', category: 'speaking', photoCount: 2 },
  { slug: 'hangzhou', title: 'Web3 + RWA Global Infrastructure Summit', category: 'speaking', photoCount: 2 },
  { slug: 'bali', title: 'Monster GameFi Soft Launch', category: 'launches', photoCount: 2 },
  { slug: 'chain-of-trust', title: 'Chain of Trust', category: 'community', photoCount: 2 },
  { slug: 'gala', title: 'Christmas Crypto Gala', category: 'community', photoCount: 2 },
  { slug: 'paygo-meetup', title: 'PayGo × ENI Community Night', category: 'community', photoCount: 2 },
  { slug: 'nova-mexc', title: 'NOVA × MEXC Builders Session', category: 'speaking', photoCount: 2, note: true },
  { slug: 'blockchain-evolution', title: 'Blockchain Evolution 2025', category: 'speaking', photoCount: 2, note: true },
];

const sizes: Record<string, { width: number; height: number }> = imageSizes;
export function eventPhotos(event: EventRecord) {
  return Array.from({ length: event.photoCount }, (_, index) => {
    const src = `/events/${event.slug}/${String(index + 1).padStart(2, '0')}.webp`;
    return { src, ...sizes[src] };
  });
}
export const FEATURED_EVENTS = ['bali', 'paygo-meetup', 'gala'].map((slug) => EVENTS.find((event) => event.slug === slug)!);
