<template>
  <div>
    <template v-for="filter, index in filters">
      <h3>{{ filter.name }}</h3>
      <facet :id="filter.id" :layers="filter.layers"></facet>
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
import Facet from "./Facet.vue";

export default {
  name: "filters",

  components: { Facet },

  props: {
    filters: {
      default: () => [],
      type: Array
    }
  }
};
</script>
