<template>
    <a class="nav__select hover--pointer" :href="item.url">{{item.label}}</a>
</template>

<script>
export default {
  props: {
    item: {
      required: true,
      type: Object
    }
  }
}
</script>
