<template>
  <div class="nav__dropdown" :class="{'nav__dropdown--active': isActive}">
    <button :id="triggerId" aria-haspopup="true" :aria-expanded="isActive" :aria-controls="modalId" class="nav__dropdown-toggle hover--pointer flex-inline" @click="toggleDropdown">
      <label :for="modalId" class="nav__select nav__select--dropdown">{{item.label}}</label>
      <span class="nav__drop-arrow">V</span>
    </button>
    <div class="nav__dropdown-wrapper">
      <menu :id="modalId" class="nav__dropdown-menu" :class="{'nav__dropdown-menu--two-col': hasTwoColumns}">
        <v-nav-link
          class="nav__dropdown-item"
          v-for="dropdownItem in item.children"
          :item="dropdownItem"
          :key="dropdownItem.id"
        ></v-nav-link>
      </menu>
    </div>
  </div>
</template>

<script>
import VNavLink from "./VNavLink"
import mixinModalKeyboardNav from '../../mixins/mixin-modal-keyboard-nav'
import mixinPopupCloseListeners from '../../mixins/mixin-popup-close-listeners'

export default {
  components: {
    VNavLink
  },

  mixins: [mixinModalKeyboardNav('isActive'), mixinPopupCloseListeners('closeDropdown')],

  props: {
    item: {
      required: true,
      type: Object
    },
    isBurger: {
      required: true,
      type: Boolean
    }
  },

  data() {
    return {
      modalId: `nav-dropdown-${this.item.label.toLowerCase()}`,
      triggerId: `nav-dropdown-toggle-${this.item.label.toLowerCase()}`,
      isActive: false
    }
  },

  methods: {
    closeDropdown () {
      this.isActive = false
    },
    openDropdown () {
      this.isActive = true
    },
    toggleDropdown () {
      this.isActive ? this.closeDropdown() : this.openDropdown()
    }
  },

  computed: {
    hasTwoColumns () {
      return !this.isBurger && this.item.children.length > 4
    }
  }
}
</script>