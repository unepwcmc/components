<template>
  <div class="ui-select relative hover--pointer" :class="{'ui-select--disabled': isDisabled}">

    <div class="ui-select__toggle-wrapper" @click="toggleSelect">

      <label 
        v-if="config.label"
        class="ui-select__label hover--pointer" 
        :for="hiddenId">
        <span class="ui-select__selection">{{ config.label }}</span>
        <slot name="label-icon"></slot>
      </label>

      <div
        class="ui-select__dropdown-toggle" 
        :class="{'ui-select__dropdown-toggle--active': isActive}">
        <span class="ui-select__dropdown-text">{{ selectionMessage }}</span>
        <i class="ui-select__drop-arrow arrow-svg"/>
      </div>

    </div>

    <div v-show="isActive" class="ui-select__dropdown">
      <div class="ui-select__options-wrapper">

        <template v-if="isMultiselect">
          <div
            class="ui-select__option"
            v-for="option in options"
            :key="option.id">
            <input
              class="ui-select__default-checkbox"
              type="checkbox"
              :id="option.id"
              :value="option"
              v-model="selectedInternal"
              @change="optionClick(option)">
            <label
              class="ui-select__option-label"
              :for="option.id">
              <span 
                class="ui-select__checkbox" 
                :class="{'ui-select__checkbox--active': isSelected(option.id)}"></span>
              <span>{{ option.name }}</span>
            </label>
          </div>
        </template>

        <template v-else>
          <div
            class="ui-select__option"
            v-for="option in options"
            :key="option.id"
            @click="optionClick(option)">
            <span 
              class="ui-select__radio-button"
              :class="{'ui-select__radio-button--active': isSelected(option.id)}"></span>
            <span>{{ option.name }}</span>
          </div>
        </template>

      </div>
    </div>

    <input type="hidden" :name="hiddenId" :id="hiddenId" v-model="selectedInternal.name" />
  </div>
</template>

<script>
const UNDEFINED_ID = '__UNDEFINED__';
const UNDEFINED_OBJECT = { id: UNDEFINED_ID, name: 'None' }
const DEFAULT_SELECT_MESSAGE = 'Select option'
const DEFAULT_MULTISELECT_MESSAGE = 'Select options'

export default {
  props: {
      config: {
        required: true,
        type: Object
      },
      options: {
        default: () => [],
        type: Array
      },
      selected: {
        default: null,
      }
  },

  data () {
    return {
      hiddenId: `${this.config.id}-hidden`,
      isActive: false,
      isMultiselect: this.config.isMultiple,
      selectedInternal: null
    }
  },

  methods: {
    closeSelect () {
      this.isActive = false
    },

    toggleSelect () {
      this.isActive = this.options.length ? !this.isActive : false
    },

    initializeSelectedInternal () {
      if (this.selected === null) {
        this.selectedInternal = this.isMultiselect ? [] : UNDEFINED_OBJECT
      } else {
        this.selectedInternal = this.selected
      }
    },

    selectSingular (selected) {
      this.selectedInternal = selected
      this.closeSelect()
    },

    optionClick (selected) {
      if (!this.isMultiselect) {this.selectSingular(selected)}
      this.$emit('update:selected-option', this.selectedInternal)
    },

    isSelected (id) {
      if(this.isMultiselect) { 
        return this.selectedInternal.find(option => id === option.id)
      }

      return id === this.selectedInternal.id
    }
  },

  computed: {
    isDisabled () {
      return !this.options.length
    },

    selectionMessage () {
      if (this.isMultiselect) {
        const selectedNames = this.selectedInternal.map(option => option.name)

        return selectedNames.length ? selectedNames.join(', ') : DEFAULT_SELECT_MESSAGE
      }

      return this.selectedInternal.id === UNDEFINED_ID ? DEFAULT_MULTISELECT_MESSAGE : this.selectedInternal.name
    }
  },

  created () {
    window.addEventListener('click', e => {
      if (!this.$el.contains(e.target)) { this.closeSelect() }
    })

    this.initializeSelectedInternal()
  },

  watch: {
    selected (newSelectedOption) {
      this.selectedInternal = newSelectedOption
    }
  }
}
</script>

<style lang="scss">
$black: #000000;

.hover--pointer {
  &:hover {
    cursor: pointer;
  }
}

.ui-select {
  &--disabled {
    opacity: 0.5;
  }

  &__radio-button {
    border: $black 1px solid;
    width: 10px; height: 10px;

    display: inline-block;

    &--active {
      background-color: $black;
    }
  }
}

</style>

