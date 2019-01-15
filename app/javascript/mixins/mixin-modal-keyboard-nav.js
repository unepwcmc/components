const INPUT_SELECTORS = 'select, input, textarea, button, a, [tabindex]:not([tabindex="-1"])'

export default (toggleVariable) => ({
  data() {
    return {
      firstInput: {}
    }
  },

  mounted () {
    const TAB_KEYCODE = 9
    const modalElement = this.modalId ? document.querySelector('#' + this.modalId) : this.$el
    const inputs = modalElement.querySelectorAll(INPUT_SELECTORS)
    const firstInput = inputs[0]
    const lastInput = inputs[inputs.length - 1]

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
      document.activeElement.blur()

      if (isExpanded) {
        this.$nextTick(() => {
          this.firstInput.focus()
        })
      } else if (this.triggerId) {
        document.querySelector('#' + this.triggerId).focus()
      }
    }
  }
})