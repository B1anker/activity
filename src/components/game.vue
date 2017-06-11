<template>
  <div class="game">
    <div class="left-egg" @click="moveHammer"></div>
    <div class="center-egg" @click="moveHammer"></div>
    <div class="right-egg" @click="moveHammer"></div>
    <div class="hammer" :class="hammerMoveClass" ref="hammer"></div>
    <!--<info :visible="infoVisible" text="我知道了" @close="infoVisible = false">
      <p>领奖信息提交成功</p>
      <p>请留意您的短信通知</p>
    </info>-->
  </div>
</template>

<script>
import Vue from 'vue'
import { XDialog, TransferDomDirective as TransferDom } from 'vux'
// import Info from '@/packages/info'
import Info from '@/plugins/info'

import draw from '@/business/draw'

Vue.use(Info)
export default {
  name: 'game',

  directives: {
    TransferDom
  },

  components: {
    XDialog
  },

  data () {
    return {
      hammerMoveClass: {
        left: false,
        center: false,
        right: false,
        origin: true
      },
      drawDialogVisible: false,
      infoVisible: false
    }
  },

  computed: {
    current () {
      let result = ''
      Object.keys(this.hammerMoveClass).every((key, index) => {
        if (this.hammerMoveClass[key]) {
          result = key
          return false
        }
        return true
      })
      return result
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.setHammerEvent()
    })
  },

  methods: {
    setHammerEvent () {
      this.$refs.hammer.addEventListener('transitionend', (e) => {
        draw('post').then((res) => {

        }).catch((err) => {
          if (err.response.data.status_code === 'E0006') {
            this.$info.show({
              buttonText: '我知道了',
              content: [
                err.response.data.message
              ]
            })
          }
        })
      }, false)
    },

    setTrue (obj, target) {
      Object.keys(obj).forEach((key, index) => {
        obj[key] = key === target
      })
    },

    moveHammer (e) {
      switch (e.target.className) {
        case 'left-egg' :
          this.setTrue(this.hammerMoveClass, 'left')
          break
        case 'right-egg' :
          this.setTrue(this.hammerMoveClass, 'right')
          break
        case 'center-egg' :
          this.setTrue(this.hammerMoveClass, 'center')
          break
      }
    }
  }
}
</script>

<style lang="scss" scope>
@import '../style/tool';

@mixin egg-small {
  @include psa;
  top: 2.9rem;
  @include set-width-height(1.25rem, 1.67rem);
  @include background('../assets/game/egg_small.png');
}

.game {
  .left-egg {
    @include egg-small;
    left: 0;
  }

  .right-egg {
    @include egg-small;
    right: 0;
  }

  .center-egg {
    @extend %align-center;
    top: 3rem;
    @include set-width-height(1.54rem, 2.09rem);
    @include background('../assets/game/egg_big.png');
  }

  .hammer {
    @include psa;
    @include set-width-height(1.624rem, 1.56rem);
    @include background('../assets/game/hammer.png');
    transition: transform ease .3s;
    top: 1.8rem;
    left: 1.6rem;

    &.origin {
      transform: translate(0, 0);
    }

    &.left {
      transform: translate(-1.3rem, .8rem);
    }

    &.center {
      transform: translate(0, 1rem);
    }

    &.right {
      transform: translate(1.3rem, .8rem);
    }
  }
}
</style>
