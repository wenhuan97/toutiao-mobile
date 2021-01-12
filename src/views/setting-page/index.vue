<template>
  <div class="setting-page">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      left-arrow
      title="系统设置"
      @click-left="$router.back()"
    />
    <van-cell @click="onClick" title="手机号" is-link></van-cell>
    <van-cell @click="onClick" title="修改密码" is-link></van-cell>
    <div class="text">开启后，可以让你的好友找到你</div>
    <van-cell title="允许将我推荐给好友">
      <van-switch v-model="checked" size="17px" />
    </van-cell>
    <div class="text">开启后，可以显示你推荐好友</div>
    <van-cell title="允许给我推荐可能认识的人">
      <van-switch v-model="checked1" size="17px" />
    </van-cell>
    <div class="text">开启后，分享到微信QQ等平台的页面会展示你的头像</div>
    <van-cell title="分享显示我的头像">
      <van-switch v-model="checked2" size="17px" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SettingPage',
  components: {},
  props: {},
  data() {
    return {
      checked: true,
      checked1: true,
      checked2: true
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onClick() {
      this.$dialog({ message: '还在开发中。。' })
    }
  }
}
</script>

<style scoped lang="less">
.setting-page {
  background-color: #f5f7f9;
  .text {
    height: 35px;
    line-height: 35px;
    font-size: 13px;
    color: #999999;
    padding: 0 16px;
  }
}
</style>
