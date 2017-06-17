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
  const head = authConfig.head
  const url = encodeURIComponent(document.location.href.split('#')[0])
  const ua = navigator.userAgent.toLowerCase()
  const isTargetBrowser = ua.indexOf(authConfig.ua) !== -1

  if (config.debug) {
    store.dispatch('setUserInformation', {
      openId: config.userId
    })
    return
  }

  if (!isTargetBrowser || code === '') {
    if (authConfig.name === 'ali') {
      window.location.href = `${head}${appId}&scope=${scope}&redirect_uri=${url}`
    } else if (authConfig.name === 'wechat') {
      window.location.href = `${head}${appId}&redirect_uri=${url}&response_type=code&scope=${scope}&state=STATE&component_appid=${authConfig.component_appid}#wechat_redirect`
    }
  } else {
    const user = sessionStorage.user && JSON.parse(sessionStorage.user)
    if (user && user.openId) {
      store.dispatch('setUserInformation', user)
      return
    }
    Vue.prototype.$http.get(api.openId, {
      params: {
        code,
        scope: 'USER_INFO',
        url: document.location.href.split('#')[0]
      }
    }).then((res) => {
      sessionStorage.clear()
      res.data && (sessionStorage.user = JSON.stringify(res.data))
      store.dispatch('setUserInformation', res.data)
    })
  }
}

export default auth
