import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  user: {
    openId: '',
    sex: 0,
    headImgUrl: '',
    province: '',
    city: '',
    country: '',
    nickName: '',
    phone: '',
    timeStamp: '',
    subscribe: '',
    score: 0
  },
  fromUser: {
    fromBroswerId: '',
    fromPhone: '',
    fromIdCard: '',
    fromNickName: '',
    fromProvince: ''
  },
  auth: {
    noncestr: '',
    signature: '',
    timestamp: ''
  },
  activityState: {
    state: 'NORMAL',
    gameDayTimesLimit: 0,
    gameTotalTimesLimit: 0,
    playerDayTimes: 0,
    playerTodayLotteryTimes: 0,
    playerTotalLotteryTimes: 0,
    playerTotalTimes: 0,
    shareState: 'NOT_YET_SHARE'
  },
  buttonVisible: {
    rule: true,
    award: true
  },
  trophies: [],
  direction: ''
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
