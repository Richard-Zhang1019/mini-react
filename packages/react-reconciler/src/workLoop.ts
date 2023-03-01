import { completeWork } from './completeWork'
import { createWorkInProgress, FiberNode, FiberRootNode } from './fiber'
import { beginWork } from './beginWork'
import { HostRoot } from './WorkTags'

let workInProgress: FiberNode | null = null

// 初始化
function prepareRefreshStack(root: FiberRootNode) {
  // 创建workInProgress 传入root.current 因为root.current是指向的hostRootFiber
  workInProgress = createWorkInProgress(root.current, {})
}

// 循环
function workLoop() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress)
  }
}

// 执行单元
function performUnitOfWork(fiber: FiberNode) {
  const next = beginWork(fiber)
  fiber.memoizedProps = fiber.pendingProps

  // 如果没有子节点，就执行completeUnitOfWork
  if (next === null) {
    completeUnitOfWork(fiber)
  } else {
    workInProgress = next
  }
}

// 完成单元
function completeUnitOfWork(fiber: FiberNode) {
  let node: FiberNode | null = fiber

  do {
    completeWork(node)
    const sibling = node.sibling
    // 如果有兄弟节点 就继续执行兄弟节点
    if (sibling !== null) {
      workInProgress = sibling
      return
    } else {
      // 如果没有兄弟节点，就往上执行父节点
      node = node.return
      workInProgress = node
    }
  } while (node !== null)
}

// 渲染
function renderRoot(root: FiberRootNode) {
  // 初始化
  prepareRefreshStack(root)

  do {
    try {
      workLoop()
      break
    } catch (err) {
      console.warn('workLoop发生错误', err)
      workInProgress = null
    }
  } while (true)
}

export function scheduleUpdateOnFiber(fiber: FiberNode) {
  // 调度
  const root = markUpdateFromFiberToRoot(fiber)
  renderRoot(root)
}

// 向上遍历，找到root节点
function markUpdateFromFiberToRoot(fiber: FiberNode) {
  let node = fiber
  let parent = node.return
  // 只要parent不为空，就继续向上遍历
  while (parent !== null) {
    node = parent
    parent = node.return
  }
  // 如果当前节点的tag === HostRoot 说明找到了root节点 返回当前节点的stateNode
  if (node.tag === HostRoot) {
    return node.stateNode
  }
  return null
}
