/*
 * @Description: 待编辑
 * @Author: SiFeng Zhai
 * @Date: 2022-08-31 15:07:42
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-09-15 08:30:51
 */
import { IForm } from '@/base-ui/form'

export const modelConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色',
      placeholder: '请输入角色'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
