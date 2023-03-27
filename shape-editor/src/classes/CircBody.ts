import { Body, Bodies } from 'matter-js'

class CircBody {
  private _body: Body

  constructor(x: number, y: number, size: number, label: string) {
    this._body = Bodies.circle(x, y, size, {
      collisionFilter: {
        group: -1,
        category: 0x0004,
        mask: 0,
      },
      label: label,
      inertia: 0,
      frictionAir: Number.MIN_VALUE,
      inverseInertia: 0,
      restitution: 0,
      frictionStatic: 0,
      isStatic: false,
      render: {
        strokeStyle: 'transparent',
        fillStyle: 'transparent',
        lineWidth: 1,
      },
    })
  }

  get body(): Body {
    return this._body
  }
}

export default CircBody
