export default function NavHamburger ({ reveal, setReveal }: { reveal: boolean, setReveal: React.Dispatch<React.SetStateAction<boolean>> }): React.ReactElement {
  return (
    <div className="flex flex-col justify-between h-6 ml-6 xl:hidden" onClick={() => setReveal((prev: boolean) => !prev)}>
      <span className={`block w-8 h-1 transition-all duration-500 ${reveal ? '-rotate-45 translate-y-2.5 bg-light' : 'bg-primary dark:bg-light'}`}></span>
      <span className={`block w-8 h-1 bg-primary dark:bg-light transition-all duration-500 ${reveal ? 'hidden' : ''}`}></span>
      <span className={`block w-8 h-1 transition-all duration-500 ${reveal ? 'rotate-45 -translate-y-2.5 bg-light' : 'bg-primary dark:bg-light'}`}></span>
    </div>
  )
}
