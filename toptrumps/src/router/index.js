import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ChooseGameMode from '../views/Choose-game-mode.vue'
import GameScreen from '../views/Game.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/choose-game-mode',
    name: 'choosegame',
    component: ChooseGameMode
  },
  {
    path: '/game-screen',
    name: 'gamescreen',
    component: GameScreen
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
