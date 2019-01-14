export default {
  created () {
    window.addEventListener('click', e => {
      if (!this.$el.contains(e.target)) { this.closeCallback() }
    })
  },
  
  mounted () {
    this.$el.addEventListener('keydown', e => {
      const ESCAPE_KEYCODE = 27

      if (this.isActive && e.keyCode === ESCAPE_KEYCODE) { this.closeCallback() }
    })
  },
}