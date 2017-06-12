
function error (statu) {
  switch (statu.status_code) {
    case 'E0003':
      this.$info({
        content: [statu.message]
      })
      break
    case 'E0004':
      console.log(this)
      this.$router.push('/home/error')
      break
    default:
      break
  }
}

export default error
