import { useAppDispatch } from '../../reducers/store'
import { toggleAll } from '../../reducers/light/light_slice'
export default function SwitchBox ({ x, y }: { x: string, y: string }): React.ReactElement {
  const dispatch = useAppDispatch()
  return (
    <svg x={x} y={y} width="70" height="40" viewBox="0 0 70 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="70" height="40" className="stroke-primary dark:stroke-white" strokeWidth="4"/>
      <rect x="20" y="12.5" width="30" height="15" className="stroke-primary dark:stroke-white fill-white dark:fill-primary" strokeWidth="4" onClick={() => dispatch(toggleAll())}/>
    </svg>
  )
}
