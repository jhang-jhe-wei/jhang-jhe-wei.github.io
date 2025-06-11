'use client'
import { NextSeo } from 'next-seo'
import Toc from '../../components/about/toc'
import Profile from '../../components/about/profile'
import List from '../../components/about/List'
import Layout from '../../components/layout'
import Achievements from '../../components/about/achievements'
import Footer from '../../components/about/footer'
import { SkillsProps, AchievementProps, ListItemProps } from '../../interfaces/about_interface'
import SkillsList from '../../components/about/skills_list'
import Projects from '../../components/about/projects'
import Resume from '../../components/about/resume'
import { useAppDispatch } from '../../reducers/store'
import { changeLanguage } from '../../reducers/locale_slice'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import DefaultSeo from '../../next-seo.config'

interface AboutProps {
  education: ListItemProps[]
  works: ListItemProps[]
  achievements: AchievementProps[]
  skillsList: SkillsProps[]
  projects: ProjectsProps[]
  locale: string
}

interface ProjectsProps {
  title: string
  description: string
  tag: string
  href: string
  imgSrc: string
}

export default function AboutClient(props: AboutProps): React.ReactElement {
  const { education, works, achievements, skillsList, projects, locale } = props
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  useEffect(() => {
    dispatch(changeLanguage(locale as any))
  }, [locale])

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
          description: t('aboutDescription'),
        }}
      />
      <h1 className="hidden">{t('aboutDescription')}</h1>
      <Layout>
        <div className="container mx-auto">
          <h2 className="mt-32 text-5xl text-center text-primary dark:text-light">{t('about')}</h2>
          <Toc />
          <Profile />
          <div className="mt-56">
            <List id="works" category="works" backgroundText="Work Experience" data={works} />
            <List id="education" category="education" backgroundText="Education Background" data={education} />
            <List category="achievements" data={achievements} styleName="hidden" />
          </div>
        </div>
        <Achievements data={achievements} />
        <div className="container mx-auto">
          <SkillsList data={skillsList} />
          <Projects projects={projects} />
        </div>
        <Resume />
        <Footer />
      </Layout>
    </>
  )
}
