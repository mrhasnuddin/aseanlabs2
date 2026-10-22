import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang={this.props.__NEXT_DATA__.locale || 'en'}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#F4BF4B" />
          {/* Marks JS support before first paint so load animations start hidden instead of flashing. */}
          <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
          <link rel="icon" href="/symbols/aseanlabs%20svg%201.svg" type="image/svg+xml" />
          <link
            rel="preload"
            href="/fonts/space-grotesk-latin.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        <body id="top">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
