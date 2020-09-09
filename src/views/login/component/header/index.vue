<template>
  <div class="amp-login-header flex-center flex-align-center">
    <div class="lx-col-12 flex-between">
      <img src="../../../../assets/image/logo-text-white.svg" alt="">
      <span>{{date}}</span>
    </div>
  </div>
</template>

<script>
import format from '@/utils/format'
export default {
  data () {
    return {
      date: `${format.dateToString(new Date(), 'yyyy-MM-dd')} ${format.getWeekday(new Date())}`
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/function.scss';
.amp-login-header{
  background: #000000;
  height: 50px;
  color: #FFFFFE;
  font-size: 18px;
  @include mobile{
    padding: 0 20px;
    font-size: 13px;
  }
}
</style>
