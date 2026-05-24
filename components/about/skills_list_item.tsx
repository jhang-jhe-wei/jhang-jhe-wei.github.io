import { SkillsProps } from '../../interfaces/about_interface'
import useReveal from '../../lib/use_reveal'
import { PieChart } from '@mui/x-charts/PieChart'

interface SkillsListItemProps {
  skills: SkillsProps
  index: number
}
export default function SkillsListItem ({ skills, index }: SkillsListItemProps): React.ReactElement {
  const [element, reveal] = useReveal()

  const data = skills.skills.map(skill => {
    return {
      id: skill.name,
      value: skill.proficiency,
      label: skill.name
    }
  })

  return (
    <li ref={element} className={`py-9 px-10 bg-white dark:bg-primary-opacity transition-opacity-and-transform duration-500 ${reveal ? 'opacity-100' : 'translate-y-20 opacity-0'}`}>
      <h3 className="text-2xl font-bold text-cyan-450">{skills.title}</h3>
      <div className='w-full md:h-[200px] h-[100px]'>
      {
        <PieChart
          colors={[
            '#ef4444',
            '#f1623a',
            '#f4802f',
            '#f69f25',
            '#f9bd1a',
            '#facc15'
          ]}
          series={[
            {
              data,
              innerRadius: 30,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' }
            }
          ]}
          slotProps={{
            legend: {
              direction: 'column',
              position: { vertical: 'middle', horizontal: 'right' },
              padding: 0
            }
          }}
        />
      }
      </div>
    </li>

  )
}
