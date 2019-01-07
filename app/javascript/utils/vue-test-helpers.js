import { mount, shallowMount } from '@vue/test-utils'
const $ = require('jquery')

const getIntializeWrapper = (pageHelpers, isShallow) => ( ...wrapperOptions) => {
  const wrapper = isShallow ? shallowMount(...wrapperOptions) : mount(...wrapperOptions)

  Object.assign(wrapper, new pageHelpers(wrapper))
  
  return wrapper
}

export default pageHelpers => ({
  shallowInitializeWrapper: getIntializeWrapper(pageHelpers, true),

  initializeWrapper: getIntializeWrapper(pageHelpers, false),
  
  addDefaultProp: (Component, props) => {
    const newComp = $.extend(true, {}, Component)
    
    props.forEach(prop => {
      newComp.props[prop[0]] = {
        default: () => prop[1],
        required: false
      }
    })

    return newComp
  }
})