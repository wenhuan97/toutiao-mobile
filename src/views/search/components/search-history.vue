<template>
  <div class="search-history">
    <van-cell>
      <div slot="title">搜索历史</div>
      <div slot="default">
        <div v-if="isDeleteShow">
          <span style="margin-right: 6px" @click="deleteAll">全部删除</span>
          <span @click="isDeleteShow = false">完成</span>
        </div>
        <van-icon @click="isDeleteShow = true" v-else name="delete-o" />
      </div>
    </van-cell>
    <van-cell
      :key="index"
      v-for="(title, index) in searchHistoies"
      :title="title"
      @click="deleteHistory(title, index)"
    >
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
import { deleteAllHistory } from '@/api/search'

export default {
  name: 'searchHistory',
  components: {},
  props: {
    searchHistoies: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //   删除历史记录
    deleteHistory(title, index) {
      if (this.isDeleteShow) {
        // 删除状态
        this.searchHistoies.splice(index, 1)
        // 数据持久化 (本地)
        // setItem('search-history', this.searchHistoies)
      } else {
        //   如果不是删除状态下点击 触发搜索
        this.$emit('search', title)
      }
    },
    // 删除全部的 历史记录
    async deleteAll() {
      const res = await deleteAllHistory()
      if (res.status === 204) {
        this.$emit('delete-history', [])
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
