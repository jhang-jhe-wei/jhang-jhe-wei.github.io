import Nav from './nav/nav'

export default function Layout ({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <>
      <Nav/>
      {children}
    </>
  )
}
