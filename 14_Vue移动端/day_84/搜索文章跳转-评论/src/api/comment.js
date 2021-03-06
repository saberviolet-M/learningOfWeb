import http from '@/utils/http'

/**
 * 获取文章的评论
 * @param {*} articleId 文章编号
 * @param {*} offset 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 */
export const reqGetComments = (articleId, offset) => {
  return http({
    method: 'get',
    url: '/v1_0/comments',
    params: {
      type: 'a', // a表示对文章的评论 ,c表示对评论的回复
      source: articleId,
      offset
    }
  })
}
