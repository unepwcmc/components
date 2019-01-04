import Accordion from "./accordion"
import { isElementHidden } from "../../../utils/test-helpers";

describe("Accordion", () => {

  beforeEach(() => {
    this.accordion = new Accordion()
    this.instance = this.accordion.instance
  })

  it("renders multiple accordion items using slots", () => {
    this.instance.$slots.default = [this.accordion.getAccordionItemNode(), this.accordion.getAccordionItemNode()]
    this.instance.$mount()

    expect(this.accordion.getItems()).to.have.lengthOf(2)
  }),

  it("renders accordion item child in accordion-item__content div", () => {
    const itemContentNodeArgs = ["div", "Accordion Item Content"]

    this.instance.$slots.default = [this.accordion.getAccordionItemNode({itemContentNodeArgs})]
    this.instance.$mount()

    const contentWrapper = this.accordion.getItemContentElement()
    expect(contentWrapper.children).to.have.lengthOf(1)

    const content = contentWrapper.children[0]
    expect(content.tagName).to.equal('DIV')
    expect(content.textContent).to.equal('Accordion Item Content')
  }),

  it("renders the accordion item title when given as a prop", () => {
    this.instance.$slots.default = [this.accordion.getAccordionItemNode({title: 'Test title'})]
    this.instance.$mount()

    const titleElement = this.accordion.getItemTitleElement()

    expect(titleElement.textContent).to.equal('Test title')
  })

  it("initially does not show the accordion item content", () => {
    this.instance.$slots.default = [this.accordion.getAccordionItemNode()]
    this.instance.$mount()

    const contentWrapper = this.accordion.getItemContentWrapperElement()
    expect(isElementHidden(contentWrapper)).to.equal(true)
  })

  it("toggles accordion item content when clicking on the item toggle", done => {
    this.instance.$slots.default = [this.accordion.getAccordionItemNode()]
    this.instance.$mount()
    const contentWrapper = this.accordion.getItemContentWrapperElement()
    
    expect(isElementHidden(contentWrapper)).to.equal(true)

    this.accordion.getItemToggleElement().click()

    this.instance.$nextTick().then(() => {
      expect(isElementHidden(contentWrapper)).to.equal(false)
    }).then(done, done)
  })

  it("initially shows accordion item content if open prop is true", () => {
    this.instance.$slots.default = [this.accordion.getAccordionItemNode({open: true})]
    this.instance.$mount()
    const contentWrapper = this.accordion.getItemContentWrapperElement()
    
    expect(isElementHidden(contentWrapper)).to.equal(false)
  })

  //FIXME: have fun!
  it.skip("hides accordion item content when clicking on an active item toggle", done => {
    this.instance.$slots.default = [this.accordion.getAccordionItemNode({open: true})]
    this.instance.$mount()
    const contentWrapper = this.accordion.getItemContentWrapperElement()
    
    this.accordion.getItemToggleElement().click()
    
    this.instance.$nextTick().then(() => {
      console.log(this.instance.$children[0].$data)
      console.log(isElementHidden(contentWrapper))
      expect(isElementHidden(contentWrapper)).to.equal(true)
    }).then(done, done)
  })

  it("shows inactive accordion toggle icon when accordion is inactive", () => {
    this.instance.$slots.default = [this.accordion.getAccordionItemNode()]
    this.instance.$mount()

    const toggleIcon = this.accordion.getItemToggleIconElement()
    expect(toggleIcon.textContent).to.equal('+')
  })

  // This doesn't really need to tested with two clicks, but it's an example of nested nextTicks
  it("shows active accordion toggle icon when accordion is toggled open", done => {
    this.instance.$slots.default = [this.accordion.getAccordionItemNode()]
    this.instance.$mount()

    this.accordion.getItemToggleElement().click()

    const toggleIcon = this.accordion.getItemToggleIconElement()
    expect(toggleIcon.textContent).to.equal('+')

    this.instance.$nextTick().then(() => {
      expect(toggleIcon.textContent).to.equal('-')
      this.accordion.getItemToggleElement().click()
    }).then(() => {
      this.instance.$nextTick().then(() => {
        expect(toggleIcon.textContent).to.equal('+')
      }).then(done, done)
    })
  })
})

//TODO: Test the following
//deselecting accordionitem
//selecting whilst another item is selected