import Vue from 'vue'
export default function vueDragLayout () {
  Vue.directive('vueDragLayout', {
    inserted (el, binding = {}) {
      class DragLayout {
        constuctor (el, binding) {
          this.el = el
          this.col = binding.col || 12
          this.minHeight = binding.minHeight

          this.layoutWidth = 0
          this.elWidth = 0
          this.layoutHeight = binding.minHeight

          this.win = window
          this.initLayout()
          this.events()
        }
        getLayoutEle (el) {
          if (el === this.el || el.nodeName === 'BODY') return null
          el = el.parentNode
          return el.hasAttribute('layout') ? el : this.getLayoutEle(el)
        }

        elMouseDownHandler () {

        }

        winMouseMoveHandler () {}

        winMouseUpHandler () {}
        winResizeHandler () {}

        initLayout () {
          this.elWidth = this.el.offsetWidth
          this.colWidth = parseInt(this.elWidth / this.col)
        }

        events () {
          this.el.addEventListener('mousedown', this.elMouseDownHandler, false)
          this.win.addEventListener('mousemove', this.winMouseMoveHandler, false)
          this.win.addEventListener('mouseup', this.winMouseUpHandler, false)

          this.win.addEventListener('resize', this.winResizeHandler, false)
        }
      }
      return new DragLayout(el, binding)
    }
  })
}
