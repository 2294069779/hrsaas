// 导出属于员工的路由规则
import Layout from '@/layout'
export default {
  path: '/employees', // 路径
  // 每个子模块都是layout 组件位于layout的二级路由里面
  component: Layout,
  name: 'employees', // 给路由规则加一个name
  children: [{
    path: '',
    component: () => import('@/views/employees'),
    // 路由元信息 其实就是存储数据的对象 我们可以在里面放置一些信息
    meta: {
      title: '员工信息', // title，因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
      icon: 'people'
    }
  }, {
    path: '/employess/detail/:id', // query传参 动态路由传参
    component: () => import('@/views/employees/detail'),
    hidden: true,
    meta: {
      title: '员工详情' // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
    }

  },
  {
    path: 'print/:id',
    component: () => import('@/views/employees/print'),
    hidden: true,
    meta: {
      title: '打印', // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
      icon: 'people'
    }
  }
  ]
}
