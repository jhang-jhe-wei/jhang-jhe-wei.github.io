import { useRouter } from 'next/router'
import { useCallback } from 'react'

interface TagsData {
  tags: string[]
  queryTag: string
}

export default function Tags ({ tags, queryTag }: TagsData): React.ReactElement {
  const router = useRouter()
  const addQuery = useCallback((query: string): void => {
    void router.push({
      pathname: '/portfolio',
      query: { tag: query }
    })
  }, [router])

  return (
    <ul className="flex mx-auto mt-20 overflow-x-auto max-w-fit">
    { tags.map((tag, index) =>
      <li key={ tag } className={`px-6 text-base text-center ${(index === tags.length - 1) ? '' : 'border-r-2 border-primary dark:border-white'}`}>
        <button
          className={`text-primary dark:text-white whitespace-nowrap cursor-pointer transition-all duration-200 hover:text-opacity-100 dark:hover:text-opacity-100 ${queryTag === tag ? 'font-bold underline underline-offset-8 decoration-2' : 'text-opacity-40 dark:text-opacity-40 hover:text-opacity-80 dark:hover:text-opacity-80'}`}
          onClick={() => addQuery(tag)}
        >{ tag }</button>
      </li>)
    }
  </ul>
  )
}
