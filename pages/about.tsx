import { NextSeo } from 'next-seo'
import { GetStaticProps } from 'next'
import Toc from '../components/about/toc'
import Profile from '../components/about/profile'
import List from '../components/about/List'
import Layout from '../components/layout'
import Achievements from '../components/about/achievements'
import Footer from '../components/about/footer'
import { getAboutData } from '../lib/about'
import { SkillsProps, AchievementProps, ListItemProps } from '../interfaces/about_interface'
import SkillsList from '../components/about/skills_list'
import Projects from '../components/about/projects'
import Resume from '../components/about/resume'
import { getPortfolioData } from '../lib/portfolio'
import { ProjectProps } from '../interfaces/portfolio_interface'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { i18n } from '../next-i18next.config'
import { useAppDispatch } from '../reducers/store'
import { changeLanguage } from '../reducers/locale_slice'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import DefaultSeo from '../next-seo.config'

interface AboutProps {
  education: ListItemProps[]
  works: ListItemProps[]
  achievements: AchievementProps[]
  skillsList: SkillsProps[]
  projects: ProjectProps[]
  locale: typeof i18n.locales[number]
}

export default function About ({ education, works, achievements, skillsList, projects, locale }: AboutProps): React.ReactElement {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(changeLanguage(locale))
  }, [dispatch, locale])
  const { t } = useTranslation()

  return (
    <>
      <NextSeo
        title={t('about')}
        description={t('aboutDescription')}
        canonical={'https://wells.tw/about'}
        openGraph={{
          ...DefaultSeo.openGraph,
          locale,
          url: 'https://wells.tw/about',
          title: t('about'),
          description: t('aboutDescription')
        }}
      />
      <h1 className="hidden">{t('aboutDescription')}</h1>
      <Layout>
        <div className="container mx-auto">
          <h2 className="mt-32 text-5xl text-center text-primary dark:text-light">{t('about')}</h2>
          <Toc/>
          <Profile/>
          <div className="mt-56">
            <List id="works" category="works" backgroundText="Work Experience" data={works} />
            <List id="education" category="education" backgroundText="Education Background" data={education} />
            <List category="achievements" data={achievements} styleName="hidden" />
          </div>
        </div>
        <Achievements data={achievements}/>
        <div className="container mx-auto">
          <SkillsList data={skillsList}/>
          <Projects projects={projects}/>
        </div>
        <Resume/>
        <Footer/>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const lng = (locale ?? i18n.defaultLocale) as typeof i18n.locales[number]
  const aboutData = await getAboutData(lng)
  const projects: ProjectProps[] = await getPortfolioData(lng)
  return {
    props: {
      ...aboutData,
      projects,
      locale: lng,
      ...(await serverSideTranslations(lng, [
        'common'
      ]))
    }
  }
}
