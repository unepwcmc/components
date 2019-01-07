import { mount, shallowMount } from '@vue/test-utils'

const getIntializeWrapper = (pageHelpers, isShallow) => ( ...wrapperOptions) => {
  const wrapper = isShallow ? shallowMount(...wrapperOptions) : mount(...wrapperOptions)

  Object.assign(wrapper, new pageHelpers(wrapper))
  
  return wrapper
}

export default pageHelpers => ({
  shallowInitializeWrapper: getIntializeWrapper(pageHelpers, true),
  initializeWrapper: getIntializeWrapper(pageHelpers, false),
})