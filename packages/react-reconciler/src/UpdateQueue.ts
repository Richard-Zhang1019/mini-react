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
export const createUpdateQueue = <Action>() => {
  return {
    shared: {
      pending: null
    }
  } as UpdateQueue<Action>
}

// 进入updateQueue
export const enqueueUpdate = <Action>(
  updateQueue: UpdateQueue<Action>,
  update: Update<Action>
) => {
  updateQueue.shared.pending = update
}

// 消费updateQueue
export const processUpdateQueue = <State>(
  baseState: State,
  pendingUpdate: Update<State> | null
): { memoizedState: State } => {
  const result = { memoizedState: baseState }
  if (pendingUpdate !== null) {
    const action = pendingUpdate.action
    if (action instanceof Function) {
      result.memoizedState = action(baseState)
    } else {
      result.memoizedState = action
    }
  }

  return result
}
