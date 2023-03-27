import { ReactNode } from 'react'
import EditorAppBar from './EditorAppBar'
import { World } from 'matter-js'

type LayoutProps = {
  children: ReactNode
  addRectC?: (event: React.MouseEvent<HTMLButtonElement>) => void
  addHexC?: (event: React.MouseEvent<HTMLButtonElement>) => void
  addTrianC?: (event: React.MouseEvent<HTMLButtonElement>) => void
  showDistance?: () => void
  world?: World
}

const Layout = ({
  children,
  addRectC,
  addHexC,
  addTrianC,
  showDistance,
  world,
}: LayoutProps) => {
  return (
    <div style={{ display: 'flex' }}>
      <EditorAppBar
        addRectC={addRectC}
        addHexC={addHexC}
        addTrianC={addTrianC}
        showDistance={showDistance}
        world={world}
      ></EditorAppBar>
      <main style={{ flexGrow: 1 }}>{children}</main>
    </div>
  )
}

export default Layout
