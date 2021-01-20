<template>
  <div class="search-container">
    <!-- 搜索导航栏 -->
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(value)"
        @cancel="onCancel"
        background="#3296fa"
        @focus="isShowResult = false"
      />
    </form>
    <!-- 内容详情列表 -->
    <search-result :value="value" v-if="isShowResult" />
    <!-- 联想建议 -->
    <search-suggestion @search="onSearch" :value="value" v-else-if="value" />
    <!-- 历史记录 -->
    <search-history
      @delete-history="searchHistoies = $event"
      @search="onSearch"
      :searchHistoies="searchHistoies"
      v-else
    />
  </div>
</template>

<script>
import searchSuggestion from './components/search-suggestion'
import searchHistory from './components/search-history'
import searchResult from './components/search-result'
import { mapState } from 'vuex'
import { setItem, getItem } from '@/utils/storage'
import { getSearchHistory } from '@/api/search'

export default {
  name: 'SearchIndex',
  components: { searchSuggestion, searchHistory, searchResult },
  props: {},
  data() {
    return {
      value: '',
      isShowResult: false,
      searchHistoies: [] // 存放历史记录的数组
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    //   本地数据持久化
    searchHistoies() {
      setItem('search-history', this.searchHistoies)
    }
  },
  created() {
    this.localHistory()
  },
  mounted() {},
  methods: {
    onSearch(value) {
      console.log(1)
      this.value = value

      //   触发搜索之后 追加至 历史记录数组顶部
      //   如果 追加的内容 重复 则删除之前的
      const index = this.searchHistoies.indexOf(value)
      if (index !== -1) {
        this.searchHistoies.splice(index, 1)
      }
      this.searchHistoies.unshift(value)

      //   如果用户登录了 获取搜索结果后 后端会指定存储历史记录到线上
      //   如果没登录 就存到本地
      //   setItem('search-history', this.searchHistoies)

      //   展示状态
      this.isShowResult = true
    },
    async localHistory() {
      // 线上的太少 所以与本地的 合并
      let loaclHistoies = getItem('search-history') || []
      if (this.user) {
        const { data } = await getSearchHistory()
        const { keywords } = data.data
        loaclHistoies = [...new Set([...loaclHistoies, ...keywords])]
      }
      this.searchHistoies = loaclHistoies
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
</style>
