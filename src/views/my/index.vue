<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div class="user-info" v-if="user">
      <div class="base-info">
        <div class="avatar">
          <img :src="users.photo" alt="" />
          <div class="name">
            <span>{{users.name}}</span>
          </div>
        </div>
        <van-button round class="update-btn" type="default"
          >编辑资料</van-button
        >
      </div>
      <div class="data-info">
        <div class="headline msg">
          <span>{{users.art_count}}</span>
          <span>头条</span>
        </div>
        <div class="guanzhu msg">
          <span>{{users.follow_count}}</span>
          <span>关注</span>
        </div>
        <div class="fans msg">
          <span>{{users.fans_count}}</span>
          <span>粉丝</span>
        </div>
        <div class="likes msg">
          <span>{{users.like_count}}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="no-login" v-else>
      <div class="logo" @click="$router.push('/login')">
        <img src="./avatar.png" alt="" />
        <span>登录/注册</span>
      </div>
    </div>
    <!-- 收藏、历史 -->
    <van-grid :column-num="2" class="nav-grid mb-4">
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="icon"
        icon="shoucang"
        text="收藏"
      />
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="icon"
        icon="lishi"
        text="历史"
      />
    </van-grid>
    <van-cell title="消息通知" is-link to="index" />
    <van-cell class="mb-4" title="布里茨同学" is-link to="index" />
    <van-cell
      @click="loginOut"
      v-if="user"
      class="login-out"
      title="退出登录"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'

export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data() {
    return {
      users: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created() {
    this.loadCurrentUser()
  },
  mounted() {},
  methods: {
    //   获取用户数据
    async loadCurrentUser() {
      const { data } = await getCurrentUser()
      this.users = data.data
    },
    //   退出的登录
    loginOut() {
      this.$dialog
        .confirm({
          message: '确定要退出登录吗？'
        })
        .then(() => {
          // 确定 删除 token 跳转页面
          this.$store.commit('setState', null)
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .user-info {
    background: url('./banner.png');
    background-size: cover;
    .base-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 40px 16px 11px;
      .avatar {
        display: flex;
        align-items: center;
        img {
          width: 66px;
          height: 66px;
          border-radius: 100%;
          margin-right: 10px;
          border: 1px solid #fff;
        }

        .name {
          font-size: 17px;
          color: #fff;
        }
      }
      .update-btn {
        // width: 70px;
        height: 16px;
        font-size: 10px;
        color: #747474;
      }
    }

    .data-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 30px;
      .msg {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span:nth-child(1) {
          font-size: 20px;
          color: #fff;
        }
        span:nth-child(2) {
          font-size: 16px;
          color: #fff;
        }
      }
    }
  }

  /deep/ .nav-grid {
    .nav-grid-item {
      height: 70px;
      .icon {
        font-size: 22px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ffa836;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
  }
  .login-out {
    font-size: 15px;
    color: #d86262;
    text-align: center;
  }
  .mb-4 {
    margin-bottom: 4px;
  }

  .no-login {
    width: 100%;
    height: 180px;
    background: url(./banner.png) no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        width: 66px;
        height: 66px;
      }
      span {
        font-size: 15px;
        color: #fff;
        margin-top: 10px;
      }
    }
  }
}

.van-button--normal {
  padding: 6px;
}
</style>
