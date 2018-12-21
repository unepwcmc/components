<template>
  <div class="filters__filter flex" :class="{ 'filter--active': isActive}">
    <i class="filters__radio-button" @click="toggleFilter"></i>
    <div class="filters__filter-container">
      <i v-if="colour" class="filters__filter-colour" :style="{ backgroundColor: colour }"></i>

      <div class="filters__filter-legend">
        <h3 class="filters__filter-title">{{ name }}</h3>
        <p class="filters__filter-description">{{description}}</p>
        
        <div class="filters__filter-legend__gradient" :style="legendGradient"></div>

        <div class="filters__filter-legend__labels flex flex-h-between">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * This component holds the box for a specific datasets. It controls whether or not it is
 * visible by events that are received by Map.vue that shows/hides individual layers
 */
import { eventHub } from "../../../vue.js";

export default {
  name: "layer",
  props: { //config object not hundreds of props
    id: {
      required: true,
      type: String
    },
    name: {
      required: true,
      type: String
    },
    datasetName: String,
    reports: {
      type: Array
    },
    event: {
      required: true,
      type: String
    },
    colour: String,
    geometry: Object,
    cartoFilters: Array,
    cartoTables: Array,
    cartoColours: Array,
    mapboxTileset: String,
    layerType: String,
    serviceUrl: String,
    legend: Array,
    legendUrl: String,
    description: String,
    link: String,
    accordionItemActive: Boolean
  },

  data() {
    return {
      selected: false,
      layerAdded: false
    };
  },

  mounted() {
    eventHub.$on("map-reload-layers", this.reloadLayer); //TODO: move this logic elsewhere?
    /** TODO change to layers */
    eventHub.$on("remove-" + this.getDatasetName(), this.removeLayer);
    eventHub.$on("add-" + this.getDatasetName(), this.addLayer);
  },

  destroyed() {
    eventHub.$off("map-reload-layers", this.reloadLayer);
  },

  watch: {
    accordionItemActive() {
      if (!this.accordionItemActive) {
        this.toggleFilter(false);
      }
    }
  },

  computed: {
    isActive() {
      return this.selected
    },

    legendGradient() {
      if (this.layerType === "Raster") {
        let colours = this.legend.join(", ");

        return {
          background: `linear-gradient(to right, ${colours})`
        };
      } else {
        let colours = this.cartoColours.join(", ");

        return {
          background: `linear-gradient(to right, ${colours})`
        };
      }
    }
  },

  methods: {
    reloadLayer(isStyleLoaded) {
      this.loadLayer(true, isStyleLoaded);
    },

    loadLayer(forceAdd, isStyleLoaded) {
      if (isStyleLoaded || forceAdd) {
        this.toggleLayer(false, forceAdd);
      }
    },

    toggleFilter(boolean) {
      if (typeof boolean == "boolean") {
        this.selected = boolean;
      } else {
        this.selected = !this.selected;
      }

      this.toggleLayer(true);
      eventHub.$emit(this.event);
    },

    toggleLayer(pan, forceAdd) {
      if (!this.layerAdded || forceAdd) {
        this.createDataset(this.selected);
      }
      if (this.selected) {
        this.showLayer(pan);
      } else {
        this.hideLayer();
      }
    },

    getDatasetName() {
      return `dataset_${this.id}_${this.name}`;
    },

    createDataset(selected) {
      this.layerAdded = true;
      /** raster datasets contain just one layer to show */
      if (this.layerType === "Raster") {
        eventHub.$emit("map-create-layer", {
          name: this.getDatasetName(),
          type: this.layerType,
          visible: selected,
          mapbox: {
            tileset: this.mapboxTileset
          }
        });
      } else {
        /** Vector datasets contain multiple layers....*/
        for (let ii = 0; ii < this.cartoFilters.length; ii++) {
          let layer = {
            filter: this.cartoFilters[ii],
            tables: this.cartoTables,
            colour: this.cartoColours[ii],
            id: this.getDatasetName() + "_" + ii
          };
          eventHub.$emit("map-create-layer", {
            name: layer.id,
            type: this.layerType,
            visible: selected,
            carto: layer,
            mapbox: {
              tileset: this.mapboxTileset
            }
          });
        }
      }
    },

    addLayer() {
      this.selected = true;
      this.toggleLayer();
    },

    showLayer(pan) {
      if (this.layerType === "Raster") {
        eventHub.$emit("map-show-layer", this.getDatasetName());
      } else {
        for (let ii = 0; ii < this.cartoFilters.length; ii++) {
          eventHub.$emit("map-show-layer", this.getDatasetName() + "_" + ii);
        }
      }
      eventHub.$emit("map-set-curr", this.getDatasetName());
    },

    removeLayer() {
      this.selected = false;
      this.hideLayer();
    },

    hideLayer() {
      if (this.layerType === "Raster") {
        eventHub.$emit("map-hide-layer", this.getDatasetName());
      } else {
        for (let ii = 0; ii < this.cartoFilters.length; ii++) {
          eventHub.$emit("map-hide-layer", this.getDatasetName() + "_" + ii);
        }
      }
    }
  }
};
</script>
