import Vue from 'vue'

import Info from './info'

const plugins = {
  Info
}

export default function installAllPlugins () {
  Object.keys(plugins).forEach((key, index) => {
    Vue.use(plugins[key])
  })
}
