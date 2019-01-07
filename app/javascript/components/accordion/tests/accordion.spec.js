import Accordion from "./accordion"
// import { shallowMount } from '@vue/test-utils'
import { isElementHidden } from "../../../utils/test-helpers";

describe("Accordion", () => {
  let accordion;
  let instance;

  beforeEach(() => {
    accordion = new Accordion()
    instance = accordion.instance
  })

  // it.only("uses test-utils successfully", () => {
  //   const wrapper = shallowMount(Accordion)
  // })

  test("renders multiple accordion items using slots", () => {
    instance.$slots.default = [accordion.getAccordionItemNode(), accordion.getAccordionItemNode()]
    instance.$mount()

    expect(accordion.getItems()).toHaveLength(2)
  })

  it("renders accordion item child in accordion-item__content div", () => {
    const itemContentNodeArgs = ["div", "Accordion Item Content"]

    instance.$slots.default = [accordion.getAccordionItemNode({itemContentNodeArgs})]
    instance.$mount()

    const contentWrapper = accordion.getItemContentElement()
    expect(contentWrapper.children).toHaveLength(1)

    const content = contentWrapper.children[0]
    expect(content.tagName).toBe('DIV')
    expect(content.textContent).toBe('Accordion Item Content')
  }),

  it("renders the accordion item title when given as a prop", () => {
    instance.$slots.default = [accordion.getAccordionItemNode({title: 'Test title'})]
    instance.$mount()

    const titleElement = accordion.getItemTitleElement()

    expect(titleElement.textContent).toBe('Test title')
  })

  it("initially does not show the accordion item content", () => {
    instance.$slots.default = [accordion.getAccordionItemNode()]
    instance.$mount()

    const contentWrapper = accordion.getItemContentWrapperElement()
    expect(isElementHidden(contentWrapper)).toBe(true)
  })

  it("toggles accordion item content when clicking on the item toggle", done => {
    instance.$slots.default = [accordion.getAccordionItemNode()]
    instance.$mount()
    const contentWrapper = accordion.getItemContentWrapperElement()
    
    expect(isElementHidden(contentWrapper)).toBe(true)

    accordion.toggleItem()

    instance.$nextTick().then(() => {
      expect(isElementHidden(contentWrapper)).toBe(false)
    }).then(done, done)
  })

  it("initially shows accordion item content if open prop is true", () => {
    instance.$slots.default = [accordion.getAccordionItemNode({open: true})]
    instance.$mount()
    const contentWrapper = accordion.getItemContentWrapperElement()
    
    expect(isElementHidden(contentWrapper)).toBe(false)
  })

  //FIXME: have fun!
  it.skip("hides accordion item content when clicking on an active item toggle", done => {
    instance.$slots.default = [accordion.getAccordionItemNode({open: true})]
    instance.$mount()
    const contentWrapper = accordion.getItemContentWrapperElement()
    
    accordion.toggleItem()
    
    instance.$nextTick().then(() => {
      console.log('isActive', instance.$children[0].$data.isActive)
      console.log('isHidden', isElementHidden(contentWrapper))
      expect(isElementHidden(contentWrapper)).toBe(true)
    }).then(done, done)
  })

  it("shows inactive accordion toggle icon when accordion is inactive", () => {
    instance.$slots.default = [accordion.getAccordionItemNode()]
    instance.$mount()

    const toggleIcon = accordion.getItemToggleIconElement()
    expect(toggleIcon.textContent).toBe('+')
  })

  // This doesn't really need to tested with two clicks, but it's an example of nested nextTicks
  it("shows active accordion toggle icon when accordion is toggled open", done => {
    instance.$slots.default = [accordion.getAccordionItemNode()]
    instance.$mount()

    accordion.toggleItem()

    const toggleIcon = accordion.getItemToggleIconElement()
    expect(toggleIcon.textContent).toBe('+')

    instance.$nextTick().then(() => {
      expect(toggleIcon.textContent).toBe('-')
      accordion.toggleItem()
    }).then(() => {
      instance.$nextTick().then(() => {
        expect(toggleIcon.textContent).toBe('+')
      }).then(done, done)
    })
  })
})

// //TODO: Test the following
// //deselecting accordionitem
// //selecting whilst another item is selected
