<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      fit="cover"
      round
      :src="comment.aut_photo"
    />
    <div slot="title">
      <div class="name-wrap">
        <div class="name">{{ comment.aut_name }}</div>
        <div class="like-wrap" @click="onLike">
          <van-icon
            class="like-icon"
            :class="{ liked: comment.is_liking }"
            :name="comment.is_liking ? 'good-job' : 'good-job-o'"
          >
            <span class="like-count">{{ comment.like_count }}</span>
          </van-icon>
        </div>
      </div>
      <div class="content">{{ comment.content }}</div>
      <div class="date-wrap">
        <span class="pubdate">{{
          comment.pubdate | dateTime('MM-DD HH:mm')
        }}</span>
        <van-button
          @click="$emit('reply-click', comment)"
          class="reply-btn"
          size="mini"
          round
          type="default"
          >{{ comment.reply_count }} 回复
        </van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/article'

export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLike() {
      this.$toast.loading({
        message: '操作中..',
        forbidClick: true
      })
      if (this.comment.is_liking) {
        //   如果已点赞 取消点赞 反之
        await addCommentLike(this.comment.com_id.toString())
        this.comment.like_count--
      } else {
        await deleteCommentLike(this.comment.com_id.toString())
        this.comment.like_count++
      }
      this.comment.is_liking = !this.comment.is_liking
      this.$toast.success({
        message: `${this.comment.is_liking ? '点赞成功' : '已取消点赞'}`
      })
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 13px;
  }
  .name-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .name {
    font-size: 14px;
    color: #406599;
  }
  .content {
    font-size: 16px;
    color: #222;
  }
  .date-wrap {
    display: flex;
    align-content: center;
  }
  .pubdate {
    font-size: 11px;
    margin-right: 20px;
  }
  .reply-btn {
    padding: 0 12px;
    background-color: #f4f5f6;
  }
  .liked {
    color: orange;
  }
}
</style>
