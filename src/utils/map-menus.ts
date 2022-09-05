/*
 * @Description: 待编辑
 * @Author: SiFeng Zhai
 * @Date: 2022-05-23 09:14:18
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-08-10 08:44:09
 */
import { IBreadcrumb } from '@/base-ui/breadcrumb/types'
import { RouteRecordRaw } from 'vue-router'
// 保留userMenus的二级菜单
let firstMenu: any = null
// 将用户菜单转化为路由
export function mapMenuToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    // 处理拿到的路径
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2.根据菜单获取需要的添加的routes

  // 递归获取routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        // 保留二级菜单的第一项
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}
// 根据currenPath和userMenu匹配出面包屑
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

// 根据路径转化成菜单
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  // 遍历userMenus
  for (const menu of userMenus) {
    // 如果是一级菜单
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        // 将一级菜单和二级菜单的名字和对应路径放进breadcrumbs
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
      // 如果是二级菜单并且是当前菜单项
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}
// 从userMenus里收集所有权限
export function mapMenuToPermission(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermisstion = (menus: any[]) => {
    // 找到第三层才有权限，然后将所有第三层的权限都收集起来
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermisstion(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermisstion(userMenus)

  return permissions
}

export { firstMenu }
