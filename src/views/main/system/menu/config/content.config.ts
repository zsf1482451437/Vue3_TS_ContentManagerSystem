/*
 * @Description: 菜单列表配置
 * @Author: SiFeng Zhai
 * @Date: 2022-08-09 17:27:30
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-08-09 22:31:39
 */
export const contentTableConfig = {
  title: '菜单',
  propsList: [
    { prop: 'name', label: '菜单名称', minWidth: '100' },
    { prop: 'type', label: '类型', minWidth: '60' },
    { prop: 'url', label: '菜单url', minWidth: '100' },
    { prop: 'icon', label: '菜单icon', minWidth: '100' },
    {
      prop: 'permission',
      label: '按钮权限',
      minWidth: '100'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '220',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '220',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  showFooter: false
}
