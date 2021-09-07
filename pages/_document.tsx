import {GA_ID} from "@/lib/gtag";
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import Script from 'next/script'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const i = await Document.getInitialProps(ctx)

    return { ...i }
  }

  render() {
    return (
      <Html lang="ja">
      <Head>
        <Script defer src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga" defer strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());    
              gtag('config', '${GA_ID}');
          `}
        </Script>
      </Head>
      <body>
      <Main />
      <NextScript />
      </body>
      </Html>
    )
  }
}
