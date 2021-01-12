<template>
  <div class="collect-his-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <collect-item
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
        :collect="item"
      />
      <!-- <van-cell/> -->
    </van-list>
  </div>
</template>

<script>
import CollectItem from './collect-item.vue'
import { getUserCollects } from '@/api/user'
export default {
  name: 'CollectHisList',
  components: { CollectItem },
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
      const { data } = await getUserCollects({
        page: this.page,
        per_page: this.per_page
      })
      const { results } = data.data
      this.list.push(...results)
      //   关闭loading
      this.loading = false
      //   判断是否还有数据
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
.collect-his-list {
  position: fixed;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}
</style>
