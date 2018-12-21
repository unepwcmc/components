<template>
  <div class="filters flex flex-column">
    <dataset v-for="layer in layers"
      :key="layer.id"
      :event="event"
      :id="id+'_'+layer.id"
      :name="layer.name"
      :datasetName="datasetName"
      :colour="layer.colour"
      :reports="layer.reports"
      :geometry="layer.geometry"
      :cartoUsername="layer.carto_username"
      :cartoAPIKey="layer.carto_api_key"
      :cartoFilters="layer.carto_filters"
      :cartoTables="[layer.carto_table]"
      :cartoColours="layer.carto_colors"
      :mapboxTileset="layer.tileset"
      :layerGroup="layerGroup"
      :layerType="layer.map_type"
      :serviceUrl="layer.service_url"
      :legend="layer.legend"
      :description="layer.description"
      :link="layer.url"
      :legendUrl="layer.legend_url"
      :accordionItemActive="accordionItemActive">
    </dataset>
  </div>
</template>

<script>
/**
 * A Facet component contains a list of datasets. When a facet is selected it should automatically open
 * the first dataset associated with it. If the facet is on an embedded map it will be the only facet shown
 * and so should also auto-opend the first dataset
 */
import { eventHub } from "../../../vue.js";
import helpers from "../../../helpers/helpers.js";
import Dataset from "./Dataset.vue";

export default {
  name: "facet",

  components: { Dataset },

  props: {
    id: {
      required: true
    },
    name: {
      required: true,
      type: String
    },
    datasetName: String,
    layers: {
      required: true,
      type: Array
    },
    layerGroup: {
      required: true,
      type: Object
    },
    toggleId: {
      type: String,
      default: ""
    },
    embedded: Boolean
  },

  data() {
    return {
      children: this.$children,
      event: "toggleFilter-" + this.id,
      accordionItemActive: false
    };
  },

  mounted() {
    if (this.toggleId != "") {
      eventHub.$on(this.toggleId, this.updateAccordionStatus);
    }
    if (this.embedded) {
      /** If we are embedded (on an asset/driver page) automatically open first dataset */
      eventHub.$emit(
        `add-dataset_${this.id}_${this.layers[0].id}_${this.layers[0].name}` //TODO: extract into constant/function
      );
    }
  },

  methods: {
    updateAccordionStatus(status) {
      this.accordionItemActive = status;
      /** When this facet is expanded we should automatically show the first dataset */
      if (status) {
        eventHub.$emit(
          `add-dataset_${this.id}_${this.layers[0].id}_${
            this.layers[0].name
          }`
        );
      }
    }
  }
};
</script>
