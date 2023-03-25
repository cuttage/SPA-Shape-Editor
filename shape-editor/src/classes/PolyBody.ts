import { Body, Bodies } from 'matter-js'

class PolyBody {
  private _body: Body

  constructor(
    x: number,
    y: number,
    faces: number,
    size: number,
    label: string
  ) {
    this._body = Bodies.polygon(x, y, faces, size, {
      inertia: Infinity,
      label: label,
    })
  }

  get body(): Body {
    return this._body
  }
}

export default PolyBody
