import { getAboutData } from '../../lib/about'
import { getPortfolioData } from '../../lib/portfolio'
import { i18n } from '../../next-i18next.config'
import AboutClient from './client'
import { ProjectProps } from '../../interfaces/portfolio_interface'
import { SkillsProps, AchievementProps, ListItemProps } from '../../interfaces/about_interface'

export default async function AboutPage() {
  const locale = i18n.defaultLocale
  const aboutData = await getAboutData(locale)
  const projects: ProjectProps[] = await getPortfolioData(locale)
  const props = { ...aboutData, projects, locale }
  return <AboutClient {...props} />
}
