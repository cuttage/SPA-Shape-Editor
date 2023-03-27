import { useRef } from 'react'
import { Body, World, Engine } from 'matter-js'
import { useDispatch, useSelector } from 'react-redux'
import { incrementNt } from '../store/myslice'
import { RootState } from '../store/store'
import CircBody from '../classes/CircBody'
import PolyBody from '../classes/PolyBody'
import * as constants from '../constants'

type AddTriangleHookProps = {
  width: number
  height: number
}

type AddTriangleHook = {
  partE: React.MutableRefObject<PolyBody['body']>
  partF: React.MutableRefObject<CircBody['body']>
  trians: React.MutableRefObject<Body[]>
  circst: React.MutableRefObject<Body[]>
  handleAddTrian: () => void
}

const useAddTriangle: (
  engine: React.MutableRefObject<Engine>,
  props: AddTriangleHookProps
) => AddTriangleHook = (engine, props) => {
  const dispatch = useDispatch()
  const nt = useSelector((state: RootState) => state.one.nt)

  // Define the boundaries for placing the shapes
  const minX = 50 + constants.sizeTrian / 2
  const maxX = props.width - 50 - constants.sizeTrian / 2
  const minY = 50 + constants.sizeTrian / 2
  const maxY = props.height - 50 - constants.sizeTrian / 2

  // Generate random x and y coordinates for each shape within the boundaries
  let xTrian: number
  let yTrian: number

  if (props.width === 0 || props.height === 0) {
    xTrian = Math.random() * (400 - 50 - constants.sizeTrian / 2 - minX) + minX
    yTrian = Math.random() * (400 - 50 - constants.sizeTrian / 2 - minY) + minY
  } else {
    xTrian = Math.random() * (maxX - minX) + minX
    yTrian = Math.random() * (maxY - minY) + minY
  }

  const partE = useRef<PolyBody['body']>(
    new PolyBody(xTrian, yTrian, 3, constants.sizeTrian, `trian${nt}`).body
  )

  const partF = useRef<CircBody['body']>(
    new CircBody(xTrian, yTrian, constants.sizeCirc, `circt${nt}`).body
  )

  const trians = useRef<any[]>([])
  const circst = useRef<any[]>([])

  const handleAddTrian = () => {
    dispatch(incrementNt())

    const newTrianId = `trian${nt}`
    const newCirctId = `circt${nt}`

    const newPartE = new PolyBody(
      xTrian,
      yTrian,
      3,
      constants.sizeTrian,
      newTrianId
    ).body
    const newPartF = new CircBody(
      xTrian,
      yTrian,
      constants.sizeCirc,
      newCirctId
    ).body

    partE.current = newPartE
    partF.current = newPartF

    trians.current.push(partE.current)
    circst.current.push(partF.current)

    World.add(engine.current.world, [
      // trian and circ
      newPartE,
      newPartF,
    ])
  }

  return {
    partE,
    partF,
    trians,
    circst,
    handleAddTrian,
  }
}

export default useAddTriangle
