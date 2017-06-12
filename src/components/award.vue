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
          <div class="button">点击领取</div>
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
          <div class="button">点击领取</div>
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
          <div class="button">点击领取</div>
        </div>
      </swiper-item>
    </swiper>
    <div v-else class="no-award">
      暂无奖品
    </div>
  </view-box>
</template>

<script>
import { ViewBox, Swiper, SwiperItem } from 'vux'
import { mapState } from 'vuex'
import draw from '@/business/draw'

export default {
  name: 'award-page',

  components: {
    ViewBox,
    Swiper,
    SwiperItem
  },

  computed: {
    ...mapState({
      trophies: state => state.trophies
    })
  },

  mounted () {
    draw('get').then((res) => {
      this.$store.dispatch('addTrophy', res.data.trophyItems)
    }).catch((err) => {
      console.log(err)
      this.$info({
        content: [
          '获取奖品数据失败'
        ]
      })
    })
  },

  data () {
    return {
    }
  },

  methods: {
    handleClose () {
      this.$router.push('/home')
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
          @extend %align-center;
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
            @extend %align-center;
            top: .7rem;
            font-size: 0.12rem;
          }
        }
      }

      .flow {
        @extend %virtual;

        .content {
          @extend %align-center;
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
            @extend %align-center;
            top: .7rem;
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
    }
  }

  .no-award {
    @extend %align-center;
    top: 3.5rem;
    font-size: .3rem;
    color: white;
  }
}
</style>
