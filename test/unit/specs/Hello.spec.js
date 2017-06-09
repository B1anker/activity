import { getUrlParams } from '@/utils/tool'

describe('Test the Tool', () => {
  describe('getUrlParams', () => {
    it('should return wechat', () => {
      expect(getUrlParams('type', 'https://baidu.com?type=wechat'))
        .to.equal('wechat')
    })
    it('should return ali', () => {
      expect(getUrlParams('type', 'https://baidu.com?type=ali#anchor'))
        .to.equal('ali')
    })
  })
})
