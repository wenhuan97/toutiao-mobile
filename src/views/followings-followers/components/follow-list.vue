<template>
  <div class="follow-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <follow-item
        v-for="(item, index) in list"
        :key="index"
        :follow="item"
      />
      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
    </van-list>
  </div>
</template>

<script>
import FollowItem from './follow-item.vue'
import { getUserFollows } from '@/api/user'

export default {
  name: 'FollwList',
  components: { FollowItem },
  props: {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const { data } = await getUserFollows({
        page: this.page,
        per_page: this.per_page
      })
      const { results } = data.data
      this.list.push(...results)
      this.loading = false
      //   判断是否有 下一组数据
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
