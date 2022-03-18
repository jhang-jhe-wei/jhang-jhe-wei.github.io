import { ListProps } from "../../interfaces/about_interface"
export default function List(listProps:ListProps):React.ReactElement {
  return (
    <div className="flex" id={listProps.id}>
      <h2 className="absolute text-white font-notosans shadow-gray-700 rotate-90 origin-top-left text-7xl">
        {listProps.backgroundText.split(" ").map(text=>(
          <span key={text}>
            {text}
            <br/>
          </span>
        ))}
      </h2>
      <h2 className="z-10 flex-1 text-3xl border-r border-gray-400 text-secondary">{listProps.category}</h2>
      <ul className="z-20 pb-32 list-disc list-inside flex-2">
        {
          listProps.data.map(item => (
            <li key={item.title} className="mb-16 text-4xl text-gray-400 -translate-x-1.5">
              <p className="absolute inline-block w-20 text-xl text-right -translate-x-40 translate-y-1">
                {item.startedAt}
                <br/>
                ~
                <br/>
                {item.endedAt}
              </p>
              <h3 className="inline ml-10 text-2xl font-bold align-middle text-cyan-450">
                {item.title}．
                <span className="text-xl font-normal">
                  {item.subTitle}
                </span>
              </h3>
              <ul className="mt-8 text-lg list-disc list-outside ml-28 dark:text-light text-primary">
                {item.highlights.map(highlight => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </li>
          ))
        }
      </ul>
    </div>
  )
}