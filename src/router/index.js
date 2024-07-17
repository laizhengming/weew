import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import game from '@/views/game.vue'
import WorksShow from '@/views/WorksShow.vue'
import Participation from '@/views/Participation.vue'
import team from '@/views/team.vue'
import mark from '@/views/Mark/mark.vue'
import que from '@/views/que.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/game',
    name: 'game',
    component: game
  },
  {
    path: '/works',
    name: 'WorksShow',
    component: WorksShow
  },
  {
    path: '/Participation',
    name: 'Participation',
    component: Participation
  },
  {
    path: '/mark',
    name: "mark",// 子路由的默认路由
    component: mark,

  },
  {
    path: '/team',
    name: "team",// 子路由的默认路由
    component: team,
  },
  {
    path: '/que',
    name: "que",// 子路由的默认路由
    component: que,
  }



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
