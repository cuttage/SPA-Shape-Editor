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
} from 'matter-js'

const Test: React.FC = () => {
  const scene = useRef<HTMLDivElement>(null)
  const isPressed = useRef(false)
  const engine = useRef(Engine.create())
  const runner = useRef(Runner.create())
  const posX = useRef(0)
  const posY = useRef(0)
  const sizeRect = 200
  const sizeHex = 150
  const sizeCirc = 3
  const sizeTrian = 100
  const xSquare = 700
  const ySquare = 400
  const xHex = 100
  const yHex = 100
  const xTrian = 150
  const yTrian = 150
  const greenCategory = 0x0004

  const steps = useRef<number>()
  const yIncr = useRef<number>()
  const xIncr = useRef<number>()
  const xxx = useRef<number>()
  const yyy = useRef<number>()

  const partA = useRef(
    Bodies.rectangle(xSquare, ySquare, sizeRect, sizeRect, {
      inertia: Infinity,
      label: 'rect',
    })
  )
  const partB = useRef(
    Bodies.circle(xSquare, ySquare, sizeCirc, {
      collisionFilter: {
        group: -1,
        category: greenCategory,
        mask: 0,
      },
      inertia: 0,
      frictionAir: 0,
      inverseInertia: 0,
      restitution: 0,
      frictionStatic: 0,
    })
  )

  const partC = useRef(
    Bodies.polygon(xHex, yHex, 6, sizeHex, {
      inertia: Infinity,
      label: 'hex',
    })
  )

  const partD = useRef(
    Bodies.circle(xHex, yHex, sizeCirc, {
      collisionFilter: {
        group: -1,
        category: greenCategory,
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
    Bodies.polygon(xTrian, yTrian, 3, sizeTrian, {
      inertia: Infinity,
      label: 'trian',
    })
  )

  const partF = useRef(
    Bodies.circle(xTrian, yTrian, sizeCirc, {
      collisionFilter: {
        group: -1,
        category: greenCategory,
        mask: 0,
      },
      inertia: 0,
      frictionAir: 0,
      inverseInertia: 0,
      restitution: 0,
      frictionStatic: 0,
    })
  )

  useEffect(() => {
    const cw = document.body.clientWidth
    const ch = document.body.clientHeight
    const world = engine.current.world

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
      partA.current,
      partB.current,
      partC.current,
      partD.current,
      partE.current,
      partF.current,

      // walls
      Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
      Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
      Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
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
      const foundPhysics = Query.point(
        engine.current.world.bodies,
        event.source.mouse.position
      )

      posX.current = event.source.mouse.position.x
      posY.current = event.source.mouse.position.y

      function isPointInsideAABB(box: any, pointX: number, pointY: number) {
        return (
          pointX >= box.min.x &&
          pointX <= box.max.x &&
          pointY >= box.min.y &&
          pointY <= box.max.y
        )
      }

      let coordsRect = [...partA.current.vertices.map((x) => [x.x, x.y])]
      let coordsHex = [...partC.current.vertices.map((x) => [x.x, x.y])]
      let coordsTrian = [...partE.current.vertices.map((x) => [x.x, x.y])]

      const touchX = posX.current,
        touchY = posY.current

      //Digital Differential Analyzer (DDA) algorithm
      //begin
      const pointsArrayRect: any[] = [],
        pointsArrayHex: any[] = [],
        pointsArrayTrian: any[] = []
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

        const time = setInterval(draw, 25)

        function draw(shape: string) {
          for (let i = 1; i <= steps.current!; i++) {
            xxx.current = (xxx.current! + xIncr.current!) as any
            yyy.current = (yyy.current! + yIncr.current!) as any
            if (shape === 'rect') {
              pointsArrayRect.push([xxx.current, yyy.current])
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

        draw(shape)
      }
      //end
      const rectShape = 'rect'
      const hexShape = 'hex'
      const trianShape = 'trian'
      //rectangle face1
      DDA(
        coordsRect[0][0],
        coordsRect[0][1],
        coordsRect[1][0],
        coordsRect[1][1],
        rectShape
      )
      //rectangle face2
      DDA(
        coordsRect[1][0],
        coordsRect[1][1],
        coordsRect[2][0],
        coordsRect[2][1],
        rectShape
      )
      //rectangle face3
      DDA(
        coordsRect[3][0],
        coordsRect[3][1],
        coordsRect[2][0],
        coordsRect[2][1],
        rectShape
      )
      //rectangle face4
      DDA(
        coordsRect[0][0],
        coordsRect[0][1],
        coordsRect[3][0],
        coordsRect[3][1],
        rectShape
      )

      //hexagon face1
      DDA(
        coordsHex[0][0],
        coordsHex[0][1],
        coordsHex[1][0],
        coordsHex[1][1],
        hexShape
      )
      //hexagon face2
      DDA(
        coordsHex[1][0],
        coordsHex[1][1],
        coordsHex[2][0],
        coordsHex[2][1],
        hexShape
      )
      // hexagon face3
      DDA(
        coordsHex[3][0],
        coordsHex[3][1],
        coordsHex[2][0],
        coordsHex[2][1],
        hexShape
      )
      //hexagon face4
      DDA(
        coordsHex[3][0],
        coordsHex[3][1],
        coordsHex[4][0],
        coordsHex[4][1],
        hexShape
      )
      //hexagon face5
      DDA(
        coordsHex[4][0],
        coordsHex[4][1],
        coordsHex[5][0],
        coordsHex[5][1],
        hexShape
      )
      //hexagon face6
      DDA(
        coordsHex[5][0],
        coordsHex[5][1],
        coordsHex[0][0],
        coordsHex[0][1],
        hexShape
      )

      //triangle face1
      DDA(
        coordsTrian[0][0],
        coordsTrian[0][1],
        coordsTrian[1][0],
        coordsTrian[1][1],
        trianShape
      )
      //triangle face2
      DDA(
        coordsTrian[1][0],
        coordsTrian[1][1],
        coordsTrian[2][0],
        coordsTrian[2][1],
        trianShape
      )
      // triangle face3
      DDA(
        coordsTrian[2][0],
        coordsTrian[2][1],
        coordsTrian[0][0],
        coordsTrian[0][1],
        trianShape
      )

      // line slope --if you want to use define variables
      // const lineSlope = (y2 - y1) / (x2 - x1)
      //intermediate points on a line
      // const lineMidpoint = [
      //   (coordsHex[0][0] + coordsHex[2][0]) / 2,
      //   (coordsHex[0][1] + coordsHex[2][1]) / 2,
      // ]

      coordsRect = coordsRect.concat(pointsArrayRect)
      coordsHex = coordsHex.concat(pointsArrayHex)
      coordsTrian = coordsTrian.concat(pointsArrayTrian)

      let closestRect = [null, null] as number[] | null[],
        closestHex = [null, null] as number[] | null[],
        closestTrian = [null, null] as number[] | null[],
        distanceRect = Infinity,
        distanceHex = Infinity,
        distanceTrian = Infinity

      for (const [xX, yY] of coordsRect) {
        let d = Math.sqrt((touchX - xX) ** 2 + (touchY - yY) ** 2)
        if (d < distanceRect) {
          closestRect = [xX, yY]
          distanceRect = d
        }
      }

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

      //rect
      if (
        isPointInsideAABB(partA.current.bounds, posX.current, posY.current) ===
          true &&
        foundPhysics[0].label === 'rect' &&
        closestRect
      ) {
        Body.translate(partB.current, {
          x: -(partB.current.position.x - posX.current),
          y: -(partB.current.position.y - posY.current),
        })
      } else {
        Body.translate(partB.current, {
          x: -(partB.current.position.x - closestRect[0]!),
          y: -(partB.current.position.y - closestRect[1]!),
        })
      }

      Body.setVelocity(partB.current, { x: 0, y: 0 })

      //hex
      if (foundPhysics[0] && foundPhysics[0].label === 'hex' && closestHex) {
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
        foundPhysics[0].label === 'trian' &&
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

  const handleDown = () => {
    isPressed.current = true
  }

  const handleUp = () => {
    isPressed.current = false
  }

  return (
    <div onMouseDown={handleDown} onMouseUp={handleUp}>
      <div ref={scene} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export default Test
