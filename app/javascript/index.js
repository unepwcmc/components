// dependencies
import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'
import Vue2TouchEvents from 'vue2-touch-events'

// store
import store from './store/store.js'

// vue components
import Accordion from './components/accordion/Accordion'
import AccordionItem from './components/accordion/AccordionItem'

import Modal from './components/modal/Modal'
import ModalTrigger from './components/modal/ModalTrigger'

import Tooltip from './components/tooltip/Tooltip'

import VMap from './components/map/VMap'

import VNav from './components/nav/VNav'

import VSelect from './components/v-select/VSelect'

import defineCustomAriaElements from './helpers/aria-definitions'
defineCustomAriaElements()

// create event hub and export so that it can be imported into .vue files
export const eventHub = new Vue()

Vue.use(TurbolinksAdapter)
Vue.use(Vue2TouchEvents)
const components = { Accordion, AccordionItem, Modal, ModalTrigger, Tooltip, VMap, VNav, VSelect }

// Object.keys(Components).forEach(name => {
//   Vue.component(name, Components[name])
// })

const app = new Vue({
  el: '#v-app',
  store,
  components
})

export default components;