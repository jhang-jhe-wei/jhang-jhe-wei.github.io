import { useState, useEffect } from 'react'
export default function Timer (): React.ReactElement {
  const [state, setState] = useState(-1)
  const [second, setSecond] = useState(0)

  useEffect(() => {
    if (state === 1) {
      const interval = setInterval(() => {
        setSecond(sec => sec + 1)
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    }
  }, [state])
  return (
    <div>
      <div className="container flex justify-center mx-auto">
        <button className="px-4 py-2 mr-6 text-white border-2 rounded-[10px] border-secondary bg-secondary dark:hover:border-primary hover:bg-white hover:text-secondary hover:no-underline" onClick={() => {
          setState(state * -1)
        }}>{state === -1 ? '開始' : '停止'}
        </button>
        <button className="px-4 py-2 bg-white border-2 rounded-[10px] text-secondary border-secondary dark:hover:border-primary hover:bg-secondary hover:text-white hover:no-underline" onClick={() => { setSecond(0) }} >重置</button>
      </div>
      <p className="mt-12 text-center text-primary dark:text-white text-9xl">{second}</p>
    </div>
  )
}
