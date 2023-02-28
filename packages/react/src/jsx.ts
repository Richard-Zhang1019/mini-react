import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols'
import {
  Type,
  Key,
  Ref,
  Props,
  ElementType,
  ReactElementType
} from 'shared/ReactTypes'

function ReactElement(
  type: Type,
  key: Key,
  ref: Ref,
  props: Props
): ReactElementType {
  // 创建一个对象返回
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    _mark: 'richard'
  }
  return element
}

export const jsx = (type: ElementType, config: any, ...child: any) => {
  // 保存key ref props
  let key: Key = null
  let ref: Ref = null
  const props: Props = {}

  // 遍历属性
  for (const prop in config) {
    const val = config[prop]
    // 如果是key
    if (prop === 'key') {
      // 并且key不为undefined 找到key
      if (val !== 'undefined') {
        key = val
      }
      continue
    }
    // 如果是ref
    if (prop === 'ref') {
      // 并且ref不为undefined 找到ref
      if (val !== 'undefined') {
        ref = val
      }
      continue
    }
    // 判断是否是原型上的属性
    if ({}.hasOwnProperty.call(config, prop)) {
      props[prop] = val
    }
  }

  const childLength = child.length
  // 如果有子节点
  if (childLength) {
    // 只有一个子节点 直接拿到赋值
    if (childLength === 1) {
      props.children = child[0]
    } else {
      // 多个子节点
      props.children = child
    }
  }
  // 把type key ref props传入ReactElement
  return ReactElement(type, key, ref, props)
}

export const jsxDev = (type: ElementType, config: any) => {
  // 保存key ref props
  let key: Key = null
  let ref: Ref = null
  const props: Props = {}

  // 遍历属性
  for (const prop in config) {
    const val = config[prop]
    // 如果是key
    if (prop === 'key') {
      // 并且key不为undefined 找到key
      if (val !== 'undefined') {
        key = val
      }
      continue
    }
    // 如果是ref
    if (prop === 'ref') {
      // 并且ref不为undefined 找到ref
      if (val !== 'undefined') {
        ref = val
      }
      continue
    }
    // 判断是否是原型上的属性
    if ({}.hasOwnProperty.call(config, prop)) {
      props[prop] = val
    }
  }
  // 把type key ref props传入ReactElement
  return ReactElement(type, key, ref, props)
}
