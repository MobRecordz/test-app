import Vue from 'vue'
import VueRouter from 'vue-router'
import PageAuth from '../views/PageAuth.vue'
// import store from '../store'

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

const apiToken = localStorage.getItem('api-token');

router.beforeEach((to, from, next) => {
  if (!apiToken && to.name !== 'auth') {
    next({ name: 'auth' })
  } else {
    // store.commit('mutateApiToken', JSON.stringify(apiToken))
    // store.commit
    next()
  }
})

export default router
