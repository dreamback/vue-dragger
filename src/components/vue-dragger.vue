<template>
  <div ref="container">
    <slot name="dragger"></slot>
  </div>
</template>
<script>
var prefix = (function () {
  var styles = window.getComputedStyle(document.documentElement, '')
  var core = (
    Array.prototype.slice
      .call(styles)
      .join('')
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
  )[1]
  return core ? ('-' + core + '-') : ''
})()

var docBody = document.body
docBody.data = docBody.data || {}
var oldStyle = docBody.data.oldStyle = docBody.data.oldStyle || {}

const getClientRect = (el) => el.getBoundingClientRect()

const getScrollPos = () => {
  return {
    top: document.documentElement.scrollTop || document.body.scrollTop,
    left: document.documentElement.scrollLeft || document.body.scrollLeft
  }
}

const getElePos = (el) => {
  var scrollPos = getScrollPos()
  var clientRect = getClientRect(el)
  return {
    top: scrollPos.top + clientRect.top,
    left: scrollPos.left + clientRect.left
  }
}

export default {
  name: 'vue-dragger',
  props: {
    onMouseDown: {
      type: Function,
      default: () => {}
    },
    onMouseMove: {
      type: Function,
      default: () => {}
    },
    onMouseUp: {
      type: Function,
      default: () => {}
    },
    copy: false
  },
  data () {
    return {
      draggerHandle: null,
      container: null,
      moveEle: null,
      startPageXY: {},
      startPos: {}
    }
  },
  mounted () {
    console.log(this.$slots.dragger)
    this.container = this.$refs.container
    this.draggerHandle = this.$slots.dragger ? this.$slots.dragger[0].elm : this.container
    this.draggerHandle.addEventListener('mousedown', this.mousedownFn)
    docBody.addEventListener('mousemove', this.mousemoveFn)
    docBody.addEventListener('mouseup', this.mouseupFn)
  },

  methods: {
    mousedownFn (e) {
      // console.log(e)
      for (let key in docBody.style) docBody.style.hasOwnProperty(key) && docBody.style[key] && (oldStyle[key] = docBody.style[key])
      docBody.style[prefix + 'user-select'] = 'none'
      this.createDragLayout(e)
    },
    mousemoveFn (e) {
      if (!this.moveEle) return false
      var {pageX, pageY} = e
      this.moveEle.style.top = (this.startPos.top + (pageY - this.startPageXY.y)) + 'px'
      this.moveEle.style.left = (this.startPos.left + (pageX - this.startPageXY.x)) + 'px'
      // console.log(this.moveEle.style.top)
    },
    mouseupFn (e) {
      docBody.style[prefix + 'user-select'] = ''
      for (let key in oldStyle) docBody.style[key] = oldStyle[key]
      this.moveEle = null
      this.startPageXY = {}
      this.startPos = {}
    },
    createDragLayout ({pageX, pageY}) {
      this.startPos = getElePos(this.container)

      this.startPageXY = {x: pageX, y: pageY}

      this.moveEle = document.createElement('div')
      this.moveEle.style.width = this.container.offsetWidth + 'px'
      this.moveEle.style.height = this.container.offsetHeight + 'px'
      this.moveEle.style.position = 'absolute'
      this.moveEle.style.cursor = 'move'
      this.moveEle.style.top = this.startPos.top + 'px'
      this.moveEle.style.left = this.startPos.left + 'px'

      this.moveEle.appendChild(this.coyp ? this.container.cloneNode(true) : this.container)
      docBody.appendChild(this.moveEle)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
