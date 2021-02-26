<template>
  <div class="home-container">
    <van-tabs v-model="active">
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <p>{{ item.name }}</p>
        <p>{{ item.name }}</p>
        <p>{{ item.name }}</p>
        <p>{{ item.name }}</p>
        <p>{{ item.name }}</p>
        <p>{{ item.name }}</p>
        <p>{{ item.name }}</p>
        <p>{{ item.name }}</p>
        <p>{{ item.name }}</p>
        <p>{{ item.name }}</p>
        <p>{{ item.name }}</p>
        <p>{{ item.name }}</p>
        <p>{{ item.name }}</p>
        <p>{{ item.name }}</p>
        <p>{{ item.name }}</p>
        <p>{{ item.name }}</p>
        <p>{{ item.name }}</p>
        <p>{{ item.name }}</p>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { reqGetChannels } from '@/api/channels.js'
export default {
  name: 'HomeIndex',
  data() {
    return {
      active: 0,
      channels: []
    }
  },
  methods: {
    async loadChannels() {
      const {
        data: {
          data: { channels }
        }
      } = await reqGetChannels()
      this.channels = channels
    }
  },
  created() {
    this.loadChannels()
  }
}
</script>

<style lang="scss" scoped>
// 加了scoped, 样式, 只会作用于当前组件模板
// 深度作用选择器 ::v-deep (sass) | /deep/ (less) | >>> (css)
.home-container {
  padding-top: 46px;
  ::v-deep {
    .van-tabs__line {
      background-color: #3196fa;
    }
    .van-tabs__wrap {
      position: fixed;
      top: 46px;
      width: 100%;
    }
  }
}
</style>
