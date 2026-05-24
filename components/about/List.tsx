import { useTranslation } from 'next-i18next'
import { ListProps } from '../../interfaces/about_interface'
import ListItem from './list_item'
export default function List (listProps: ListProps): React.ReactElement {
  const { t } = useTranslation()
  return (
    <div className={`grid xl:grid-cols-3 grid-cols-5 ${listProps.styleName ?? ''}`} id={listProps.id}>
      <h3 className="absolute hidden text-white md:text-4xl md:block font-notosans shadow-gray-700 rotate-90 origin-top-left xl:text-7xl break-inside-avoid">
        {listProps.backgroundText?.split(' ').map(text => (
          <span key={text}>
            {text}
            <br/>
          </span>
        ))}
      </h3>
      <div className="col-span-1">
        <h3 className="hidden text-3xl xl:text-4xl xl:block text-secondary">{t(`anchors.${listProps.category}`)}</h3>
      </div>
      <div className="relative z-20 col-span-4 xl:col-span-2">
        <h3 className="absolute block text-3xl left-10 md:left-12 -top-16 xl:hidden text-secondary">{t(`anchors.${listProps.category}`)}</h3>
        <ul className="pb-12 border-l border-gray-400">
          {
            listProps.data.map(item => (
              <ListItem key={item.title} item={item}/>
            ))
          }
        </ul>
      </div>
    </div>
  )
}
