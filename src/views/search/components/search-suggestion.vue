<template>
  <div class="search-suggestion">
    <van-cell
      @click="$emit('search', title)"
      :key="index"
      v-for="(title, index) in list"
      icon="search"
    >
      <div slot="title" v-html="highlight(title)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
// 函数的防抖
import { debounce } from 'lodash'

export default {
  name: 'searchSuggestion',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: []
    }
  },
  computed: {},
  watch: {
    //   监听 搜索框中的值
    // debounce 创建一个防抖函数 该函数会在上一次被调用后 wait毫秒延迟后 调用方法
    value: {
      handler: debounce(async function () {
        const { data } = await getSearchSuggestion(this.value)
        this.list = data.data.options
      }, 300),
      //   async handler() {
      //     const { data } = await getSearchSuggestion(this.value)
      //     this.list = data.data.options
      //   },
      // 默认 组件渲染后才开始 监听 所以 第一次的值 监听不到
      immediate: true // 立即监听
    }
  },
  created() {},
  mounted() {},
  methods: {
    highlight(title) {
      // new RegExp 正则的 构造函数
      // 参数一：字符串、 参数二：匹配模式、 返回值：正则对象
      return title.replace(
        new RegExp(this.value, 'gi'),
        `<span style="color:red">${this.value}</span>`
      )
    }
  }
}
</script>

<style scoped lang="less">
</style>
