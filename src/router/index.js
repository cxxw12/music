import {
    createRouter,
    createWebHistory,
} from 'vue-router'

import { useSongStore } from "../store/song";

const Login = () => import("../views/Login/Login.vue")
const Phone = () => import('../views/Login/Phone.vue')
const Qr = () => import('../views/Login/qr.vue')
const Vcode = () => import('../views/Login/VerCode.vue')
const Home = () => import('../views/Home.vue')
const View = () => import('../views/View.vue')
const RecommendList = () => import('../views/Song/recommendList.vue')
const playMusic = () => import('../views/Song/play.vue')
const Search = () => import('../views/Search/search.vue')
const commentList = () => import('../views/comment/list.vue')
const User = () => import('../views/user/user.vue')

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            type: 'Login',
            isTab: false,
            isBottomMusic: false
        },
        component: Login,
    },
    {
        path: '/login/phone',
        name: 'Phone',
        meta: {
            type: 'Login',
            isTab: false,
            isBottomMusic: false
        },
        component: Phone,
    },
    {
        path: '/login/phone/vcode',
        name: 'Vcode',
        meta: {
          isTab: false,
          isBottomMusic: false
        },
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
            keepAlive: true,
            isTab: true,
            isBottomMusic: true
        },
        component: Home,
        children: [
          {
            path: '/user',
            name: 'homeUser',
            component: User,
          }
        ]
    },
    {
        path: '/view',
        name: 'View',
        component: View,
        meta: {
            keepAlive: true, // 需要被缓存
        },
    },
    {
      path: '/recommendList',
      name: 'RecommendList',
      component: RecommendList,
      meta: {
        keepAlive: true,
        isTab: false,
        isBottomMusic: true
      },
    },
    {
      path: '/song/play',
      name: 'playMusic',
      component: playMusic,
      meta: {
        keepAlive: true,
        isTab: false,
        isBottomMusic: false
      },
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
        keepAlive: true,
        isTab: false,
        isBottomMusic: true
      },
    },
    {
      path: '/comment/list',
      name: 'Comment',
      component: commentList,
      meta: {
        keepAlive: true,
        isTab: false,
        isBottomMusic: false
      }
    },
    // {
    //   path: '/user',
    //   name: 'user',
    //   component: User,
    //   meta: {
    //     keepAlive: true,
    //     isTab: true,
    //     isBottomMusic: true
    //   }
    // }

];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
  const songStore = useSongStore()
  songStore.$patch(state => {
    state.isTab = to.meta.isTab
    state.isBottomMusic = to.meta.isBottomMusic
  })
  next()
})

export default router