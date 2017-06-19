import store from '@/store/store'
import wechat from '@/libs/wx'
import { isTargetBrowser } from '@/utils/tool'
import config from '@/utils/config'

export default function share () {
  const auth = store.getters.getAuth
  const wx = wechat()
  if (!isTargetBrowser() || auth.timestamp) {
    return
  }
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: config[config.channel].appId, // 必填，公众号的唯一标识
    timestamp: auth.timestamp, // 必填，生成签名的时间戳
    nonceStr: auth.noncestr, // 必填，生成签名的随机串
    signature: auth.signature, // 必填，签名，见附录1
    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  })
}
