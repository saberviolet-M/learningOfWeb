import http from '@/utils/http'
/**
 * 获取某个频道下的文章列表
 * @param {*} channelId 频道id
 * @param {*} timestamp 时间戳
 */
export const reqGetArticles = (channelId, timestamp) => {
  return http({
    method: 'get',
    url: '/v1_1/articles',
    params: {
      with_top: 1, // 包含置顶文章
      channel_id: channelId,
      timestamp
    }
  })
}
