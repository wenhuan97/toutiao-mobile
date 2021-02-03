import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugin/vant'
import './styles/index.less'
import './utils/dayjs'

// 设置 rem基准值 适配 html的标签字体大小
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
