import { FiberNode } from './fiber'

// 递归中的 归
export const completeWork = (fiber: FiberNode) => {
  console.log('completeWork', fiber)
}
