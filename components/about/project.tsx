import { ProjectProps } from '../../interfaces/portfolio_interface'
import useReveal from '../../lib/use_reveal'

interface ProjectComponentProps {
  project: ProjectProps
  index: number
}
export default function Project ({ project, index }: ProjectComponentProps): React.ReactElement {
  const [element, reveal] = useReveal()

  return (
    <li ref={element} className={`hover:scale-110 bg-white dark:bg-primary-opacity mx-auto max-w-xs xl:max-w-full flex xl:flex-row flex-col mb-10 transition-opacity-and-transform duration-500 ${reveal ? 'opacity-100' : 'translate-y-20 opacity-0'} ${index % 2 === 0 ? '' : 'xl:flex-row-reverse'}`}>
      <img className="object-scale-down object-center bg-gray-300 h-60 w-80" src={project.image} alt=""/>
      <div className="flex flex-col justify-between flex-1 px-7 py-7">
        <div>
          <h3 className="text-xl font-bold text-secondary">{project.title}</h3>
          <p className="mt-5 text-primary dark:text-white line-clamp-5 xl:line-clamp-3">{project.description}</p>
        </div>
        <div className="mt-5">
          {
            project.demo_link && <a className="px-4 py-2 text-sm mr-2 text-white border rounded-[10px] border-secondary hover:no-underline bg-secondary hover:bg-white hover:text-secondary" href={project.demo_link}>Demo</a>
          }
          {
            project.code_link && <a className="px-4 py-2 text-sm text-white border rounded-[10px] border-secondary hover:no-underline bg-secondary hover:bg-white hover:text-secondary" href={project.code_link}>Source Code</a>
          }
        </div>
      </div>
    </li>
  )
}
