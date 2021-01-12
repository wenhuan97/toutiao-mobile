<template>
  <div class="comment-list">
    <van-cell title="全部评论"></van-cell>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        :comment="item"
        v-for="(item, index) in list"
        :key="index"
        @reply-click="$emit('reply-click', $event)"
      />
      <!-- <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.content"
      /> -->
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/article'
import CommentItem from './comment-item'

export default {
  name: 'CommentList',
  components: { CommentItem },
  props: {
    source: {
      type: [String, Object, Number],
      required: true
    },
    type: {
      type: String,
      default: 'a'
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      //   list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 请求数据
    async onLoad() {
      const { data } = await getComments({
        type: this.type,
        source: this.source.toString(),
        offset: this.offset,
        limit: this.limit
      })
      this.$emit('comment-total', data.data.total_count)
      // 把数据放列表中
      const { results } = data.data
      this.list.push(...results)
      // 关闭loading
      this.loading = false
      // 判定还有无数据
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        // 有 获取下一页数据， 无 把finished = true 不在触发加载更多
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
