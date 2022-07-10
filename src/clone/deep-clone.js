import { getType } from "../type/index"
import each from '../each/index'
import shallowClone from "./shallow-clone"

/**
 * 返回一个值的深拷贝
 * 
 * @param {*} target - 需要深拷贝的值
 * @returns {*} 深拷贝后的值
 */
const deepClone = (target, cache = new WeakSet()) => {
  if (!/^(array|object)$/.test(getType(target))) {
    return shallowClone(target)
  }

  if (cache.has(target)) {
    return target
  }

  cache.add(target)

  const obj = new target.constructor

  each(target, (key, value) => {
    obj[key] = deepClone(value, cache)
  })

  return obj
}

export default deepClone