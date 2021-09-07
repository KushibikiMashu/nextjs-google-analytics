import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'

export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''

// IDが取得できない場合を想定する
export const existsGaId = GA_ID !== ''

// PVを測定する
export const pageview = (path: string) => {
  window.gtag('config', GA_ID, {
    page_path: path,
  })
}

// GAイベントを発火させる
export const event = ({ action, category, label, value = '' }: Event) => {
  if (!existsGaId) {
    return
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label ? JSON.stringify(label) : '',
    value,
  })
}

// _app.tsx で読み込む
export const usePageView = () => {
  const router = useRouter()

  useEffect(() => {
    if (!existsGaId) {
      return
    }

    const handleRouteChange = (path: string) => {
      pageview(path)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}

// _document.tsx で読み込む
export const GoogleAnalytics = () => (
  <>
    {/* Google Analytics */}
    {existsGaId && (
      <>
        <Script defer src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script
          defer
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());    
              gtag('config', '${GA_ID}');
            `,
          }}
          strategy="afterInteractive"
        />
      </>
    )}
  </>
)

// イベントを型で管理
type ConvertStart = {
  action: 'convert_start'
  category: 'convert'
}

type ConvertEnd = {
  action: 'convert_end'
  category: 'convert'
}

type ConvertError = {
  action: 'convert_error'
  category: 'convert'
}

type InputError = {
  action: 'input_url_error'
  category: 'convert'
}

type Download = {
  action: 'click'
  category: 'download'
}

type Contact = {
  action: 'click'
  category: 'contact'
}

type Donation = {
  action: 'click'
  category: 'donation'
}

export type Event = (ConvertStart | ConvertEnd | ConvertError | InputError | Download | Contact | Donation) & {
  label?: Record<string, string | number | boolean>
  value?: string
}
