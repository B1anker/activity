export default {
  debug: true,
  userId: 'oJtlXwVFsX3Qwzntbz42JiGCCp3g',
  activity: {
    id: 'DL3dfeff45a025497cbcb94a896d0b1e9d',
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
    code: 'code',
    scope: 'snsapi_userinfo', // snsapi_base
    ua: 'micromessenger',
    head: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
  }
}
