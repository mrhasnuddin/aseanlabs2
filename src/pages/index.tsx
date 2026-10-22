import Head from 'next/head';
import { Seo, SITE_URL } from '@/components/Seo';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/components/home/HomePage';
import { useTranslation } from '@/hooks/useTranslation';

const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ASEAN Labs',
  url: SITE_URL,
  logo: `${SITE_URL}/symbols/aseanlabs%20svg%201.svg`,
  image: `${SITE_URL}/og-image.png`,
  email: 'contact@aseanlabs.io',
  areaServed: 'Southeast Asia',
  sameAs: ['https://x.com/AseanLabs_', 'https://t.me/aseanlabs', 'https://linktr.ee/aseanlabs'],
};

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Seo title={t('meta.homeTitle')} description={t('meta.homeDesc')} />
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION) }} />
      </Head>
      <a className="al-skip-link" href="#main-content">
        {t('home.skipContent')}
      </a>
      <Nav />
      <HomePage />
      <Footer />
    </>
  );
}
