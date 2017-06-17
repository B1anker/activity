/**
 * Created by B1anker on 2017/06/10.
 */
'use strict'
import axios from 'axios'
import api from './api'
import { sign, genPostDate, genGetDate } from '@/utils/tool'

function httpSetting ($router) {
  let http = axios.create({
    baseURL: api.baseUrl,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })

  http.interceptors.request.use((config) => {
    const method = config.method.toLowerCase()
    if (method === 'post' || method === 'put') {
      config.url += `?sign=${sign()}`
      config.data = genPostDate(config.data || {})
    } else if (method === 'get') {
      config.params.sign = sign()
      config.params = genGetDate(config.params)
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  })

  http.interceptors.response.use((response) => {
    if (response.status !== 200) {
      console.log('!200')
    }
    return response
  }, (error) => {
    return Promise.reject(error)
  })

  return http
}

function httpPlugin (Vue, instance) {
  if (httpPlugin.installed) {
    return
  }
  httpPlugin.installed = true

  if (!instance) {
    console.error('You have to install axios')
    return
  }

  Object.defineProperties(Vue.prototype, {

    $http: {
      get () {
        return instance
      },

      set (newVal) {
        return newVal
      }
    }

  })
}

export {
  httpSetting,
  httpPlugin
}
