/*
 * @Description: 角色列表配置
 * @Author: SiFeng Zhai
 * @Date: 2022-08-08 07:57:32
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-08-09 08:50:17
 */
export const contentTableConfig = {
  title: '角色',
  propsList: [
    { prop: 'name', label: '角色名', minWidth: '100' },
    { prop: 'intro', label: '权限介绍', minWidth: '100' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
