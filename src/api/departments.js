import request from '@/utils/request'
/** *
 *
 * 获取组织架构数据
 * **/
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}
/**
 *
 * 根据id删除部门 接口是根据restful的规则设计的   删除 delete  新增 post  修改put 获取 get
 */
export function delDepartments(id) {
  return request({
    method: 'delete',
    url: `/company/department/${id}`
  })
}
/**
 *
 * 新增部门接口
 */
export function addDeparmrnts(data) {
  return request({
    method: '/company/department',
    url: 'post',
    data
  })
}

