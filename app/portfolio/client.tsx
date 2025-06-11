'use client'
import { NextSeo } from 'next-seo'
import Layout from '../../components/layout'
import Card from '../../components/portfolio/card'
import Tags from '../../components/portfolio/tags'
import { ProjectProps } from '../../interfaces/portfolio_interface'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useAppDispatch } from '../../reducers/store'
import { changeLanguage } from '../../reducers/locale_slice'
import { useTranslation } from 'next-i18next'
import DefaultSeo from '../../next-seo.config'

interface PortfolioProps {
  projects: ProjectProps[]
  tags: string[]
  locale: string
}

export default function PortfolioClient({ projects, tags, locale }: PortfolioProps) {
  const searchParams = useSearchParams()
  const queryTag = searchParams.get('tag') || tags[0]
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(changeLanguage(locale as any))
  }, [locale])

  return (
    <>
      <NextSeo
        title={t('portfolio')}
        description={t('portfolioDescription')}
        canonical={'https://wells.tw/portfolio'}
        openGraph={{
          ...DefaultSeo.openGraph,
          locale,
          url: 'https://wells.tw/portfolio',
          title: t('portfolio'),
          description: t('portfolioDescription'),
        }}
      />
      <h1 className="hidden">{t('portfolioDescription')}</h1>
      <Layout>
        <div className="container mx-auto">
          <h2 className="text-5xl text-center text-primary dark:text-white mt-28">{t('portfolio')}</h2>
          <Tags tags={tags} queryTag={queryTag} />
          <div className="pb-20 mt-12 gap-9 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {projects.filter(project => project.tag == queryTag).map(project => (
              <Card key={project.title} project={project} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  )
}
