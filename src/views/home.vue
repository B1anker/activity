<template>
  <view-box ref="viewBox" class="home">
     <router-view @close="changeRouter"></router-view>
     <div v-if="awardBtnVisible" class="award-btn" @click="toAward"></div>
     <div v-if="ruleBtnVisible" class="rule-btn" @click="showRule"></div>
     <rule-dialog :visible="ruleDialogVisble" @close="closeRule"></rule-dialog>
  </view-box>
</template>

<script>
import RuleDialog from '@/components/dialog/rule'
import { Radio, ViewBox } from 'vux'
import { mapState } from 'vuex'
import error from '@/business/error'
import api from '@/api/api'

export default {
  name: 'home',

  components: {
    Radio,
    ViewBox,
    RuleDialog
  },

  computed: {
    ...mapState({
      openId: state => state.user.openId,
      awardBtnVisible: state => state.buttonVisible.award,
      ruleBtnVisible: state => state.buttonVisible.rule
    })
  },

  data () {
    return {
      ruleDialogVisble: false
    }
  },

  mounted () {
    this.fetchInfo()
  },

  methods: {
    fetchInfo () {
      this.$http.get(api.info, {
        params: {
          type: 'WECHAT',
          authKey: this.openId
        }
      }).then((res) => {
        this.$store.dispatch('setAvtivityState', res.data)
        this.$router.push('/home/game')
      }).catch((err) => {
        error.call(this, err.response.data)
      })
    },

    toAward () {
      this.$store.dispatch('setButtonVisible', {
        award: false,
        rule: false
      })
      this.$router.push('/home/award')
    },

    changeRouter () {
      // this.fetchInfo()
    },

    showRule () {
      this.ruleDialogVisble = true
    },

    closeRule () {
      this.ruleDialogVisble = false
    }
  }
}
</script>

<style lang="scss" scope>
@import '../style/tool';

.home{
  background: rgb(121, 20, 162) url('../assets/index_bg.jpg') no-repeat;
  background-size: 100% auto;

  %btn {
    @include psa;
    bottom: .15rem;
    width: 1.025rem;
    height: 0.405rem;
    transform: scale(1.6);
  }

  .award-btn {
    @extend %btn;
    left: .5rem;
    @include background('../assets/button/award_btn1.png');
  }

  .rule-btn {
    @extend %btn;
    right: .5rem;
    @include background('../assets/button/rule_btn.png');
  }
}
</style>
