import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from '@/hooks/useTranslation';

export const SITE_URL = 'https://aseanlabs.io';

const OG_LOCALES: Record<string, string> = {
  en: 'en_US',
  ms: 'ms_MY',
  id: 'id_ID',
  'zh-TW': 'zh_TW',
  'zh-CN': 'zh_CN',
  vi: 'vi_VN',
  ja: 'ja_JP',
  ko: 'ko_KR',
};

/* Title, description, canonical, language alternates and share-card tags for every page. */
export function Seo({ title, description }: { title: string; description: string }) {
  const { t } = useTranslation();
  const { asPath, locale = 'en', locales = ['en'], defaultLocale = 'en' } = useRouter();
  const path = asPath.split(/[?#]/)[0].replace(/\/$/, '');
  const urlFor = (l: string) => `${SITE_URL}${l === defaultLocale ? '' : `/${l}`}${path}`;
  const url = urlFor(locale);
  const image = `${SITE_URL}/og-image.png`;
  const imageAlt = `ASEAN Labs: ${t('hero.headline')}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {locales.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={urlFor(l)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={urlFor(defaultLocale)} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="ASEAN Labs" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={OG_LOCALES[locale] ?? 'en_US'} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@AseanLabs_" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />
    </Head>
  );
}
