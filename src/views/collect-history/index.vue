<template>
  <div class="collect-history">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      left-arrow
      title="收藏/历史"
      @click-left="goBack"
    />
    <!-- Tab标签页 -->
    <van-tabs v-model="active">
      <van-tab title="收藏">
        <collect-list />
      </van-tab>
      <van-tab title="历史">
        <history-list />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import CollectList from './components/collect-list'
import HistoryList from './components/history-list'

export default {
  name: 'CollectHistory',
  components: { CollectList, HistoryList },
  props: {},
  data() {
    return {
      active: this.$route.query.active
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    goBack() {
      this.$router.back()
      this.$store.commit('removeCachePages', 'LayouIndex')
    }
  }
}
</script>

<style scoped lang="less">
/deep/.van-tabs__line {
  background-color: #3296fa;
}
</style>
