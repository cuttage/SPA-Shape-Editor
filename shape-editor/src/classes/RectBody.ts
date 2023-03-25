import { Body, Bodies } from 'matter-js'

class RectBody {
  private _body: Body

  constructor(x: number, y: number, size: number, label: string) {
    this._body = Bodies.rectangle(x, y, size, size, {
      inertia: Infinity,
      label: label,
    })
  }

  get body(): Body {
    return this._body
  }
}

export default RectBody
