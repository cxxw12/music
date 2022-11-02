
import {
    createRouter,
    createWebHistory,
} from 'vue-router'


const Login = () => import("../views/Login/Login.vue")
const Phone = () => import('../views/Login/Phone.vue')
const Qr = () => import('../views/Login/qr.vue')
const Vcode = () => import('../views/Login/VerCode.vue')
const Home = () => import('../views/Home.vue')
const View = () => import('../views/View.vue')
const Comment = () => import('../views/Comment.vue')
const RecommendList = () => import('../views/Song/recommendList.vue')
const playMusic = () => import('../views/Song/play.vue')
const Search = () => import('../views/Search/search.vue')

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            type: 'Login'
        },
        component: Login,
    },
    {
        path: '/login/phone',
        name: 'Phone',
        meta: {
            type: 'Login'
        },
        component: Phone,
    },
    {
        path: '/login/phone/vcode',
        name: 'Vcode',
        component: Vcode,
    },
    {
      path: '/login/qr',
      name: 'Qr',
      component: Qr,
    },
    {
        path: '/home',
        name: 'Home',
        meta: {
            keepAlive: true
        },
        component: Home
    },
    {
        path: '/view',
        name: 'View',
        component: View,
        meta: {
            keepAlive: true // 需要被缓存
        },
    },
    {
        path: '/comment',
        name: 'Comment',
        component: Comment
    },
    {
      path: '/recommendList',
      name: 'RecommendList',
      component: RecommendList
    },
    {
      path: '/song/play',
      name: 'playMusic',
      component: playMusic
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router