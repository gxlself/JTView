<template>
  <div id="app">
    <router-view />
    <control v-if="$route.path !== '/three'" />
  </div>
</template>

<script>
import Control from '@/components/control/index.vue'
export default {
  components: {
    Control
  }
}
</script>
