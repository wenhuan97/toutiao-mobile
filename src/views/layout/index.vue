<template>
  <div class="layout-container">
    <!-- 路由出口 -->
    <keep-alive>
      <router-view />
    </keep-alive>
    <!-- 底部导航栏 -->
    <van-tabbar router v-model="active">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/ask">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayouIndex',
  components: {},
  props: {},
  data() {
    return {
      active: this.$route.path
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // 组件渲染再添加 缓存
    this.$store.commit('addCachePages', 'LayouIndex')
  },
  methods: {}
}
</script>

<style scoped lang="less">
</style>
