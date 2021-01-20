<template>
  <div class="article-list" ref="article-list">
    <van-list
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
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
import { debounce } from 'lodash'

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
      scrollTopRet: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const articleList = this.$refs['article-list']

    // 防抖
    articleList.onscroll = debounce(() => {
      this.scrollTopRet = articleList.scrollTop
    }, 60)
  },
  activated() {
    // 组件从缓存中被激活
    this.$refs['article-list'].scrollTop = this.scrollTopRet
  },
  deactivated() {
    // 组件被缓存
  },
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
  overflow-y: scroll;
}
</style>
