<template>
  <view-box body-padding-bottom="0" body-padding-top="0">
    <div class="pocket-wrap">
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
      </div>
      <ul class="trophies">
        <li class="trophy" v-for="(list, index) in lists" :key="index">
          <span class="coin-icon"></span>
          <span class="content">{{ list.content }}</span>
          <span class="value">+{{ list.value }}元</span>
        </li>
      </ul>
      <div class="grey-background">
        <div class="update-tip">截至2017年7月7日（数据每周更新一次）</div>
      </div>
    </div>
  </view-box>
</template>

<script>
import { ViewBox } from 'vux'
export default {
  name: 'pocket-wrap',

  data () {
    return {
      lists: [{
        content: '您通过参与活动获得特别学习金',
        value: 10
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

    toMyRedPocket () {
      this.$result.show({
        type: 'fail',
        text: '提交失败'
      })
    }
  }
}
</script>

<style lang="scss" scope>
@import '../style/tool';

.pocket-wrap {
  background: white url('../assets/bg1.png') no-repeat;
  background-size: 100% auto;
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
  }

  .trophies {
    margin-top: .35rem;

    .trophy {
      @include psr;
      height: .45rem;
      overflow: hidden;
      line-height: .45rem;
      text-align: left;
      padding-left: .4rem;
      padding-right: .1rem;
      border-bottom: .005rem solid rgb(230, 230, 230);

      &:last-child {
        border-bottom: none;
      }

      .coin-icon {
        @include psa;
        @include set-width-height(.22rem,
        .22rem);
        @include background('../assets/coin_ico.png');
        top: .1rem;
        left: .1rem;
      }

      .content {
        font-size: .14rem;
      }

      .value {
        float: right;
        font-size: .14rem;
        color: rgb(242, 90, 9);
      }
    }
  }

  .grey-background {
    @include set-width-height(100%,
    .92rem);
    background-color: rgb(250, 250, 250);
    overflow: hidden;

    .update-tip {
      font-size: .13rem;
      color: rgba(77, 77, 77, 0.7);
      margin-top: .085rem;
    }
  }
}
</style>
