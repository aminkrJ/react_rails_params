import _ from "underscore";
import humps from "humps"

export const railsify = (data, root = null, options = {}) => {
  const { decamelize } = options

  let newObject = {}

  _.each(data, (value, key) => {
    if(decamelize) key = humps.decamelize(key)

    if(Array.isArray(value)){
      let items = _.map(value, (item) => {
        return railsify(item, null, options)
      })

      let nested = { [`${key}_attributes`]: items }
      newObject = { ...newObject, ...nested }
      return true;
    }

    if(value && typeof value === 'object' && value.constructor === Object){
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
