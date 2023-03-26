import { useRef } from 'react'
import { Body, World, Engine } from 'matter-js'
import { useDispatch, useSelector } from 'react-redux'
import { incrementN } from '../store/myslice'
import { RootState } from '../store/store'
import CircBody from '../classes/CircBody'
import RectBody from '../classes/RectBody'
import * as constants from '../constants'

type AddSquareHook = {
  partA: React.MutableRefObject<RectBody['body']>
  partB: React.MutableRefObject<CircBody['body']>
  rects: React.MutableRefObject<Body[]>
  circs: React.MutableRefObject<Body[]>
  handleAddSquare: () => void
}

const useAddSquare: (
  engine: React.MutableRefObject<Engine>
) => AddSquareHook = (engine) => {
  const dispatch = useDispatch()
  const n = useSelector((state: RootState) => state.one.n)

  const partA = useRef<RectBody['body']>(
    new RectBody(
      constants.xSquare,
      constants.ySquare,
      constants.sizeRect,
      `rect${n}`
    ).body
  )

  const partB = useRef<CircBody['body']>(
    new CircBody(
      constants.xSquare,
      constants.ySquare,
      constants.sizeCirc,
      `circ${n}`
    ).body
  )

  const rects = useRef<Body[]>([])
  const circs = useRef<Body[]>([])

  const handleAddSquare = () => {
    dispatch(incrementN())

    const newRectId = `rect${n}`
    const newCircId = `circ${n}`

    const newPartA = new RectBody(
      constants.xSquare,
      constants.ySquare,
      constants.sizeRect,
      newRectId
    ).body

    const newPartB = new CircBody(
      constants.xSquare,
      constants.ySquare,
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
