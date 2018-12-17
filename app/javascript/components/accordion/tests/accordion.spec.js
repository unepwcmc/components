import Vue from 'vue/dist/vue.esm';
import Accordion from '../Accordion.vue'

describe('Accordion', () => {
  it('renders multiple accordion items', () => {
    const Constructor = Vue.extend(Accordion)

    const comp = new Constructor().$mount()

    expect(true).to.equal(false)
  })
})