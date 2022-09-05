/*
 * @Description: 待编辑
 * @Author: SiFeng Zhai
 * @Date: 2022-08-31 15:07:42
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-09-05 16:51:44
 */
import { IForm } from '@/base-ui/form'

export const modelConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码',
      isHidden: false
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'departmentId',
      type: 'select',
      label: '部门',
      placeholder: '请选择部门',
      options: []
    },
    {
      field: 'roleId',
      type: 'select',
      label: '角色',
      placeholder: '请选择角色',
      options: []
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
