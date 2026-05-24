interface ButtonBoxProps {
  x: string
  y: string
  clickHandlers?: any
}
export default function ButtonBox ({ x, y, clickHandlers }: ButtonBoxProps): React.ReactElement {
  return (
    <svg x={x} y={y} width="40" height="70" viewBox="0 0 40 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="70" className="stroke-primary dark:stroke-white" strokeWidth="4"/>
      <circle cx="20" cy="17.5" r="6" fill="#FF4452" onClick={clickHandlers[0]}/>
      <circle cx="20" cy="35" r="6" fill="#F8FF17" onClick={clickHandlers[1]}/>
      <circle cx="20" cy="52.5" r="6" fill="#00AC62" onClick={clickHandlers[2]}/>
    </svg>
  )
}
