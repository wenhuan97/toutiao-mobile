<template>
  <div class="comment-reply">
    <!-- 导航 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <div slot="left">
        <van-icon @click="$emit('close')" name="cross"></van-icon>
      </div>
    </van-nav-bar>
    <!-- 当前评论项 -->
    <comment-item :comment="comment" />
    <!-- 所有评论回复 -->
    <comment-list :list="commentList" type="c" :source="comment.com_id" />

    <!-- 底部区域 -->
    <div class="article-footer">
      <div class="comments" @click="show = true">写评论</div>
    </div>

    <!-- 发布回复 弹出层 -->
    <!-- 发布评论弹出层 -->
    <van-popup v-model="show" position="bottom">
      <post-comment
        @post-success="onPostComment"
        :articleId="articleId"
        :target="comment.com_id"
      />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list.vue'
import PostComment from './post-comment.vue'

export default {
  name: 'CommentReply',
  components: { CommentItem, CommentList, PostComment },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data() {
    return {
      show: false,
      commentList: [] // 评论列表
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 回复评论
    onPostComment(comment) {
      // 把新添加的评论回复 追加到列表顶部
      this.commentList.unshift(comment)
      // 更新回复的数量
      this.comment.reply_count++
      // 关闭弹出层
      this.show = false
    }
  }
}
</script>

<style scoped lang="less">
//   底部模块
.article-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 43px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  text-align: center;
  .comments {
    width: 140px;
    height: 23px;
    box-sizing: border-box;
    border: 2px solid #8d8d8d;
    color: #8d8d8d;
    border-radius: 22px;
    font-size: 14px;
    padding-left: 13px;
  }
}
</style>
