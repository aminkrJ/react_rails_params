import _ from "underscore";

export const railsify = (data, root = null) => {
  let newObject = {}

  _.each(data, (value, key) => {
    if(Array.isArray(value)){
      let items = _.map(value, (item) => {
        return railsify(item)
      })

      let nested = { [`${key}_attributes`]: items }
      newObject = { ...newObject, ...nested }
      return true;
    }

    if(typeof value === 'object' && value.constructor === Object){
      let nested = railsify(value, `${key}_attributes`)
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
