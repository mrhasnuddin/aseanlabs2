import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { registerGsap } from '@/lib/gsap';
import { Preloader } from '@/components/Preloader';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    registerGsap();
  }, []);

  return (
    <>
      <Preloader />
      <Component {...pageProps} />
    </>
  );
}
