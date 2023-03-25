class PointsArrayRect {
  private points: any[] = []

  public push(x: number | undefined, y: number | undefined, shape: string) {
    this.points.push([x, y, shape])
  }

  public getPoints() {
    return this.points
  }

  public clear() {
    this.points = []
  }
}
export default PointsArrayRect
