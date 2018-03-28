// dependencies
import TurbolinksAdapter from 'vue-turbolinks';
import Vue from 'vue/dist/vue.esm'

// store
import store from './store/store.js'

// vue components
import Accordion from './components/accordion/Accordion.vue'
import AccordionItem from './components/accordion/AccordionItem.vue'

import Carousel from './components/carousel/Carousel.vue'
import CarouselSlide from './components/carousel/CarouselSlide.vue'

import Modal from './components/modal/Modal.vue'
import ModalTrigger from './components/modal/ModalTrigger.vue'
import ModalWrapper from './components/modal/ModalWrapper.vue'

// create event hub and export so that it can be imported into .vue files
export const eventHub = new Vue()

document.addEventListener("DOMContentLoaded", () => { 
  if(document.getElementById('v-app')) {

    Vue.use(TurbolinksAdapter)

    document.addEventListener('turbolinks:load', () => {
      const app = new Vue({
        el: '#v-app',
        store,
        components: { Accordion, AccordionItem, Carousel, CarouselSlide, Modal, ModalTrigger, ModalWrapper }
      })
    })
  }
})