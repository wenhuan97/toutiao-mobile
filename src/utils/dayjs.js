import dayjs from 'dayjs'
import Vue from 'vue'
// 使用相对时间
import relativeTime from 'dayjs/plugin/relativeTime'

// 使用 中文语言包
import 'dayjs/locale/zh-cn'
// 全局配置使用 中文语言包
dayjs.locale('zh-cn')
// 格式化日期时间
// console.log(dayjs().format('YYYY-MM-DD'))
// 处理 相对时间
dayjs.extend(relativeTime)
// 添加一个 相对时间的 过滤器
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
// 时间日期 格式化
Vue.filter('dateTime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})
