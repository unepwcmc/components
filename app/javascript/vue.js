// dependencies
import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'

// store
import store from './store/store.js'

// vue components
import Accordion from './components/accordion/Accordion'
import AccordionItem from './components/accordion/AccordionItem'

import Modal from './components/modal/Modal'
import ModalTrigger from './components/modal/ModalTrigger'
import ModalWrapper from './components/modal/ModalWrapper'

import VNav from './components/nav/VNav'

import VSelect from './components/v-select/VSelect'

// create event hub and export so that it can be imported into .vue files
export const eventHub = new Vue()

document.addEventListener("DOMContentLoaded", () => { 
  if(document.getElementById('v-app')) {

    Vue.use(TurbolinksAdapter)

    document.addEventListener('turbolinks:load', () => {
      const app = new Vue({
        el: '#v-app',
        store,
        components: { Accordion, AccordionItem, Modal, ModalTrigger, ModalWrapper, VNav, VSelect }
      })
    })
  }
})