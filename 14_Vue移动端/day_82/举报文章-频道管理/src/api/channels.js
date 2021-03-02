import http from '@/utils/http'

/**
 * 获取用户频道
 */
export const reqGetChannels = () => {
  return http({
    method: 'get',
    url: '/v1_0/user/channels'
  })
}

/**
 * 获取所有的频道信息
 */
export const reqGetAllChannels = () => {
  return http({
    method: 'get',
    url: '/v1_0/channels'
  })
}
