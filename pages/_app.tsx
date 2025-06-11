import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import '../styles/global.css'
import { AppProps } from 'next/app'
import store, { useAppSelector } from '../reducers/store'
import { Provider } from 'react-redux'
import React, { useEffect } from 'react'
import Modal from 'react-modal'
import { appWithTranslation } from 'next-i18next'
import Script from 'next/script'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
Modal.setAppElement('#__next')

const App = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string): void => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <>
      <Script
        id="ga-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
        }}
      />
      <Provider store={store}>
        <ModeEffect />
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

function ModeEffect (): null {
  const mode = useAppSelector(state => state.mode.value)
  useEffect(() => {
    document.documentElement.className = mode
  }, [mode])
  return null
}

export default appWithTranslation(App)
