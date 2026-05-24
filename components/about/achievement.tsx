import { AchievementProps } from '../../interfaces/about_interface'
import useReveal from '../../lib/use_reveal'
export default function Achievement ({ item }: {item: AchievementProps}): React.ReactElement {
  const [element, reveal] = useReveal()

  return (
    <li ref={element} className={`transition-all duration-500 ${reveal ? 'opacity-100' : 'translate-y-20 opacity-0'}`}>
      <h3 className="text-2xl font-bold text-cyan-450">{item.title}</h3>
      {item.isFull
        ? <ul className="mt-8 text-base list-disc list-inside text-primary dark:text-light grid xl:grid-cols-2 gap-x-10">
        {item.highlights.map(highlight => (
          <li key={highlight}>
            {highlight}
          </li>
        ))}
      </ul>
        : <ul className="mt-8 text-base list-disc list-inside text-primary dark:text-light">
        {item.highlights.map(highlight => (
          <li key={highlight}>
            {highlight}
          </li>
        ))}
      </ul>
      }
    </li>
  )
}
