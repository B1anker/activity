import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Game from '@/components/game'
import AwardPage from '@/components/award'
import Error from '@/components/error'

import judgeActivityState from './judgeActivityState'

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
      path: 'game',
      name: 'Game',
      component: Game
    }, {
      path: 'award',
      name: 'Award',
      component: AwardPage
    }, {
      path: 'error',
      name: 'Error',
      component: Error
    }]
  }]
})

router.beforeEach((to, from, next) => {
  judgeActivityState(to, from, next)
  next()
})

export default router
