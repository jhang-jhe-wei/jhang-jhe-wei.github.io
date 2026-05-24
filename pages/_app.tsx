import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import '../styles/global.css'
import { AppProps } from 'next/app'
import store, { useAppSelector } from '../reducers/store'
import { Provider } from 'react-redux'
import React, { useEffect } from 'react'
import Modal from 'react-modal'
import { appWithTranslation } from 'next-i18next'
import { GoogleAnalytics } from '@next/third-parties/google'
Modal.setAppElement('#__next')

const App = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  return (
    <>
      <Provider store={store}>
        <ModeEffect />
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </Provider>
      {gaId !== undefined && gaId !== '' && <GoogleAnalytics gaId={gaId} />}
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
