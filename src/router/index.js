import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import game from '@/views/game.vue'
import WorksShow from '@/views/WorksShow.vue'
import Participation from '@/views/Participation.vue'
import team from '@/views/team.vue'
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
    path: '/team',
    name: 'team',
    component: team
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
