import { NextSeo } from 'next-seo'
import { GetStaticProps } from 'next'
import Figure from '../components/landing/figure'
import Signboard from '../components/landing/signboard'
import PipelineDiagram from '../components/landing/pipeline_diagram'
import Footer from '../components/landing/footer'
import Layout from '../components/layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { i18n } from '../next-i18next.config'
import { useAppDispatch } from '../reducers/store'
import { changeLanguage } from '../reducers/locale_slice'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import DefaultSeo from '../next-seo.config'

interface HomeProps {
  locale: typeof i18n.locales[number]
}

export default function Home ({ locale }: HomeProps): React.ReactElement {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(changeLanguage(locale))
  }, [])
  const { t } = useTranslation()
  return (
    <>
      <NextSeo
        title={t('home')}
        description={t('homeDescription')}
        openGraph={{
          ...DefaultSeo.openGraph,
          locale,
          title: t('home'),
          description: t('homeDescription')
        }}
      />
      <h1 className="hidden">{t('homeDescription')}</h1>
      <div className="bg-[length:40px_40px] bg-grid-dark dark:bg-grid-light min-h-screen">
        <Layout>
          <div className="mt-2 lg:mt-0">
            <Signboard/>
          </div>
          <div className="justify-center hidden mx-auto mt-20 lg:flex">
            <PipelineDiagram/>
            <svg viewBox="0 0 800 503" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Figure x="250" y="0" width="500"/>
              <path d="M0 340 H50 Q70 340, 90 360 L 190 480 Q210 500, 230 500 H800" strokeWidth="3" className="hidden lg:block stroke-primary dark:stroke-white"/>
            </svg>
          </div>
          <div className="lg:hidden">
            <div className="w-64 mx-auto mt-5 sm:w-80 md:w-96 lg:mt-9">
              <Figure x="0" y="0" width='100%'/>
            </div>
            <div className="pr-10">
              <PipelineDiagram/>
            </div>
            <div className="-translate-y-10 sm:-translate-y-24">
              <Footer/>
            </div>
          </div>
        </Layout>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const lng = (locale ?? i18n.defaultLocale) as typeof i18n.locales[number]
  return {
    props: {
      locale: lng,
      ...(await serverSideTranslations(lng, [
        'common'
      ]))
    }
  }
}
