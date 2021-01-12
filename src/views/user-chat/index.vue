<template>
  <div class="user-chat">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      left-arrow
      title="布里茨同学"
      @click-left="$router.back()"
    />
    <!-- 消息列表 -->
    <van-cell-group class="list" ref="message-ref">
      <!-- 时间 -->
      <div class="time">{{ timeNow }}</div>
      <van-cell center :border="false">
        <div slot="icon" class="avatar-wrap">
          <van-image
            class="avatar"
            fit="cover"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
        <div slot="title" class="content">你好，你想对我说什么呢？</div>
      </van-cell>
      <van-cell
        :border="false"
        title=""
        center
        v-for="(msg, index) in messages"
        :key="index"
      >
        <div class="my-message">
          <van-image
            fit="cover"
            class="my-avatar"
            round
            :src="require('./ava.jpg')"
          />
          <div class="my-content">{{ msg }}</div>
        </div>
      </van-cell>
    </van-cell-group>
    <!-- 底部 -->
    <van-cell-group class="footer">
      <van-field
        maxlength="20"
        show-word-limit
        :border="false"
        class="text"
        v-model="value"
        placeholder="请输入消息"
      />
      <van-button @click="onSend" size="small" type="primary">发送</van-button>
    </van-cell-group>
  </div>
</template>

<script>
// import { io } from 'socket.io-client'
import { setItem, getItem } from '@/utils/storage'
import dayjs from 'dayjs'

export default {
  name: 'UserChat',
  components: {},
  props: {},
  data() {
    return {
      value: '',
      socket: null,
      messages: getItem('chat-message') || [], // 存放消息的数组
      timeNow: null // 当前时间
    }
  },
  computed: {},
  watch: {
    messages() {
      setItem('chat-message', this.messages)
      this.$nextTick(() => {
        this.scrollBottom()
      })
    }
  },
  created() {
    // 建立连接
    // const socket = io('http://ttapi.research.itcast.cn')
    // this.socket = socket
    // socket.on('connection', () => {
    //   console.log('连接成功')
    // })
    // socket.on('disconnect', () => {
    //   console.log('断开连接')
    // })
    // 监听 message 事件 接受服务端消息
    // socket.on('message', (data) => {
    //   this.messages.push(data)
    // })
  },
  mounted() {
    this.timeNow = dayjs(new Date()).format('HH:mm')
    this.scrollBottom()
  },
  methods: {
    //   发送消息
    onSend() {
      //   const data = {
      //     msg: this.message,
      //     timestamp: Date.now()
      //   }
      //   this.socket.emit('message', data)
      if (!this.value.trim().length) {
        return this.$toast.fail('消息不能为空')
      }
      this.messages.push(this.value.trim())
      this.value = ''
    },
    scrollBottom() {
      const list = this.$refs['message-ref']
      list.scrollTop = list.scrollHeight
    }
  }
}
</script>

<style scoped lang="less">
.list {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 45px;
  overflow-y: auto;
  .time {
    text-align: center;
    font-size: 10px;
    color: #333;
    margin-top: 15px;
  }
  .avatar-wrap {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    .avatar {
      width: 40px;
      height: 40px;
    }
  }

  .content {
    position: relative;
    width: 186px;
    height: 36px;
    background-color: #e0effb;
    line-height: 36px;
    padding: 0 8px;
    border-radius: 5px;
    box-sizing: border-box;
    &::before {
      content: '';
      position: absolute;
      top: 7px;
      left: -18px;
      border: 10px solid transparent;
      border-right: 15px solid #e0effb;
    }
  }

  .my-message {
    display: flex;
    flex-direction: row-reverse;

    .my-avatar {
      width: 40px;
      height: 40px;
      margin-left: 10px;
      flex-shrink: 0;
    }
    .my-content {
      //   flex: 1;
      position: relative;
      background-color: #e0effb;
      line-height: 36px;
      text-align: center;
      border-radius: 5px;
      padding: 0 8px;
      white-space: nowrap;
      &::before {
        content: '';
        position: absolute;
        top: 7px;
        right: -17px;
        border: 10px solid transparent;
        border-left: 15px solid #e0effb;
      }
    }
  }
  .van-cell__value {
    color: unset;
    overflow: unset;
  }
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 45px;
  .text {
    width: 310px;
  }
}
</style>
