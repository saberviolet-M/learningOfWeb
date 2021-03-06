<template>
  <div class="articleList">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="==私は底线もある=="
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item.art_id.toString()"
          :title="item.title"
        >
          <template #label>
            <van-grid :column-num="item.cover.images.length">
              <van-grid-item
                v-for="(img, index) in item.cover.images"
                :key="index"
              >
                <van-image lazy-load :src="img" />
              </van-grid-item>
            </van-grid>
            <!-- 文字说明 -->
            <div class="meta">
              <span>{{ item.aut_name }}</span>
              <span>{{ item.comm_count }}评论</span>
              <span>{{ item.pubdate | relative }}</span>
            </div>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { reqGetArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      timestamp: null
    }
  },
  methods: {
    async onLoad() {
      if (!this.timestamp) {
        this.timestamp = +new Date()
      }
      // 异步更新数据
      console.log('当前数据的条数', this.list.length, '加载新数据')
      const {
        data: { data: articles }
      } = await reqGetArticles(this.channel.id, this.timestamp)
      this.timestamp = articles.pre_timestamp
      this.list = [...this.list, ...articles.results]
      this.loading = false
      if (articles.results === 0) {
        this.finished = true
      }
    },
    // 下拉刷新
    async onRefresh() {
      console.log('下拉刷新了')
      // 1. 取回最新的文章 (要传入最新的时间戳)
      const {
        data: { data: result }
      } = await reqGetArticles(this.channel.id, Date.now())
      // 保存时间戳, 以便加载下一页传入
      this.timestamp = result.pre_timestamp
      // 2. 将数据覆盖到 list中
      this.list = result.results
      // 3. 提示更新结果
      this.$toast.success('刷新成功')
      // 4. 结束loading状态
      this.refreshing = false
    }
  }
}
</script>

<style lang="scss" scoped>
.articleList {
  .meta {
    span {
      margin-right: 10px;
    }
  }
}
</style>
