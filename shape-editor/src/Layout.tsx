import { ReactNode } from 'react'
import ExampleAppBar from './ExampleAppBar'

type LayoutProps = {
  children: ReactNode
  addRectC?: (event: React.MouseEvent<HTMLButtonElement>) => void
  addHexC?: (event: React.MouseEvent<HTMLButtonElement>) => void
  addTrianC?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Layout = ({ children, addRectC, addHexC, addTrianC }: LayoutProps) => {
  return (
    <div style={{ display: 'flex' }}>
      <ExampleAppBar
        addRectC={addRectC}
        addHexC={addHexC}
        addTrianC={addTrianC}
      ></ExampleAppBar>
      <main style={{ flexGrow: 1 }}>{children}</main>
    </div>
  )
}

export default Layout
