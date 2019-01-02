<template>
  <div class="filters flex flex-column">
    <dataset
      v-for="layer in layers"
      :key="layer.id"
      :id="id+'_'+layer.id"
      :config="layer"
    ></dataset>
  </div>
</template>

<script>
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
