<template>
  <div class="container">
    <header></header>
    <article>
      <aside class="drag-wrapper">
        <div class="drag-item" v-drag></div>
      </aside>
      <div class="content">

      </div>
    </article>
  </div>
</template>
<script>
import '../directive/vue-drag'
export default {
  data () {
    return {

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
  }
</style>
