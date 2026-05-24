import { useAppDispatch } from '../../reducers/store'
import { toggleLeft, toggleRight } from '../../reducers/figure/figure_slice'
export default function SwitchBoard ({ x, y }: { x: string, y: string }): React.ReactElement {
  const dispatch = useAppDispatch()

  return (
    <svg x={x} y={y} width="230" height="180" viewBox="0 0 239 189" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M221.555 187.197H16.8076C8.42174 187.197 1.54346 180.406 1.54346 171.917V17.5143C1.54346 9.11977 8.32751 2.23438 16.8076 2.23438H221.555C229.941 2.23438 236.819 9.02545 236.819 17.5143V171.917C236.819 180.311 229.941 187.197 221.555 187.197Z" className="stroke-primary dark:stroke-white" strokeWidth="2.6743" strokeMiterlimit="10"/>
      <circle cx="45" cy="130" r="8" fill="red" />
      <circle cx="85" cy="130" r="8" fill="red" />
      <circle cx="125" cy="130" r="8" fill="red" />
      <circle cx="160" cy="130" r="8" fill="green" />
      <circle cx="45" cy="80" r="8" className="fill-primary dark:fill-white" onClick={() => dispatch(toggleLeft())}/>
      <circle cx="160" cy="80" r="8" className="fill-primary dark:fill-white" onClick={() => dispatch(toggleRight())}/>
      <path d="M215.524 113.438H206.385V149.186H215.524V113.438Z" className="fill-primary dark:fill-white"/>
    </svg>
  )
}
