function getUrlParams (query, _url) {
  const url = _url || window.location.href
  const paramsString = url.substring(url.indexOf('?') + 1, url.indexOf('#') === -1 ? url.length : url.indexOf('#')).split('&')
  let paramsObj = {}

  paramsString.forEach((item, index) => {
    paramsObj[item.substring(0, item.indexOf('=')).toLowerCase()] = item.substring(item.indexOf('=') + 1, item.length)
  })

  const returnValue = paramsObj[query.toLowerCase()]

  if (typeof (returnValue) === 'undefined') {
    return ''
  } else {
    return returnValue
  }
}

export {
  getUrlParams
}
