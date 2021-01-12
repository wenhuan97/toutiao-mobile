<template>
  <div class="update-birthdat">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="修改生日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close', false)"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'

export default {
  name: 'UpdateBirthday',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onConfirm(value) {
      this.$toast.loading({
        message: '修改中..',
        forbidClick: true
      })
      const date = dayjs(this.currentDate).format('YYYY-MM-DD')
      await updateUserProfile({
        birthday: date
      })
      this.$emit('close', false)
      this.$emit('input', date)
      this.$toast.success('修改成功')
    }
  }
}
</script>

<style scoped lang="less">
</style>
