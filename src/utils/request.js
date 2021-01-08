import axios from 'axios'
import store from '@/store/'
import JSONbig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  //   解决 js 后端返回数据 中 大数字的 问题
  transformResponse: [function (data) {
    try {
      // 如果后端返回的是 JSON格式的字符串
      return JSONbig.parse(data)
    } catch (error) {
      // 如果后端返回的 不是 JSON格式的字符串
      console.log('转换失败')
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

export default request
