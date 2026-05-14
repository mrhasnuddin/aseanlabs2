import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth snap-y snap-proximity">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta
          name="description"
          content="ASEAN Labs — the execution layer for ENI builders. A paid execution partner for serious Web3 projects in Southeast Asia."
        />
        <link rel="icon" href="/symbols/aseanlabs%20svg%201.svg" type="image/svg+xml" />

        {/* Fonts — loaded directly so "Space Grotesk" and "IBM Plex Mono" are
            real named fonts available everywhere in CSS, no CSS-var indirection needed. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
