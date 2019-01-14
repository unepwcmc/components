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

      <li
        class="v-select__option"
        v-for="option in options"
        :key="option.id">
        <input
          :class="defaultInputClass"
          :type="inputType"
          :id="getOptionInputId(option)"
          :value="option"
          v-model="selectedInternal"
          @change="handleOptionChange(option)">
        <span
          :class="getInputClasses(option)"></span>
        <label :for="getOptionInputId(option)">{{ option.name }}</label>
      </li>

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
      popupRole: this.config.isMultiple ? 'group' : 'radiogroup',
      inputType: this.config.isMultiple ? 'checkbox' : 'radio',
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
    },

    getInputClasses (option) {
      const inputClass = `v-select__${this.inputType}`

      return {
        [inputClass]: true,
        [`${inputClass}--active`]: this.isSelected(option),
      }
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
    },

    defaultInputClass () {
      return `v-select__default-${this.inputType}`
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
      const ESCAPE_KEYCODE = 27

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

