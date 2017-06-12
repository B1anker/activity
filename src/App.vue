<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import auth from '@/utils/auth'
import { resize } from '@/utils/tool'
export default {
  name: 'app',

  created () {
    auth()
    resize()
  }
}
</script>

<style lang='scss'>
@import 'style/app';
#app {
  height: 100%;
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
