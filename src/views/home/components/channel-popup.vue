<template>
  <div class="channel-popup">
    <!-- 我的频道 -->
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        @click="isShow = !isShow"
        class="channel-btn"
        size="mini"
        round
        type="danger"
        plain
        >{{ isShow ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        @click="onMyChannelClick(index, channel.id)"
        :icon="isShow && index !== 0 ? 'close' : ''"
        class="grid-item"
        :class="{ active: active === index }"
        v-for="(channel, index) in userChannels"
        :key="index"
        :text="channel.name"
      />
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        @click="onDelete(channel)"
        class="grid-item"
        v-for="channel in recommendChannels"
        :key="channel.id"
        :text="channel.name"
      />
    </van-grid>
  </div>
</template>
<script>
import {
  getChannels,
  deleteUserChannels,
  deleteUserChannel
} from '@/api/article'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelPopup',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      channels: [],
      isShow: false
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels() {
      //   计算推荐频道、推荐频道 = 全部频道 — 我的频道
      // 过滤数组
      return this.channels.filter((channel) => {
        return !this.userChannels.find((userChannel) => {
          return channel.id === userChannel.id
        })
      })
    }
  },
  watch: {},
  created() {
    this.loadGetChannels()
  },
  mounted() {},
  methods: {
    //   获取所有频道列表
    async loadGetChannels() {
      const { data } = await getChannels()
      this.channels = data.data.channels
    },
    // 移出频道推荐 添加到 我的频道
    async onDelete(channel) {
      this.userChannels.push(channel)

      // 数据持久化
      if (this.user) {
        //   登录了 就存储到线上
        await deleteUserChannels({
          channels: [
            {
              id: channel.id,
              seq: this.userChannels.length
            }
          ]
        })
      } else {
        //   没登录 数据存储到本地
        setItem('user-channels', this.userChannels)
      }
    },

    // 移出我的推荐 添加到 频道频道
    onMyChannelClick(index, channelId) {
      if (this.isShow && index !== 0) {
        // 编辑状态 删除频道
        this.deleteChannel(index, channelId)
      } else {
        //   非编辑 切换操作
        this.toggleChannel(index)
      }
    },
    // 删除我的频道
    async deleteChannel(index, channelId) {
      // 如果删除的是 当前激活频道 之前的 频道
      if (index <= this.active) {
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)
      //   数据持久化
      // 数据持久化
      if (this.user) {
        //   登录了 就删除线上
        await deleteUserChannel(channelId)
      } else {
        //   没登录 数据存储到本地
        setItem('user-channels', this.userChannels)
      }
    },
    // 切换我的频道
    toggleChannel(index) {
      // 激活频道
      this.$emit('update-active', index)
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="less">
.channel-popup {
  padding-top: 54px;
  .channel-title {
    font-size: 16px;
    color: #333;
  }

  .channel-btn {
    padding: 0 10px;
  }

  .grid-item {
    width: 85px;
    height: 42px;

    /deep/ .van-grid-item__content {
      position: relative;
      background-color: #f4f5f6;
      .van-icon-close {
        position: absolute;
        top: -7px;
        right: -5px;
        font-size: 15px;
      }

      .van-grid-item__text {
        font-size: 14px;
        color: #222;
        white-space: nowrap;
        margin: 0;
      }
    }
  }
  .active {
    /deep/ .van-grid-item__text {
      color: red !important;
    }
  }
}
</style>
