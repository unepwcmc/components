<template>
  <div class="v-select relative hover--pointer" :class="{'v-select--disabled': isDisabled}">
    <input type="hidden" :name="config.id" :id="config.id" v-model="selectedInternal.name" />

<!-- TODO: move label offscreen rather than not displaying -->
    <div class="v-select__label hover--pointer">
      <label :for="toggleId" class="v-select__selection">
        {{ config.label }}
      </label>
      <slot name="label-icon"></slot>
    </div>

    <button
      class="v-select__toggle"
      :id="toggleId"
      :class="{'v-select__toggle--active': isActive}"
      :aria-haspopup="true"
      :aria-controls="dropdownId"
      @click="toggleSelect">
      <span class="v-select__dropdown-text">{{ selectionMessage }}</span>
      <i class="v-select__drop-arrow arrow-svg"/>
    </button>

    <ul 
      v-show="isActive" 
      :role="popupRole" 
      :id="dropdownId" 
      :aria-multiselectable="isMultiselect" 
      class="v-select__dropdown">

      <template v-if="isMultiselect">
        <li
          class="v-select__option"
          v-for="option in options"
          :key="option.id">
          <input
            class="v-select__default-checkbox"
            type="checkbox"
            :id="getOptionInputId(option)"
            :value="option"
            v-model="selectedInternal"
            @change="handleOptionChange(option)">
          <span
            class="v-select__checkbox" 
            :class="{'v-select__checkbox--active': isSelected(option)}"></span>
          <label :for="getOptionInputId(option)">{{ option.name }}</label>
        </li>
      </template>

      <template v-else>
        <li
          class="v-select__option"
          v-for="option in options"
          :key="option.id">
          <input
            class="v-select__default-radio-button"
            type="radio"
            :id="getOptionInputId(option)"
            :value="option"
            v-model="selectedInternal"
            @change="handleOptionChange(option)">
          <span
            class="v-select__radio-button" 
            :class="{'v-select__radio-button--active': isSelected(option)}"></span>
          <label :for="getOptionInputId(option)">{{ option.name }}</label>
        </li>
      </template>

    </ul> 

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
      isActive: false,
      isMultiselect: this.config.isMultiple,
      selectedInternal: null,
      dropdownId: this.config.id + '-v-select-dropdown',
      toggleId: this.config.id + '-v-select-toggle',
      popupRole: this.config.isMultiple ? 'group' : 'radiogroup'
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

    handleOptionChange (selected) {
      this.$emit('update:selected-option', this.selectedInternal)
    },

    isSelected (option) {
      if(this.isMultiselect) { 
        return this.selectedInternal.find(selectedOption => option.id === selectedOption.id)
      }

      return option.id === this.selectedInternal.id
    },

    getOptionInputId(option) {
      return `${this.config.id}-${option.id}`
    }
  },

  computed: {
    isDisabled () {
      return !this.options.length
    },

    selectionMessage () {
      if (this.isMultiselect) {
        const selectedNames = this.selectedInternal.map(option => option.name)

        return selectedNames.length ? selectedNames.join(', ') : DEFAULT_MULTISELECT_MESSAGE
      }

      return this.selectedInternal.id === UNDEFINED_ID ? DEFAULT_SELECT_MESSAGE : this.selectedInternal.name
    }
  },

  created () {
    window.addEventListener('click', e => {
      if (!this.$el.contains(e.target)) { this.closeSelect() }
    })

    this.initializeSelectedInternal()
  },
  
  mounted () {
    this.$el.addEventListener('keydown', e => {
      ESCAPE_KEYCODE  = 27
      if (this.isActive && e.keyCode === ESCAPE_KEYCODE) { this.closeSelect() }
    })
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

.v-select {
  &--disabled {
    opacity: 0.5;
  }
}

</style>

