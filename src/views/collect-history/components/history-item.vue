<template>
  <div class="collect-his-item">
    <div item-wrap>
      <van-cell :border="false">
        <div slot="title" class="title">
          {{ history.title }}
        </div>
        <!-- 三图 -->
        <div slot="label">
          <div class="cover-wrap" v-if="history.cover.type === 3">
            <div
              class="cover-wrap-item"
              :key="index"
              v-for="(img, index) in history.cover.images"
            >
              <van-image class="cover-item" fit="cover" :src="img" />
            </div>
          </div>
          <!-- 名称 日期 -->
          <div class="aut-wrap">
            <div class="name">
              {{ history.aut_name }}
            </div>
            <div class="date">
              {{ history.pubdate | dateTime('YYYY-MM-DD') }}
            </div>
          </div>
          <van-grid
            v-if="history.cover.type === 3"
            class="grid"
            icon-size="19"
            direction="horizontal"
            :column-num="3"
          >
            <van-grid-item icon="comment-o" text="评论" />
            <van-grid-item icon="good-job-o" text="点赞" />
            <van-grid-item icon="star-o" text="收藏" />
          </van-grid>
        </div>
        <!-- 一图 -->
        <van-image
          v-if="history.cover.type === 1"
          fit="cover"
          :src="history.cover.images[0]"
          class="img"
        />
      </van-cell>
      <div>
        <van-grid
          v-if="history.cover.type === 1 || history.cover.type === 0"
          class="grid"
          icon-size="19"
          direction="horizontal"
          :column-num="3"
        >
          <van-grid-item icon="comment-o" text="评论" />
          <van-grid-item icon="good-job-o" text="点赞" />
          <van-grid-item icon="star-o" text="收藏" />
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollectHisItem',
  components: {},
  props: {
    history: {
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
