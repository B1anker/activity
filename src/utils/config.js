export default {
  debug: true,
  userId: '2088502779671826',
  activity: {
    id: 'DL5c0d019ad6dc470a91d96e82b34a4f18',
    company: '5bd8ef87f1de4ab699ce7c354d23e9ca'
  },
  channel: 'ali',
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
    auth_type: 'BROWSWR_ID',
    name: 'wechat',
    appId: 'wxb5c430e03be5d432',
    code: 'code',
    scope: 'snsapi_userinfo', // snsapi_base
    ua: 'micromessenger',
    head: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
  }
}
