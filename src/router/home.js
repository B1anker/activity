import Home from '@/views/home'

export default function home (to, from, next) {
  if (to.pullPath === '/home') {
    Home
  }
}
