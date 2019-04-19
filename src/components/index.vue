<template>
  <div class="container">
    <header v-drag="{a:1234}" v-demo="{c:2}">
      <button drag>fsfasd</button>
    </header>
    <article>
      <aside class="drag-wrapper" id="target" ref="target" v-demo="{bbb:22}">
        <div class="drag-item"></div>
        <vue-dragger class="drag-item" v-for="el in [0,1,2,3,4,5,6,7]" :key="el">
          vue-dragger
          <template slot="dragger" v-if="el>5">
            <div>dragger</div>
          </template>
        </vue-dragger>
      </aside>
      <div class="content" v-drag="{target:'#target', callback: targetCallback}">
        <div dragBox class="v-drag">
          <button drag="dragBox">button</button>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
import Vue from 'vue'
import vueDrag from '../directive/vue-drag.js'
import VueDragger from './vue-dragger.vue'
vueDrag()
Vue.directive('demo', {
  bind (el, binding) {
    // var fu = () => { console.log(binding, 2222222222222222) }
    // el.addEventListener('click', fu, false)
  }
})
export default {
  data () {
    return {
    }
  },
  components: {
    VueDragger
  },
  methods: {
    targetCallback (e, el) {
      console.log('回调')
    }
  }
}
</script>

<style lang="less">
html,body{height: 100%;}
.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  > header {
    height: 50px;
    background: #eee;
  }
  > article {
    flex: 1;
    display: flex;
    > aside {
      width: 200px;
      background: #ccc;
    }
    .content {
      flex: 1;
    }
  }

}
.drag-item{
    height: 40px;box-sizing: border-box;border: 1px solid #ff0;
    cursor: move;
    background-color: #0ff;
  }

  .v-drag{width: 100px;height: 100px;background: #f00;}
</style>
