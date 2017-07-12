<template>
  <view-box body-padding-bottom="0" body-padding-top="0">
    <div class="award-wrap">
      <div class="pocket">
        <div class="up">
          <span class="unit">￥</span>
          <span class="count">10.00</span>
        </div>
        <div class="text">特别学习金</div>
      </div>
      <div class="tip">学习金将于活动结束后15个工作日以内发放到客户的南方版-薪金煲账户中，请确保已签约的南方版-薪金煲账户有效。如还未签约南方版-薪金煲账户，请点击下方按钮马上签约以便红包正常发放。</div>
      <div class="button-wrap">
        <button class="sign" @click="toSign">马上签约</button>
        <button class="button-share" @click="toShare">分享好友</button>
      </div>
      <div class="share-tip">
        <div class="up">分享好友学习理财知识，成功注册即可获得5元学习金</div>
        <div class="down">最高可得<span class="red">300</span>元哦！</div>
      </div>
    </div>
  </view-box>
</template>

<script>
import { ViewBox } from 'vux'
export default {
  name: 'award-wrap',

  data () {
    return {
      lists: [{
        content: '您通过参与活动获得特别学习金',
        value: 10
      }, {
        content: 'XXX通过您的专属链接参与活动',
        value: 5
      }, {
        content: 'XXX通过您的专属链接参与活动',
        value: 5
      }]
    }
  },

  components: {
    ViewBox
  },

  methods: {
    toSign () {
      this.$result.show({
        type: 'success',
        text: '提交成功'
      })
    },

    toShare () {
      this.$router.push('/share')
    }
  }
}
</script>

<style lang="scss" scope>
@import '../style/tool';

.award-wrap {
  background: rgb(246, 191, 60) url('../assets/bg3.png') no-repeat;
  background-size: 100% auto;
  height: 100%;
  overflow: hidden;

  .pocket {
    @include set-width-height(2.8rem,
    2.2rem);
    @include background('../assets/redbag_img2.png');
    margin: 0 auto;
    overflow: hidden;
    color: rgb(250, 95, 13);

    .up {
      margin-top: .8rem;

      .unit {
        font-size: .1rem;
      }

      .count {
        font-size: .24rem;
        font-weight: bolder;
      }
    }

    .text {
      margin-top: .03rem;
      font-size: .16rem;
      font-weight: bolder;
    }
  }

  .tip {
    margin: 0 .25rem;
    padding: .12rem;
    border: .005rem solid $base-color;
    border-radius: .05rem;
    font-size: .13rem;
    text-align: left;
    text-indent: 2em;
    color: $base-color;
  }

  .button-wrap {
    margin: .1rem auto;
    
    .sign {
      @include set-width-height(3.35rem,
      .42rem);
      border-radius: .05rem;
      font-size: .23rem;
      background-color: rgb(242, 90, 9);
      color: white;
    }

    .button-share {
      @extend .sign;
      margin-top: .2rem;
    }
  }

  .share-tip {
    margin-top: .12rem;
    color: rgba(175, 40, 10, 0.91);

    .up {
      font-size: .12rem;
      line-height: .24rem;
    }

    .down {
      font-size: .18rem;
      line-height: .24rem;
      font-weight: 900;

      .red {
        color: rgba(254, 27, 27, 0.91);
      }
    }
  }
}
</style>
