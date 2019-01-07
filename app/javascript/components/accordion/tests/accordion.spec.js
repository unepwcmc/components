import Accordion from "../Accordion.vue"
import AccordionItem from "../AccordionItem.vue"
import TestHelpers from "../../../utils/vue-test-helpers";
import PageHelpers from "./test-helpers";

const helpers = new TestHelpers(PageHelpers)

describe("Accordion", () => {
  const ACCORDION_ITEM = '<div class="accordion-item"></div>'
  const ACCORDION_ITEM_TEXT = 'Accordion Item Content'
  const ACCORDION_ITEM_HTML_CONTENT = `<div class="accordion-item__slot-content">${ACCORDION_ITEM_TEXT}</div>`

  test.only("renders multiple accordion items using slots", () => {
    const wrapper = helpers.shallowInitializeWrapper(Accordion, {
      slots: {
        default: [ACCORDION_ITEM, ACCORDION_ITEM]
      }
    })

    expect(wrapper.accordionItems()).toHaveLength(2)
  })

  test("renders accordion item child in accordion-item__content div", () => {
    const wrapper = helpers.shallowInitializeWrapper(AccordionItem, {
      propsData: {
        id: '1'
      },
      slots: {
        default: [ACCORDION_ITEM_HTML_CONTENT]
      }
    })
    
    expect(wrapper.firstItemContent().contains('div')).toBe(true)
    expect(wrapper.firstItemContent().find('div').text()).toBe(ACCORDION_ITEM_TEXT)
  }),

  test("renders accordion item child in accordion-item__content div", () => {
    const wrapper = helpers.shallowInitializeWrapper(AccordionItem, {
      propsData: {
        id: '1'
      },
      slots: {
        default: [ACCORDION_ITEM_HTML_CONTENT]
      }
    })
    
    expect(wrapper.firstItemContent().contains('div')).toBe(true)
    expect(wrapper.firstItemContent().find('div').text()).toBe('Accordion Item Content')
  }),

  test("renders the accordion item title when given as a prop", () => {
    const wrapper = helpers.shallowInitializeWrapper(AccordionItem, {
      propsData: {
        id: '1',
        title: 'Test title'
      }
    })

    expect(wrapper.firstItemTitleText()).toBe('Test title')
  })

  test("initially does not show the accordion item content", () => {
    const wrapper = helpers.initializeWrapper(Accordion, {
      scopedSlots: {
        default: function () { 
          return this.$createElement(AccordionItem, {
            props: {
              id: '1'
            }
          }) 
        }
      }
    })

    expect(wrapper.firstItemContentWrapper().isVisible()).toBe(false)
  })

  test("toggles accordion item content when clicking on the item toggle", () => {
    const wrapper = helpers.initializeWrapper(Accordion, {
      scopedSlots: {
        default: function () { 
          return this.$createElement(AccordionItem, {
            props: {
              id: '1'
            }
          }) 
        }
      }
    })

    expect(wrapper.firstItemContentWrapper().isVisible()).toBe(false)

    wrapper.toggleFirstItem()

    expect(wrapper.firstItemContentWrapper().isVisible()).toBe(true)
  })

  test("initially shows accordion item content if open prop is true", () => {
    const wrapper = helpers.initializeWrapper(Accordion, {
      scopedSlots: {
        default: function () { 
          return this.$createElement(AccordionItem, {
            props: {
              id: '1',
              open: true
            }
          }) 
        }
      }
    })
    
    expect(wrapper.firstItemContentWrapper().isVisible()).toBe(true)
  })

  test("hides accordion item content when clicking on an active item toggle", () => {
    const wrapper = helpers.initializeWrapper(Accordion, {
      scopedSlots: {
        default: function () { 
          return this.$createElement(AccordionItem, {
            props: {
              id: '1',
              open: true
            }
          }) 
        }
      }
    })

    wrapper.toggleFirstItem()

    expect(wrapper.firstItemContentWrapper().isVisible()).toBe(false)
  })

  test("shows inactive accordion toggle icon when accordion is inactive", () => {
    const wrapper = helpers.initializeWrapper(Accordion, {
      scopedSlots: {
        default: function () { 
          return this.$createElement(AccordionItem, {
            props: {
              id: '1'
            }
          }) 
        }
      }
    })

    expect(wrapper.firstItemToggleIcon().text()).toBe('+')
  })

  test("shows active accordion toggle icon when accordion is toggled open", () => {
    const wrapper = helpers.initializeWrapper(Accordion, {
      scopedSlots: {
        default: function () { 
          return this.$createElement(AccordionItem, {
            props: {
              id: '1'
            }
          }) 
        }
      }
    })

    wrapper.toggleFirstItem()

    expect(wrapper.firstItemToggleIcon().text()).toBe('-')
  })
})

//TODO: Test the following
//selecting whilst another item is selected
