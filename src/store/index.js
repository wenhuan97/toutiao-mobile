import Vue from 'vue'
import Vuex from 'vuex'
import {
  getItem,
  setItem
} from '@/utils/storage'

Vue.use(Vuex)
const USER_KEY = 'user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY) || null, // 用户存储的 token 从本地存储中获取
    cachePages: ['LayouIndex'] // 缓存的组件
  },
  mutations: {
    setState(state, data) {
      state.user = data

      // 存到 本地存储 为token 做持久化处理
      setItem(USER_KEY, state.user)
    },
    // 添加缓存组件
    addCachePages(state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },
    // 移出缓存组件
    removeCachePages(state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }
  },
  actions: {},
  modules: {}
})
