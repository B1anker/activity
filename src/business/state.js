import store from '@/store/store'

function state (status) {
  console.log(status)
  switch (status.status_code) {
    case 'E0003':
      this.$info({
        content: [status.message]
      })
      break
    case 'E0004':
      store.dispatch('setActivityState', {
        state: 'BEFORE'
      })
      this.$router.push('/home/state')
      break
    case 'E0005':
      store.dispatch('setActivityState', {
        state: 'END'
      })
      this.$router.push('/home/state')
      break
    case 'E0009':
      store.dispatch('setActivityState', {
        state: 'PAUSE'
      })
      this.$router.push('/home/state')
      break
    default:
      break
  }
}

export default state
