import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Game from '@/components/game'
import AwardPage from '@/components/award'
import Error from '@/components/error'

Vue.use(Router)

export default new Router({
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
