<template>
  <div class="carousel__slide content-small" :class="{ 'carousel__slide--first' : first, 'carousel__slide--hide' : hide, 'carousel__slide--show' : show }">
    <slot></slot>

    <span v-if="notLast" class="button--blue-shadow button--icon-chevron flex-inline flex-v-center" @click="nextSlide">Next <i class="material-icons">chevron_right</i></span>
  </div>
</template>

<script>
  import { eventHub } from '../../vue.js'

  export default {
    name: 'carousel-slide',

    props: {
      first: Boolean,
      last: Boolean
    },

    data () {
      return {
        hide: false,
        show: false
      }
    },

    computed: {
      notLast () {
        return !this.last
      }
    },

    methods: {
      nextSlide () {
        this.hide = true

        eventHub.$emit('nextSlide', this.index)
      }
    }
  }
</script>

<style lang="scss">
  .carousel {
    &__slide {
         
    }
  }
</style>
