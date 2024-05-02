import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);

router.beforeEach((to,form,next)=>{
    if (to.path === '/login') next()
    const tokenStr = window.sessionStorage.getItem('isLogin')
    // 增加判断条件
    if (!tokenStr && to.path !== '/login') return next('/login')
    next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
