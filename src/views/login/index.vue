<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      left-arrow
      title="登录"
      @click-left="$router.back()"
    />
    <!-- 登录 -->
    <van-form
      ref="login-form"
      :show-error="false"
      :show-error-message="false"
      @submit="onSubmit"
      @failed="onFailed"
      validate-first
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="icon"
        left-icon="shouji"
        placeholder="请输入手机号"
        :rules="formRules.mobile"
        name="mobile"
      />
      <van-field
        v-model="user.code"
        icon-prefix="icon"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        :rules="formRules.code"
        name="code"
      >
        <template #button>
          <van-count-down
            @finish="onFinish"
            v-if="isShowCode"
            :time="1000 * 60"
            format=" ss s"
          />
          <van-button
            v-else
            @click.prevent="sendCode"
            class="send-btn"
            size="small"
            round
            :loading="loading"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <div class="info">
      <p>手机号：17090086870</p>
      <p>万能验证码：246810</p>
      <p>如果登录失败，请多点击几次登录重试</p>
    </div>
    <div class="login-bottom">隐私条款</div>
  </div>
</template>

<script>
import { login, getCode } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data() {
    return {
      isShowCode: false,
      loading: false,
      user: {
        mobile: '18661561687',
        code: '246810'
      },
      formRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|4|5|7|8|9]\d{9}$/,
            message: '手机号不合法'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码无效'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(this.user)
        this.$toast.success('登录成功~')
        // 登录成功 后 把token信息存储到 vuex中
        this.$store.commit('setState', data.data)
      } catch (error) {
        this.$toast.fail('登录失败,手机号或者验证码错误')
      }
    },
    // 捕捉错误信息
    onFailed(error) {
      console.log(error)
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    // 发送验证码
    async sendCode() {
      //   校验手机号
      try {
        await this.$refs['login-form'].validate('mobile')
        this.isShowCode = true
        await getCode(this.user.mobile)
      } catch (error) {
        let message = ''
        if (error && error.response && error.response.status === 429) {
          message = '验证码发送过于频繁，请稍后再试'
        } else if (error.name) {
          message = error.message
        } else {
          message = '未知的错误'
        }
        this.$toast({
          message: message,
          position: 'top'
        })
      }
      this.loading = false
    },
    // 倒计时结束时
    onFinish() {
      this.isShowCode = false
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .login-btn-wrap {
    margin: 25px 15px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      font-size: 18px;
    }
  }

  .send-btn {
    position: relative;
    background-color: #ededed;
    color: #666666;
    width: 76px;
    height: 23px;
    .van-button__text {
      font-size: 11px;
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -10px;
      width: 1px;
      height: 23px;
      background-color: #eee;
    }
  }

  .info {
    font-size: 15px;
    text-align: center;
    line-height: 35px;
    color: #666;
  }

  .login-bottom {
    position: absolute;
    left: 50%;
    bottom: 23px;
    transform: translateX(-50%);
    color: #797a7a;
    font-size: 15px;
  }
}

.van-button--small {
  padding: 0 !important;
}
</style>
