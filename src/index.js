import _ from "underscore";
import humps from "humps"

export const railsify = (data, root = null, options = {}) => {
  const { decamelize } = options

  let newObject = {}

  _.each(data, (value, key) => {
    if(decamelize) key = humps.decamelize(key)

    if(isArrayOfObjects(value)){
      let items = _.map(value, (item) => {
        return railsify(item, null, options)
      })

      let nested = { [`${key}_attributes`]: items }
      newObject = { ...newObject, ...nested }

      return true;
    }

    if(isObject(value)){
      let nested = railsify(value, `${key}_attributes`, options)
      newObject = { ...newObject, ...nested }

      return true;
    }

    newObject = { ...newObject, [key]: value }
  })

  if(root){
    return { [root]: newObject }
  }else{
    return newObject
  }
}

export const isArrayOfObjects = (value) => {
  if(Array.isArray(value)){
    value = value.map((item) => {
      return isObject(item)
    });

    return value.includes(false) ? false : true
  } else {
    return false
  }
}

const isObject = (value) => {
  return value && typeof value === 'object' && value.constructor === Object
}
