<template>
  <div>
    <template v-for="filter, index in filters">
      <h3>{{ filter.name }}</h3>
      <facet
        :id="filter.id"
        :name="filter.name"
        :layers="filter.layers"
        :layerGroup="layerGroup"
        :embedded="embedded">
      </facet>
    </template>
  </div>
</template>

<script>
/**
 * This component decides whether to build in the grouping or not - if the 'filtersArray' this component receives
 * has a sub-element called 'facets' then it uses the filtersArray to build the group menus and constructs
 * a facet component for each facet (this happens on main map page) Otherwise it uses filtersArray directly as the
 * facets (which happens on specific asset/driver pages)
 */

import helpers from "../../../helpers/helpers.js"
import Accordion from "../../accordion/Accordion.vue"
import AccordionItem from "../../accordion/AccordionItem.vue"
import Facet from "./Facet.vue"

export default {
  name: "filters",

  components: { Accordion, AccordionItem, Facet },

  props: {
    filters: {
      type: Array
    },
    layerGroup: {
      required: true,
      type: Object
    },
    embedded: Boolean
  },

  methods: {
    accordionId(name) {
      return "acc-" + helpers.spacesToKebab(name)
    },

    accordionItemId() {
      return "acc-item-" + helpers.randomNumber()
    },

    toggleId(name) {
      return "filters-" + helpers.spacesToKebab(name)
    },

    hasFacets(filter) {
      return this.filter.facets
    }
  }
}
</script>
