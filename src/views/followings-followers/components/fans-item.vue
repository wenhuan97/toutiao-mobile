<template>
  <div class="fans-item">
    <van-cell-group>
      <van-cell border>
        <van-image
          class="avatar"
          slot="icon"
          fit="cover"
          round
          :src="fans.photo"
        />
        <div slot="title" class="name">{{ fans.name }}</div>
        <div slot="label" class="fans">粉丝数：{{ fans.fans_count }}</div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'FansItem',
  components: {},
  props: {
    fans: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      //   follows: this.follow
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.avatar {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.name {
  font-size: 14px;
  color: #222222;
}
.fans {
  font-size: 11px;
  color: #b2b2b2;
}
.btn {
  width: 58px;
  height: 30px;
}
/deep/ .van-button--small {
  padding: 0;
}
</style>
