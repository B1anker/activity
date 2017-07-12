import Vue from 'vue'

import Info from './info'
import Statistic from './statistic'
import Result from './result'

const plugins = {
  Info,
  Statistic,
  Result
}

export default function installAllPlugins () {
  Object.keys(plugins).forEach((key, index) => {
    Vue.use(plugins[key])
  })
}
