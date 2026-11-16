import imageSizes from './event-images.json';

export type EventCategory = 'community' | 'speaking' | 'launches';
export type EventRecord = {
  slug: string;
  title: string;
  location: string;
  category: EventCategory;
  role: string;
  excerpt: string;
  paragraphs: string[];
  photoCount: number;
  participationNote?: string;
};

// Rewritten from the owner's Dean Studio event archive. Preserve the actual
// participation role; founder appearances are not presented as events we hosted.
// Dates are omitted where the source does not supply a confirmed event date.
export const EVENTS: EventRecord[] = [
  {
    slug: 'aisem-selangor', title: 'Selangor AI & Semiconductor Summit 2026', location: 'Kuala Lumpur, Malaysia', category: 'speaking', role: 'Founder speaking', photoCount: 3,
    excerpt: 'We joined the conversation on preparing people for Malaysia’s AI and semiconductor ambitions.',
    paragraphs: [
      'We took part in the Selangor AI & Semiconductor Summit 2026, where our founder spoke on the Fire Stage. Alongside a programme about chips and infrastructure, the session focused on the people who will work with that technology.',
      'The talk highlighted the talent-building work of the MyDAC Malaysia and LEJIEND joint venture, including free community learning online and in person at Outreach Coffee in Bukit Bintang. We brought a practical question into the discussion: how do we help everyday Malaysians prepare for the opportunities ahead?',
    ],
  },
  {
    slug: 'changsha', title: 'ENI DeFi Week World Tour', location: 'Changsha, China', category: 'speaking', role: 'Speaking & ecosystem presentation', photoCount: 2,
    excerpt: 'We introduced our incubation work and the ENI ecosystem to a mainland Chinese audience in Changsha.',
    paragraphs: [
      'We represented ASEAN Labs at ENI DeFi Week in Changsha, an ENI-organised event introducing the network and its ecosystem to mainland Chinese audiences.',
      'Our session walked through projects being built in the ecosystem and the incubation work we were doing with Web3 teams in Southeast Asia. The visit also gave us a closer view of the conversations around DeFi and Web3 in China. We thank the ENI team for hosting us.',
    ],
  },
  {
    slug: 'hangzhou', title: 'Web3 + RWA Global Infrastructure Summit', location: 'Hangzhou, China', category: 'speaking', role: 'Speaking & product presentation', photoCount: 2,
    excerpt: 'We brought community participation into a summit focused on Web3 infrastructure and real-world assets.',
    paragraphs: [
      'We joined the Web3 + RWA Global Infrastructure Summit in Hangzhou, organised by ENI, to represent ASEAN Labs and share work from the ecosystem.',
      'Our presentation introduced the MEX launchpad and DAOaaS, with a focus on how communities could participate in Web3 products and activities. While the wider programme examined infrastructure and real-world assets, we used our session to discuss the community experience around those systems.',
    ],
  },
  {
    slug: 'bali', title: 'Monster GameFi Soft Launch', location: 'Bali, Indonesia', category: 'launches', role: 'Co-organising, hosting & keynote', photoCount: 2,
    excerpt: 'We brought partners and Bali’s Web3 community together for a GameFi launch during Coinfest week.',
    paragraphs: [
      'We co-organised the Monster GameFi soft launch in Bali during Coinfest week, working with HODL, Kripto101, Pionex and 9Bit. Our founder hosted the event and delivered a keynote.',
      'The programme introduced the partners’ new products to the community and made room for conversations with people building and following Web3 in Bali. We worked with the partner teams to bring the launch and community gathering into the same room.',
    ],
  },
  {
    slug: 'chain-of-trust', title: 'Chain of Trust', location: 'Kuala Lumpur, Malaysia', category: 'community', role: 'Ecosystem presentation', photoCount: 2,
    excerpt: 'We shared our incubation work with Malaysia’s Web3 and technology communities at Chain of Trust.',
    paragraphs: [
      'We presented ASEAN Labs at Chain of Trust, hosted by CCACC and Fableration for Malaysia’s Web3 and technology communities.',
      'Our session introduced our incubation work and projects from the ecosystem. The programme also featured lucky draws and giveaways in stablecoins and project tokens. We thank CCACC and Fableration for inviting us to share what we were working on with a local audience.',
    ],
  },
  {
    slug: 'gala', title: 'Christmas Crypto Gala', location: 'Kuala Lumpur, Malaysia', category: 'community', role: 'Co-hosting & panel discussion', photoCount: 2,
    excerpt: 'We co-hosted a gathering with MySekolahKripto to discuss the next chapter of Web3 in Malaysia.',
    paragraphs: [
      'We co-hosted the Christmas Crypto Gala with MySekolahKripto in Kuala Lumpur. The programme paired project introductions with a panel on the future of Web3 in Malaysia.',
      'Our founder joined speakers working across fintech, GameFi and PayFi, alongside a representative from MDEC who attended in a personal capacity. We used the panel to exchange ideas across these different parts of the industry and discuss where Web3 in Malaysia could go next.',
    ],
  },
  {
    slug: 'paygo-meetup', title: 'PayGo × ENI Community Night', location: 'Kuala Lumpur, Malaysia', category: 'community', role: 'Co-hosting & presentation', photoCount: 2,
    excerpt: 'We brought tech, fintech, Web3 and student communities into one conversation with PayGo and Finweek KL.',
    paragraphs: [
      'We hosted PayGo × ENI Community Night with PayGo, in joint venture with Finweek KL. The gathering brought together people from technology, fintech and Web3, as well as college students.',
      'We introduced ASEAN Labs, our services and our portfolio before opening a discussion about the Web3 industry in Malaysia. The conversation covered challenges and possible solutions, giving people with different backgrounds a chance to compare their perspectives.',
    ],
  },
  {
    slug: 'nova-mexc', title: 'NOVA × MEXC Builders Session', location: 'Selangor, Malaysia', category: 'speaking', role: 'Founder speaking · personal capacity', photoCount: 2,
    participationNote: 'Our founder attended this session in a personal capacity. ASEAN Labs was not identified as an organiser.',
    excerpt: 'We revisit a conversation about the skills and opportunities that can help people find their place in Web3.',
    paragraphs: [
      'We’re sharing a look back at a session where our founder was invited in a personal capacity to discuss his experience in Web3. MySekolahKripto hosted the session in joint venture with MEXC.',
      'The audience included college students and working professionals. The talk covered the industry, the skills it asks for and the job opportunities people could explore. We returned to practical questions about entering Web3: what to learn, which opportunities to consider and where existing experience might fit.',
    ],
  },
  {
    slug: 'blockchain-evolution', title: 'Blockchain Evolution 2025', location: 'Selangor, Malaysia', category: 'speaking', role: 'Founder speaking · representing GameSpace', photoCount: 2,
    participationNote: 'Our founder represented GameSpace at this event. The programme was hosted by MySekolahKripto with EUFT and GameSpace.',
    excerpt: 'We revisit a hands-on GameFi session where our founder represented GameSpace and introduced the project to the public.',
    paragraphs: [
      'We’re revisiting Blockchain Evolution 2025 as part of our founder’s speaking experience. At this event, he represented GameSpace in a programme hosted by MySekolahKripto in joint venture with EUFT and GameSpace.',
      'The session introduced GameSpace and explored GameFi with a public audience. Mini games, giveaways and a mini tournament gave attendees a chance to try activities alongside the presentation. We saw a way to pair an introduction to the project with something people could experience for themselves.',
    ],
  },
];

const sizes: Record<string, { width: number; height: number }> = imageSizes;
export function eventPhotos(event: EventRecord) {
  return Array.from({ length: event.photoCount }, (_, index) => {
    const src = `/events/${event.slug}/${String(index + 1).padStart(2, '0')}.webp`;
    return { src, ...sizes[src], alt: `${event.title} — event photograph ${index + 1}` };
  });
}
export const FEATURED_EVENTS = ['bali', 'paygo-meetup', 'gala'].map((slug) => EVENTS.find((event) => event.slug === slug)!);
