import Vue from 'vue'
import api from '@/api/api'
import store from '@/store/store'

const draw = function (type = 'get') {
  if (type === 'get') {
    return this.$http.get(api.draw, {
      params: {
        authKey: store.getters.getUserInformation.id
      }
    })
  } else if (type === 'post') {
    return this.$http.post(api.draw, {
      authKey: store.getters.getUserInformation.id
    })
  } else {
    throw new Error('cannot resolve the method')
  }
}.bind(Vue.prototype)

export default draw

