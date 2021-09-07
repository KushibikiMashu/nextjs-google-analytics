import React from 'react'

import usePageView from '../src/hooks/usePageView'
import GoogleAnalytics from '../src/components/GoogleAnalytics'

const App = ({ Component, pageProps }) => {
  usePageView() // 追加

  return (
    <>
      <GoogleAnalytics />

      <Component {...pageProps} />
    </>
  )
}

export default App
