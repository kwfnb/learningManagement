import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/login/login.vue'
import Layout from '../views/layout/layout.vue'

Vue.use(VueRouter)

const routes = [
    {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '',
    component: Layout,
    redirect: '',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '系统管理员首页', icon: 'home'}
    },
    {
      path: 'homeUser',
      name: 'homeUser',
      component: () => import('@/views/home/index_user'),
      meta: {title: '普通用户首页', icon: 'home'}
    },]
}
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
