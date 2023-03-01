import { Props, Key, Ref } from 'shared/ReactTypes'
import { WorkTag } from './WorkTags'
import { Flags, NoFlags } from './fiberFlags'

export class FiberNode {
  tag: WorkTag
  key: Key
  stateNode: any
  return: FiberNode | null
  child: FiberNode | null
  sibling: FiberNode | null
  index: number
  ref: Ref
  pendingProps: Props | null
  memoizedProps: Props | null
  alternate: FiberNode | null
  flags: Flags

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

    this.alternate = null
    this.flags = NoFlags
  }
}
