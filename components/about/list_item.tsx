import { ListItemProps } from '../../interfaces/about_interface'
import { useState, useEffect, useRef } from 'react'
export default function ListItem ({ item }: {item: ListItemProps}): React.ReactElement {
  const [reveal, setReveal] = useState(false)
  const element = useRef<HTMLLIElement>(null)
  useEffect(() => {
    if (reveal) return
    const scrollEventHandler = (): void => {
      const node = element.current
      if (node === null) return
      if ((window.scrollY + window.innerHeight / 4 * 3) > node.offsetTop) {
        setReveal(true)
      }
    }
    document.addEventListener('scroll', scrollEventHandler)
    return () => { document.removeEventListener('scroll', scrollEventHandler) }
  }, [reveal])

  return (
    <li ref={element} className={`relative mb-16 text-3xl xl:text-4xl text-gray-400 transition-all duration-500 ${reveal ? 'opacity-100' : 'translate-y-20 opacity-0'} break-inside-avoid md:min-h-[120px] min-h-[150px]`}>
      <svg viewBox="0 0 2 2" className="absolute z-10 w-2 -left-1.25 top-2">
        <circle cx="1" cy="1" r="1" className="fill-gray-400" />
      </svg>
      <div>
        <div className="absolute flex flex-col items-end w-20 text-base text-right -left-28 xl:text-xl">
          <p className="max-w-[2ch] break-words md:max-w-full">
            {item.startedAt}
          </p>
            {
              item.endedAt && '~'
            }
          <p className="max-w-[2ch] break-words md:max-w-full">
          {item.endedAt}
          </p>
        </div>
        <div className="ml-10">
          <h3 className="text-xl font-bold align-middle xl:text-2xl text-cyan-450">
            {item.title}
            <span className="block md:inline">
              {
                item.subTitle &&
                <svg viewBox="0 0 2 2" className="w-1.5 inline mr-2 md:mx-2">
                  <circle cx="1" cy="1" r="1" className="fill-cyan-450" />
                </svg>
              }
              <span className="text-lg font-normal xl:text-xl">
                {item.subTitle}
              </span>
            </span>
          </h3>
          <ul className="mt-5 text-base list-disc list-inside xl:text-lg dark:text-light text-primary">
            {item.highlights?.map(highlight => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  )
}
