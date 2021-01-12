<template>
  <div class="followings-followers">
    <!-- Tab标签页 -->
    <van-tabs
      class="tab-wrap"
      v-model="active"
      background="#3296fa"
      color="#fff"
      title-inactive-color="#fff"
      title-active-color="#fff"
    >
      <div class="box" @click="goBack"></div>
      <van-tab title="关注">
        <follow-list />
      </van-tab>
      <van-tab title="粉丝">
        <fans-list />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import FansList from './components/fans-list.vue'
import FollowList from './components/follow-list.vue'
export default {
  name: 'FollowingsFollowers',
  components: { FollowList, FansList },
  props: {},
  data() {
    return { active: this.$route.query.active }
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
.tab-wrap {
  position: relative;
  .box {
    position: absolute;
    top: 26px;
    left: 15px;
    content: '';
    width: 11px;
    height: 11px;
    border: 3px solid #fff;
    border-top: 0;
    border-right: 0;
    transform: rotateZ(45deg);
    z-index: 1;
  }
  /deep/.van-tabs__wrap {
    height: 60px;
    .van-tabs__line {
      bottom: 23px;
      width: 25px;
    }
    .van-tab__text {
      font-size: 16px;
    }
  }
}
</style>
