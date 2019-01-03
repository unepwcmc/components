import Vue from "vue/dist/vue.esm"

export const getComponentInstance = Component => new (Vue.extend(Component))()