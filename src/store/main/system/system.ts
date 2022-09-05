/*
 * @Description: 状态管理
 * @Author: SiFeng Zhai
 * @Date: 2022-05-26 16:55:29
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-09-05 16:47:36
 */
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState } from './types'
import {
  deletePageData,
  getPageListData,
  createPageData,
  editPageData
} from '@/services/main/system/system'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    // 查询
    async getPageListAction({ commit }, payload: any) {
      // 1.获取页面url
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`

      // 2.发送页面请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 3.将数据存储在state中
      const { list, totalCount } = pageResult.data
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },
    // 删除
    async deletePageDataAction({ dispatch }, payload) {
      // 1.获取pageName和id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      // 2.发起删除网络请求
      await deletePageData(pageUrl).then((res) => {
        ElMessage({
          message: res.data,
          type: 'warning'
        })
      })
      // 3.重新请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    // 新增
    async createPageDataAction({ dispatch }, payload: any) {
      // 1.创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData).then(() =>
        ElMessage({
          message: '新建成功！',
          type: 'success'
        })
      )
      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    // 编辑
    async editPageDataAction({ dispatch }, payload: any) {
      // 1.编辑数据的请求
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}}`
      await editPageData(pageUrl, editData)
        .then(() =>
          ElMessage({
            message: '修改成功！',
            type: 'success'
          })
        )
        .catch(() => {
          ElMessage({
            message: '修改失败，请联系服务器管理员',
            type: 'warning'
          })
        })

      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
