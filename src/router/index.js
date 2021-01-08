import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/')
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [

      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home/')
      },
      {
        path: '/ask',
        name: 'ask',
        component: () => import('@/views/ask/')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/')
      },
      {
        path: '/my', // 默认子路由
        name: 'my',
        component: () => import('@/views/my/')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/')
  },
  {
    path: '/article/:articleId', // 动态路由传参 每一个文章详情 都有id
    name: 'article',
    component: () => import('@/views/article'),
    props: true // 映射到 组件中的props 中
  }
]

const router = new VueRouter({
  routes
})

export default router
