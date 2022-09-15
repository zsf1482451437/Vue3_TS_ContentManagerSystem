/*
 * @Description: 待编辑
 * @Author: SiFeng Zhai
 * @Date: 2022-05-17 15:16:51
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-09-15 09:25:55
 */
import { ISystemState } from './main/system/types'
import { ILoginState } from './login/types'

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
}
export type IStoreType = IRootState & IRootWithModule
