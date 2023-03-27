import { World, Body } from 'matter-js'
import * as constants from '../constants'

type UseShapeSelectProps = {
  world: World
  foundPhysics: React.MutableRefObject<Body[]>
}

const useShapeSelect = ({ world, foundPhysics }: UseShapeSelectProps) => {
  const { whiteStroke, transparentFill, lineSize, limeStroke, lineSize3 } =
    constants

  const handleShapeSelect = () => {
    if (world.bodies.some((x) => x.isStatic === false)) {
      world.bodies
        .filter((x) => x.isStatic === false && x !== foundPhysics.current[0])
        .map((body) => {
          Body.setStatic(body, true)
        })
    }

    if (foundPhysics.current.length === 0) {
      // Loop through all the bodies in the world
      for (const body of world.bodies) {
        // Set the render properties for the body
        body.render.strokeStyle = whiteStroke
        body.render.fillStyle = transparentFill
        body.render.lineWidth = lineSize
      }
    } else if (
      foundPhysics.current.length > 0 &&
      !foundPhysics.current[0].label.includes('wall')
    ) {
      if (world.bodies.some((x) => x.render.strokeStyle === limeStroke)) {
        world.bodies
          .filter(
            (x) =>
              x.render.strokeStyle === limeStroke &&
              x !== foundPhysics.current[0]
          )
          .map((body) => {
            body.render.strokeStyle = whiteStroke
            body.render.fillStyle = transparentFill
            body.render.lineWidth = lineSize
          })
      }
      foundPhysics.current[0].render.strokeStyle = limeStroke
      foundPhysics.current[0].render.lineWidth = lineSize3
    }
  }

  return handleShapeSelect
}

export default useShapeSelect
