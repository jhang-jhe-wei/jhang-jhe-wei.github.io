import { useState, useEffect, useRef, MutableRefObject } from 'react'
export default function useReveal (): [MutableRefObject<any>, boolean] {
  const [reveal, setReveal] = useState(false)
  const element = useRef(null)
  useEffect(() => {
    if (reveal) return
    const scrollEventHandler = (): void => {
      const node = element.current as HTMLElement | null
      if (node == null) return
      if (node.getBoundingClientRect().top < window.innerHeight * 5 / 6) {
        setReveal(true)
      }
    }
    scrollEventHandler()
    document.addEventListener('scroll', scrollEventHandler)
    return () => { document.removeEventListener('scroll', scrollEventHandler) }
  }, [reveal])
  return [element, reveal]
}
