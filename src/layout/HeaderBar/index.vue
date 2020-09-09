<template>
  <li-menu
    :default-active="activeIndex"
    class="li-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="rgb(1, 32, 75)"
    text-color="#ffffff"
    active-text-color="rgb(69, 149, 251)">
    <li-menu-item v-for="(menu, menuIdx) in menus" :index="menuIdx.toString()" :style="`${menu.float ? `float:${menu.float}` : ''}`" :key="menuIdx" :disabled="menu.disabled">
      <span v-if="menu.icon" :class="menu.icon" :style="menu.style || ''"></span>
      <img :class="menu.class || ''" :style="`${menu.style || ''};`" v-if="menu.img" :src="menu.img">
      {{menu.name || ''}}
    </li-menu-item>
  </li-menu>
</template>

<script>
import logo from '@/assets/image/logo-text-white.svg'
export default {
  data () {
    return {
      activeIndex: '2',
      menus: [
        {
          icon: 'iconfont icon-menu',
          style: 'font-size: 10px'
        },
        {
          img: logo,
          style: '',
          class: 'lx-logo',
          disabled: true
        },
        {
          name: '财务共享平台'
        },
        {
          name: '共享管理中心'
        },
        {
          name: '预算管理平台'
        },
        {
          name: '税务管理平台'
        },
        {
          float: 'right',
          img: logo,
          // img: 'https://static-legacy.dingtalk.com/media/lADPGoGu9D9C9f3NATrNATo_314_314.jpg',
          style: '',
          class: 'lx-avatar',
          disabled: true
        }
      ],
      isCollapse: true
    }
  },
  methods: {
    handleClick (menu, index) {
      this.activeIndex = index
    },

    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    },
    handleSelect (key, keyPath) {
    }
  }
}
</script>

<style lang="scss" scoped>
.li-menu{
  height: auto;
  .li-menu-item{
    height: 40px;
    line-height: 40px;
    &:first-child{
      margin-left: 10px;
      padding-left: 10px;
      padding-right: 10px;
    }
    &:hover, &:active, &:focus{
      color: #4595fb!important;
      background: rgb(1, 26, 60)!important;
    }
    &.is-active{
      color: #4595fb!important;
      background: rgb(1, 26, 60)!important;
    }
  }
  .lx-logo{
    height: 16px;
  }
  .lx-avatar{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    justify-items: flex-end;
  }
  .right{
    float: right;
  }
}
.li-menu-vertical-demo:not(.li-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
