import config from '@/utils/config'
import md5 from 'md5'
import store from '@/store/store'

function getUrlParams (query, _url) {
  const url = _url || window.location.href
  const paramsString = url.substring(url.indexOf('?') + 1, url.length).split('&')
  let paramsObj = {}

  paramsString.forEach((item, index) => {
    paramsObj[item.substring(0, item.indexOf('=')).toLowerCase()] = item.substring(item.indexOf('=') + 1, item.length)
  })

  const returnValue = paramsObj[query.toLowerCase()]

  if (typeof (returnValue) === 'undefined') {
    return ''
  } else {
    return returnValue
  }
}

function sign () {
  const str = `${config.activity.id}_${store.getters.getUserInformation.openId}_${config[config.channel].auth_type}`
  return md5(str)
}

function genPostDate (obj) {
  obj.type = config[config.channel].auth_type
  obj.activityId = config.activity.id // 活动的ID
  obj.appId = config.activity.company
  obj.appkey = 'URNzIn'
  obj.appsecret = 'a26jM3'
  obj.market = '1'
  obj.appversion = '1'
  obj.channel = config.channel
  return obj
}

function genGetDate (obj) {
  obj.type = config[config.channel].auth_type
  obj.activityId = config.activity.id // 活动的ID
  obj.appId = config.activity.company
  obj.time = new Date().getTime()
  obj.appkey = 'URNzIn'
  obj.appsecret = 'a26jM3'
  obj.market = '1'
  obj.appversion = '1'
  obj.channel = config.channel
  return obj
}

function resize () {
  (function (doc, win) {
    const docEl = doc.documentElement
    const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    const recalc = function () {
      const clientWidth = docEl.clientWidth
      if (!clientWidth) return
      docEl.style.fontSize = 625 * (clientWidth / 375) + '%'
    }
    if (!doc.addEventListener) return
    win.addEventListener(resizeEvt, recalc, false)
    doc.addEventListener('DOMContentLoad', recalc, false)
    recalc()
  })(document, window)
}

const mergeOptions = function ($vm, options) {
  const defaults = {}

  Object.keys($vm.$options.props).forEach((key, index) => {
    if (key !== 'value') {
      defaults[key] = $vm.$options.props[key].default
    }
  })

  const _options = Object.assign({}, defaults, options)

  Object.keys(_options).forEach((key, index) => {
    $vm[key] = _options[key]
  })
}

function setProperties (stateProperty, update) {
  Object.keys(update).forEach((key, index) => {
    stateProperty[key] = update[key]
  })
}

export {
  getUrlParams,
  sign,
  genPostDate,
  genGetDate,
  resize,
  mergeOptions,
  setProperties
}
