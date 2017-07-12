import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import State from '@/components/state'
import Share from '@/views/share'
import Pocket from '@/views/pocket'
import Award from '@/views/award'
import store from '@/store/store'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [{
      path: 'state',
      name: 'State',
      component: State
    }]
  }, {
    path: '/share',
    name: 'Share',
    component: Share
  }, {
    path: '/pocket',
    name: 'Pocket',
    component: Pocket
  }, {
    path: '/award',
    name: 'Award',
    component: Award
  }]
})

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('historyCount') * 1 || 0
history.setItem('/', 0)
router.beforeEach(function (to, from, next) {
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('UPDATE_PAGE_DIRECTION', 'forward')
    } else {
      store.commit('UPDATE_PAGE_DIRECTION', 'reverse')
    }
  } else {
    ++historyCount
    history.setItem('historyCount', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('UPDATE_PAGE_DIRECTION', 'forward')
  }
  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

export default router
