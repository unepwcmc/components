<template>
  <div class="tooltip">
    <div @mouseenter="toggleTooltip(true)" @mouseleave="toggleTooltip(false)" v-touch="toggleTooltip" class="tooltip__trigger">
      <slot></slot>
    </div>
    <div v-show="isActive" class="tooltip__target">{{ text }}</div>
  </div>  
</template>

<script>
  export default {
    name: 'tooltip',

    props: {
      text: {
        type: String,
        required: true
      }
    },

    data () {
      return {
        isActive: false,
        top: 0,
        left: 0
      }
    },

    methods: {
      toggleTooltip (boolean) {
        this.isActive = typeof boolean == 'boolean' ? boolean : !this.isActive
      }
    }
  }  
</script>

<style lang="scss">
$tooltip-background-color: grey;

.tooltip {
  position: relative;

  &__trigger {
    cursor: pointer;
  }

  &__target {
    background-color: $tooltip-background-color;

    position: absolute;
    top: 145%;
    left: 50%;
    z-index: 1;

    transform: translateX(-50%);

    &:after {
      border-bottom: solid 10px $tooltip-background-color;
      border-right: solid 10px transparent;
      border-left: solid 10px transparent;
      content: '';
      width: 0; height: 0;

      position: absolute;
      top: -10px;
      left: 50%;

      transform: translateX(-50%);
    }
  }
}
</style>

