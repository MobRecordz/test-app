import Vue from 'vue'
import VueRouter from 'vue-router'
import PageAuth from '../views/PageAuth.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/main/PageMain.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/auth',
    name: 'auth',
    component: PageAuth
  },
  {
    path: '/pass-detail/:id',
    name: 'pass-detail',
    component: () => import('../views/PagePassDetail.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  const apiToken = localStorage.getItem('api-token');

  if (!apiToken && to.name !== 'auth') {
    next({ name: 'auth' })
  } else {
    next()
  }
})

export default router
