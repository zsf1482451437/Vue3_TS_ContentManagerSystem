/*
 * @Description: 待编辑
 * @Author: SiFeng Zhai
 * @Date: 2022-09-05 08:59:24
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-09-05 09:53:06
 */
import { ref } from 'vue'
import PageModel from '@/components/page-model'

type CallbackFn = () => void

export function usePageModel(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModelRef = ref<InstanceType<typeof PageModel>>()
  const defaultInfo = ref({})
  // 新建
  const create = () => {
    // 新建时置空
    defaultInfo.value = {}
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    // newCb有值时调用
    newCb && newCb()
  }
  // 编辑
  const edit = (item: any) => {
    // 编辑时赋值
    defaultInfo.value = { ...item }
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    // editCb有值时调用
    editCb && editCb()
  }

  return [pageModelRef, defaultInfo, create, edit]
}
