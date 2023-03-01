import { Container } from 'hostConfig'
import { ReactElementType } from 'shared/ReactTypes'
import { FiberNode, FiberRootNode } from './fiber'
import {
  createUpdate,
  createUpdateQueue,
  enqueueUpdate,
  UpdateQueue
} from './UpdateQueue'
import { scheduleUpdateOnFiber } from './workLoop'
import { HostRoot } from './WorkTags'

export function createContainer(container: Container) {
  const hostRootFiber = new FiberNode(HostRoot, {}, null)
  const root = new FiberRootNode(container, hostRootFiber)
  hostRootFiber.updateQueue = createUpdateQueue()

  return root
}

export function updateContainer(
  element: ReactElementType | null,
  root: FiberRootNode
) {
  const hostRootFiber = root.current
  // 创建update
  const update = createUpdate<ReactElementType | null>(element)
  // 插入到updateQueue 与更新机制连接起来
  enqueueUpdate(
    hostRootFiber.updateQueue as UpdateQueue<ReactElementType | null>,
    update
  )
  // 调度更新
  scheduleUpdateOnFiber(hostRootFiber)

  return element
}
