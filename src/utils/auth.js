/**
 * 疑问
 * cookies
 */

import Cookies from 'js-cookie'

const TokenKey = 'hrsass-ihrm-token'
const timekey = 'hrsass-timestamp-key' // 设置一个独一无二的key

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(timekey)
}
// 设置时间戳
export function setTimeStap() {
  Cookies.set(timekey, Date.now())
}

