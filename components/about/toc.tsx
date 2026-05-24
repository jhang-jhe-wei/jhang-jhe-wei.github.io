import { useTranslation } from 'next-i18next'
export default function Toc (): React.ReactElement {
  const { t } = useTranslation()
  const anchors = ['profile', 'education', 'works', 'achievements', 'skills']
  return (
    <ul className="justify-center hidden mt-20 sm:flex">
    { anchors.map((anchor, index) =>
    <li key={ anchor } className={`px-6 text-base text-center  ${(index === anchors.length - 1) ? '' : 'border-r-2 border-primary dark:border-white'}`}>
      <button onClick={() => {
        const node = document.getElementById(anchor)
        if (node === null) return
        window.scrollTo({ top: node.offsetTop - window.innerHeight / 2, behavior: 'smooth' })
      } }
        className="dark:text-opacity-40 dark:hover:text-opacity-100 text-opacity-40 hover:text-opacity-100 text-primary dark:text-light">
        { t(`anchors.${anchor}`) }
      </button>
    </li>
    )}
  </ul>
  )
}
