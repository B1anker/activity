<template>
  <div class="error">
    <div class="tip">{{ tip }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'error',

  computed: {
    ...mapState({
      state: state => state.activityState.state
    }),

    tip () {
      console.log(this.state)
      switch (this.state) {
        case 'BEFORE':
          return '您来早了，活动还未开始'
        case 'END':
          return '您来晚了，活动已结束'
        case 'PAUSE':
          return '活动升级中'
        case 'NORMAL':
          this.$router.push('/home')
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scope>
@import '../style/tool';

.error {
  .tip {
    @include psa;
    @extend %horizontal-center;
    font-size: .17rem;
    color: white;
    bottom: 1.5rem;
    width: 90%;
    border-radius: .1rem;
    background: #b86cdd;
    padding: .1rem;
  }
}
</style>
