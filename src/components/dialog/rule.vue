<template>
  <div class="rule">
    <x-dialog v-model="visible">
    <div class="close" @click="handleClick"></div>
    <div class="rule-dialog">
      <div class="head"></div>
      <div class="content">
        <p v-for="(content, index) in contents">{{ content }}</p>
      </div>
    </div>
  </x-dialog>
  </div>
</template>

<script>
import { XDialog } from 'vux'
export default {
  name: 'rule-dialog',

  components: {
    XDialog
  },

  props: {
    visible: Boolean
  },

  data () {
    return {
      contents: [
        '1、活动时间：2017.6.9-6.30',
        '2、只需点击选中的金蛋，即可砸蛋抽奖。每日可参与一次抽奖。',
        '3、手机流量和手机话费将发放至兑奖时输入的手机账号，敬请留意短信通知。话费奖品不能发放至非移动/电信手机号码，请输入正确的移动/电信号码。',
        '4、iPhone7实物大奖通过邮寄发放，领奖请确保填写正确的手机号码，将有专人进行联系。',
        '5、用户需在活动时间内提交领奖信息，如因未及时填写个人信息或填写有误，则视为自动放弃资格，主办方不承担责任。',
        '6、一切有违活动规则的欺诈行为视为无效中奖。',
        '7、活动奖品将在活动结束后一周内发放至手机账号，请注意查看。'
      ]
    }
  },

  methods: {
    handleClick () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scope>
@import '../../style/tool';

.rule {
  .weui-dialog {
    overflow: visible;
    width: auto;
  }

  .close {
    @include psa;
    @include background('../../assets/error_ico_2.png');
    top: -.55rem;
    right: 0;
    width: .25rem;
    height: .25rem;
  }

  .rule-dialog {
    @include psr;
    width: 3.33rem;
    padding: .2rem;

    .head {
      @extend %horizontal-center;
      @include background('../../assets/dialogHeadImg/rule_head.png');
      top: -.4rem;
      width: 100%;
      height: .4rem;
    }

    .content {
      font-size: .18rem;
      text-align: left;

      p {
        margin-top: .05rem;
      }
    }
  }
}
</style>
