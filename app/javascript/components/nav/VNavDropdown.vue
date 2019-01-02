<template>
  <div class="nav__dropdown" :class="{'nav__dropdown--active': isActive}">
    <div class="nav__dropdown-toggle hover--pointer flex-inline" @click="click()">
      <span class="nav__select nav__select--dropdown">{{item.label}}</span>
      <span class="nav__drop-arrow">V</span>
    </div>
    <div class="nav__dropdown-menu">
      <div class="nav__dropdown-body" :class="{'nav__dropdown--two-col': hasTwoColumns}">
        <v-nav-link
          class="nav__dropdown-item"
          v-for="dropdownItem in item.children"
          :item="dropdownItem"
          :key="dropdownItem.id"
        ></v-nav-link>
      </div>
    </div>
  </div>
</template>

<script>
import VNavLink from "./VNavLink"

export default {
  components: {
    VNavLink
  },

  props: {
    item: {
      required: true,
      type: Object
    },
    isActive: {
      default: false,
      type: Boolean
    },
    isBurger: {
      required: true,
      type: Boolean
    }
  },

  methods: {
    click () {
      this.$emit("nav-dropdown-click", this.item.id)
    }
  },

  computed: {
    hasTwoColumns () {
      return !this.isBurger && this.item.children.length > 4
    }
  },

  created () {
    window.addEventListener("click", e => {
      if (this.isActive && !this.$el.contains(e.target)) {
        this.$emit("nav-dropdown-click-outside", this.item.id)
      }
    })
  }
}
</script>