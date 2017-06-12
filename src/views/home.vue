<template>
  <view-box ref="viewBox" class="home">
     <router-view></router-view>
   </view-box>
</template>

<script>
import { Radio, ViewBox } from 'vux'
import { mapState } from 'vuex'
import error from '@/business/error'
import api from '@/api/api'

export default {
  name: 'home',

  components: {
    Radio,
    ViewBox
  },

  computed: {
    ...mapState({
      id: state => state.user.id
    })
  },

  data () {
    return {
      options: ['China', 'Japan'],
      value: 'China'
    }
  },

  mounted () {
    this.$http.get(api.info, {
      params: {
        authKey: this.id
      }
    }).then((res) => {
      console.log(res)
      this.$store.dispatch('setUserInformation', {
        state: res.data
      })
      this.$router.push('/home/game')
    }).catch((err) => {
      error.call(this, err.response.data)
    })
  }
}
</script>

<style lang="scss" scope>
.home{
  background: rgb(121, 20, 162) url('../assets/index_bg.jpg') no-repeat;
  background-size: 100% auto;
}
</style>
