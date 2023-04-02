import { Props, Key, Ref } from 'shared/ReactTypes'
import { WorkTag } from './WorkTags'
import { Flags, NoFlags } from './fiberFlags'
import { Container } from 'hostConfig'

export class FiberNode {
  // 静态属性
  tag: WorkTag
  key: Key
  stateNode: any
  type: any

  // fiber节点关系
  return: FiberNode | null
  child: FiberNode | null
  sibling: FiberNode | null
  index: number
  ref: Ref

  pendingProps: Props | null
  memoizedProps: Props | null
  memoizedState: any
  alternate: FiberNode | null
  flags: Flags
  updateQueue: unknown

  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    // 作为静态数据结构的属性
    this.tag = tag
    this.key = key
    this.stateNode = null

    // 表示节点间的关系
    this.return = null
    this.child = null
    this.sibling = null
    this.index = 0

    this.ref = null

    this.pendingProps = pendingProps
    this.memoizedProps = null
    this.memoizedState = null
    this.updateQueue = null

    this.alternate = null
    this.flags = NoFlags
  }
}

export class FiberRootNode {
  container: Container
  // 指向hostRootFiber
  current: FiberNode
  // 指向整个更新完成以后的hostRootFiber
  finishedWork: FiberNode | null
  constructor(container: Container, hostRootFiber: FiberNode) {
    this.container = container
    this.current = hostRootFiber
    hostRootFiber.stateNode = this
    this.finishedWork = null
  }
}

export const createWorkInProgress = (
  current: FiberNode,
  pendingProps: Props
): FiberNode => {
  let wip = current.alternate

  // 判断当前是否有wip节点
  if (wip === null) {
    // 说明为mount
    wip = new FiberNode(current.tag, pendingProps, current.key)
    wip.type = current.type
    wip.stateNode = current.stateNode
    wip.alternate = current
    current.alternate = wip
  } else {
    // 说明为update
    wip.pendingProps = pendingProps
    wip.flags = NoFlags
  }
  wip.type = current.type
  wip.child = current.child
  wip.updateQueue = current.updateQueue
  wip.memoizedProps = current.memoizedProps
  wip.memoizedState = current.memoizedState

  return wip
}
