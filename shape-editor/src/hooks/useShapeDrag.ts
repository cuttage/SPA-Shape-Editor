import { World, Body } from 'matter-js'
import * as constants from '../constants'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

type UseShapeDragProps = {
  world: World
  foundPhysics: React.MutableRefObject<Body[]>
}

const useShapeDrag = ({ world, foundPhysics }: UseShapeDragProps) => {
  const { limeStroke } = constants
  const clickable = useSelector((state: RootState) => state.clickable.clickable)

  const handleShapeDrag = () => {
    if (foundPhysics.current.length === 0 && clickable) return
    if (
      foundPhysics.current.length > 0 &&
      !foundPhysics.current[0].label.includes('wall') &&
      foundPhysics.current[0].render.strokeStyle?.includes(limeStroke) &&
      clickable
    ) {
      if (world.bodies.some((x) => x.isStatic === false)) {
        world.bodies
          .filter((x) => x.isStatic === false && x !== foundPhysics.current[0])
          .map((body) => {
            Body.setStatic(body, true)
          })
      }
      Body.setStatic(foundPhysics.current[0], false)
    }
    if (!clickable) {
      for (const body of world.bodies) {
        // Set the render properties for the body
        Body.setStatic(body, true)
      }
    }
  }

  return handleShapeDrag
}

export default useShapeDrag
