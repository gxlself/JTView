<template>
	<div class="lx-tab flex-center">
		<div class="lx-tab-item" :class="{'active': tabActive}">理想员工</div>
		<div class="lx-tab-item" :class="{'active': tabActive}">三方员工</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      activeName: '理想员工'
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
