import Light from './light'
import Neonsign from './neonsign'

export default function Signboard (): React.ReactElement {
  return (
    <>
      <div className="w-full border-b-4 border-primary dark:border-white">
        <div className="flex items-end justify-around max-w-xl mx-auto lg:max-w-none xl:px-20">
          <Light index={0} />
          <Light index={1} />
          <Light index={2} />
          <div className="hidden lg:block bg-light dark:bg-primary translate-y-6">
            <Neonsign width='500'/>
          </div>
          <Light index={3} />
          <Light index={4} />
          <Light index={5} />
        </div>
      </div>
      <div className="block mt-10 lg:hidden">
        <div className="max-w-md mx-auto">
          <Neonsign width='80%'/>
        </div>
      </div>
    </>
  )
}
