import { FiberNode } from './fiber'
import { HostComponent, HostRoot, HostText } from './WorkTags'

// 递归中的 递
export const beginWork = (wip: FiberNode) => {
  switch (wip.tag) {
    case HostRoot:
      return updateHostRoot(wip)
    case HostComponent:
      return updateHostComponent(wip)
    case HostText:
      return updateHostText(wip)
    default:
      if (__DEV__) {
        console.warn('beginWork 未知类型')
      }
      break
  }
  return null
}

function updateHostRoot(wip: FiberNode) {
  const baseState = wip.memoizedState
  const updateQueue = wip.updateQueue
  return null
}

function updateHostComponent(wip: FiberNode) {
  // TODO
  return null
}

function updateHostText(wip: FiberNode) {
  // TODO
  return null
}
