<template>
  <div class="collect-his-item">
    <div>
      <van-cell :border="false" @click="goArticle(collect)">
        <div slot="title" class="title">
          {{ collect.title }}
        </div>
        <!-- 三图 -->
        <div slot="label">
          <div class="cover-wrap" v-if="collect.cover.type === 3">
            <div
              class="cover-wrap-item"
              :key="index"
              v-for="(img, index) in collect.cover.images"
            >
              <van-image class="cover-item" fit="cover" :src="img" />
            </div>
          </div>
          <!-- 名称 日期 -->
          <div class="aut-wrap">
            <div class="name">
              {{ collect.aut_name }}
            </div>
            <div class="date">
              {{ collect.pubdate | dateTime('YYYY-MM-DD') }}
            </div>
          </div>
          <van-grid
            v-if="collect.cover.type === 3"
            class="grid"
            icon-size="19"
            direction="horizontal"
            :column-num="3"
          >
            <van-grid-item
              icon="comment-o"
              :text="`${collect.comm_count} 评论`"
            />
            <van-grid-item
              @click.stop="onLiked"
              :icon="collect.is_liking ? 'good-job-o' : 'good-job'"
              :text="`${collect.like_count} 点赞`"
            />
            <van-grid-item
              icon="star-o"
              :text="`${collect.collect_count} 收藏`"
            />
          </van-grid>
        </div>
        <!-- 一图 -->
        <van-image
          v-if="collect.cover.type === 1"
          fit="cover"
          :src="collect.cover.images[0]"
          class="img"
        />
      </van-cell>
      <div>
        <van-grid
          v-if="collect.cover.type === 1 || collect.cover.type === 0"
          class="grid"
          icon-size="19"
          direction="horizontal"
          :column-num="3"
        >
          <van-grid-item
            icon="comment-o"
            :text="`${collect.comm_count} 评论`"
          />
          <van-grid-item
            @click.stop="onLiked"
            :icon="collect.is_liking ? 'good-job-o' : 'good-job'"
            :text="`${collect.like_count} 点赞`"
          />
          <van-grid-item
            icon="star-o"
            :text="`${collect.collect_count} 收藏`"
          />
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import { addLike, deleteLike } from '@/api/article'

export default {
  name: 'CollectHisItem',
  components: {},
  props: {
    collect: {
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
    //   跳转至文章详情
    goArticle(collect) {
      this.$router.push({
        name: 'article',
        params: { articleId: collect.art_id }
      })
    },
    // 点赞/取消点赞
    async onLiked() {
      this.$toast.loading({
        message: '操作中..',
        forbidClick: true
      })
      if (!this.collect.is_liking) {
        //   如果已点赞 取消点赞 反之
        await addLike(this.collect.art_id.toString())
        this.collect.like_count--
      } else {
        await deleteLike(this.collect.art_id.toString())
        this.collect.like_count++
      }
      this.$toast.success({
        message: `${this.collect.is_liking ? '点赞成功' : '已取消点赞'}`
      })
      this.collect.is_liking = !this.collect.is_liking
    }
  }
}
</script>

<style scoped lang="less">
.collect-his-item {
  background-color: #f9f9f9;
  .title {
    color: #3a3a3a;
    font-size: 15px;
  }
  .van-cell__value {
    flex: unset;
    margin-left: 10px;
    width: 116px;
    height: 75px;
    box-sizing: border-box;
    .img {
      width: 100%;
      height: 100%;
    }
  }

  .cover-wrap {
    display: flex;
    padding: 15px 0;
    .cover-wrap-item {
      flex: 1;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item {
        width: 100%;
        height: 75px;
      }
    }
  }

  .grid {
    /deep/ .van-grid-item__content {
      height: 46px;
      .van-grid-item__text {
        font-size: 13px;
        color: #333;
      }
    }
  }

  .aut-wrap {
    display: flex;
    align-items: center;
    .name {
      font-size: 11px;
      color: #b4b4b4;
      margin-right: 10px;
    }
    .date {
      font-size: 9px;
      color: #b4b4b4;
    }
  }

  .van-cell {
    padding: 10px 16px 0;
    margin-top: 10px;
  }
}
</style>
