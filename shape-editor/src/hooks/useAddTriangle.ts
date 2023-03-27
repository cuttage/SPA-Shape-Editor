import { useRef } from 'react'
import { Body, World, Engine } from 'matter-js'
import { useDispatch, useSelector } from 'react-redux'
import { incrementNt } from '../store/myslice'
import { RootState } from '../store/store'
import CircBody from '../classes/CircBody'
import PolyBody from '../classes/PolyBody'
import * as constants from '../constants'

type AddTriangleHook = {
  partE: React.MutableRefObject<PolyBody['body']>
  partF: React.MutableRefObject<CircBody['body']>
  trians: React.MutableRefObject<Body[]>
  circst: React.MutableRefObject<Body[]>
  handleAddTrian: () => void
}

const useAddTriangle: (
  engine: React.MutableRefObject<Engine>
) => AddTriangleHook = (engine) => {
  const dispatch = useDispatch()
  const nt = useSelector((state: RootState) => state.one.nt)

  const partE = useRef<PolyBody['body']>(
    new PolyBody(
      constants.xTrian,
      constants.yTrian,
      3,
      constants.sizeTrian,
      `trian${nt}`
    ).body
  )

  const partF = useRef<CircBody['body']>(
    new CircBody(
      constants.xTrian,
      constants.yTrian,
      constants.sizeCirc,
      `circt${nt}`
    ).body
  )

  const trians = useRef<any[]>([])
  const circst = useRef<any[]>([])

  const handleAddTrian = () => {
    dispatch(incrementNt())

    const newTrianId = `trian${nt}` // use the updated nh value from the store
    const newCirctId = `circt${nt}` // use the updated nh value from the store

    const newPartE = new PolyBody(
      constants.xTrian,
      constants.yTrian,
      3,
      constants.sizeTrian,
      newTrianId
    ).body
    const newPartF = new CircBody(
      constants.xTrian,
      constants.yTrian,
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
