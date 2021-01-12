<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      left-arrow
      title="文章详情"
      @click-left="$router.back()"
    />
    <!-- 标题 -->
    <div class="article-wrap">
      <h1 class="title">{{ article.title }}</h1>
      <div class="info">
        <div class="info-item">
          <van-image
            round
            fit="cover"
            class="avatar"
            :src="article.aut_photo"
          />
          <div class="name">
            <p>{{ article.aut_name }}</p>
            <p>{{ article.pubdate | relativeTime }}</p>
          </div>
        </div>
        <van-button
          class="info-btn"
          size="mini"
          round
          :icon="article.is_followed ? '' : 'plus'"
          :type="article.is_followed ? 'default' : 'info'"
          :loading="isFollowedLoading"
          @click="addFollowed"
          >{{ article.is_followed ? '已关注' : '关注' }}
        </van-button>
      </div>
      <!-- 文章内容 -->
      <div
        ref="articleContent"
        class="content markdown-body"
        v-html="article.content"
      ></div>
      <!-- 评论列表 -->
      <comment-list
        @comment-total="commentTotal = $event"
        :list="commentList"
        :source="articleId"
        @reply-click="onReplyClick"
      />
    </div>

    <!-- 底部区域 -->
    <div class="article-footer">
      <div class="comments" @click="addComment">写评论</div>
      <div class="modules">
        <div class="like" @click="onLike">
          <van-icon
            :color="article.attitude === 1 ? 'orange' : '#777'"
            :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
          ></van-icon>
        </div>
        <div class="comment">
          <van-icon
            :badge="commentTotal"
            color="#777"
            name="comment-o"
          ></van-icon>
        </div>
        <div class="collected" @click="onCollected">
          <van-icon
            :color="article.is_collected ? 'orange' : '#777'"
            :name="article.is_collected ? 'star' : 'star-o'"
          ></van-icon>
        </div>
        <div class="share">
          <van-icon color="#777" name="share"></van-icon>
        </div>
      </div>
    </div>

    <!-- 发布评论弹出层 -->
    <van-popup v-model="show" position="bottom">
      <post-comment @post-success="onPostSuccess" :target="articleId" />
    </van-popup>
    <!-- 回复评论弹出层 -->
    <van-popup v-if="replyShow" v-model="replyShow" position="bottom">
      <comment-reply
        :articleId="articleId"
        @close="replyShow = false"
        :comment="replyComment"
      />
    </van-popup>
  </div>
</template>

<script>
import './github-markdown.css'
import {
  getArtcileDetails,
  addCollected,
  deleteCollected,
  addLike,
  deleteLike
} from '@/api/article'
import { followings, noFollowings } from '@/api/user'
import { ImagePreview } from 'vant'
import CommentList from './components/comment-list'
import PostComment from './components/post-comment.vue'
import CommentReply from './components/comment-reply.vue'

export default {
  name: 'ArticleIndex',
  components: { CommentList, PostComment, CommentReply },
  props: {
    articleId: {
      type: [String, Object, Number],
      required: true
    }
  },
  data() {
    return {
      article: {},
      isFollowedLoading: false,
      show: false,
      replyShow: false,
      commentList: [], // 评论的列表
      commentTotal: 0,
      replyComment: {} // 点击当前评论 的评论对象
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticle()
  },
  mounted() {},
  methods: {
    //   获取文章详情
    async loadArticle() {
      const { data } = await getArtcileDetails(this.articleId)
      this.article = data.data
      /**
       * 在获取到 文章内容的 返回数据后
            1.获取文章内容内容的 DOM容器
            2.得到所有的 img标签
            3.循环 img列表 给 img绑定点击事件
            4.在事件处理函数中 调用 ImagePerview( ) 方法图片预览
       */

      this.$nextTick(() => {
        this.handlePerview()
      })
    },
    // 图片预览
    handlePerview() {
      const result = this.$refs.articleContent
      const imgs = result.querySelectorAll('img')
      const imgPath = []
      imgs.forEach((img, index) => {
        imgPath.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: imgPath,
            startPosition: index
          })
        }
      })
    },
    // 关注/取消关注
    async addFollowed() {
      this.isFollowedLoading = true
      if (this.article.is_followed) {
        //   如果已关注 取消关注 反之
        await noFollowings(this.article.aut_id)
      } else {
        await followings(this.article.aut_id)
      }
      this.article.is_followed = !this.article.is_followed
      this.isFollowedLoading = false
    },
    // 收藏/取消收藏
    async onCollected() {
      this.$toast.loading({
        message: '操作中..',
        forbidClick: true
      })
      if (this.article.is_collected) {
        //   如果已收藏 取消收藏 反之
        await addCollected(this.article.art_id)
      } else {
        await deleteCollected(this.article.art_id)
      }
      this.article.is_collected = !this.article.is_collected
      this.$toast.success({
        message: `${this.article.is_collected ? '' : '取消'}收藏成功`
      })
    },
    // 点赞/取消点赞
    async onLike() {
      this.$toast.loading({
        message: '操作中..',
        forbidClick: true
      })
      if (this.article.attitude === 1) {
        //   如果已点赞 取消点赞 反之
        await addLike(this.article.art_id)
        this.article.attitude = -1
      } else {
        await deleteLike(this.article.art_id)
      }
      this.article.attitude = 1
      this.$toast.success({
        message: `${this.article.attitude === 1 ? '点赞成功' : '已取消点赞'}`
      })
    },
    // 写评论
    addComment() {
      this.show = true
    },
    // 发布评论成功
    onPostSuccess(comment) {
      this.$toast.loading({
        message: '发布中...'
      })
      // 每次 添加的评论 追加至 评论列表的 顶部
      this.commentList.unshift(comment)
      this.show = false
      this.commentTotal++
    },
    // 展示评论
    onReplyClick(comment) {
      this.replyShow = true
      this.replyComment = comment
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  background-color: #fff;

  .title {
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
  }
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px;
    .info-item {
      display: flex;
      justify-content: center;
      align-items: center;
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 8px;
      }
      .name {
        p:nth-child(1) {
          font-size: 13px;
          color: #383738;
        }
        p:nth-child(2) {
          font-size: 13px;
          color: #c3c2c3;
        }
      }
    }
    .info-btn {
      width: 85px;
    }
  }

  .content {
    padding: 14px;
  }
  ul {
    list-style: unset;
  }

  //   底部模块
  .article-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 43px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    padding: 0 15px;
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
    .modules {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 163px;
    }
  }
}

.article-wrap {
  background-color: #fff;
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 44px;
  overflow-y: auto;
}
</style>
