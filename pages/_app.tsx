import { AppProps } from 'next/app'
import Script from "next/script";
import React from 'react'

import {usePageView, GA_ID} from '../src/lib/gtag'

function MyApp({ Component, pageProps }: AppProps) {
  usePageView()

  return (
    <>
      <Script defer src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga" defer strategy="afterInteractive">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());    
              gtag('config', '${GA_ID}');
          `}
      </Script>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
