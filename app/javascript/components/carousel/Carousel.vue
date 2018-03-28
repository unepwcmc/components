<template>
  <div class="carousel">
    <h1>{{ title }}</h1><span class="carousel__steps">Slide {{ currentSlide }} of {{ totalSlides }}</span>

    <div class="slides">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { eventHub } from '../../vue.js'
  export default {
    name: 'carousel',

    props: {
      title: String
    },

    data () {
      return {
        currentSlide: 1,
        totalSlides: 0,
        children: this.$children
      }
    },

    created () {
      eventHub.$on('nextSlide', this.nextSlide)
    },

    mounted () {
      this.totalSlides = this.children.length
      this.addIndices()
    },

    methods: {
      addIndices () {
        this.children.forEach( (child, index) => {
          child.index = index
        })
      },

      nextSlide (currentIndex) {
        let nextIndex = currentIndex + 1

        this.children.forEach(child => {
          child.show = child.index === nextIndex
        })
      }
    }
  }
</script>
