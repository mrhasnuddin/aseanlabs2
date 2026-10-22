import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Lexend, Roboto_Mono } from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/tokens.css';
import '@/styles/home.css';
import '@/styles/pages.css';

const lexend = Lexend({ subsets: ['latin', 'latin-ext', 'vietnamese'], display: 'swap' });
const robotoMono = Roboto_Mono({ subsets: ['latin', 'latin-ext', 'vietnamese'], display: 'swap' });

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

  return (
    <>
      {/* html:root outranks the :root fallbacks in tokens.css whatever order the styles load in. */}
      <style jsx global>{`
        html:root {
          --al-font: ${lexend.style.fontFamily}, Helvetica, Arial, sans-serif;
          --al-mono: ${robotoMono.style.fontFamily}, 'Courier New', monospace;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
