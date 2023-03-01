import { Action } from 'shared/ReactTypes'

export interface Update<State> {
  action: Action<State>
}

export interface UpdateQueue<State> {
  shared: {
    pending: Update<State> | null
  }
}

// 创建update
export const createUpdate = <State>(action: Action<State>): Update<State> => {
  return {
    action
  }
}

// 创建updateQueue
export const createUpdateQueue = <State>() => {
  return {
    shared: {
      pending: null
    }
  } as UpdateQueue<State>
}

// 进入updateQueue
export const enqueueUpdate = <State>(
  updateQueue: UpdateQueue<State>,
  update: Update<State>
) => {
  updateQueue.shared.pending = update
}

// 消费updateQueue
export const processUpdateQueue = <State>(
  baseState: State,
  pendingUpdate: Update<State> | null
): { memoizedState: State } => {
  const result = { memoizedState: baseState }
  // 如果有pendingUpdate存在，就执行action
  if (pendingUpdate !== null) {
    const action = pendingUpdate.action
    // 如果action是一个函数，就执行action，否则直接返回action
    if (action instanceof Function) {
      result.memoizedState = action(baseState)
    } else {
      result.memoizedState = action
    }
  }

  return result
}
