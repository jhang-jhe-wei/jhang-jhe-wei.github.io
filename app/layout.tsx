'use client'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import '../styles/global.css'
import { Provider } from 'react-redux'
import store, { useAppSelector } from '../reducers/store'
import { useEffect } from 'react'
import Script from 'next/script'
import * as gtag from '../lib/gtag'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  useEffect(() => {
    gtag.pageview(pathname)
  }, [pathname])

  const mode = useAppSelector(state => state.mode.value)
  useEffect(() => {
    document.documentElement.className = mode
  }, [mode])

  return (
    <html lang="en">
      <head>
        <DefaultSeo {...SEO} />
      </head>
      <body>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  )
}
