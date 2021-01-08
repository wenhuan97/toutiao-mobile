<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        @click="$router.push('/search')"
        icon="search"
        round
        class="search-btn"
        slot="title"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- tab栏 -->
    <van-tabs v-model="active" class="channel-tab">
      <van-tab
        :key="channel.id"
        v-for="channel in userChannels"
        :title="channel.name"
      >
        <article-list :channel="channel" />
      </van-tab>
      <!-- 占位符 为了汉堡按钮 不遮挡 tab标签 -->
      <div slot="nav-right" class="space"></div>
      <!-- 汉堡按钮 -->
      <div @click="show = true" class="nav-right" slot="nav-right">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      class="channel-edit"
      v-model="show"
      position="bottom"
      closeable
      close-icon-position="top-left"
      get-container="body"
    >
      <channel-popup
        @close="show = false"
        @update-active="active = $event"
        :active="active"
        :userChannels="userChannels"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelPopup from './components/channel-popup'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
  name: 'HomeIndex',
  components: { ArticleList, ChannelPopup },
  props: {},
  data() {
    return {
      active: 0,
      userChannels: [],
      show: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created() {
    this.loadChannels()
  },
  mounted() {},
  methods: {
    //   获取用户频道列表
    async loadChannels() {
      let channels = []
      if (this.user) {
        const { data } = await getUserChannels()
        channels = data.data.channels
      } else {
        //   没登录 查看本地存储中有没有
        const localChannels = getItem('user-channels')
        if (localChannels) {
          channels = localChannels
        } else {
          // 当未登录 本地也没数据时 获取默认的频道
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
      }
      this.userChannels = channels
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  .search-btn {
    text-align: center;
    width: 280px;
    height: 32px;
    background-color: #5babfb;
    border: none;
    font-size: 13px;
    color: #fff;
  }

  .channel-tab {
    /deep/ .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
      bottom: 20px;
      width: 15px !important;
      height: 3px;
      background-color: #3296fa;
    }
  }

  .space {
    flex-shrink: 0;
    width: 32.5px;
  }
  .nav-right {
    position: fixed;
    right: 0;
    width: 28px;
    height: 43px;
    line-height: 44px;
    background-color: #fff;
    opacity: 0.9;
    &::before {
      content: '';
      position: absolute;
      top: 5px;
      left: -5px;
      width: 1px;
      height: 30px;
      background-color: #c8c8c8;
    }
    .van-icon {
      font-size: 20px;
    }
  }

  /deep/ .van-nav-bar__title {
    max-width: 100%;
  }
}
.channel-edit {
  height: 100%;
}
</style>
