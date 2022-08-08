import request from '@/utils/request'

/**
 * 登入接口
*/
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
/**
 * 获取用户资料的方法
 */
export function getUserInfo() {
  return request({
    url: 'sys/profile',
    method: 'post'
  })
}
/**
 * 获取用户基本信息
*/
export function getUserDeatilById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
export function logout() {
  // return request({
  //   url: '/vue-admin-template/user/logout',
  //   method: 'post'
  // })
}
