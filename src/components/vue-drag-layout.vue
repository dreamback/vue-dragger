<template>
  <div class="vue-drag-layout" ref="content">
    <slot></slot>
  </div>
</template>
<style>
.vue-drag-layout{position: relative;}
</style>
<script>
export default {
  props: {
    col: {
      type: Number,
      default: 12
    },
    minHeight: {
      type: Number,
      default: 200
    }
  },
  data () {
    return {
      content: this.$el,
      width: 0,
      colWidth: 0
    }
  },
  methods: {
    init () {
      this.content = this.$el
      this.width = this.content.offsetWidth
      this.colWidth = parseInt(this.width / this.col)
      console.log(this.width)
    },

    windowResizeHandler () {
      this.width = this.content.offsetWidth
      this.colWidth = parseInt(this.width / this.col)
    }
  },
  mounted () {
    this.init()
    window.addEventListener('resize', this.windowResizeHandler, false)
  }
}
</script>
