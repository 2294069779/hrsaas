
// 自己构建
import { getToken, setToken, removeToken, setTimeStap } from '@/utils/auth'
import { login, getUserInfo, getUserDeatilById } from '@/api/user'

const state = {
  token: getToken(),
  userInfo: {} // 定义个空对象，因为后边我要开发userInfo的属性给别人用

}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  // 将修改的值写入state中
  setUserInfo(state, result) {
    state.userInfo = { ...result } // 用形参来浅拷贝的方式去赋值对象，是响应式的
  },
  // 删除state中的用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  }

}
const actions = {
  // 登入
  async login(context, data) {
    const result = await login(data) // 实际上就是一个promise  result就是执行的结果
    // axios默认给数据加了一层data
    // 表示登录接口调用成功 也就是意味着你的用户名和密码是正确的
    // 现在有用户token
    // actions 修改state 必须通过mutations
    context.commit('setToken', result)
    // 写入时间戳
    setTimeStap()
  },
  // 获取用户资料
  async getUserInfo(context) {
    const result = await getUserInfo() // 调用getuserInfo方法
    const baseInfo = await getUserDeatilById(result.userId) // 为了获取头像
    context.commit('setUserInfo', { ...result, ...baseInfo }) // 两个结果合并

    return result //
  },
  // 登出的actio
  logout(context) {
    // 删除token
    context.commit('removeToken')
    // 删除用户资料
    context.commit('removeUserInfo')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
