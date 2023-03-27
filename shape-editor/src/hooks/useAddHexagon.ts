import { useRef } from 'react'
import { Body, World, Engine } from 'matter-js'
import { useDispatch, useSelector } from 'react-redux'
import { incrementNh } from '../store/myslice'
import { RootState } from '../store/store'
import CircBody from '../classes/CircBody'
import PolyBody from '../classes/PolyBody'
import * as constants from '../constants'

type AddHexagonHook = {
  partC: React.MutableRefObject<PolyBody['body']>
  partD: React.MutableRefObject<CircBody['body']>
  hexs: React.MutableRefObject<Body[]>
  circsh: React.MutableRefObject<Body[]>
  handleAddHex: () => void
}

const useAddHexagon: (
  engine: React.MutableRefObject<Engine>
) => AddHexagonHook = (engine) => {
  const dispatch = useDispatch()
  const nh = useSelector((state: RootState) => state.one.nh)

  const partC = useRef<PolyBody['body']>(
    new PolyBody(
      constants.xHex,
      constants.yHex,
      6,
      constants.sizeHex,
      `hex${nh}`
    ).body
  )

  const partD = useRef<CircBody['body']>(
    new CircBody(
      constants.xHex,
      constants.yHex,
      constants.sizeCirc,
      `circh${nh}`
    ).body
  )

  const hexs = useRef<any[]>([])
  const circsh = useRef<any[]>([])

  const handleAddHex = () => {
    dispatch(incrementNh())

    const newHexId = `hex${nh}` // use the updated nh value from the store
    const newCirchId = `circh${nh}` // use the updated nh value from the store

    const newPartC = new PolyBody(
      constants.xHex,
      constants.yHex,
      6,
      constants.sizeHex,
      newHexId
    ).body
    const newPartD = new CircBody(
      constants.xHex,
      constants.yHex,
      constants.sizeCirc,
      newCirchId
    ).body

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
