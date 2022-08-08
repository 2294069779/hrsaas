// 导出属于员工的路由规则
import Layout from '@/layout'
export default {
  path: '/departments', // 路径
  // 每个子模块都是layout 组件位于layout的二级路由里面
  component: Layout,
  name: 'departments', // 给路由规则加一个name
  children: [{
    path: '',
    component: () => import('@/views/departments'),
    // 路由元信息 其实就是存储数据的对象 我们可以在里面放置一些信息
    meta: {
      title: '组织结构', // title，因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
      icon: 'tree'
    }
  }]
}
