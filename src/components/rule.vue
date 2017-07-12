<template>
  <transition name="roll">
    <ul class="rule-wrap" v-show="visible">
      <div class="img-wrap">
        <img src="../assets/rule_title.png" alt="">
      </div>
      <li class="rule-item">
        <span class="sequence-number">1</span>
        <p class="text">活动时间：
          <span class="bold">2017年7月17日～2017年7月31日。</span>
        </p>
      </li>
      <li class="rule-item">
        <span class="sequence-number">2</span>
        <p class="text">活动期间，客户进入中信银行手机APP活动页面学习理财知识便有机会获得1元普通学习金。</p>
      </li>
      <li class="rule-item">
        <span class="sequence-number">3</span>
        <p class="text">邀请者通过专属链接邀请未注册中信银行手机APP的被邀请者学习理财。被邀请者学习理财知识成功注册中信银行手机APP则可获得10元特别学习金，完成后邀请者也可获得5元特别学习金，活动名额有限，先到先得。</p>
      </li>
      <li class="rule-item">
        <span class="sequence-number">4</span>
        <p class="text">邀请者可最多获得60次邀请学习奖励，即300特别学习金，且最多获得1次普通学习金（共10000名，活动结束后抽取）。</p>
      </li>
      <li class="rule-item">
        <span class="sequence-number">5</span>
        <p class="text">被邀请的客户需通过专属链接（二维码）学习理财知识（其他方式无效）、用手机号注册登陆中信银行手机APP并签约南方版-薪金煲可有效。</p>
      </li>
      <li class="rule-item">
        <span class="sequence-number">6</span>
        <p class="text">邀请者需为已注册中信银行手机APP并签约南方版-薪金煲的客户。</p>
      </li>
      <li class="rule-item">
        <span class="sequence-number">7</span>
        <p class="text">学习金为等值货币基金（可取现），南方基金将于活动结束后15个工作日以内发放到客户的南方版-薪金煲账户中，被邀请者和邀请者请确保已签约的南方版-薪金煲账户中至少持有0.01元以上的份额。</p>
      </li>
      <li class="rule-item">
        <span class="sequence-number">8</span>
        <p class="text">如果发现客户恶意作弊，南方基金有权利取消其获奖资格。</p>
      </li>
      <div class="arrow" @click="closeRule">
        <img src="../assets/arrow.png" alt="">
      </div>
    </ul>
  </transition>
</template>

<script>
export default {
  name: 'rule',

  props: {
    visible: Boolean,
    parent: String
  },

  methods: {
    closeRule () {
      let h = document.querySelector('.' + this.parent).scrollHeight - screen.availHeight
      let unit = Math.ceil(h / 60)
      let current = 0
      let timer = null
      timer = setInterval(() => {
        if (current > 60) {
          clearInterval(timer)
          this.$emit('close')
          timer = null
        }
        window.scrollTo(0, unit * (60 - current++))
      }, 300 / 60)
    }
  }
}
</script>

<style lang="scss" scope>
.roll-enter-active, .roll-leave-active {
  transition: all .5s;
  transform: translateY(0);
}

.roll-enter, .roll-leave-to {
  transform: translateY(-100%);
}


@import '../style/tool';

.rule-wrap {
  @include psr;
  padding: .2rem .1rem;
  margin: 0.45rem auto;
  width: 3.31rem;
  border: .005rem dashed rgb(236, 131, 46);
  border-radius: .05rem;
  z-index: 10;

  .img-wrap {
    @extend %horizontal-center;
    @include set-width-height(.9rem, .3rem);
    top: -.15rem;

    img {
      @include set-width-height(100%, 100%);
    }
  }

  .bold {
    font-weight: bolder;
  }

  .rule-item {
    @include psr;
    margin-top: .03rem;
    overflow: hidden;

    .sequence-number {
      @include psa;
      @include set-width-height(.16rem, .16rem);
      top: 0.02rem;
      left: 0;
      font-size: .12rem;
      line-height: .18rem;
      text-align: center;
      display: inline-block;
      color: white;
      border-radius: 50%;
      background-color: rgb(243, 92, 11);
    }

    .text {
      overflow: hidden;
      text-indent: .2rem;
      text-align: left;
      font-size: .14rem;
      line-height: .23rem;
      color: $base-color;
    }
  }

  .arrow {
    @include set-width-height(.13rem, .13rem);
    margin: .05rem auto;

    img {
      @include set-width-height(100%,100%);
      transform: rotateZ(180deg);
    }
  }
}
</style>
