<template>
  <x-dialog v-model="visible">
    <div class="award-dialog">
      <div class="congratulation">恭喜您抽中</div>
      <div class="trophy-wrap" v-if="trophyData && trophyData.trophyDisplayName === 'iphone7'">
        <div class="iphone7">
          <div class="iphone7-text">iPhone7超级大奖</div>
          <img src="../../assets/game/iphone7.png" alt="">
        </div>
      </div>
      <div class="trophy-wrap" v-if="trophyData && trophyData.trophyDisplayName === '手机话费'">
        <div class="charge">
          <div class="content">
              <div class="worth-wrap">
                <span class="worth">{{ trophyData.trophyWorth }}</span>
                <span class="unit">元</span>
              </div>
              <p class="type">手机话费</p>
            </div>
          <img src="../../assets/game/recharge.png" alt="">
        </div>
      </div>
      <div class="trophy-wrap" v-if="trophyData && trophyData.trophyDisplayName === '手机流量10元'">
        <div class="flow">
          <div class="content">
              <div class="worth-wrap">
                <span class="worth">70-100</span>
                <span class="unit">M</span>
              </div>
              <p class="type">手机流量</p>
            </div>
          <img src="../../assets/game/recharge.png" alt="">
        </div>
      </div>
      <div class="trophy-wrap" v-if="trophyData && trophyData.trophyDisplayName === '谢谢参与'">
        <div class="thank">
          <div class="content">
            <p>很遗憾，这次没有中奖。<br />明天再来吧！<br />话费、流量、iPhone7等您来！</p>
          </div>
        </div>
      </div>
      <div class="button" @click="handleClose(trophyData.trophyDisplayName)">{{trophyData.trophyDisplayName === '谢谢参与' ? '我知道了' : '立即领取'}}</div>
    </div>
  </x-dialog>
</template>

<script>
import { XDialog } from 'vux'

export default {
  name: 'award',

  props: {
    visible: Boolean,
    trophyData: Object
  },

  components: {
    XDialog
  },

  data () {
    return {

    }
  },

  methods: {
    handleClose (type) {
      this.$emit('close', type)
    }
  }
}
</script>

<style lang="scss" scope>
@import '../../style/tool';

.award-dialog {
  padding: .1rem;
  overflow: hidden;

  .congratulation {
    margin-top: .1rem;
    font-size: .18rem;
  }

  .trophy-wrap {

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

    %virtual {
      img {
        @include set-width-height(2.32rem, 2.385rem);
        transform: translateX(.15rem);
        margin-top: -.2rem;
      }

      .button {
        margin-top: .1rem;
      }
    }

    .charge {
      @include psr;
      @extend %virtual;
      overflow: hidden;

      .content {
        @extend %horizontal-center;
        top: .3rem;
        z-index: 99;
        color: white;

        .worth-wrap {
          white-space: nowrap;
          text-indent: .1rem;

          .worth {
            font-size: .7rem;
            font-weight: bolder;
          }

          .unit {
            font-size: 0.12rem;
          }
        }

        .type {
          @extend %horizontal-center;
          top: .7rem;
          font-size: 0.12rem;
        }
      }
    }

    .flow {
      @extend %virtual;

      .content {
        @extend %horizontal-center;
        top: .7rem;
        z-index: 99;
        color: white;

        .worth-wrap {
          margin-top: .2rem;
          white-space: nowrap;

          .worth {
            font-size: .25rem;
            font-weight: bolder;
          }

          .unit {
            font-size: 0.12rem;
          }
        }

        .type {
          @extend %horizontal-center;
          top: .6rem;
          font-size: 0.12rem;
        }
      }
    }

    .thank {
      .content {
        padding: .2rem 0;
        line-height: .3rem;
        font-size: .2rem;
      }
    }
  }

  .button {
    @include button;
  }
}
</style>
