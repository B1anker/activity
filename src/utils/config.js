import Fingerprint from 'fingerprintjs'

const broswerId = new Fingerprint({ canvas: true }).get() + ''

export default {
  debug: false,
  userId: 'oJtlXwVFsX3Qwzntbz42JiGCCp3g',
  broswerId: broswerId,
  activity: {
    id: 'DL68feb87fb50741ff90e7f4007d7c4cbc',
    company: '5bd8ef87f1de4ab699ce7c354d23e9ca'
  },
  channel: 'wechat',
  ali: {
    auth_type: 'ALIPAY_USER_ID',
    name: 'ali',
    appId: '2017050307094261',
    code: 'auth_code',
    scope: 'auth_base', // auth_userinfo
    ua: 'ali',
    head: 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id='
  },
  wechat: {
    auth_type: 'WECHAT',
    name: 'wechat',
    appId: 'wx2787882605dd8b41',
    component_appid: 'wx1a937f600d12a049',
    code: 'code',
    scope: 'snsapi_userinfo', // snsapi_base
    ua: 'micromessenger',
    head: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
  },
  other: {
    auth_type: 'BROWSER_ID'
  }
}

