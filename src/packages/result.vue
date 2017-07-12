<template>
  <x-dialog v-model="visible">
    <div class="result">
      <img v-if="type === 'success'" src="../assets/icon-suc.png" alt="">
      <img v-if="type === 'fail'" src="../assets/icon_ero.png" alt="">
      <div class="text">{{ text }}</div>
    </div>
  </x-dialog>
</template>

<script>
import { XDialog } from 'vux'

export default {
  name: 'result',

  props: {
    type: {
      type: String,
      default: 'success'
    },
    text: String
  },

  data () {
    return {
      visible: false
    }
  },

  components: {
    XDialog
  },

  mounted () {
    setTimeout(() => {
      this.visible = false
    }, 1000)
  },

  watch: {
    async visible (newVal) {
      await new Promise((resolve, reject) => {
        if (newVal) {
          setTimeout(() => {
            this.visible = false
            resolve(this.visible)
          }, 1000)
        }
      })
      return newVal
    }
  }
}
</script>

<style lang="scss" scope>
@import '../style/tool';

div.weui-dialog {
  border-radius: .04rem;
  width: auto;
}

.result {
  @include set-width-height(1.75rem, 1.46rem);

  img {
    @include set-width-height(.63rem, .63rem);
    margin-top: .205rem;
    margin-bottom: .18rem;
  }

  .text {
    font-size: .24rem;
    color: rgb(242, 90, 9);
  }
}
</style>
