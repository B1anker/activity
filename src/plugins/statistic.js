import config from '@/utils/config'
import { getUrlParams, broserType } from '@/utils/tool'
import Fingerprint from 'fingerprintjs'
import store from '@/store/store'
import Vue from 'vue'
import api from '@/api/api'

class Statistic {
  constructor () {
    this.upLineTime = 0
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
    this.upLineTime = new Date().getTime()
    this._addAction('OPEN_HOME_PAGE')
  }

  downLine () {
    this.stayTime = parseInt((new Date().getTime() - this.upLineTime) / 1000)
    this.openId = store.getters.getUserInformation.openId
    this._addAction('DOWN_LINE')
    return this
  }

  adClick () {
    this._addAction('AD_CLICK')
  }

  share (channel) {
    this._addAction('SHARE', channel)
  }

  jump (from, goto) {
    let data = {
      'from': from,
      'goto': goto,
      'jumpTime': this.dateFormate(new Date())
    }
    this.store.jump.push(data)
  }

  send () {
    Vue.prototype.$http.post(api.statistic, this.store).then(() => {
      console.log('send')
    }).catch((err) => {
      console.log('error', err)
    })
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
