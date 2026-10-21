import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import '@/styles/tokens.css';
import '@/styles/home.css';
import '@/styles/pages.css';

export default function App({ Component, pageProps }: AppProps) {
  const { locale = 'en', asPath } = useRouter();
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Ambient illustration motion runs only while it is on screen and the tab is visible.
  useEffect(() => {
    const observer = new IntersectionObserver((entries) =>
      entries.forEach((entry) => entry.target.classList.toggle('is-paused', !entry.isIntersecting)),
    );
    document.querySelectorAll('.al-motion').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [asPath, locale]);
  useEffect(() => {
    const sync = () => document.documentElement.classList.toggle('al-tab-hidden', document.hidden);
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);

  return <Component {...pageProps} />;
}
