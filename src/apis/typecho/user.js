import Mock from 'mockjs'
import request from '@/utils/request'
const TIME_DELAY = 1500

export const signin_typecho_user_item = request('/api/typecho/user/item/signin')

export const signup_typecho_user_item = request('/api/typecho/user/item/signup')

export const insert_typecho_user_item = data => {
  return request({
    url: '/api/typecho/user/item/insert',
    method: "post",
    data,
  })
}
export const delete_typecho_user_item = data => {
  return request({
    url: '/api/typecho/user/item/delete',
    method: "post",
    data,
  })
}
export const delete_typecho_user_list = data => {
  return request({
    url: '/api/typecho/user/list/delete',
    method: "post",
    data,
  })
}
export const update_typecho_user_item = data => {
  return request({
    url: '/api/typecho/user/item/update',
    method: "post",
    data,
  })
}
export const select_typecho_user_list = data => {
  return request({
    url: '/api/typecho/user/list/select',
    method: "post",
    data,
  })
}
export const select_typecho_user_item = data => {
  return request({
    url: '/api/typecho/user/item/select',
    method: "post",
    data,
  })
}
