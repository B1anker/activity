import ResultComponent from '@/packages/result'
import { mergeOptions } from '@/utils/tool'

let $vm = null

const plugin = {
  install (Vue) {
    if (!$vm) {
      const Result = Vue.extend(ResultComponent)

      $vm = new Result({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    const result = {
      show (options = {}) {
        return new Promise((resolve, reject) => {
          if (typeof options === 'object') {
            mergeOptions($vm, options)
          } else if (typeof options === 'string') {
            $vm.buttonText = options
          }
          this.watcher && this.watcher()
          this.watcher = $vm.$watch('visible', (val) => {
            if (val === false) {
              this.watcher && this.watcher()
              resolve()
            }
          })
          $vm.visible = true
        })
      },

      hide () {
        return new Promise((resolve, reject) => {
          $vm.visible = false
          this.watcher && this.watcher()
          this.watcher = null
          resolve()
        })
      }
    }

    Object.defineProperties(Vue.prototype, {

      $result: {
        get () {
          return result
        },

        set (newVal) {
          return newVal
        }
      }

    })

    Vue.mixin({
      created: function () {
        this.$result = Vue.$result
      }
    })
  }
}

export default plugin
export const install = plugin.install
