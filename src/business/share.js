// import store from '@/store/store'
import wechat from '@/libs/wx'
import Vue from 'vue'
import { isTargetBrowser } from '@/utils/tool'
import api from '@/api/api'
import config from '@/utils/config'
import store from '@/store/store'

function fetchSignature () {
  return Vue.prototype.$http.get(api.wechatSignature, {
    params: {
      url: document.location.href.split('#')[0]
    }
  })
}

function fetchShareInfo () {
  return Vue.prototype.$http.get(`${api.shareInfo}/${config.activity.id}`)
}

export default async function share () {
  const wx = wechat()
  if (!isTargetBrowser()) {
    return
  }
  const signature = (await fetchSignature()).data
  const shareInfo = (await fetchShareInfo()).data

  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: config[config.channel].appId, // 必填，公众号的唯一标识
    timestamp: signature.timestamp, // 必填，生成签名的时间戳
    nonceStr: signature.noncestr, // 必填，生成签名的随机串
    signature: signature.signature, // 必填，签名，见附录1
    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  })
  wx.ready(() => {
    const userInfo = store.getters.getUserInformation
    const trophies = store.getters.getTrophies.filter((item) => {
      return item.trophyDisplayName !== '谢谢参与'
    })

    const href = location.protocol + '//' + location.host

    const title = shareInfo.shareTitle.replace(/#昵称#/g, userInfo.nickName).replace(/#分数#/g, userInfo.score).replace(/#奖品#/g, trophies[0] && trophies[0].trophyDisplayName)

    const description = shareInfo.shareSummary.replace(/#昵称#/g, userInfo.nickName).replace(/#分数#/g, userInfo.score).replace(/#奖品#/g, trophies[0] && trophies[0].trophyDisplayName)

    const shareLink = (shareInfo.urlType === 'Spread') ? shareInfo.shareUrl : `http://qdollar.cn/${config.activity.id}/dist/index.html?fromOpenId=${userInfo.openId}&fromName=${encodeURIComponent(userInfo.nickName)}&fromPhone=${(userInfo.phone || '')}` // 分享链接
    console.log(shareInfo)

    console.log(shareLink)

    const imgUrl = href + '/p/' + config.activity.id + '/' + shareInfo.shareImage

    wx.onMenuShareTimeline({
      title: title, // 分享标题
      desc: description, // 分享描述
      link: shareLink, // 分享链接
      imgUrl: imgUrl, // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        Vue.prototype.$statistic.share('WETCH_FRIEND_CIRCLE_SHARE') // 分享回调函数
      },
      cancel: function () {
      }
    })
    // 发送给朋友
    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: description, // 分享描述
      link: shareLink, // 分享链接
      imgUrl: imgUrl, // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        Vue.prototype.$statistic.share('WETCH_TALKING_SHARE')// 分享回调函数
      },
      cancel: function () {
      // 用户取消分享后执行的回调函数
      }
    })
    wx.error(function (res) {
      console.log('wx error')
    })
  })
}
