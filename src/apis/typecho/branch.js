import Mock from 'mockjs'
import request from '@/plugins/axios'
const TIME_DELAY = 1500
export const insert_typecho_branch_item = data => {
  return request({
    url: '/api/typecho/branch/item/insert',
    method: "post",
    data,
  })
}
export const delete_typecho_branch_item = data => {
  return request({
    url: '/api/typecho/branch/item/delete',
    method: "post",
    data,
  })
}
export const delete_typecho_branch_list = data => {
  return request({
    url: '/api/typecho/branch/list/delete',
    method: "post",
    data,
  })
}
export const update_typecho_branch_item = data => {
  return request({
    url: '/api/typecho/branch/item/update',
    method: "post",
    data,
  })
}
export const select_typecho_branch_list = data => {
  return request({
    url: '/api/typecho/branch/list/select',
    method: "post",
    data,
  })
}
export const select_typecho_branch_item = data => {
  return request({
    url: '/api/typecho/branch/item/select',
    method: "post",
    data,
  })
}
