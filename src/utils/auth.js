import Vue from 'vue'
import config from './config'
import store from '@/store/store'
import { getUrlParams } from './tool'
import api from '@/api/api'

function auth () {
  const authConfig = config[config.channel]
  const code = getUrlParams(authConfig.code)
  const appId = authConfig.appId
  const scope = authConfig.scope
  const url = encodeURIComponent(document.location.href.split('#')[0])
  const ua = navigator.userAgent.toLowerCase()
  const isTargetBrowser = ua.indexOf(authConfig.ua) !== -1

  if (config.debug) {
    store.dispatch('setUserId', config.userId)
    return
  }

  if (!isTargetBrowser || code === '') {
    if (authConfig.name === 'ali') {
      window.location.href = `${authConfig.head}${appId}&scope=${scope}&redirect_uri=${url}`
    } else if (authConfig.name === 'wechat') {
      window.location.href = `${authConfig.head}${appId}&redirect_uri=${url}&response_type=code&scope=${scope}&state=STATE&component_appid=wx1a937f600d12a049#wechat_redirect`
    }
  } else {
    Vue.prototype.$http.get(api.openId, {
      params: {
        code,
        scope: 'USER_INFO',
        url: document.location.href.split('#')[0]
      }
    }).then((res) => {
      console.log(res)
      store.dispatch('setUserId', res.body.openId)
    })
  }
}

export default auth
