import Accordion from "../Accordion.vue"
import AccordionItem from "../AccordionItem.vue"
import { getComponentInstance } from "../../../utils/vue-test-helpers";

export default {
  instance: getComponentInstance(Accordion),

  getAccordionItemNode: (function () {
    let count = 1

    return function (title=undefined) {
      return this.instance.$createElement(
        AccordionItem,
        { 
          props: { 
            id: `${count++}`,
            title
          }
        },
        [
          this.instance.$createElement("p", "Accordion Item Content")
        ]
      )
    }
  })()
}

