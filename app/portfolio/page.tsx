import { getPortfolioData } from '../../lib/portfolio'
import { i18n } from '../../next-i18next.config'
import PortfolioClient from './client'
import { ProjectProps } from '../../interfaces/portfolio_interface'

export default async function PortfolioPage() {
  const locale = i18n.defaultLocale
  const projects: ProjectProps[] = await getPortfolioData(locale)
  const tags = Array.from(new Set(projects.map(project => project.tag)))
  return <PortfolioClient projects={projects} tags={tags} locale={locale} />
}
