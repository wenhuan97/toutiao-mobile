<template>
  <div class="follow-item">
    <van-cell-group>
      <van-cell border>
        <van-image
          class="avatar"
          slot="icon"
          fit="cover"
          round
          :src="follow.photo"
        />
        <div slot="title" class="name">{{ follow.name }}</div>
        <div slot="label" class="fans">粉丝数：{{ follow.fans_count }}</div>
        <van-button
          class="btn"
          size="small"
          :loading="isFollowedLoading"
          @click="addFollowed"
          :type="follow.mutual_follow ? 'default' : 'danger'"
          >{{ follow.mutual_follow ? '互相关注' : '关注' }}</van-button
        >
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { followings, noFollowings } from '@/api/user'

export default {
  name: 'FollowItem',
  components: {},
  props: {
    follow: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      //   follows: this.follow
      isFollowedLoading: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 关注/取消关注
    async addFollowed() {
      this.isFollowedLoading = true
      if (this.follow.mutual_follow) {
        //   如果已关注 取消关注 反之
        await noFollowings(this.follow.id)
      } else {
        await followings(this.follow.id)
      }
      this.follow.mutual_follow = !this.follow.mutual_follow
      this.isFollowedLoading = false
    }
  }
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
