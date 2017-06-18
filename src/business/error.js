import store from '@/store/store'

function error (statu) {
  switch (statu.status_code) {
    case 'E0003':
      this.$info({
        content: [statu.message]
      })
      break
    case 'E0004':
      store.dispatch('setAvtivityState', {
        state: 'BEFORE'
      })
      this.$router.push('/home/error')
      break
    case 'E0005':
      store.dispatch('setAvtivityState', {
        state: 'END'
      })
      this.$router.push('/home/error')
      break
    case 'E0009':
      store.dispatch('setAvtivityState', {
        state: 'PAUSE'
      })
      this.$router.push('/home/error')
      break
    default:
      break
  }
}

export default error
