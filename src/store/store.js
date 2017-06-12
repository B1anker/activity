import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  user: {
    id: '',
    state: {
      gameDayTimesLimit: 0,
      gameTotalTimesLimit: 0,
      playerDayTimes: 0,
      playerTodayLotteryTimes: 0,
      playerTotalLotteryTimes: 0,
      playerTotalTimes: 0,
      shareState: 'NOT_YET_SHARE'
    }
  },
  trophies: []
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
