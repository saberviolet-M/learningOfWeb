<template>
  <div class="profile">
    <!-- 导航条 -->
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      title="编辑资料"
    ></van-nav-bar>

    <!-- 编辑区 -->
    <van-cell-group>
      <!-- 更改头像 -->
      <!-- hidden 是表单元素的一个固有属性, 可以隐藏, 效果类似于 display: none;  -->
      <input @change="changePhoto" type="file" ref="refPhoto" hidden />
      <van-cell @click="$refs.refPhoto.click()" is-link title="头像" center>
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          :src="user.photo"
        />
      </van-cell>
      <!-- /更改头像 -->

      <!-- 名字 -->
      <van-cell
        is-link
        title="名称"
        :value="user.name"
        @click="clickShowName"
      />
      <!-- 修改名字 -->
      <van-dialog
        @confirm="saveName"
        v-model="showName"
        title="修改姓名"
        show-cancel-button
      >
        <van-field v-model.trim="newName" placeholder="请输入姓名"></van-field>
      </van-dialog>
      <!-- /修改名字 -->

      <!-- 性别 -->
      <van-cell
        is-link
        title="性别"
        :value="user.gender === 0 ? '男' : '女'"
        @click="showGender = true"
      />
      <!-- 修改性别 -->
      <van-popup v-model="showGender" position="bottom">
        <van-nav-bar
          title="修改性别"
          left-text="取消"
          @click-left="showGender = false"
        >
        </van-nav-bar>
        <van-cell title="男" @click="saveGender(0)" is-link></van-cell>
        <van-cell title="女" @click="saveGender(1)" is-link></van-cell>
      </van-popup>
      <!-- /修改性别 -->

      <!-- 生日 -->
      <van-cell
        is-link
        title="生日"
        :value="user.birthday"
        @click="clickShowBirthday"
      />
      <!-- 修改生日 -->
      <van-popup v-model="showBirthday" position="bottom">
        <van-datetime-picker
          @cancel="showBirthday = false"
          @confirm="saveBirthday"
          v-model="newDate"
          type="date"
          title="选择生日"
          :min-date="minDate"
          :max-date="maxDate"
        />
      </van-popup>
      <!-- /修改生日 -->
    </van-cell-group>
  </div>
</template>

<script>
import { reqGetProfile, reqUpdateUserInfo, reqUpdatePhoto } from '@/api/user'
import dayjs from 'dayjs'

export default {
  name: 'userProfile',
  data() {
    return {
      // 控制弹层
      showName: false,
      showGender: false,
      showBirthday: false,
      // 当前用户的信息
      user: {},
      newName: '',
      minDate: new Date(1900, 0, 1), // 最小时间
      maxDate: new Date(), // 最大时间
      newDate: new Date() // 修改后的新生日
    }
  },
  created() {
    this.loadProfile()
  },
  methods: {
    async loadProfile() {
      const res = await reqGetProfile()
      this.user = res.data.data
      console.log(this.user)
    },
    clickShowName() {
      this.showName = true
      this.newName = this.user.name
    },
    async saveName() {
      try {
        // 保存名字
        if (this.newName === '') return
        if (this.newName.length > 7) {
          this.$toast.fail('名字长度不能超过 7 个字符')
          return
        }
        // 发送请求, 修改姓名
        await reqUpdateUserInfo({
          name: this.newName
        })
        // 更新视图
        this.user.name = this.newName
        this.newName = ''
        this.$toast.success('修改成功')
      } catch {
        this.$toast.fail('修改失败')
      }
    },
    async saveGender(gender) {
      // console.log(gender)
      try {
        await reqUpdateUserInfo({
          gender
        })
        this.user.gender = gender
        this.$toast.success('修改成功')
        this.showGender = false
      } catch {
        this.$toast.success('修改失败')
      }
    },
    clickShowBirthday() {
      this.showBirthday = true
      this.newDate = new Date(this.user.birthday)
      console.log(this.user.birthday)
    },
    async saveBirthday() {
      try {
        const birthday = dayjs(this.newDate).format('YYYY-MM-DD')
        await reqUpdateUserInfo({
          birthday
        })
        // 更新视图
        this.user.birthday = birthday
        this.$toast.success('修改成功')
        this.showBirthday = false
      } catch {
        this.$toast.fail('修改失败')
        this.showBirthday = false
      }
    },
    async changePhoto() {
      try {
        // this.$refs.refPhoto 就是页面上的input文件选择框
        // 它有一个属性files，是一个集合，其中就放置着当前用户选中的文件
        // console.log(this.$refs.refPhoto.files[0])
        const file = this.$refs.refPhoto.files[0]
        // 如果用户直接点击了取消, 就没有选择文件, 不进行上传
        if (!file) return

        this.$toast.loading({
          message: '文件上传中...',
          forbidClick: true,
          overlay: true
        })

        // 利用formData收集文件对象
        const formData = new FormData()
        formData.append('photo', file)

        // 发送请求
        const res = await reqUpdatePhoto(formData)
        // 更新页面
        this.user.photo = res.data.data.photo
        this.$toast.success('更新成功')
      } catch {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  ::v-deep {
    .van-nav-bar__text {
      color: #fff;
    }
  }
}
</style>
