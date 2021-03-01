<template>
  <div class="more-action">
    <!-- 状态一 -->
    <van-cell-group v-if="!isReport">
      <van-cell @click="disLike">不感兴趣</van-cell>
      <van-cell is-link @click="isReport = true">反馈垃圾内容</van-cell>
      <van-cell>拉黑作者</van-cell>
    </van-cell-group>
    <!-- 状态二 反馈-->
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReport = false">返回</van-cell>
      <van-cell>侵权</van-cell>
      <van-cell>色情</van-cell>
      <van-cell>暴力</van-cell>
      <van-cell>低俗</van-cell>
      <van-cell>不适</van-cell>
      <van-cell>错误</van-cell>
      <van-cell>其他</van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'MoreAction',
  data() {
    return {
      isReport: false // 是否是处于状态二：反馈
    }
  },
  methods: {
    disLike() {
      this.$bus.$emit('delDisLike')
    }
  }
}
</script>

<style lang="scss" scoped>
.more-action {
  border-radius: 4px;
}
</style>
