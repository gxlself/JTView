const formatUtils = {
  /**
     * 校验字符串,数组,对象, null,Undefined
     * @param {*} val
     */
  isEmpty (val) {
    const ObjectType = Object.prototype.toString.call(val)
    if (ObjectType === '[object String]') {
      if (val === null || val === undefined || val === '') {
        return true
      }
      return false
    }
    if (ObjectType === '[object Object]') {
      if (val == null || val === undefined || val === '' || JSON.stringify(val) === '{}') {
        return true
      }
      return false
    }
    if (ObjectType === '[object Array]') {
      if (val.length === 0) {
        return true
      }
      return false
    }
    if (ObjectType === '[object Null]') {
      if (val === null) {
        return true
      }
      return false
    }
    if (ObjectType === '[object Undefined]') {
      if (val === undefined) {
        return true
      }
      return false
    }
    return false
  },

  isNumber (obj) {
    return Object.prototype.toString.call(obj) === '[object Number]'
  }

}

export default formatUtils
