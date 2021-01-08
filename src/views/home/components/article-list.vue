<template>
  <van-pull-refresh
    v-model="isRefreshLoading"
    @refresh="onRefresh"
    :success-text="succesText"
  >
    <van-list
      class="article-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <article-item
        v-for="(item, index) in list"
        :key="index"
        :article="item"
      />
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  name: 'ArticleList',
  components: { ArticleItem },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      isRefreshLoading: false,
      succesText: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      // 异步更新数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      const { results } = data.data
      this.list.push(...results)

      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (results.length) {
        // 如果还有数据
        //   获取下一页数据 把这一页的 时间戳 传到下一页
        this.timestamp = data.data.pre_timestamp
      } else {
        //   无数据了
        this.finished = true
      }
    },
    // 下拉刷新
    async onRefresh() {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      const { results } = data.data
      this.list.unshift(...results)
      this.succesText = `更新了${results.length}条数据`
      this.isRefreshLoading = false
    }
  }
}
</script>

<style scoped lang="less">

  .article-list {
    position: fixed;
    top: 90px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
  }

</style>
