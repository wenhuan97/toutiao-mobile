<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      left-arrow
      title="个人信息"
      @click-left="$router.back()"
    />
    <input
      @change="onFileChange"
      type="file"
      hidden
      ref="file"
      accept="image/*"
    />
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <van-image round fit="cover" width="36" height="36" :src="user.photo" />
    </van-cell>
    <van-cell
      @click="show = true"
      title="昵称"
      is-link
      :value="user.name"
    ></van-cell>
    <van-cell
      @click="isGenderShow = true"
      title="性别"
      is-link
      :value="user.gender === 0 ? '男' : '女'"
    ></van-cell>
    <van-cell
      @click="isBirthdayShow = true"
      title="生日"
      is-link
      :value="user.birthday"
    ></van-cell>

    <!-- 修改头像的弹出层 -->
    <van-popup
      class="update-avatar-popup"
      :style="{ height: '100%' }"
      v-if="isAvatarShow"
      v-model="isAvatarShow"
      position="bottom"
    >
      <update-avatar
        @update-avatar="user.photo = $event"
        @close="isAvatarShow = $event"
        :file="file"
      />
    </van-popup>

    <!-- 修改昵称的弹出层 -->
    <van-popup
      v-if="show"
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name v-model="user.name" @close="show = $event" />
    </van-popup>

    <!-- 修改性别的弹出层 -->
    <van-popup v-if="isGenderShow" v-model="isGenderShow" position="bottom">
      <update-gender v-model="user.gender" @close="isGenderShow = $event" />
    </van-popup>

    <!-- 修改生日的弹出层 -->
    <van-popup v-if="isBirthdayShow" v-model="isBirthdayShow" position="bottom">
      <update-birthday
        @close="isBirthdayShow = $event"
        v-model="user.birthday"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdateAvatar from './components/update-avatar.vue'

export default {
  name: 'UserProfile',
  components: { UpdateName, UpdateGender, UpdateBirthday, UpdateAvatar },
  props: {},
  data() {
    return {
      user: {},
      show: false,
      isGenderShow: false,
      isBirthdayShow: false,
      isAvatarShow: false,
      file: null // 文件对象
    }
  },
  computed: {},
  watch: {},
  created() {
    //   获取个人信息
    this.loadUserProfile()
  },
  mounted() {},
  methods: {
    async loadUserProfile() {
      const { data } = await getUserProfile()
      this.user = data.data
    },
    onFileChange() {
      //   预览 本地选择的图片
      //   const blob = window.URL.createObjectURL(this.$refs.file.files[0])
      const file = this.$refs.file.files[0]
      this.file = file
      this.isAvatarShow = true
      // 解决选择相同文件 不触发change的问题
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.van-popup {
  background-color: #f6f7fa;
}
.update-avatar-popup {
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
