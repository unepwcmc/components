import Accordion from "../Accordion.vue"
import AccordionItem from "../AccordionItem.vue"
import { getComponentInstance } from "../../../utils/vue-test-helpers"

export default function () {
  this.instance = getComponentInstance(Accordion)

  this.getAccordionItemNode = (function() {
    let count = 1

    return function({
      title = undefined,
      open = undefined,
      itemContentNodeArgs = ["p", "Default item content"]
    } = {}) {
      return this.instance.$createElement(
        AccordionItem,
        {
          props: {
            id: `${count++}`,
            title,
            open
          }
        },
        [this.instance.$createElement(...itemContentNodeArgs)]
      )
    }
  })()

  this.getItems = () => this.instance.$el.querySelectorAll('.accordion-item')

  this.getItemContentElement = () => this.instance.$el.querySelector('.accordion-item__content')

  this.getItemContentWrapperElement = () => this.instance.$el.querySelector('.accordion-item__content-wrapper')

  this.getItemTitleElement = () => this.instance.$el.querySelector('.accordion-item__title span')

  this.getItemToggleIconElement = () => this.instance.$el.querySelector('.accordion-item__title i')

  this.getItemToggleElement = () => this.instance.$el.querySelector('.accordion-item__title')

  this.toggleItem = () => { this.getItemToggleElement().click() }
}
