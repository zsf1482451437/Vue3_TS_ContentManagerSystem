/*
 * @Description: 待编辑
 * @Author: SiFeng Zhai
 * @Date: 2022-05-17 15:16:51
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-09-15 08:24:26
 */
import { Module } from 'vuex'
import { ILoginState } from './types'
import { IRootState } from '../types'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/services/login/login'
import { IAccount } from '@/services/login/type'
import localCache from '@/utils/cache'
import { mapMenuToRoutes, mapMenuToPermission } from '@/utils/map-menus'
import router from '@/router'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    // 修改token
    changeToken(state, token: string) {
      state.token = token
    },
    // 修改用户信息
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    // 修改用户菜单
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // userMenus映射成routes
      const routes = mapMenuToRoutes(userMenus)

      // routes放进main的子路由中
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 获取用户按钮权限
      const permissions = mapMenuToPermission(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.登陆逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      // 将token保存到本地缓存
      localCache.setCache('token', token)

      // 发送初始化请求（完整的role/department）
      dispatch('getInitialDataAction', null, { root: true })
      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      // 将userInfo保存到本地缓存
      localCache.setCache('userInfo', userInfo)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      // 将userMenus保存到本地缓存
      localCache.setCache('userMenus', userMenus)

      // 4.跳到首页
      router.push('/main')
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 发送初始化请求（完整的role/department）
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
