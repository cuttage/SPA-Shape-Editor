import { useEffect } from 'react'
import { World, Body } from 'matter-js'
import * as constants from '../constants'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

type UseShapeDistanceProps = {
  world: World
}

export const useShapeDistance = ({ world }: UseShapeDistanceProps) => {
  const { whiteStroke, transparentStroke } = constants
  const isDistance = useSelector(
    (state: RootState) => state.isDistance.isDistance
  )

  const handleVisualizeShapeDistance = () => {
    const circBodies = world.bodies.filter((x) => x.label.includes('circ'))
    const hasWhiteStroke = circBodies.some(
      (body) => body.render.strokeStyle === whiteStroke
    )

    if (circBodies.length > 0 && isDistance) {
      if (world.bodies.some((x) => x.isStatic === false)) {
        world.bodies
          .filter((x) => x.isStatic === false)
          .map((body) => {
            Body.setStatic(body, true)
          })
      }

      if (hasWhiteStroke) {
        circBodies.map((body) => {
          body.render.strokeStyle = transparentStroke
        })
      } else {
        circBodies.map((body) => {
          body.render.strokeStyle = whiteStroke
        })
      }
    }
  }

  useEffect(() => {
    handleVisualizeShapeDistance()

    // cleanup function to reset stroke style to transparent when isDistance is false
    return () => {
      if (!isDistance) {
        const circBodies = world.bodies.filter((x) => x.label.includes('circ'))
        circBodies.forEach((body) => {
          body.render.strokeStyle = transparentStroke
        })
      }
    }
  }, [isDistance, world.bodies, whiteStroke, transparentStroke])

  return {
    handleVisualizeShapeDistance,
  }
}

export default useShapeDistance
