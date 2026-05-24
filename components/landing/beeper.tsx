export default function Beeper ({ x, y }: { x: string, y: string }): React.ReactElement {
  return (
    <svg x={x} y={y} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" className="fill-primary dark:fill-white"/>
    </svg>
  )
}
