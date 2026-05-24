import SwitchBoard from './switch_board'
import ButtonBox from './button_box'
import DistributionBoard from './distribution_board'
import Beeper from './beeper'
import SwitchBox from './switch_box'
import SocialMediaList from '../social_media_list/social_media_list'
import { useAppDispatch } from '../../reducers/store'
import { changeColor, changeStrokeColor, changeStrokeState } from '../../reducers/neonsign/neonsign_slice'

export default function PipelineDiagram (): React.ReactElement {
  const dispatch = useAppDispatch()
  return (
    <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 90 H370" strokeWidth="10" className="stroke-primary dark:stroke-white"/>
      <SwitchBoard x="370" y="0"/>

      <path d="M600 160 H685 Q705 160, 705 140 V121" strokeWidth="3" className="stroke-primary dark:stroke-white"/>
      <DistributionBoard x="670" y="35"/>

      <path d="M765 121 V190" strokeWidth="3" className="stroke-primary dark:stroke-white"/>
      <Beeper x="745" y="190"/>

      <path d="M745 210 H515 Q485 210, 485 240 V310 Q485 340, 515 340 H730" strokeWidth="3" className="stroke-primary dark:stroke-white"/>
      <SwitchBox x="730" y="320"/>

      <path d="M0 335 H180" strokeWidth="10" className="stroke-primary dark:stroke-white"/>
      <ButtonBox x="180" y="300" clickHandlers={[
        () => dispatch(changeColor('red')),
        () => dispatch(changeColor('yellow')),
        () => dispatch(changeColor('green'))
      ]}/>

      <path d="M0 210 H240 Q270 210, 270 240 V300 " strokeWidth="3" className="stroke-primary dark:stroke-white"/>
      <ButtonBox x="250" y="300" clickHandlers={[
        () => dispatch(changeStrokeColor('red')),
        () => dispatch(changeStrokeColor('yellow')),
        () => dispatch(changeStrokeColor('green'))
      ]}/>

      <path d="M0 140 H260 Q270 140, 280 150 L330 200 Q340 210, 340 220 V300" strokeWidth="3" className="stroke-primary dark:stroke-white"/>
      <ButtonBox x="320" y="300" clickHandlers={[
        () => dispatch(changeStrokeState('forward')),
        () => dispatch(changeStrokeState('stop')),
        () => dispatch(changeStrokeState('reverse'))
      ]}/>

      <path d="M0 480 H380" strokeWidth="5" className="hidden lg:block stroke-primary dark:stroke-white"/>
      <foreignObject className="hidden lg:block" x="370" y="440" width="430" height="60">
        <div className="scale-125 translate-x-14 translate-y-5">
          <SocialMediaList/>
        </div>
      </foreignObject>
    </svg>
  )
}
