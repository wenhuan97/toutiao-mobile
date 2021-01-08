<template>
  <div class="post-comment">
    <van-field
      class="text"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      :disabled="!message"
      @click="onPost"
      class="btn"
      size="small"
      type="default"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComments } from '@/api/article'

export default {
  name: 'PostComment',
  components: {},
  props: {
    target: {
      type: [String, Number, Object],
      reuqired: true
    },
    articleId: {
      type: [String, Number, Object],
      default: null
    }
  },
  data() {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      const { data } = await addComments({
        target: this.target.toString(),
        content: this.message,
        art_id: this.articleId ? this.articleId.toString() : null
      })
      this.$emit('post-success', data.data.new_obj)
      this.$toast.success('发布成功')
      this.message = ''
    }
  }
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  justify-content: center;
  align-items: center;
  .text {
    width: 310px;
  }
  .btn {
    margin: 0 10px;
  }
}
</style>
