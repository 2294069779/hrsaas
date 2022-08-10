import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getTimeStamp } from '@/utils/auth'
const timeout = 3600
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器 interceptors.request
service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (IsCheckTimout()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})
// 响应拦截器 interceptors.response
service.interceptors.response.use(res => {
  const { success, message, data } = res.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, err => {
  if (err.res && err.res.data && err.res.data.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
  } else {
    Message.error(err.message)
  }
  return Promise.reject(err)
})

// 设置一个判断是否token超时的函数
function IsCheckTimout() {
  var currentTime = Date.now()
  var timeStamp = getTimeStamp()
  return (currentTime - timeStamp) / 1000 > timeout
}
export default service
