<template>
  <view-box body-padding-bottom="0" body-padding-top="0">
    <div class="home">
      <router-view v-if="state !== 'NORMAL'"></router-view>
      <my-title type="title"></my-title>
      <div class="sub-title">理财学堂</div>
      <ul class="tips">
        <li class="tip" v-for="(tip, index) in tips" :key="index">
          <span class="sequence-number">{{ index + 1 }}</span>
          <p class="text">{{ tip }}</p>
        </li>
      </ul>
      <p v-if="state === 'NORMAL'" class="congratulation">恭喜您已完成学习，请输入信息领取红包</p>
      <div :style="`opacity:${state === 'NORMAL' ? 1 : 0}`" class="input-wrap">
        <transition name="bullet-up">
          <div v-show="!phoneValid" class="phone-warning">
            {{ phone ? '您输入的手机号码格式错误!' : '手机号不能为空!'}}
          </div>
        </transition>
        <input class="input" type="text" v-model="phone" @blur="handleBlur('phone')" placeholder="请输入手机号">
        <input class="input" type="text" v-model="idCard" placeholder="请输入身份证号" @blur="handleBlur('idCard')">
        <transition name="bullet-down">
          <div v-show="!idCardValid" class="idCard-warning">
            {{ idCard ? '您输入的身份证号格式错误!' : '身份证不能为空!'}}
          </div>
        </transition>
      </div>
      <button :style="`opacity:${state === 'NORMAL' ? 1 : 0}`" class="submit" @click="submit">领取红包</button>
      <div class="rule-tip">
        <div class="left-item"></div>
        <div class="text">查看活动规则</div>
        <div class="right-item"></div>
      </div>
      <div class="arrow" @click="showRule">
        <img src="../assets/arrow.png" alt="">
      </div>
      <div class="transitoin-wrap">
        <rule :visible="ruleVisible" @close="closeRule" parent="home"></rule>
      </div>
    </div>
  </view-box>
</template>

<script>
import { ViewBox } from 'vux'
import Rule from '@/components/rule'
import MyTitle from '@/components/title'
import api from '@/api/api'
import { mapState } from 'vuex'

