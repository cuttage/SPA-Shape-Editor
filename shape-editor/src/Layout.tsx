import { ReactNode } from 'react'
import EditorAppBar from './EditorAppBar'

type LayoutProps = {
  children: ReactNode
  addRectC?: (event: React.MouseEvent<HTMLButtonElement>) => void
  addHexC?: (event: React.MouseEvent<HTMLButtonElement>) => void
  addTrianC?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Layout = ({ children, addRectC, addHexC, addTrianC }: LayoutProps) => {
  return (
    <div style={{ display: 'flex' }}>
      <EditorAppBar
        addRectC={addRectC}
        addHexC={addHexC}
        addTrianC={addTrianC}
      ></EditorAppBar>
      <main style={{ flexGrow: 1 }}>{children}</main>
    </div>
  )
}

export default Layout
