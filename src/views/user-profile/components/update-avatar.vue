<template>
  <div class="update-avatar">
    <img class="img" :src="perviewImg" alt="" ref="image" />
    <van-nav-bar
      @click-left="$emit('close', false)"
      @click-right="onConfrim"
      class="nav-bottom"
      left-text="取消"
      right-text="完成"
    />
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  name: 'UpdateAvatar',
  components: {},
  props: {
    file: {
      //   type: File,
      required: true
    }
  },
  data() {
    return {
      perviewImg: window.URL.createObjectURL(this.file),
      cropper: null // 裁切器实例
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      dragMode: 'move',
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: true,
      movable: true
    })
  },
  methods: {
    //   获取 裁剪后的 图片 因为不支持promise 所以封装promise
    getCroppedCanvas() {
      return new Promise((resolve) => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob)
        })
      })
    },

    async onConfrim() {
      this.$toast.loading({
        message: '修改中..',
        forbidClick: true,
        duration: 0
      })
      const newFile = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', newFile)
      //   文件上传 需要提交 FormDate数据对象
      //   const fd = new FormData()
      //   fd.append('photo', this.file)
      await updateUserPhoto(fd)
      this.$emit('close', false)
      this.$emit('update-avatar', window.URL.createObjectURL(newFile))
      this.$toast.success('修改成功')
    }
  }
}
</script>

<style scoped lang="less">
.nav-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: unset;
}
.img {
  display: block;
  max-width: 100%;
}
</style>
