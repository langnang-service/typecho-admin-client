import Mock from 'mockjs'
import request from '@/plugins/axios'
const TIME_DELAY = 1500
export const insert_typecho_content_item = data => {
  return request({
    url: '/api/typecho/content/item/insert',
    method: "post",
    data,
  })
}
export const delete_typecho_content_item = data => {
  return request({
    url: '/api/typecho/content/item/delete',
    method: "post",
    data,
  })
}
export const delete_typecho_content_list = data => {
  return request({
    url: '/api/typecho/content/list/delete',
    method: "post",
    data,
  })
}
export const update_typecho_content_item = data => {
  return request({
    url: '/api/typecho/content/item/update',
    method: "post",
    data,
  })
}
export const select_typecho_content_list = data => {
  return request({
    url: '/api/typecho/content/list/select',
    method: "post",
    data,
  })
}
export const select_typecho_content_type_list = data => {
  return request({
    url: '/api/typecho/content/list/type/select',
    method: "post",
    data,
  })
}
export const select_typecho_content_status_list = data => {
  return request({
    url: '/api/typecho/content/list/status/select',
    method: "post",
    data,
  })
}
export const select_typecho_content_item = data => {
  return request({
    url: '/api/typecho/content/item/select',
    method: "post",
    data,
  })
}
