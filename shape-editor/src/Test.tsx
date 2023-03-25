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
import RectBody from './classes/RectBody'
import CircBody from './classes/CircBody'
import PointsArrayRect from './classes/PointsArrayRect'
import * as constants from './constants'

const Test: React.FC = () => {
  let n = 0
  let coordsRect: [number, number, string][][] = []

  const scene = useRef<HTMLDivElement>(null)
  const engine = useRef(Engine.create())
  const world = engine.current.world
  const runner = useRef(Runner.create())
  const posX = useRef(0)
  const posY = useRef(0)
  const xHex = useRef(Math.random() * 400 + 30)
  const xTrian = useRef(Math.random() * 400 + 30)

  const steps = useRef<number>()
  const yIncr = useRef<number>()
  const xIncr = useRef<number>()
  const xxx = useRef<number>()
  const yyy = useRef<number>()

  const time = setInterval(draw, 25)

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

  const rects = useRef<any[]>([])
  const circs = useRef<Body[]>([])

  const pointsArrayRect = new PointsArrayRect()
  const points = pointsArrayRect.getPoints()
  const pointsArrayHex: any[] = [],
    pointsArrayTrian: any[] = []

  const partC = useRef(
    Bodies.polygon(xHex.current, constants.yHex, 6, constants.sizeHex, {
      inertia: Infinity,
      label: `hex${n}`,
    })
  )

  const partD = useRef(
    Bodies.circle(xHex.current, constants.yHex, constants.sizeCirc, {
      collisionFilter: {
        group: -1,
        category: constants.greenCategory,
        mask: 0,
      },
      inertia: 0,
      frictionAir: 0,
      inverseInertia: 0,
      restitution: 0,
      frictionStatic: 0,
    })
  )

  const partE = useRef(
    Bodies.polygon(xTrian.current, constants.yTrian, 3, constants.sizeTrian, {
      inertia: Infinity,
      label: `trian${n}`,
    })
  )

  const partF = useRef(
    Bodies.circle(xTrian.current, constants.yTrian, constants.sizeCirc, {
      collisionFilter: {
        group: -1,
        category: constants.greenCategory,
        mask: 0,
      },
      inertia: 0,
      frictionAir: 0,
      inverseInertia: 0,
      restitution: 0,
      frictionStatic: 0,
    })
  )

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
      if (shape.includes('rect')) {
        pointsArrayRect.push(xxx.current, yyy.current, shape)
      }
      if (shape === 'hex') {
        pointsArrayHex.push([xxx.current, yyy.current])
      }
      if (shape === 'trian') {
        pointsArrayTrian.push([xxx.current, yyy.current])
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

  const handleAddSquare = () => {
    n++
    const newPartA = new RectBody(
      constants.xSquare,
      constants.ySquare,
      constants.sizeRect,
      `rect${n}`
    ).body
    const newPartB = new CircBody(
      constants.xSquare,
      constants.ySquare,
      constants.sizeCirc,
      `circ${n}`
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
      // blocks
      partC.current,
      partD.current,
      partE.current,
      partF.current,

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

    Events.on(mouseConstraint, 'mousemove', function (event) {
      if (points.length > 0) {
        points.splice(0, points.length)
      }

      if (pointsArrayHex.length > 0) {
        pointsArrayHex.splice(0, pointsArrayHex.length)
      }

      if (pointsArrayTrian.length > 0) {
        pointsArrayTrian.splice(0, pointsArrayTrian.length)
      }

      const foundPhysics = Query.point(
        engine.current.world.bodies,
        event.source.mouse.position
      )

      posX.current = event.source.mouse.position.x
      posY.current = event.source.mouse.position.y

      const touchX: number = posX.current,
        touchY: number = posY.current

      if (
        world.bodies
          .map((x) => x.label.includes('rect'))
          .some((y) => y === true)
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

      let coordsHex = [...partC.current.vertices.map((x) => [x.x, x.y])]
      let coordsTrian = [...partE.current.vertices.map((x) => [x.x, x.y])]

      //hexagon face1
      DDA(
        coordsHex[0][0],
        coordsHex[0][1],
        coordsHex[1][0],
        coordsHex[1][1],
        constants.hexShape
      )
      //hexagon face2
      DDA(
        coordsHex[1][0],
        coordsHex[1][1],
        coordsHex[2][0],
        coordsHex[2][1],
        constants.hexShape
      )
      // hexagon face3
      DDA(
        coordsHex[3][0],
        coordsHex[3][1],
        coordsHex[2][0],
        coordsHex[2][1],
        constants.hexShape
      )
      //hexagon face4
      DDA(
        coordsHex[3][0],
        coordsHex[3][1],
        coordsHex[4][0],
        coordsHex[4][1],
        constants.hexShape
      )
      //hexagon face5
      DDA(
        coordsHex[4][0],
        coordsHex[4][1],
        coordsHex[5][0],
        coordsHex[5][1],
        constants.hexShape
      )
      //hexagon face6
      DDA(
        coordsHex[5][0],
        coordsHex[5][1],
        coordsHex[0][0],
        coordsHex[0][1],
        constants.hexShape
      )

      //triangle face1
      DDA(
        coordsTrian[0][0],
        coordsTrian[0][1],
        coordsTrian[1][0],
        coordsTrian[1][1],
        constants.trianShape
      )
      //triangle face2
      DDA(
        coordsTrian[1][0],
        coordsTrian[1][1],
        coordsTrian[2][0],
        coordsTrian[2][1],
        constants.trianShape
      )
      // triangle face3
      DDA(
        coordsTrian[2][0],
        coordsTrian[2][1],
        coordsTrian[0][0],
        coordsTrian[0][1],
        constants.trianShape
      )

      // line slope --if you want to use define variables
      // const lineSlope = (y2 - y1) / (x2 - x1)
      //intermediate points on a line
      // const lineMidpoint = [
      //   (coordsHex[0][0] + coordsHex[2][0]) / 2,
      //   (coordsHex[0][1] + coordsHex[2][1]) / 2,
      // ]

      //rect
      if (
        world.bodies
          .map((x) => x.label.includes('rect'))
          .some((y) => y === true)
      ) {
        rects.current.map((u) => {
          coordsRect = coordsRect
            .filter((y) => y.includes(u.label))
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

      coordsHex = coordsHex.concat(pointsArrayHex)
      coordsTrian = coordsTrian.concat(pointsArrayTrian)

      let closestHex = [null, null] as number[] | null[],
        closestTrian = [null, null] as number[] | null[],
        distanceHex = Infinity,
        distanceTrian = Infinity

      for (const [xX, yY] of coordsHex) {
        let d = Math.sqrt((touchX - xX) ** 2 + (touchY - yY) ** 2)
        if (d < distanceHex) {
          closestHex = [xX, yY]
          distanceHex = d
        }
      }

      for (const [xX, yY] of coordsTrian) {
        let d = Math.sqrt((touchX - xX) ** 2 + (touchY - yY) ** 2)
        if (d < distanceTrian) {
          closestTrian = [xX, yY]
          distanceTrian = d
        }
      }

      //hex
      if (
        foundPhysics[0] &&
        foundPhysics[0].label.includes('hex') &&
        closestHex
      ) {
        Body.translate(partD.current, {
          x: -(partD.current.position.x - posX.current),
          y: -(partD.current.position.y - posY.current),
        })
      } else {
        Body.translate(partD.current, {
          x: -(partD.current.position.x - closestHex[0]!),
          y: -(partD.current.position.y - closestHex[1]!),
        })
      }

      Body.setVelocity(partD.current, { x: 0, y: 0 })

      //trian
      if (
        foundPhysics[0] &&
        foundPhysics[0].label.includes('trian') &&
        closestTrian
      ) {
        Body.translate(partF.current, {
          x: -(partF.current.position.x - posX.current),
          y: -(partF.current.position.y - posY.current),
        })
      } else {
        Body.translate(partF.current, {
          x: -(partF.current.position.x - closestTrian[0]!),
          y: -(partF.current.position.y - closestTrian[1]!),
        })
      }

      Body.setVelocity(partD.current, { x: 0, y: 0 })
    })

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
      Render.stop(render)
      Runner.stop(runner.current)
      Engine.clear(engine.current)
      Composite.clear(world, false)
      render.canvas.remove()
      render.canvas = null as any
      render.context = null as any
      render.textures = {}
    }
  }, [])

  return (
    <div>
      <button onClick={handleAddSquare}>Click me to add a Rect</button>
      <div ref={scene} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export default Test
