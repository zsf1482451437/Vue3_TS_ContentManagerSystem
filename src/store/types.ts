/*
 * @Description: 待编辑
 * @Author: SiFeng Zhai
 * @Date: 2022-05-17 15:16:51
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-09-16 15:34:09
 */
import { ISystemState } from './main/system/types'
import { ILoginState } from './login/types'
import { IDashboardState } from './main/analysis/type'

export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}
export type IStoreType = IRootState & IRootWithModule
