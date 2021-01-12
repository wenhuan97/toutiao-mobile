<template>
  <div class="update-gender">
    <van-picker
      title="修改性别"
      show-toolbar
      :default-index="index"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close', false)"
      @change="onChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'updateGender',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      index: this.value // 性别对应 index的初始值
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onChange(picker, value, changeIndex) {
      this.index = changeIndex
    },
    async onConfirm() {
      this.$toast.loading({
        message: '修改中..',
        forbidClick: true
      })
      await updateUserProfile({
        gender: this.index
      })
      this.$emit('close', false)
      this.$emit('input', this.index)
      this.$toast.success('修改成功')
    }
  }
}
</script>

<style scoped lang="less">
</style>
