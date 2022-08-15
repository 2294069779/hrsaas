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
 * 接口满足restful接口规范同样的地址 不同的方法 执行不同的任务
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
    url: '/company/department',
    method: 'post',
    data
  })
}
/** *
 * 获取部门详情
 * ***/
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}
/**
 * 编辑部门
 *
 * ***/
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}

