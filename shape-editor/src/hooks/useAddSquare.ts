import { useRef } from 'react'
import { Body, World, Engine } from 'matter-js'
import { useDispatch, useSelector } from 'react-redux'
import { incrementN } from '../store/myslice'
import { RootState } from '../store/store'
import CircBody from '../classes/CircBody'
import RectBody from '../classes/RectBody'
import * as constants from '../constants'

type AddSquareHookProps = {
  width: number
  height: number
}

type AddSquareHook = {
  partA: React.MutableRefObject<RectBody['body']>
  partB: React.MutableRefObject<CircBody['body']>
  rects: React.MutableRefObject<Body[]>
  circs: React.MutableRefObject<Body[]>
  handleAddSquare: () => void
}

const useAddSquare: (
  engine: React.MutableRefObject<Engine>,
  props: AddSquareHookProps
) => AddSquareHook = (engine, props) => {
  const dispatch = useDispatch()
  const n = useSelector((state: RootState) => state.one.n)

  // Define the boundaries for placing the shapes
  const minX = 50 + constants.sizeRect / 2
  const maxX = props.width - 50 - constants.sizeRect / 2
  const minY = 50 + constants.sizeRect / 2
  const maxY = props.height - 50 - constants.sizeRect / 2

  // Generate random x and y coordinates for each shape within the boundaries
  let xSquare: number
  let ySquare: number

  if (props.width === 0 || props.height === 0) {
    xSquare = Math.random() * (400 - 50 - constants.sizeRect / 2 - minX) + minX
    ySquare = Math.random() * (400 - 50 - constants.sizeRect / 2 - minY) + minY
  } else {
    xSquare = Math.random() * (maxX - minX) + minX
    ySquare = Math.random() * (maxY - minY) + minY
  }

  const partA = useRef<RectBody['body']>(
    new RectBody(xSquare, ySquare, constants.sizeRect, `rect${n}`).body
  )

  const partB = useRef<CircBody['body']>(
    new CircBody(xSquare, ySquare, constants.sizeCirc, `circ${n}`).body
  )

  const rects = useRef<Body[]>([])
  const circs = useRef<Body[]>([])

  const handleAddSquare = () => {
    dispatch(incrementN())

    const newRectId = `rect${n}`
    const newCircId = `circ${n}`

    const newPartA = new RectBody(
      xSquare,
      ySquare,
      constants.sizeRect,
      newRectId
    ).body

    const newPartB = new CircBody(
      xSquare,
      ySquare,
      constants.sizeCirc,
      newCircId
    ).body

    partA.current = newPartA
    partB.current = newPartB

    rects.current.push(partA.current)
    circs.current.push(partB.current)

    World.add(engine.current.world, [
      // rect and circ
      newPartA,
      newPartB,
    ])
  }

  return {
    partA,
    partB,
    rects,
    circs,
    handleAddSquare,
  }
}

export default useAddSquare
