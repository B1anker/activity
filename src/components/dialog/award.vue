<template>
  <x-dialog v-model="visible" class="award-dialog">
    <div class="trophy-wrap">
      <div class="congratulation">恭喜您抽中</div>
      <div class="iphone7">
        <div class="iphone7-text">iPhone7超级大奖</div>
        <img src="../../assets/game/iphone7.png" alt="">
      </div>
      <div class="button" @click="handleClose">立即领取</div>
    </div>
  </x-dialog>
</template>

<script>
import { XDialog } from 'vux'

export default {
  name: 'award',

  props: {
    visible: Boolean,
    trophyType: String
  },

  components: {
    XDialog
  },

  data () {
    return {

    }
  },

  methods: {
    handleClose () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scope>
@import '../../style/tool';

.award-dialog {
  .trophy-wrap {
    padding: .1rem;

    .congratulation {
      font-size: .18rem;
    }

    .iphone7 {
      .iphone7-text {
        margin-top: .2rem;
        margin-bottom: .1rem;
        font-size: .18rem;
        color: red;
      }

      img {
        @include set-width-height(1.472rem, 1.624rem);
      }
    }

    .button {
      padding: .1rem;
      border-radius: .03rem;
      font-size: .18rem;
      color: white;
      background: $base-color;
    }
  }
}
</style>
