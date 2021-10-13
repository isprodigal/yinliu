import Vue from 'vue'
import Router from 'vue-router'
import Common from '../views/common/index.vue'
import Login from '../views/admin/login/index.vue'
import Admin from '../views/admin/index.vue'
import A404 from '../components/404.vue'
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin
        },
        {
            path: '/common',
            name: 'common',
            component: Common
        },
        {
            path: '/404',
            name: 'A404',
            component: A404
        }
    ]
})

router.beforeEach((to, from, next) => {
    const tokensign = sessionStorage.getItem('token')
    //to.path 目标路由
    //next 必须有否则程序不会继续执行
    if (to.path == '/admin' && !tokensign) { return next('/login') }
    next()
})


export default router