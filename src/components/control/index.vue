<template>
  <div class="control" v-if="env === 'local' || env === 'dev'">
    <li-tooltip placement="top">
      <div slot="content">
        这是{{env}}
        <li-link type="primary" href="http://fed-liui-web.test.k8s.lixiang.com/">Liui</li-link>
        可视化工具<br/>
        该气泡只在local/dev模式显示
      </div>
      <img class="control-image" src="./assets/image/logo.png" alt="">
    </li-tooltip>
  </div>
</template>

<script>
const env = process.env.NODE_ENV
export default {
  data () {
    return {
      env
    }
  }
}
</script>

<style scoped lang="scss">
.control{
  &-image{
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    border-radius: 50%;
    box-shadow: 0 0 10px 0 #555555;
    transition: all .2s;
    cursor: pointer;
    z-index: 9;
    &:hover{
      box-shadow: 0 0 15px 0 #444444;
    }
  }
}
</style>
