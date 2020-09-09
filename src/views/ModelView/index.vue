<template>
  <div class="page">
      <div>1232342342342342423423423</div>
      <iframe :src="frameSrc"></iframe>
  </div>
</template>

<script>
export default {
  mounted () {

  },
  data () {
    // console.log(window.location.origin)
    // const { location: { origin } } = window
    return {
      frameSrc: 'http://localhost:8084/#/three'
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.page{
    height: 100%;
    display: flex;
    iframe{
      flex: 1;
      border: 0 none;
    }
}
</style>
