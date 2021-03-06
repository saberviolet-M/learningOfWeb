<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in list" :key="index">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{ item.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636;">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px;">{{
              item.pubdate | relative
            }}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { reqGetComments } from '@/api/comment'
export default {
  name: 'ArticleComment',
  props: {
    articleId: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null
    }
  },
  created() {
    this.onLoad()
  },
  methods: {
    async onLoad() {
      // 获取评论数据
      const res = await reqGetComments(this.articleId, this.offset)
      const arr = res.data.data.results
      // 将数据添加到list中
      this.list = [...this.list, ...arr]
      // 加载状态结束
      this.loading = false
      // 判断数据是否加载完成
      if (arr.length === 0) {
        this.finished = true
      }
      // 更新offset
      this.offset = res.data.data.last_id
    }
  }
}
</script>

<style scoped lang="scss">
// 发表评论的区域是固定在下端的
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
// 给发表评论区空出地方
.van-list {
  margin-bottom: 45px;
}
</style>
