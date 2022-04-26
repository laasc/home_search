import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import( '../views/Home/Home.vue')
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
