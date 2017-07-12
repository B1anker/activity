<template>
  <div class="state">
    <div class="content">
      <div class="text">
        <p v-if="state === 'BEFORE'">您来早了，活动还没开始哦~</p>
        <p v-if="state === 'PAUSE'">活动升级中，等等再来哦~</p>
        <p v-if="state === 'END'">您来晚了，活动已经结束了~</p>
        <p>请继续关注南方基金！</p>
        <p>更多精彩活动及投资快讯哦！</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'state',

  computed: {
    ...mapState({
      state: state => state.activityState.state
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../style/tool';

.state {
  @include psf;
  @include set-width-height(100%, 100%);
  z-index: 1000;

  .content {
    @extend %horizontal-center;
    @include set-width-height(3.25rem, 1.17rem);
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: white;
    background-clip: padding-box;
    border: .05rem solid rgb(253, 254, 218);
    border-radius: .1rem;
    bottom: 1rem;
    z-index: 10000;

    .text {
      font-size: .14rem;
      font-weight: 900;
      color: rgb(216, 80, 8);

      p {
        white-space: nowrap;
        text-align: left;
        line-height: .19rem;
      }
    }

    .qr-code {
      @include set-width-height(1.015rem, 1.015rem);
    }
  }
}
</style>
