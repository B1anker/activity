<template>
  <view-box body-padding-bottom="0" body-padding-top="0">
    <div class="share">
      <my-title type="share-title"></my-title>
      <div class="scan-tip">
        <p>请通过微信扫描二维码功能扫描</p>
      </div>
      <div class="scan-code">
        <img :src="url" alt="">
        <div class="share-to-friends">马上分享给好友</div>
      </div>
      <div class="share-tip">
        邀请一人完成理财知识学习以及风险测评后送5元，被邀请者完成理财知识学习和风险测评后可获10元。
      </div>
      <div class="button-wrap">
        <button class="sign" @click="toSign">马上签约</button>
        <button class="red-bag" @click="toMyRedPocket">我的红包</button>
      </div>
      <div class="rule-tip">
        <div class="left-item"></div>
        <div class="text">查看活动规则</div>
        <div class="right-item"></div>
      </div>
      <div class="arrow" @click="showRule">
        <img src="../assets/arrow.png" alt="">
      </div>
      <div class="transitoin-wrap">
        <rule :visible="ruleVisible" @close="closeRule" parent="share"></rule>
      </div>
    </div>
  </view-box>
</template>

<script>
import Rule from '@/components/rule'
import MyTitle from '@/components/title'
import config from '@/utils/config'
import { ViewBox } from 'vux'

export default {
  name: 'share',

  data () {
    return {
      url: '',
      ruleVisible: false
    }
  },

  mounted () {
    this.url = `http://qdollar.cn/activity-engine/bitmatrix?url=http://qdollar.cn/${config.activity.id}/dist/index.html?fromBroswerId=${config.broswerId}`
  },

  components: {
    Rule,
    MyTitle,
    ViewBox
  },

  methods: {
    toSign () {

    },

    toMyRedPocket () {
      this.$router.push('pocket')
    },

    showRule () {
      this.ruleVisible = true
      setTimeout(() => {
        let h = document.querySelector('.share').scrollHeight - (screen.availHeight + 130)
        let unit = Math.ceil(h / 60)
        let current = 0
        let timer = null
        timer = setInterval(() => {
          if (current > 60) {
            clearInterval(timer)
            timer = null
          }
          window.scrollTo(0, unit * current++)
        }, 300 / 60)
      }, 400)
    },

    closeRule () {
      this.ruleVisible = false
    }
  }
}
</script>

<style lang="scss" scope>
@import '../style/tool';

.transitoin-wrap {
  background-color: rgb(253, 247, 225);
  overflow: hidden;
}

.share {
  @include psa;
  background: url('../assets/bg2.png') no-repeat;
  background-size: 100% auto;
  width: 100%;
  z-index: 100;
  overflow: hidden;

  .scan-tip {
    font-size: .12rem;
    font-weight: 600;
    margin: .05rem 0;
    color: $base-color;

    img {
      @include set-width-height(.215rem, .065rem);
      margin: 0 .03rem;
    }
  }

  .scan-code {
    @include set-width-height(3.24rem, 2.67rem);
    @include background('../assets/redbag_img1.png');
    @include psr;
    margin: 0 auto;

    img {
      @include set-width-height(1.2rem, 1.2rem);
      @include psa;
      top: .25rem;
      left: .95rem;
    }

    .share-to-friends {
      @include psa;
      font-size: .18rem;
      color: white;
      width: 100%;
      top: 2.1rem;
    }
  }

  .share-tip {
    margin: 0.1rem .255rem 0 .255rem;
    padding: .05rem .14rem;
    font-size: .12rem;
    line-height: .16rem;
    border-top: .005rem solid $base-color;
    border-bottom: .005rem solid $base-color;
    color: $base-color;
  }

  .button-wrap {
    margin: .1rem auto;
    display: flex;
    justify-content: space-around;

    %button-common {
      @include set-width-height(1.575rem, .42rem);
      border-radius: .21rem;
      font-size: .23rem;
    }

    .sign {
      @extend %button-common;
      background-color: rgb(242, 90, 9);
      color: white;
    }

    .red-bag {
      @extend %button-common;
      background: transparent;
      border: .005rem solid $base-color;
      color: $base-color;
    }
  }

  .rule-tip {
    @include psr;
    margin-top: .13rem;
    font-size: .115rem;
    color: $base-color;

    %item {
      @include psa;
      width: 1.08rem;
      border: .005rem solid $base-color;
      top: .05rem;

      &:before {
        @include psa;
        @include set-width-height(.05rem, .05rem);
        border-radius: 50%;
        content: '';
        background-color: $base-color;
        top: -.02rem;
      }
    }

    .left-item {
      @extend %item;
      left: .2rem;

      &:before {
        right: -.02rem;
      }
    }

    .right-item {
      @extend %item;
      right: .2rem;

      &:before {
        left: -.02rem;
      }
    }
  }

  .arrow {
    @include set-width-height(.13rem, .13rem);
    margin: .05rem auto;

    img {
      @include set-width-height(100%, 100%);
    }
  }
}
</style>
