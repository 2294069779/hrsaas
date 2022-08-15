import request from '@/utils/request'
// 获取员工数据

/**
 * 获取员工的简单列表
 */
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

