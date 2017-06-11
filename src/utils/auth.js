import config from './config'
import store from '@/store/store'
import { getUrlParams } from './tool'

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

  if (isTargetBrowser && getUrlParams(code) === '') {
    if (authConfig.name === 'ali') {
      window.location.href = `${authConfig.head}${appId}&scope=${scope}&redirect_uri=${url}`
    } else {
      window.location.href = `${authConfig.head}${appId}&redirect_uri=${url}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
    }
  }
}

export default auth
