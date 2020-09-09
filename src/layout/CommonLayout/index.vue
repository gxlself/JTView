<template>
  <li-container class="lx-layout" style="height: 100vh;width:100vw;">
    <li-header style="height: auto;">
      <header-bar />
    </li-header>
    <li-container>
      <li-aside :style="`width:${(isCollapse ? '65px' : '220px')}`">
        <li-menu
          default-active="1-4-1"
          background-color="rgb(244, 245, 247)"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          :collapse-transition="true"
        >
          <li-menu-item-group>
            <div class="menu-slot" slot="title">资金业务处理</div>
          </li-menu-item-group>

          <li-submenu index="1">
            <template slot="title">
              <i class="li-icon-location"></i>
              <span slot="title">付款管理</span>
            </template>
            <li-menu-item index="1-1">内部调拨-新增</li-menu-item>
            <li-menu-item index="1-2">对外付款-新增</li-menu-item>
          </li-submenu>
          <li-submenu index="2">
            <template slot="title">
              <i class="li-icon-location"></i>
              <span slot="title">内部往来清账</span>
            </template>
            <li-menu-item index="2-1">新增清账规则</li-menu-item>
            <li-menu-item index="2-2">清账记录</li-menu-item>
          </li-submenu>

          <li-menu-item-group>
            <div class="menu-slot" slot="title">审批管理</div>
          </li-menu-item-group>

          <li-submenu index="3">
            <template slot="title">
              <i class="li-icon-location"></i>
              <span slot="title">付款审批</span>
            </template>
            <li-menu-item index="3-1">付款管理</li-menu-item>
            <li-menu-item index="3-2">内部往来清账</li-menu-item>
          </li-submenu>
          <li-submenu index="4">
            <template slot="title">
              <i class="li-icon-location"></i>
              <span slot="title">资金调拨规则审批</span>
            </template>
            <li-menu-item index="4-1">付款管理</li-menu-item>
            <li-menu-item index="4-2">内部往来清账</li-menu-item>
          </li-submenu>

          <li-menu-item @click="logout">退出登录</li-menu-item>
        </li-menu>
        <span class="li-icon-right collapse-icon" :class="{'close': !isCollapse}" @click="isCollapse =! isCollapse"></span>
      </li-aside>
      <li-main class="lx-content">
        <li-header v-if="crumb" style="height: auto;">
          <h3>{{crumb}}</h3>
        </li-header>
        <div class="lx-content-view" :class="{'has-crumb-view': crumb}">
          <router-view></router-view>
        </div>
        <li-footer>Copyright © 2020 理想汽车 资金管理平台 版权所有</li-footer>
      </li-main>
    </li-container>
  </li-container>
</template>

<script>
import HeaderBar from '@/layout/HeaderBar/index.vue'
export default {
  name: 'CommonLayout',
  components: {
    HeaderBar
  },
  data () {
    return {
      activeIndex: '',
      isCollapse: false
    }
  },
  computed: {
    crumb () {
      return this.$route.meta.crumb
    }
  },
  watch: {
    $route (to, from) {
      this.crumb = from.meta.crumb
    }
  },
  methods: {
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    },
    logout () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.lx-layout{
  .li-header{
    padding: 0;
  }
  .li-footer{
    position: relative;
    padding: 15px 0px;
    text-align: center;
    color: rgb(153, 153, 153);
    font-size: 14px;
    line-height: 2;
    border-top: 2px solid #f5f5f5;
    background: #ffffff;
  }
  .lx-content{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 0;
    max-height: calc(100vh - 40px);
    overflow: hidden;
    .li-header{
      border-bottom: 1px solid #f5f5f5;
      line-height: 2;
      padding: 10px;
    }
    &-view{
      flex: 1;
      /* 减去头 底 高度 */
      max-height: calc(100vh - 100px);
      overflow: auto;
      padding: 20px;
      &.has-crumb-view{
        max-height: calc(100vh - 160px);
      }
    }
  }
  .li-aside{
    position: relative;
    .li-menu{
      transition: all .3s ease;
      height: 100%;
      .menu-slot{
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 40px;
      }
    }
    .collapse-icon{
      position: absolute;
      bottom: 40px;
      right: 15px;
      background: #dddddd;
      border-radius: 50%;
      padding: 10px;
      transition: all .2s ease;
      cursor: pointer;
      &.close{
        transform: rotate(180deg);
      }
    }
  }
}
</style>
