<template>
  <div class="filters flex flex-column">
    <dataset
      v-for="layer in layers"
      :key="layer.id"
      :id="id+'_'+layer.id"
      :name="layer.name"
      :colour="layer.colour"
      :cartoFilters="layer.carto_filters"
      :cartoTables="[layer.carto_table]"
      :cartoColours="layer.carto_colors"
      :mapboxTileset="layer.tileset"
      :layerType="layer.map_type"
      :legend="layer.legend"
    ></dataset>
  </div>
</template>

<script>
/**
 * A Facet component contains a list of datasets. When a facet is selected it should automatically open
 * the first dataset associated with it.
 */
import Dataset from "./Dataset.vue";

export default {
  name: "facet",

  components: { Dataset },

  props: {
    id: {
      required: true
    },
    layers: {
      required: true,
      type: Array
    }
  }
};
</script>
