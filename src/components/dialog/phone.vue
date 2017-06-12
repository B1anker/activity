<template>
  <x-dialog v-model="visible" class="phone-dialog">
    <div class="close"></div>
    <p class="tip">请输入正实有效的手机号码</p>
    <x-input title="title" v-model="phone"></x-input>
    <button class="button">确定领取</button>
  </x-dialog>
</template>

<script>
import { XDialog } from 'vux'
export default {
  name: 'phone-dialog',

  components: {
    XDialog
  },

  props: {
    visible: Boolean
  },

  data () {
    return {
      phone: ''
    }
  }
}
</script>

<style lang="scss" scope>
@import '../../style/tool';

.phone-dialog{
  .tip {
    font-size: 0.18rem;
  }

  .button {
    font: 0.18rem;
    color: white;
    background: $base-color;
  }
}
</style>
