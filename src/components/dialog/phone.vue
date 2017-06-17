<template>
  <x-dialog v-model="visible">
    <div class="phone-dialog">
      <div class="close"></div>
      <p class="tip">请输入正实有效的手机号码</p>
      <x-input class="phone-input" 
        v-model="phone"
        text-align="center"
        is-type="china-mobile"
        placeholder="请输入手机号"
        placeholder-align="center"
        ref="input"></x-input>
      <button class="button" :class="{'disabeld': disabeld}" @click="handleClick">确定领取</button>
    </div>
  </x-dialog>
</template>

<script>
import { XDialog, XInput } from 'vux'
import api from '@/api/api'
export default {
  name: 'phone-dialog',

  components: {
    XDialog,
    XInput
  },

  props: {
    visible: Boolean,
    trophyData: Object
  },

  data () {
    return {
      phone: '',
      valid: false
    }
  },

  computed: {
    disabeld () {
      return !(this.phone && this.$refs.input.valid)
    }
  },

  methods: {
    handleClick () {
      if (this.phone.match(/^(?:13[0-2]|145|15[56]|176|18[56])\d{8}$/) && this.trophyData.trophyDisplayName === '手机话费') {
        this.$info.show({
          content: [
            '话费将发放至填写的手机号中，请留意短信。非移动/电信号码可能无法收到奖品，请点击财富号首页“联系商家”联系解决。'
          ]
        })
      } else if (this.phone && this.$refs.input.valid) {
        this.$http.post(api.exchange, {
          phone: this.phone,
          authKey: this.$store.getters.getUserInformation.openId
        }).then((res) => {
          this.$emit('close', this.phone)
        })
      }
    }
  }
}
</script>

<style lang="scss" scope>
@import '../../style/tool';

.weui-cell:before {
  content: '';
  border-top: none !important;
}

.phone-dialog{
  padding: .1rem;

  .tip {
    margin-top: .3rem;
    margin-bottom: .15rem;
    font-size: 0.18rem;
  }

  .phone-input {
    font-size: .16rem;
    background-color: #fcedff;
    margin-bottom: .45rem;
  }

  .button {
    @include button;
    transition: all ease .5s;

    &.disabeld {
      color: #aaa;
      background-color: #A000A0;
    }
  }
}
</style>
