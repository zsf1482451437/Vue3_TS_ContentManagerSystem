/*
 * @Description: 待编辑
 * @Author: SiFeng Zhai
 * @Date: 2022-09-16 08:19:15
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-09-16 08:30:08
 */
import sfRequest from '@/services'

enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
  return sfRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}

export function getCategoryGoodsSale() {
  return sfRequest.get({
    url: DashboardAPI.categoryGoodsSale
  })
}

export function getCategoryGoodsFavor() {
  return sfRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}

export function getAddressGoodsSale() {
  return sfRequest.get({
    url: DashboardAPI.addressGoodsSale
  })
}
