import Head from 'next/head';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/components/home/HomePage';
import { useTranslation } from '@/hooks/useTranslation';

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('meta.homeTitle')}</title>
        <meta name="description" content={t('meta.homeDesc')} />
        <meta property="og:title" content={t('meta.homeTitle')} />
        <meta property="og:description" content={t('meta.homeDesc')} />
        <meta property="og:type" content="website" />
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
