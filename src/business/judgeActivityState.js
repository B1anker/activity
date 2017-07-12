import draw from './draw'
import { getUrlParams } from '@/utils/tool'
import api from '@/api/api'
import store from '@/store/store'
import state from './state'

function fetchAwardState () {
  return draw('get').then((res) => {
    store.dispatch('addTrophy', res.data.trophyItems)
    return res.data && res.data.trophyItems
  })
}

function fetchActivityState () {
  return this.$http.get(api.info, {
    params: {
      type: 'WECHAT',
      authKey: store.getters.getUserInformation.openId
    }
  }).then((res) => {
    store.dispatch('setActivityState', res.data)
    return res.data
  }).catch((err) => {
    console.log(err.response.data.status_code, err.response.data.message)
    state.call(this, err.response.data)
  })
}

function setFromUser () {
  const params = getUrlParams(['fromPhone', 'fromNickName', 'fromIdCard', 'fromBroswerId', 'fromProvince'])
  this.$store.dispatch('setFromUserInformation', params)
}

function judgeActivityState () {
  setFromUser.call(this)
  fetchAwardState.call(this).then((res) => {
    // res.length && this.$router.push('/award')
  })
  fetchActivityState.call(this)
}

export default judgeActivityState
