import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import WikiView from '@/views/WikiView.vue'
import GameView from '@/views/GameView.vue'
import RecordsView from '@/views/RecordsView.vue'
import LoginView from '@/views/LoginView.vue'
import store from '@/store.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/wiki',
    name: 'wiki',
    component: WikiView
  },
  {
    path: '/game',
    name: 'game',
    component: GameView,
    meta: { requiresAuth: true }
  },
  {
    path: '/records',
    name: 'records',
    component: RecordsView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.user) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
