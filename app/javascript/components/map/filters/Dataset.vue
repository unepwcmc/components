<template>
  <div class="filters__filter flex" :class="{ 'filter--active': isActive}">
    <i class="filters__radio-button" @click="toggleDataset"></i>
    <div class="filters__filter-container">
      <i v-if="colour" class="filters__filter-colour" :style="{ backgroundColor: colour }"></i>

      <div class="filters__filter-legend">
        <h3 class="filters__filter-title">{{ name }}</h3>

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
import { eventHub } from "../../../vue.js"

export default {
  name: "layer",
  props: {
    id: {
      required: true,
      type: String
    },
    name: {
      required: true,
      type: String
    },
    colour: String,
    cartoFilters: Array,
    cartoTables: Array,
    cartoColours: Array,
    mapboxTileset: String,
    layerType: String,
    legend: Array
  },

  data() {
    return {
      selected: false,
      layerAdded: false
    }
  },

  mounted() {
    eventHub.$on("map-reload-layers", this.reloadDataset)
    /** TODO change to layers */
    eventHub.$on("hide-" + this.getDatasetName(), this.deselectDataset)
    eventHub.$on("add-" + this.getDatasetName(), this.selectDataset)
  },

  destroyed() {
    eventHub.$off("map-reload-layers", this.toggleDataset)
  },

  computed: {
    isActive() {
      return this.selected
    },

    legendGradient() {
      if (this.layerType === "Raster") {
        const colours = this.legend.join(", ")

        return {
          background: `linear-gradient(to right, ${colours})`
        }
      } else {
        const colours = this.cartoColours.join(", ")

        return {
          background: `linear-gradient(to right, ${colours})`
        }
      }
    }
  },

  methods: {
    getDatasetName() {
      return `dataset_${this.id}_${this.name}`
    },

    toggleDataset() {
      this.selected ? this.deselectDataset() : this.selectDataset()
    },

    selectDataset() {
      this.selected = true
    },

    deselectDataset() {
      this.selected = false
    },

    reloadDataset() {
      this.selected ? this.addDataset() : this.hideDataset()
    },

    addDataset() {
      this.createDatasetIfNecessary()
      this.showDataset()
    },

    createDatasetIfNecessary(forceAdd=false) {
      if (!this.layerAdded || forceAdd) {
        this.createDataset(this.selected)
      }
    },

    showDataset() {
      this.setLayerVisibility(true)
    },

    hideDataset() {
      this.setLayerVisibility(false)
    },

    setLayerVisibility(isVisible) {
      const visibility = isVisible ? "show" : "hide"

      if (this.layerType === "Raster") {
        eventHub.$emit(`map-${visibility}-layer`, this.getDatasetName())
      } else {
        for (let ii = 0; ii < this.cartoFilters.length; ii++) {
          eventHub.$emit(`map-${visibility}-layer`,this.getDatasetName() + "_" + ii)
        }
      }

      if (isVisible) {
        eventHub.$emit("map-set-curr", this.getDatasetName())
      }
    },

    createDataset(selected) {
      this.layerAdded = true
      //TODO: extract
      /** raster datasets contain just one layer to show */
      if (this.layerType === "Raster") {
        eventHub.$emit("map-create-layer", {
          name: this.getDatasetName(),
          type: this.layerType,
          visible: selected,
          mapbox: {
            tileset: this.mapboxTileset
          }
        })
      } else {
        /** Vector datasets contain multiple layers....*/
        for (let ii = 0; ii < this.cartoFilters.length; ii++) {
          let layer = {
            filter: this.cartoFilters[ii],
            tables: this.cartoTables,
            colour: this.cartoColours[ii],
            id: this.getDatasetName() + "_" + ii
          }
          eventHub.$emit("map-create-layer", {
            name: layer.id,
            type: this.layerType,
            visible: selected,
            carto: layer,
            mapbox: {
              tileset: this.mapboxTileset
            }
          })
        }
      }
    },
  },

  watch: {
    selected(isSelected) {
      isSelected ? this.addDataset() : this.hideDataset()
    }
  }
}
</script>
