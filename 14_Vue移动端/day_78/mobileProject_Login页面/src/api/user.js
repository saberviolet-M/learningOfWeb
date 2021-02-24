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
