<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { resize } from '@/utils/tool'
import { mapState } from 'vuex'
import judgeActivityState from '@/business/judgeActivityState'
import auth from '@/business/auth'
import share from '@/business/share'
export default {
  name: 'app',

  async created () {
    resize()
    this.$statistic.openHomePage()
    window.onunload = () => {
      this.$statistic.downLine().send()
    }
    await auth()
    share()
    judgeActivityState.call(this)
  },

  data () {
    return {
      transitionName: ''
    }
  },

  computed: {
    ...mapState({
      direction: state => state.direction
    })
  },

  watch: {
    '$route' (to, from) {
      this.transitionName = this.direction === 'forward' ? 'slide-in' : 'slide-out'
    }
  }
}
</script>

<style lang='scss'>
@import 'style/app';
@import 'style/tool';
#app {
  @include psa;
  height: 100%;
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rgb(246, 192, 61);
}

div.weui-tab {
  @include psa;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
