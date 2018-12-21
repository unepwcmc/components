<template>
  <div class="pane--target" :class="{ 'pane--target--active' : isActive}">
    <button @click.prevent="togglePane" class="pane--target__close">{{paneIcon}}</button>

    <div class="pane--target__content">
      <filters :filters="filtersArray"></filters>
    </div>
  </div>
</template>

<script>
/**
 * Top-level component of the menu system
 * Makes the api call to get menu items from backend and builds menu appropriately on event 'reload-all-facets'
 * Fires events paneOpened and paneClosed when the menu is hidden/revealed
 */

import helpers from "../../../helpers/helpers.js";
import { eventHub } from "../../../vue.js";
import Filters from "./Filters.vue";
import { EXAMPLE_FILTERS } from "../helpers/example-layers.js";

export default {
  name: "filter-pane",

  components: { Filters },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      isActive: true,
      filtersArray: EXAMPLE_FILTERS
    };
  },

  computed: {
    paneIcon() {
      return this.isActive ? ">" : "<";
    }
  },

  created() {
    const event = "triggerPaneOpen-" + helpers.spacesToKebab(this.id);
    eventHub.$on(event, this.openPane);
    eventHub.$on("triggerPaneClose", this.closePane);
    eventHub.$on("reload-all-facets", this.reload);
  },

  destroyed() {
    const event = "triggerPaneOpen-" + helpers.spacesToKebab(this.id);
    eventHub.$off(event, this.openPane);
    eventHub.$off("triggerPaneClose", this.closePane);
    eventHub.$off("getNewItems", this.updateSites);
  },

  methods: {
    openPane() {
      this.isActive = true;
    },

    closePane() {
      this.isActive = false;
    },

    togglePane() {
      this.isActive ? this.closePane() : this.openPane();
    },

    reload(e) {
      //reload data here
      this.filtersArray = EXAMPLE_FILTERS;
    }
  }
};
</script>

<style lang="scss">
.pane {
  &--target {
    color: white;
    padding-left: 30px;
    width: 100%;

    position: absolute;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 1000;

    transform: translateX(100%) translateX(-40px);

    transition: transform 0.4s ease-in-out;

    &--active {
      transform: translateX(0);
    }

    &__content {
      background-color: black;
      overflow-y: scroll;
      height: 100%;
    }

    &__close {
      width: 30px;

      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
.filters {
  &__radio-button {
    border: white 1px solid;
    width: 10px;
    height: 10px;

    display: inline-block;
  }

  &__filter {
    &.filter--active {
      .filters__radio-button {
        background-color: white;
      }
    }

    &-legend {
      &__image,
      &__gradient {
        border-radius: 15px;
        height: 15px;
        overflow: hidden;
        text-align: center;
        width: 100%;

        img {
          transform: rotateZ(90deg);
          width: 100%;
        }
      }
    }
  }
}
</style>
