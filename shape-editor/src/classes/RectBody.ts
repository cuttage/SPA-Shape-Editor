import { Body, Bodies } from 'matter-js'

class RectBody {
  private _body: Body

  constructor(x: number, y: number, size: number, label: string) {
    this._body = Bodies.rectangle(x, y, size, size, {
      inertia: Number.MAX_VALUE,
      label: label,
      isStatic: true,
      render: {
        strokeStyle: 'white',
        fillStyle: 'transparent',
        lineWidth: 1,
      },
    })
  }

  get body(): Body {
    return this._body
  }
}

export default RectBody
