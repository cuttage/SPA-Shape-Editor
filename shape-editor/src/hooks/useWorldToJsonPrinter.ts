import { World } from 'matter-js'

export default function useWorldToJsonPrinter(world: World): () => void {
  const circularReplacer = () => {
    const seen = new WeakSet()
    return (key: any, value: any) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return '[Circular]'
        }
        seen.add(value)
      }
      return value
    }
  }

  const handleClick = () => {
    if (world) {
      console.log(JSON.stringify(world, circularReplacer()))
    }
  }

  return handleClick
}
