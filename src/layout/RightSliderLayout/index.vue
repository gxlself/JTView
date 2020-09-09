<template>
  <li-container style="height: 100vh;width:100vw;">
    <li-aside width="200px" style="background-color: rgb(0,0,0)">
      <li-menu
        background-color="#000"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        :default-active="$route.path"
        router
      >
        <li-menu-item index="/dashboard">欢迎</li-menu-item>
        <li-menu-item index="/jt">JT VIEW</li-menu-item>
        <li-menu-item index="/model">Model VIEW</li-menu-item>
        <!-- <li-submenu v-for="route in menus" :index="route.link" :key="route.id">
          <template slot="title">
            <i class="li-icon-s-operation"></i>{{route.name}}
          </template>
          <li-menu-item-group v-for="iRouter in route.children" :key="iRouter.id">
            <li-menu-item :index="iRouter.link">{{iRouter.name}}</li-menu-item>
          </li-menu-item-group>
        </li-submenu> -->
        <li-menu-item @click="logout">退出登录</li-menu-item>
      </li-menu>
    </li-aside>
    <li-main>
      <router-view></router-view>
    </li-main>
  </li-container>
</template>

<script>
import index from './index.js'
export default index
</script>

<style lang="scss" scoped>
.li-menu {
  border: 0 !important;
}
.li-menu-item {
  &.is-active {
    background: #1f2d3d !important;
  }
}
</style>
