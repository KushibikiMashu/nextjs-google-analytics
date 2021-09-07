import { AppProps } from 'next/app'
import React from 'react'

import { usePageView } from '../src/lib/gtag'

function MyApp({ Component, pageProps }: AppProps) {
  usePageView()

  return (
      <Component {...pageProps} />
  )
}

export default MyApp
