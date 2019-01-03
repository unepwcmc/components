import accordion from "./accordion"

describe("Accordion", () => {

  beforeEach(() => {
    this.instance = accordion.instance
  })

  it("renders multiple accordion items", () => {
    this.instance.$slots.default = [accordion.getAccordionItemNode(), accordion.getAccordionItemNode()]
    this.instance.$mount()

    expect(this.instance.$el.querySelectorAll('.accordion-item')).to.have.lengthOf(2)
  })
})
