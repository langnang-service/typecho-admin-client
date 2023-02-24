import Mock from 'mockjs'
import request from '@/plugins/axios'
const TIME_DELAY = 1500
export const insert_typecho_meta_item = data => {
  return request({
    url: '/api/typecho/meta/item/insert',
    method: "post",
    data,
  })
}
export const delete_typecho_meta_list = data => {
  return request({
    url: '/api/typecho/meta/list/delete',
    method: "post",
    data,
  })
}
export const update_typecho_meta_item = data => {
  return request({
    url: '/api/typecho/meta/item/update',
    method: "post",
    data,
  })
}
export const select_typecho_meta_item = data => {
  return request({
    url: '/api/typecho/meta/item/select',
    method: "post",
    data,
  })
}
export const select_typecho_meta_list = data => {
  return request({
    url: '/api/typecho/meta/list/select',
    method: "post",
    data,
  })
}
export const select_typecho_meta_tree = data => {
  return request({
    url: '/api/typecho/meta/tree/select',
    method: "post",
    data,
  })
}
export const select_typecho_meta_distinct = data => {
  return request({
    url: '/api/typecho/meta/list/distinct',
    method: "post",
    data,
  })
}