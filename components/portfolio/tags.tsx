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
      <li key={ tag } className={`px-6 text-base text-center ${(index == tags.length - 1) ? '' : 'border-r-2 border-primary dark:border-white'}`}>
        <button className={`${queryTag == tag ? '' : 'dark:text-opacity-40 text-opacity-40'} text-primary dark:text-white whitespace-nowrap`} onClick={() => addQuery(tag)} >{ tag }</button>
      </li>)
    }
  </ul>
  )
}
