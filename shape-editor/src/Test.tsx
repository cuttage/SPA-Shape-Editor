import React, { useEffect, useRef } from 'react'
import {
  Engine,
  Render,
  Runner,
  MouseConstraint,
  Mouse,
  Composite,
  Bodies,
  Events,
  Query,
  Body,
  World,
} from 'matter-js'
import CircBody from './classes/CircBody'
import PolyBody from './classes/PolyBody'
import PointsArrayPoly from './classes/PointsArrayPoly'
import * as constants from './constants'
import Layout from './Layout'
import { useDispatch, useSelector } from 'react-redux'
import { incrementNh, incrementNt } from './store/myslice'
import { RootState } from './store/store'
import useAddSquare from './hooks/useAddSquare'

type CoordsT = any[][][]
type MouseMoveEvent = (event: {
  source: {
    mouse: {
      position: { x: number; y: number }
    }
  }
}) => void

const Test: React.FC = () => {
  const dispatch = useDispatch()
  const nh = useSelector((state: RootState) => state.one.nh)
  const nt = useSelector((state: RootState) => state.one.nt)
  let coordsRect: CoordsT = []
  let coordsHex: CoordsT = []
  let coordsTrian: CoordsT = []

  const scene = useRef<HTMLDivElement>(null)
  const engine = useRef(Engine.create())
  const world = engine.current.world
  const runner = useRef(Runner.create())
  const posX = useRef(0)
  const posY = useRef(0)

  const { partA, partB, rects, circs, handleAddSquare } = useAddSquare(engine)

  const steps = useRef<number>()
  const yIncr = useRef<number>()
  const xIncr = useRef<number>()
  const xxx = useRef<number>()
  const yyy = useRef<number>()

  const time = setInterval(draw, 25)

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

  const hexs = useRef<any[]>([])
  const circsh = useRef<any[]>([])
  const trians = useRef<any[]>([])
  const circst = useRef<any[]>([])

  const pointsArrayRect = new PointsArrayPoly()
  const points = pointsArrayRect.getPoints()

  const pointsArrayHex = new PointsArrayPoly()
  const pointsH = pointsArrayHex.getPoints()

  const pointsArrayTrian = new PointsArrayPoly()
  const pointsT = pointsArrayTrian.getPoints()

  function isPointInsideAABB(box: any, pointX: number, pointY: number) {
    return (
      pointX >= box.min.x &&
      pointX <= box.max.x &&
      pointY >= box.min.y &&
      pointY <= box.max.y
    )
  }

  function draw(shape: string) {
    for (let i = 1; i <= steps.current!; i++) {
      xxx.current = (xxx.current! + xIncr.current!) as any
      yyy.current = (yyy.current! + yIncr.current!) as any
      if (shape?.includes('rect')) {
        pointsArrayRect.push(xxx.current, yyy.current, shape)
      }
      if (shape?.includes('hex')) {
        pointsArrayHex.push(xxx.current, yyy.current, shape)
      }
      if (shape?.includes('trian')) {
        pointsArrayTrian.push(xxx.current, yyy.current, shape)
      }
    }

    clearInterval(time)
  }

  //Digital Differential Analyzer (DDA) algorithm
  //begin
  const DDA = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    shape: string
  ) => {
    const dx = x2 - x1,
      dy = y2 - y1

    if (dx > dy) {
      steps.current = Math.abs(dx) as any
    } else {
      steps.current = Math.abs(dy) as any
    }

    xIncr.current = (dx / steps.current!) as any
    yIncr.current = (dy / steps.current!) as any

    xxx.current = x1 as any
    yyy.current = y1 as any

    draw(shape)
  }
  //end

  const handleAddHex = () => {
    dispatch(incrementNh()) // increment the nh value in the store
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

  const handleAddTrian = () => {
    dispatch(incrementNt()) // increment the nh value in the store
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

  const mouseMoveEvent: MouseMoveEvent = function (event) {
    if (points.length > 0) {
      points.splice(0, points.length)
    }

    if (pointsH.length > 0) {
      pointsH.splice(0, pointsH.length)
    }

    if (pointsT.length > 0) {
      pointsT.splice(0, pointsT.length)
    }

    const foundPhysics = Query.point(
      engine.current.world.bodies,
      event.source.mouse.position
    )

    posX.current = event.source.mouse.position.x
    posY.current = event.source.mouse.position.y

    const touchX: number = posX.current,
      touchY: number = posY.current

    //rect
    if (
      world.bodies.map((x) => x.label.includes('rect')).some((y) => y === true)
    ) {
      if (rects && rects.current.length > 0) {
        coordsRect = [
          ...rects.current.map((z) =>
            z.vertices.map((x: any) => [x.x, x.y, z.label])
          ),
        ]

        rects.current.map((u) => {
          if (coordsRect.length >= 1) {
            coordsRect.map((x) => {
              //rectangle face1
              DDA(x[0][0], x[0][1], x[1][0], x[1][1], u.label)
              //rectangle face2
              DDA(x[1][0], x[1][1], x[2][0], x[2][1], u.label)
              //rectangle face3
              DDA(x[3][0], x[3][1], x[2][0], x[2][1], u.label)
              //rectangle face4
              DDA(x[0][0], x[0][1], x[3][0], x[3][1], u.label)
            })
          }
        })
      }
    }

    //hex
    if (
      world.bodies.map((x) => x.label.includes('hex')).some((y) => y === true)
    ) {
      if (hexs && hexs.current.length > 0) {
        coordsHex = [
          ...hexs.current.map((z) =>
            z.vertices.map((x: any) => [x.x, x.y, z.label])
          ),
        ]

        hexs.current.map((u) => {
          if (coordsHex.length >= 1) {
            coordsHex.map((x) => {
              //hexagon face1
              DDA(x[0][0], x[0][1], x[1][0], x[1][1], u.label)
              //hexagon face2
              DDA(x[1][0], x[1][1], x[2][0], x[2][1], u.label)
              // hexagon face3
              DDA(x[3][0], x[3][1], x[2][0], x[2][1], u.label)
              //hexagon face4
              DDA(x[3][0], x[3][1], x[4][0], x[4][1], u.label)
              //hexagon face5
              DDA(x[4][0], x[4][1], x[5][0], x[5][1], u.label)
              //hexagon face6
              DDA(x[5][0], x[5][1], x[0][0], x[0][1], u.label)
            })
          }
        })
      }
    }

    //trian
    if (
      world.bodies.map((x) => x.label.includes('trian')).some((y) => y === true)
    ) {
      if (trians && trians.current.length > 0) {
        coordsTrian = [
          ...trians.current.map((z) =>
            z.vertices.map((x: any) => [x.x, x.y, z.label])
          ),
        ]

        trians.current.map((u) => {
          if (coordsTrian.length >= 1) {
            coordsTrian.map((x) => {
              //triangle face1
              DDA(x[0][0], x[0][1], x[1][0], x[1][1], u.label)
              //triangle face2
              DDA(x[1][0], x[1][1], x[2][0], x[2][1], u.label)
              // triangle face3
              DDA(x[2][0], x[2][1], x[0][0], x[0][1], u.label)
            })
          }
        })
      }
    }

    // line slope --if you want to use define variables
    // const lineSlope = (y2 - y1) / (x2 - x1)
    //intermediate points on a line
    // const lineMidpoint = [
    //   (coordsHex[0][0] + coordsHex[2][0]) / 2,
    //   (coordsHex[0][1] + coordsHex[2][1]) / 2,
    // ]

    //rect
    if (
      world.bodies.map((x) => x.label.includes('rect')).some((y) => y === true)
    ) {
      rects.current.map((u) => {
        coordsRect = coordsRect
          .filter((y) => y.includes(u.label as any))
          .map((j) => j)
          .concat(points.filter((x) => x.includes(u.label)))

        let closestRect = [null, null] as number[] | null[] | any[],
          distanceRect = Infinity

        if (coordsRect.length > 0) {
          for (const [xX, yY] of coordsRect) {
            // @ts-ignore
            const d = Math.sqrt((touchX - xX) ** 2 + (touchY - yY) ** 2)
            if (d < distanceRect) {
              closestRect = [xX, yY]
              distanceRect = d
            }
          }
        }

        let numero = u.label.replace('rect', '')
        let pB = circs?.current?.filter((j) => j.label.includes(numero))

        if (
          isPointInsideAABB(u.bounds, posX.current, posY.current) === true &&
          foundPhysics[0] &&
          foundPhysics[0].label.includes(u.label) &&
          closestRect
        ) {
          Body.translate(pB[0], {
            x: -(pB[0].position.x - posX.current),
            y: -(pB[0].position.y - posY.current),
          })
        } else if (closestRect) {
          Body.translate(pB[0], {
            x: -(pB[0].position.x - closestRect[0]!),
            y: -(pB[0].position.y - closestRect[1]!),
          })
        }

        Body.setVelocity(pB[0], { x: 0, y: 0 })
      })
    }

    //hex
    if (
      world.bodies.map((x) => x.label.includes('hex')).some((y) => y === true)
    ) {
      hexs.current.map((u) => {
        coordsHex = coordsHex
          .filter((y) => y.includes(u.label))
          .map((j) => j)
          .concat(pointsH.filter((x) => x.includes(u.label)))

        let closestHex = [null, null] as number[] | null[] | any[],
          distanceHex = Infinity

        if (coordsHex.length > 0) {
          for (const [xX, yY] of coordsHex) {
            // @ts-ignore
            const d = Math.sqrt((touchX - xX) ** 2 + (touchY - yY) ** 2)
            if (d < distanceHex) {
              closestHex = [xX, yY]
              distanceHex = d
            }
          }
        }

        let numeroh = u.label.replace('hex', '')
        let pBH = circsh?.current?.filter((j) => j.label.includes(numeroh))

        if (
          foundPhysics[0] &&
          foundPhysics[0].label.includes(u.label) &&
          closestHex
        ) {
          Body.translate(pBH[0], {
            x: -(pBH[0]?.position.x - posX.current),
            y: -(pBH[0]?.position.y - posY.current),
          })
        } else {
          Body.translate(pBH[0], {
            x: -(pBH[0]?.position.x - closestHex[0]!),
            y: -(pBH[0]?.position.y - closestHex[1]!),
          })
        }

        Body.setVelocity(pBH[0], { x: 0, y: 0 })
      })
    }

    //trian
    if (
      world.bodies.map((x) => x.label.includes('trian')).some((y) => y === true)
    ) {
      trians.current.map((u) => {
        coordsTrian = coordsTrian
          .filter((y) => y.includes(u.label))
          .map((j) => j)
          .concat(pointsT.filter((x) => x.includes(u.label)))

        let closestTrian = [null, null] as number[] | null[] | any[],
          distanceTrian = Infinity

        if (coordsTrian.length > 0) {
          for (const [xX, yY] of coordsTrian) {
            // @ts-ignore
            const d = Math.sqrt((touchX - xX) ** 2 + (touchY - yY) ** 2)
            if (d < distanceTrian) {
              closestTrian = [xX, yY]
              distanceTrian = d
            }
          }
        }

        let numerot = u.label.replace('trian', '')
        let pBT = circst?.current?.filter((j) => j.label.includes(numerot))

        if (
          foundPhysics[0] &&
          foundPhysics[0].label.includes(u.label) &&
          closestTrian
        ) {
          Body.translate(pBT[0], {
            x: -(pBT[0].position.x - posX.current),
            y: -(pBT[0].position.y - posY.current),
          })
        } else {
          Body.translate(pBT[0], {
            x: -(pBT[0].position.x - closestTrian[0]!),
            y: -(pBT[0].position.y - closestTrian[1]!),
          })
        }

        Body.setVelocity(pBT[0], { x: 0, y: 0 })
      })
    }
  }

  useEffect(() => {
    const cw = document.body.clientWidth
    const ch = document.body.clientHeight

    engine.current.gravity.y = 0
    engine.current.gravity.x = 0

    const render = Render.create({
      element: scene.current as any,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        showVelocity: true,
        background: 'transparent',
        showConvexHulls: true,
      },
    })

    Composite.add(world, [
      // walls
      Bodies.rectangle(400, 0, 800, 50, { isStatic: true, label: 'wall1' }),
      Bodies.rectangle(400, 600, 800, 50, { isStatic: true, label: 'wall2' }),
      Bodies.rectangle(800, 300, 50, 600, { isStatic: true, label: 'wall3' }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true, label: 'wall4' }),
    ])

    const mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine.current, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: true,
          },
        },
      })

    Events.on(mouseConstraint, 'mousemove', mouseMoveEvent)

    Composite.add(world, mouseConstraint)

    render.mouse = mouse

    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: cw, y: ch },
    })

    Render.run(render)

    Runner.run(runner.current, engine.current)

    // unmount
    return () => {
      clearInterval(time)
      Render.stop(render)
      Runner.stop(runner.current)
      World.clear(world, false)
      Engine.clear(engine.current)
      Composite.clear(world, false)

      partA.current = null as any
      partB.current = null as any
      partC.current = null as any
      partD.current = null as any
      partE.current = null as any
      partF.current = null as any
      rects.current = []
      circs.current = []
      hexs.current = []
      circsh.current = []
      trians.current = []
      circst.current = []

      Events.off(mouseConstraint, 'mousemove', mouseMoveEvent)

      render.canvas.remove()
      render.canvas = null as any
      render.context = null as any
      render.textures = {}
    }
  }, [])

  return (
    <Layout
      addRectC={handleAddSquare}
      addTrianC={handleAddTrian}
      addHexC={handleAddHex}
    >
      <div ref={scene} style={{ width: '100%', height: '100%' }} />
    </Layout>
  )
}

export default Test
