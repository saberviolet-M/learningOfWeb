<template>
  <div class="home-container">
    <van-tabs v-model="active">
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <article-list
          @closePopUp="showMore = false"
          @show-more="handleShowMore"
          :channel="item"
        >
        </article-list>
      </van-tab>
    </van-tabs>
    <van-popup v-model="showMore" :style="{ width: '80%' }">
      <more-action></more-action>
    </van-popup>
  </div>
</template>

<script>
import { reqGetChannels } from '@/api/channels.js'
import ArticleList from './component/ArticleList'
import MoreAction from './component/MoreAction'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    MoreAction
  },
  data() {
    return {
      active: 0,
      channels: [],
      showMore: false,
      articleId: null
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
    },
    handleShowMore() {
      this.showMore = true
    }
  },
  created() {
    this.loadChannels()
  }
}
</script>

<style lang="scss" scoped>
// 加了scoped后, 样式只会作用于当前组件模板内的内容, 不会向下渗透影响到子组件的元素
// 如果希望向下渗透, 深度作用选择器
// css  >>>,  less  /deep/,  sass  ::v-deep
.home-container {
  height: calc(100vh - 46px - 50px);
  padding-top: 46px;
  box-sizing: border-box;
  ::v-deep {
    .van-tabs__line {
      background-color: #3296fa;
    }
    .van-tabs {
      height: 100%;
      .van-tabs__wrap {
        position: fixed;
        top: 46px;
        left: 0;
        width: 100%;
      }
      .van-tabs__content {
        height: 100%;
        .van-tab__pane {
          height: 100%;
          overflow: auto;
        }
      }
    }
  }
}
</style>
