import config from '@/utils/config'
import { getUrlParams, broserType } from '@/utils/tool'
import Fingerprint from 'fingerprintjs'

class Statistic {
  constructor () {
    this.store = {
      'openId': '',
      'activityId': config.activity.id,
      'channelId': getUrlParams('channel'), // 渠道
      'browserId': new Fingerprint({canvas: true}).get(), // "浏览器ID",
      'stayTime': 0,
      'platformBrowserType': broserType(), // 浏览器类型
      'actions': [],
      'jump': []
    }
  }

  dateFormate (date) {
    let month = parseInt(date.getMonth()) + 1
    if (month <= 9) {
      month = '0' + month
    }
    if (date) {
      return date.getFullYear() + '-' + month + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    } else {
      return ''
    }
  }

  _addAction (action, channel = '') {
    const data = {
      action,
      time: this.dateFormate(new Date()),
      channel
    }
    if (!channel) {
      delete data.channel
    }
    this.store.actions.push(data)
  }

  openHomePage () {
    this._addAction('OPEN_HOME_PAGE')
  }

  downLine () {
    this._addAction('DOWN_LINE')
  }

  adClick () {
    this._addAction('AD_CLICK')
  }

  share (channel) {
    this._addAction('SHARE', channel)
  }
}

function statisticPlugin (Vue) {
  if (statisticPlugin.installed) {
    return
  }
  statisticPlugin.installed = true

  const statistic = new Statistic()

  Object.defineProperties(Vue.prototype, {

    $statistic: {
      get () {
        return statistic
      }
    }

  })
}

export default statisticPlugin
