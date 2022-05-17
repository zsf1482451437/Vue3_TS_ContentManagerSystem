import sfRequest from '../index'

import { IAccount, IDataType, ILoginResult } from './type'
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法: /users/1
  UserMenus = '/role/' // 用法: role/1/menu
}
// 登陆
export function accountLoginRequest(account: IAccount) {
  return sfRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}
// 根据用户查询用户信息
export function requestUserInfoById(id: number) {
  return sfRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}
// 根据用户id请求菜单
export function requestUserMenusByRoleId(id: number) {
  return sfRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
