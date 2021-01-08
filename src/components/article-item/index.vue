<template>
  <!-- <div class="article-item">文章列表</div> -->
  <van-cell
    class="article-item"
    :to="{ name: 'article', params: { articleId: article.art_id } }"
  >
    <div slot="title" class="title">{{ article.title }}</div>
    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div
          class="cover-wrap-item"
          :key="index"
          v-for="(img, index) in article.cover.images"
        >
          <van-image class="cover-item" fit="cover" :src="img" />
        </div>
      </div>
      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image
      class="img-r"
      v-if="article.cover.type === 1"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
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
  methods: {}
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 16px;
    color: #333;
  }

  .img-r {
    width: 116px;
    height: 73px;
  }

  /deep/ .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
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
        height: 73px;
      }
    }
  }
  .label-wrap {
    font-size: 11px;
    color: #b4b4b4;
    span:nth-child(2) {
      margin: 0 12px;
    }
  }
}
</style>
