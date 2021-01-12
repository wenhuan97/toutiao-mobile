import axios from 'axios'
import store from '@/store/'
import JSONbig from 'json-bigint'
import router from '@/router/'
import {
  Toast
} from 'vant'

// 使用 refresh_token 获取新的token
const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  //   解决 js 后端返回数据 中 大数字的 问题
  transformResponse: [function (data) {
    try {
      // 如果后端返回的是 JSON格式的字符串
      return JSONbig.parse(data)
    } catch (error) {
      // 如果后端返回的 不是 JSON格式的字符串
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const {
    user
  } = store.state
  if (user) { // 如果用户已经登录了
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, async function (err) {
  // 超出2.xx的错误码 都会进入这里
  const status = err.response.status
  if (status === 400) {
    // 客户端参数异常
    Toast.fail('客户端参数异常')
  } else if (status === 401) {
    // token过期
    // 如果没登录 就跳转登录页
    const {
      user
    } = store.state
    if (!user || !user.token) {
      return goLogin()
    }
    // 使用 refresh_token 获取新的token
    try {
      const {
        data
      } = await refreshTokenReq({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      //   把新的token 赋值给user
      user.token = data.data.token
      store.commit('setUser', user)
      //   把失败的请求发送出去
      //   这里使用 request 发送请求 会走自己的 拦截器
      // 他的请求 在拦截器中通过 store 容器 访问token 数据
      return request(err.config)
    } catch (err) {
      //   刷新token都失败的话 直接跳转登录页
      goLogin()
    }
  } else if (status === 403) {
    // 没有操作权限
    Toast.fail('没有操作权限')
  } else if (status >= 500) {
    // 服务器异常
    Toast.fail('服务器异常')
  }
  return Promise.reject(err)
})

function goLogin() {
  router.replace({
    name: 'login',
    query: {
      // 当前路由路径  router.currentRoute.fullPath
      //   当前 路由对象 router.currentRoute
      // 和组件中 的 this.$router 一样
      redirect: router.currentRoute.fullPath
    }
  })
}

export default request
