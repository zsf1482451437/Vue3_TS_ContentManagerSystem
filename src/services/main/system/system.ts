/*
 * @Description: 待编辑
 * @Author: SiFeng Zhai
 * @Date: 2022-05-31 09:40:50
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-09-05 15:47:21
 */
import { IDataType } from '@/services/types'
import sfRequest from '@/services'

// 查询列表
export function getPageListData(url: string, queryInfo: any) {
  return sfRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

// 删除某条列表数据 url: /users/id
export function deletePageData(url: string) {
  return sfRequest.delete<IDataType>({
    url: url
  })
}

// 新增用户
export function createPageData(url: string, newData: any) {
  return sfRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

// 编辑用户
export function editPageData(url: string, editData: any) {
  return sfRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
