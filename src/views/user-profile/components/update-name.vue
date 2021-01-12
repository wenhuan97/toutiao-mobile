<template>
  <div class="update-name">
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close', false)"
      @click-right="onClickRight"
    />
    <!-- 输入框 -->
    <div class="text-wrap">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'UpdateName',
  components: {},
  props: {
    value: {
      type: String,
      requeired: true
    }
  },
  data() {
    return {
      message: this.value
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onClickRight() {
      if (!this.message.length) {
        return this.$toast.fail('昵称不能为空')
      }
      this.$toast.loading({
        message: '修改中..',
        forbidClick: true
      })
      //   修改昵称
      try {
        await updateUserProfile({
          name: this.message
        })
        this.$emit('input', this.message)
        this.$emit('close', false)
        this.$toast.success('修改成功')
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          this.$toast.fail('昵称已存在')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.text-wrap {
  padding: 12px;
}
</style>
