import http from '@/utils/http'

/**
 * 用户登录
 * @param {*} mobile 手机号
 * @param {*} code 验证码(密码)
 */
export const reqLogin = (mobile, code) => {
  return http({
    method: 'post',
    url: '/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 获取用户信息
 */
export const reqGetProfile = () => {
  return http({
    method: 'get',
    url: '/v1_0/user/profile'
  })
}

/**
 * 关注用户
 * @param {*} userId 作者的id
 */
export const reqFollowUser = userId => {
  return http({
    method: 'post',
    url: '/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}
/**
 * 取消关注用户
 * @param {*} userId 作者的id
 */
export const reqUnFollowUser = userId => {
  return http({
    method: 'delete',
    url: '/v1_0/user/followings/' + userId
  })
}
