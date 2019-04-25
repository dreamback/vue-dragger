<template>
  <div class="vue-drag-layout-item" layout :style="styleCSS">
      <slot></slot>
  </div>
</template>
<script>
export default {
  data () {
    return {
      parent: this.$parent,
      width: 0,
      height: 0,
      styleCSS: {},
      colMulti: 3 // 乘积，倍数，宽度使用
    }
  },
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  // computed: {
  //   styleCSS () {
  //     var sub = parseInt(this.parent.width / (this.parent.colWidth * this.colMulti))
  //     return {
  //       width: this.parent.colWidth * this.colMulti + 'px',
  //       height: this.parent.minHeight + 'px',
  //       top: (Math.ceil((this.index + 1) / sub) - 1) * this.parent.minHeight + 'px',
  //       left: Math.ceil(this.index % sub) * this.parent.colWidth * this.colMulti + 'px'
  //     }
  //   }
  // },
  methods: {
    init () {
      var sub = parseInt(this.parent.width / (this.parent.colWidth * this.colMulti))
      this.styleCSS = {
        width: this.parent.colWidth * this.colMulti + 'px',
        height: this.parent.minHeight + 'px',
        top: (Math.ceil((this.index + 1) / sub) - 1) * this.parent.minHeight + 'px',
        left: Math.ceil(this.index % sub) * this.parent.colWidth * this.colMulti + 'px'
      }
    }
  },
  mounted () {
    // console.log(this.$parent)
    this.$nextTick(() => {
      this.init()
    })
  }
}
</script>

<style>
.vue-drag-layout-item{position: absolute;box-sizing: border-box;background: #eee;border: 1px solid #ccc;font-size: 24px;text-align: center;}
</style>
