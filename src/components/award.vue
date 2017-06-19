<template>
  <view-box ref="viewBox" class="award-page">
    <div class="close" @click="handleClose"></div>
    <swiper v-if="trophies.length" class="trophies"
      :aspect-ratio="120/100"
      :show-desc-mask="false"
      :show-dots="false"
      :loop="false">
      <swiper-item class="trophy" v-for="(trophy, index) in trophies" :key="index">
        <div class="iphone7" v-if="trophy.trophyDisplayName === 'iphone7'">
          <p class="text">iPhone7</p>
          <img src="../assets/game/iphone7.png" alt="">
          <div class="button"
            v-if="trophy.itemStatus === 'DRAW'"
            @click="handleClick(index)">点击领取</div>
          <div v-else class="tips" v-html="trophy.tips"></div>
        </div>
        <div class="charge" v-if="trophy.trophyDisplayName === '手机话费'">
          <div class="content">
            <div class="worth-wrap">
              <span class="worth">{{ trophy.trophyWorth }}</span>
              <span class="unit">元</span>
            </div>
            <p class="type">手机话费</p>
          </div>
          <img src="../assets/game/recharge.png" alt="">
          <div class="button"
            v-if="trophy.itemStatus === 'DRAW'"
            @click="handleClick(index)">
            点击领取
          </div>
          <div v-else class="tips" v-html="trophy.tips"></div>
        </div>
        <div class="flow" v-if="trophy.trophyDisplayName === '手机流量10元'">
          <div class="content">
            <div class="worth-wrap">
              <span class="worth">70-100</span>
              <span class="unit">元</span>
            </div>
            <p class="type">手机流量</p>
          </div>
          <img src="../assets/game/recharge.png" alt="">
          <div class="button" 
            v-if="trophy.itemStatus === 'DRAW'"
            @click="handleClick(index)">
            点击领取
          </div>
          <div v-else class="tips" v-html="trophy.tips"></div>
        </div>
      </swiper-item>
    </swiper>
    <div v-else class="no-award">
      暂无奖品
    </div>
    <phone-dialog 
      :trophyData="trophyData" 
      :visible="phoneDialogVisible" 
      @close="finishExchange">
    </phone-dialog>
  </view-box>
</template>

<script>
import { ViewBox, Swiper, SwiperItem } from 'vux'
import { mapState } from 'vuex'
import PhoneDialog from '@/components/dialog/phone'
import draw from '@/business/draw'

export default {
  name: 'award-page',

  components: {
    ViewBox,
    Swiper,
    SwiperItem,
    PhoneDialog
  },

  computed: {
    ...mapState({
      trophies: state => state.trophies
    }),

    trophyData () {
      return this.trophies[this.index]
    }
  },

  mounted () {
    this.fetchTrophies()
  },

  data () {
    return {
      index: 0,
      phoneDialogVisible: false
    }
  },

  methods: {
    fetchTrophies () {
      draw('get').then((res) => {
        const trophyItems = res.data.trophyItems.filter((item, index) => {
          return item.trophyDisplayName !== '谢谢参与'
        }).map((item, index) => {
          item.tips = this.addTips(item.trophyDisplayName)
          return item
        })
        this.$store.dispatch('addTrophy', trophyItems)
      }).catch((err) => {
        console.log(err)
        this.$info({
          content: [
            '获取奖品数据失败'
          ]
        })
      })
    },

    handleClose () {
      this.$store.dispatch('setButtonVisible', {
        award: true,
        rule: true
      })
      this.$emit('close', 'award')
      this.$router.back()
    },

    handleClick (index) {
      this.index = index
      this.phoneDialogVisible = true
    },

    addTips (type) {
      switch (type) {
        case 'iphone7':
          return '请留意您的手机来电，<br />将有专人通知您来领取iPhone7'
        case '手机话费':
          return '话费将发放至填写的手机号中，请留意短信。非移动/电信号码可能无法收到奖品，请点击财富号首页“联系商家”联系解决。'
        case '手机流量10元':
          return '手机流量将发送至填写的手机账号中，<br />请留意您的短信通知。'
      }
    },

    finishExchange () {
      this.phoneDialogVisible = false
      this.fetchTrophies()
    }
  }
}
</script>

<style lang="scss" scope>
@import '../style/tool';

div.weui-tab__panel {
  padding-bottom: 0;
  overflow: hidden;
}

.award-page {
  background: rgb(121, 20, 162) url('../assets/award_bg.jpg') no-repeat;
  background-size: 100% auto;

  .close {
    @include psa;
    @include background('../assets/error_ico_2.png');
    top: .2rem;
    right: .2rem;
    width: .25rem;
    height: .25rem;
  }

  .trophies {
    position: relative;
    top: 2.3rem;

    .trophy {

      .iphone7 {
        padding-top: .2rem;

        .text {
          font-size: 0.3rem;
          font-weight: 500;
          color: white;
        }

        img {
          @include set-width-height(1.472rem, 1.624rem);
        }
      }

      %virtual {
        padding-top: .2rem;

        img {
          @include set-width-height(2.32rem, 2.385rem);
          transform: translateX(.15rem);
        }

        .button {
          margin-top: .1rem;
        }
      }

      .charge {
        @include psr;
        @extend %virtual;

        .content {
          @extend %horizontal-center;
          top: .7rem;
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

      .button {
        @include set-width-height(1.03rem, .405rem);
        @include background('../assets/button/get_btn.png');
        margin: .5rem auto 0 auto;
        transform: scale(1.6);
      }

      .tips {
        margin: 0 auto;
        padding: .1rem;
        width: 3.2rem;
        font-size: .17rem;
        color: white;
        border-radius: .1rem;
        background-color: #b86cdd;
      }
    }
  }

  .no-award {
    @extend %horizontal-center;
    top: 3.5rem;
    font-size: .3rem;
    color: white;
  }
}
</style>
