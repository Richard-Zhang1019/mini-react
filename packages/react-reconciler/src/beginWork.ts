import { FiberNode } from './fiber'

// 递归中的 递
export const beginWork = (fiber: FiberNode) => {
  console.log(fiber)
  return null
}
