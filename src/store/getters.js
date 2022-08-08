const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  // avatar: state => state.user.avatar,
  name: state => state.user.userInfo.username, // 建立用户名称的映射
  userId: state => state.user.userInfo.userId, // id的快捷访问
  staffPhoto: state => state.user.userInfo.staffPhoto// 头像的获取方法
}
export default getters
