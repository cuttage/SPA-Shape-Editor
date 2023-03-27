import { useRef } from 'react'
import { Body, World, Engine } from 'matter-js'
import { useDispatch, useSelector } from 'react-redux'
import { incrementNh } from '../store/myslice'
import { RootState } from '../store/store'
import CircBody from '../classes/CircBody'
import PolyBody from '../classes/PolyBody'
import * as constants from '../constants'

type AddHexagonHookProps = {
  width: number
  height: number
}

type AddHexagonHook = {
  partC: React.MutableRefObject<PolyBody['body']>
  partD: React.MutableRefObject<CircBody['body']>
  hexs: React.MutableRefObject<Body[]>
  circsh: React.MutableRefObject<Body[]>
  handleAddHex: () => void
}

const useAddHexagon: (
  engine: React.MutableRefObject<Engine>,
  props: AddHexagonHookProps
) => AddHexagonHook = (engine, props) => {
  const dispatch = useDispatch()
  const nh = useSelector((state: RootState) => state.one.nh)

  // Define the boundaries for placing the shapes
  const minX = 50 + constants.sizeHex / 2 // Left wall x-coordinate + half the size of the hexagon
  const maxX = props.width - 50 - constants.sizeHex / 2 // Right wall x-coordinate - half the size of the hexagon
  const minY = 50 + constants.sizeHex / 2 // Top wall y-coordinate + half the size of the hexagon
  const maxY = props.height - 50 - constants.sizeHex / 2 // Bottom wall y-coordinate - half the size of the hexagon

  // Generate random x and y coordinates for each shape within the boundaries
  let xHex: number
  let yHex: number

  if (props.width === 0 || props.height === 0) {
    xHex = Math.random() * (400 - 50 - constants.sizeHex / 2 - minX) + minX
    yHex = Math.random() * (400 - 50 - constants.sizeHex / 2 - minY) + minY
  } else {
    xHex = Math.random() * (maxX - minX) + minX
    yHex = Math.random() * (maxY - minY) + minY
  }

  const partC = useRef<PolyBody['body']>(
    new PolyBody(xHex, yHex, 6, constants.sizeHex, `hex${nh}`).body
  )

  const partD = useRef<CircBody['body']>(
    new CircBody(xHex, yHex, constants.sizeCirc, `circh${nh}`).body
  )

  const hexs = useRef<any[]>([])
  const circsh = useRef<any[]>([])

  const handleAddHex = () => {
    dispatch(incrementNh())

    const newHexId = `hex${nh}` // use the updated nh value from the store
    const newCirchId = `circh${nh}` // use the updated nh value from the store

    const newPartC = new PolyBody(xHex, yHex, 6, constants.sizeHex, newHexId)
      .body
    const newPartD = new CircBody(xHex, yHex, constants.sizeCirc, newCirchId)
      .body

    partC.current = newPartC
    partD.current = newPartD

    hexs.current.push(partC.current)
    circsh.current.push(partD.current)

    World.add(engine.current.world, [
      // hex and circ
      newPartC,
      newPartD,
    ])
  }

  return {
    partC,
    partD,
    hexs,
    circsh,
    handleAddHex,
  }
}

export default useAddHexagon
