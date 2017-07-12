import Vue from 'vue'
import config from '@/utils/config'
import store from '@/store/store'
import api from '@/api/api'
import { getUrlParams, isTargetBrowser } from '@/utils/tool'

const authConfig = config[config.channel]
const appId = authConfig.appId
const scope = authConfig.scope
const head = authConfig.head
const url = encodeURIComponent(document.location.href.split('#')[0])
const code = getUrlParams(authConfig.code)

function hendleUrl () {
  let url = document.location.href.split('#')[0]
  if (url.search('tdollar') !== -1) {
    return `http://qdollar.cn/${config.activity.id}/dist/index.html`
  }
  return url
}

function fetchOpenId () {
  return Vue.prototype.$http.get(api.openId, {
    params: {
      code,
      scope: 'USER_INFO',
      url: document.location.href.split('#')[0]
    }
  })
}

function redirect () {
  if (authConfig.name === 'ali') {
    window.location.href = `${head}${appId}&scope=${scope}&redirect_uri=${url}`
  } else if (authConfig.name === 'wechat') {
    window.location.href = `${head}${appId}&redirect_uri=${hendleUrl()}&response_type=code&scope=${scope}&state=STATE&component_appid=${authConfig.component_appid}#wechat_redirect`
  }
}

function auth () {
  if (config.debug) {
    store.dispatch('setUserInformation', {
      openId: config.userId
    })
    return
  }

  return new Promise((resolve, reject) => {
    if (!isTargetBrowser() || code === '') {
      redirect()
    } else {
      const user = sessionStorage.user && JSON.parse(sessionStorage.user)
      if (user && user.openId) {
        store.dispatch('setUserInformation', user)
        resolve()
        return
      }
      fetchOpenId().then((res) => {
        const user = res.data
        sessionStorage.clear()
        user && (sessionStorage.user = JSON.stringify(user))
        user && store.dispatch('setUserInformation', user)
        resolve()
      }).catch(() => {
        redirect()
      })
    }
  })
}

export default auth
export {
  redirect
}
