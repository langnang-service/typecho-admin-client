import Mock from 'mockjs'
import request from '@/plugins/axios'
import { Entry } from "@/store/modules/entry"
const TIME_DELAY = 1500
export const insert_entry_item = data => {
  return request({
    url: '/api/entry/item/insert',
    method: "post",
    data,
  })
}
export const delete_entry_list = data => {
  return request({
    url: '/api/entry/list/delete',
    method: "post",
    data,
  })
}
export const update_entry_item = data => {
  return request({
    url: '/api/entry/item/update',
    method: "post",
    data,
  })
}
export const select_entry_list = data => {
  return request({
    url: '/api/entry/list/select',
    method: "post",
    data,
  })
}
export const select_entry_item = data => {
  return request({
    url: '/api/entry/item/select',
    method: "post",
    data,
  })
}
