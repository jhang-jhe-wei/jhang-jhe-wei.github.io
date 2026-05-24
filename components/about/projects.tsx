import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { ProjectProps } from '../../interfaces/portfolio_interface'
import Project from './project'
interface ProjectsProps {
  projects: ProjectProps[]
}

export default function Projects ({ projects }: ProjectsProps): React.ReactElement {
  const { t } = useTranslation()
  return (
    <div className="mt-40">
      <h3 className="hidden text-4xl text-center text-white md:block font-notosans shadow-gray-700 xl:text-7xl">Projects</h3>
      <h3 className="mt-5 text-3xl text-center text-secondary">{t('anchors.projects')}</h3>
      <ul className="mt-10">
        {
          projects.filter(project => project.highlight).map((project, index) => <Project key={project.title} project={project} index={index}/>)
        }
      </ul>
      <div className="text-center border-b border-gray-400 dark:border-white">
        <Link href="/portfolio" className="inline-block pt-3 pb-2 pl-3 pr-2 text-gray-400 border border-gray-400 duration-500 hover:scale-125 dark:bg-primary dark:text-white bg-light translate-y-1/2">SHOW MORE &gt;</Link>
      </div>
    </div>
  )
}
