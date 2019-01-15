export default (triggerId, toggleVariable) => ({
  data() {
    return {
      firstInput: {}
    }
  },

  mounted () {
    const TAB_KEYCODE = 9
    const inputs = this.$el.querySelectorAll('select, input, textarea, button, a, [tabindex]:not([tabindex="-1"])');
    const firstInput = inputs[0]
    const lastInput = inputs[inputs.length - 1];
    this.firstInput = firstInput

    lastInput.addEventListener('keydown', e => {
      if ((e.keyCode === TAB_KEYCODE && !e.shiftKey)) {
        e.preventDefault()
        firstInput.focus()
      }
    });

    firstInput.addEventListener('keydown', e => {
      if ((e.keyCode === TAB_KEYCODE && e.shiftKey)) {
        e.preventDefault()
        lastInput.focus()
      }
    });
  },

  watch: {
    [toggleVariable] (isExpanded) {
      if (isExpanded) {
        this.$nextTick(() => {
          this.firstInput.focus()
        })
      } else {
        document.querySelector('#' + triggerId).focus()
      }
    }
  }
})