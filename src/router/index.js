import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Game from '@/components/game'

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
      path: '/home/game',
      name: 'Game',
      component: Game
    }]
  }]
})
