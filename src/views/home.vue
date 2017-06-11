<template>
  <view-box ref="viewBox" class="home">
     <router-view></router-view>
   </view-box>
</template>

<script>
import { Radio, ViewBox } from 'vux'
export default {
  name: 'home',

  components: {
    Radio,
    ViewBox
  },

  data () {
    return {
      options: ['China', 'Japan'],
      value: 'China'
    }
  }
}
</script>

<style lang="scss" scope>
  .home{
    background: rgb(121, 20, 162) url('../assets/index_bg.jpg') no-repeat;
    background-size: 100% auto;
  }
</style>
