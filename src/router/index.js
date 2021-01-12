import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/'
import {
  Dialog
} from 'vant'

Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/'),
    // 路由导航守卫
    meta: {
      requiredAuth: false // 是否需要登录 才能访问
    }
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [

      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home/'),
        meta: {
          requiredAuth: false
        }
      },
      {
        path: '/ask',
        name: 'ask',
        component: () => import('@/views/ask/'),
        meta: {
          requiredAuth: false
        }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/'),
        meta: {
          requiredAuth: false
        }
      },
      {
        path: '/my', // 默认子路由
        name: 'my',
        component: () => import('@/views/my/'),
        meta: {
          requiredAuth: false
        }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/'),
    meta: {
      requiredAuth: false
    }
  },
  {
    path: '/article/:articleId', // 动态路由传参 每一个文章详情 都有id
    name: 'article',
    component: () => import('@/views/article'),
    props: true, // 映射到 组件中的props 中
    meta: {
      requiredAuth: false
    }
  },
  {
    path: '/user/profile',
    name: 'userProfile',
    component: () => import('@/views/user-profile/'),
    meta: {
      requiredAuth: false
    }
  },
  {
    path: '/user/chat',
    name: 'userChat',
    component: () => import('@/views/user-chat/'),
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/collectHistory',
    name: 'collectHistory',
    component: () => import('@/views/collect-history'),
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('@/views/feedback/'),
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/settingPage',
    name: 'settingPage',
    component: () => import('@/views/setting-page/'),
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/follow',
    name: 'follow',
    component: () => import('@/views/followings-followers/'),
    meta: {
      requiredAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

// 全局导航守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuth) {
    //    如果 去往的页面 需要登录 则
    // 校验登录状态
    if (store.state.user) {
      return next()
    }
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录后才能访问，要去登录吗？'
    }).then(() => {
      // 去登录
      router.replace({
        name: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }).catch(() => {
      // 点击取消 中断 路由导航
      next(false)
    })
  } else {
    next()
  }
})

export default router