export default {
  name: 'home',

  components: {
    ViewBox,
    Rule,
    MyTitle
  },

  computed: {
    ...mapState({
      from: state => state.fromUser.fromBroswerId,
      openId: state => state.user.openId,
      trophies: state => state.trophies.filter((item, index) => {
        return item.trophyDisplayName !== '谢谢参与'
      }),
      isPlaied: state => state.activityState.playerTotalTimes,
      state: state => state.activityState.state
    })
  },

  created () {
    if (this.isPlaied) {
      this.$router.push('/award')
    }
  },

  data () {
    return {
      tips: ['购买货币基金不等于银行存款，谨慎投资。', '基金风险由低到高为货币型、债券型、混合型、股票型。', '交易日15点前购买货币基金T+1日计算收益；15点后购买T+2计算收益', '南方版-薪金煲功能：支持ATM、柜台转账及取现、手机银行转账、网银转账、POS消费、支付宝或微信支付、基金定投扣款，信用卡、贷款还款等多种场景下，薪金煲自动赎回用于所需资金。'],
      phone: '',
      phoneValid: true,
      phongeReg: /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/,
      idCard: '',
      idCardValid: true,
      idCardReg: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
      status: '',
      ruleVisible: false
    }
  },

  methods: {
    handleBlur (type) {
      const next = this.validate(type, (value, reg) => {
        const valid = reg.test(value)
        if (type === 'phone') {
          valid && (this.phoneValid = true)
          !valid && (this.phoneValid = false)
        } else if (type === 'idCard') {
          valid && (this.idCardValid = true)
          !valid && (this.idCardValid = false)
        }
        return valid
      })
      return type === 'phone' ? next(this.phongeReg) : next(this.idCardReg)
    },

    validate (type, fn) {
      return (reg) => {
        let value = type === 'phone' ? this.phone : this.idCard
        return fn && fn(value, reg)
      }
    },

    submit () {
      this.handleBlur('phone')
      this.handleBlur('idCard')
      if (this.phoneValid && this.idCardValid) {
        let data = {
          authKey: this.$store.getters.getUserInformation.openId,
          phone: this.phone,
          idNo: this.idCard
        }
        this.from && (data.from = this.from)
        this.$http.post(api.draw, data).then((res) => {
          this.$result.show({
            type: 'success',
            text: '提交成功'
          }).then(() => {
            this.$router.push('/award')
          })
        }).catch((err) => {
          console.log(err)
          this.$result.show({
            type: 'fail',
            text: '提交失败'
          })
        })
      } else {

      }
    },

    showRule () {
      this.ruleVisible = true
      setTimeout(() => {
        let h = document.querySelector('.home').scrollHeight - (screen.availHeight + 100)
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

.home {
  @include psa;
  background: url('../assets/bg2.png') no-repeat;
  background-size: 100% auto;
  width: 100%;
  z-index: 100;
  overflow: hidden;

  .rule-transition-wrap {
    overflow: hidden;
    width: 100%;
  }

  .sub-title {
    @include psr;
    font-size: .16rem;
    color: $base-color;

    &:before {
      @include psa;
      top: .08rem;
      content: '';
      display: block;
      width: .75rem;
      border: .005rem solid $base-color;
      left: .7rem;
    }

    &:after {
      @include psa;
      top: .08rem;
      content: '';
      display: block;
      width: .75rem;
      border: .005rem solid $base-color;
      right: .7rem;
    }
  }

  .congratulation {
    text-indent: .2rem;
    text-align: center;
    font-size: .12rem;
    width: 100%;
    color: #a90000;
    position: absolute;
    top: 3.62rem;
  }

  .tips {
    margin: 0.05rem auto 0.3rem auto;
    height: 1.65rem;
    width: 3.35rem;
    border: 1px solid $base-color;
    padding: .08rem .07rem;
    border-radius: .1rem;

    .tip {
      @include psr;
      font-size: .115rem;
      text-align: left;
      white-space: nowrap;

      .sequence-number {
        @include psa;
        @include set-width-height(.13rem,
        .13rem);
        top: 0.03rem;
        left: 0;
        line-height: .15rem;
        text-align: center;
        display: inline-block;
        color: white;
        border-radius: 50%;
        background-color: #f35c0b;
      }

      .text {
        padding-left: .18rem;
        display: inline-block;
        line-height: .19rem;
        text-align: left;
        white-space: normal;
        color: $base-color;
      }
    }
  }

  .input-wrap {
    @include psr;
    margin-top: .2rem;

    .input {
      @include set-width-height(2.8rem,
      .42rem);
      margin-top: .1rem;
      line-height: .42rem;
      text-align: center;
      font-size: .15rem;
      color: $base-color;
      border: 1.5px solid rgb(233, 41, 0);
      border-radius: .05rem;
    }

    %warning {
      @include psa;
      color: rgb(254, 39, 17);
      font-size: .12rem;
    }

    .phone-warning {
      @extend %warning;
      top: -.1rem;
      left: .5rem;
      ;
    }

    .idCard-warning {
      @extend %warning;
      bottom: -.2rem;
      left: .5rem;
    }
  }

  .submit {
    @include set-width-height(3.35rem,
    .42rem);
    margin-top: .25rem;
    background-color: rgb(242, 90, 9);
    border-radius: .05rem;
    font-size: .23rem;
    color: white;
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
        @include set-width-height(.05rem,
        .05rem);
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
    @include set-width-height(.13rem,
    .13rem);
    margin: .05rem auto;

    img {
      @include set-width-height(100%,
      100%);
    }
  }

  .bullet-up-enter-active,
  .bullet-up-leave-active {
    transition: transform .3s ease, opacity .3s ease;
    opacity: 1;
    transform: translateY(0);
  }

  .bullet-up-enter,
  .bullet-up-leave-to {
    opacity: 0;
    transform: translateY(-50%);
  }

  .bullet-down-enter-active,
  .bullet-down-leave-active {
    transition: transform .3s ease, opacity .3s ease;
    opacity: 1;
    transform: translateY(0);
  }

  .bullet-down-enter,
  .bullet-down-leave-to {
    opacity: 0;
    transform: translateY(50%);
  }
}
</style>
