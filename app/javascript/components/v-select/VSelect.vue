<template>
  <div class="v-select relative hover--pointer" :class="{'v-select--disabled': isDisabled}">
    <input type="hidden" :name="hiddenId" :id="hiddenId" v-model="selectedInternal.name" />

<!-- move label offscreen rather than not displaying -->
    <div
      v-if="config.label"
      class="v-select__label hover--pointer">
      <label for="v-select-toggle" class="v-select__selection">
        {{ config.label }}
      </label>
      <slot name="label-icon"></slot>
    </div>

    <button
      class="v-select__toggle"
      id="v-select-toggle"
      :class="{'v-select__toggle--active': isActive}"
      aria-haspopup="listbox"
      @click="toggleSelect">
      <span class="v-select__dropdown-text">{{ selectionMessage }}</span>
      <i class="v-select__drop-arrow arrow-svg"/>
    </button>

    <ul v-show="isActive" role="listbox" class="v-select__dropdown">

      <template v-if="isMultiselect">
        <li
          role="option"
          class="v-select__option"
          v-for="option in options"
          :key="option.id">
          <input
            class="v-select__default-checkbox"
            type="checkbox"
            :id="option.id"
            :value="option"
            v-model="selectedInternal"
            @change="optionClick(option)">
          <div
            class="v-select__option-label">
            <span
              class="v-select__checkbox" 
              :class="{'v-select__checkbox--active': isSelected(option.id)}"></span>
            <label :for="option.id">{{ option.name }}</label>
          </div>
        </li>
      </template>

      <template v-else>
        <li
          class="v-select__option"
          v-for="option in options"
          :key="option.id"
          @click="optionClick(option)">
          <span
            :aria-labelledby="`${option.id}_radio`"
            role="radio"
            class="v-select__radio-button"
            :class="{'v-select__radio-button--active': isSelected(option.id)}"></span>
          <span :id="`${option.id}_radio`">{{ option.name }}</span>
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

