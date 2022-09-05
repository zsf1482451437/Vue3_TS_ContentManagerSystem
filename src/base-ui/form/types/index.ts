/*
 * @Description: 待编辑
 * @Author: SiFeng Zhai
 * @Date: 2022-05-23 14:41:41
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-09-05 11:17:47
 */
type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
  // 是否隐藏
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}
