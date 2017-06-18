import Vue from 'vue'

function fetchState () {
  Vue.prototype
}

export default function judgeActivityState (to, from, next) {
  if (to.pullPath === '/home') {
    fetchState()
  }
}

