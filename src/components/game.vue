<template>
  <div class="game">
    <div class="left-egg" @click="moveHammer"></div>
    <div class="center-egg" @click="moveHammer"></div>
    <div class="right-egg" @click="moveHammer"></div>
    <div class="hammer" :class="hammerMoveClass" ref="hammer"></div>
    <div class="times">
      <p>今天您还有<span>{{ times }}</span>次砸蛋机会</p>
    </div>
    <x-dialog v-model="crackVisible">
      <div class="crack" ref="crack">
      </div>
    </x-dialog>
    <award-dialog :visible="awardDialogVisible"
      :trophyData="trophyData"
      @close="closeAwardDialog">
    </award-dialog>
    <phone-dialog :visible="phoneDialogVisible"
      @close="closePhoneDialog"
      :trophyData="trophyData">
    </phone-dialog>
  </div>
</template>

<script>
import { XDialog, TransferDomDirective as TransferDom } from 'vux'
import AwardDialog from '@/components/dialog/award'
import PhoneDialog from '@/components/dialog/phone'
import draw from '@/business/draw'
import { mapState } from 'vuex'

export default {
  name: 'game',

  directives: {
    TransferDom
  },

  components: {
    XDialog,
    AwardDialog,
    PhoneDialog
  },

  data () {
    return {
      hammerMoveClass: {
        left: false,
        center: false,
        right: false,
        origin: true
      },
      crackVisible: false,
      awardDialogVisible: false,
      phoneDialogVisible: false,
      trophyData: {}
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
    },

    ...mapState({
      times: state => state.activityState.gameDayTimesLimit - state.activityState.playerDayTimes
    })
  },

  mounted () {
  },

  methods: {
    setHammerEvent () {
      this.$refs.hammer.removeEventListener('transitionend', this.setHammerEvent, false)
      this.crackVisible = true
      this.changeBackgroundPosition().then(() => {
        this.handleDraw()
      })
    },

    changeBackgroundPosition () {
      return new Promise((resolve, reject) => {
        const times = 18
        let current = 0
        const timer = setInterval(() => {
          current++
          if (current >= times - 1) {
            resolve()
            clearInterval(timer)
          }
          this.$refs.crack.style.backgroundPosition = `-${(current * 2.83 + 'rem')} 0`
        }, 100)
      })
    },

    handleDraw () {
      draw('post').then((res) => {
        this.trophyData = res.data.trophyItems[0]
        this.awardDialogVisible = true
      }).catch((err) => {
        this.$info.show({
          buttonText: '我知道了',
          content: [
            err.response.data.message
          ]
        }).then(() => {
          this.crackVisible = false
          this.setTrue(this.hammerMoveClass, 'origin')
        })
      })
    },

    setTrue (obj, target) {
      Object.keys(obj).forEach((key, index) => {
        obj[key] = key === target
      })
    },

    moveHammer (e) {
      this.$refs.hammer.addEventListener('transitionend', this.setHammerEvent, false)
      switch ((e && e.target && e.target.className) || '') {
        case 'left-egg' :
          this.setTrue(this.hammerMoveClass, 'left')
          break
        case 'right-egg' :
          this.setTrue(this.hammerMoveClass, 'right')
          break
        case 'center-egg' :
          this.setTrue(this.hammerMoveClass, 'center')
          break
        default:
          this.setTrue(this.hammerMoveClass, 'origin')
          break
      }
    },

    closeAwardDialog (params) {
      this.awardDialogVisible = false
      if (params !== '谢谢参与') {
        this.phoneDialogVisible = true
      }
      this.setTrue(this.hammerMoveClass, 'origin')
    },

    closePhoneDialog (params) {
      this.phoneDialogVisible = false
      this.$emit('close', 'game')
      this.$store.dispatch('setButtonVisible', {
        award: false,
        rule: false
      })
      this.$router.push('award')
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
    @extend %horizontal-center;
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

  .times {
    @extend %horizontal-center;
    top: 4.9rem;
    color: white;

    p {
      color: rgba(255, 255, 255, .8);
      font-size: .2rem;
    }

    span {
      color: rgb(255, 244, 47);
      font-weight: 500;
      margin: 0 .05rem;
      font-size: .28rem;
    }
  }

  .weui-dialog {
    background-color: transparent;
  }

  .crack {
    margin: 0 auto;
    width: 2.8325rem;
    height: 3.82rem;
    background: url('../assets/game/crack.png');
    background-color: transparent;
    background-size: 1800% 100%;
  }
}
</style>
