/*
 * @Description: 待编辑
 * @Author: SiFeng Zhai
 * @Date: 2022-08-10 08:50:38
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-08-10 08:57:05
 */
import { useStore } from '@/store'

export function usePermission(pageName: string | any, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handleName}`

  return !!permissions.find((item) => item === verifyPermission)
}
