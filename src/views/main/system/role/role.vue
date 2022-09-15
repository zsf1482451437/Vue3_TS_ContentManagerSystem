<!--
 * @Description: 角色列表页
 * @Author: SiFeng Zhai
 * @Date: 2022-05-22 21:47:24
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-09-15 14:26:07
-->
<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @createBtn="create"
      @editBtn="edit"
    ></page-content>
    <page-model
      ref="pageModelRef"
      :defaultInfo="defaulInfo"
      :modelConfig="modelConfig"
      :otherInfo="otherInfo"
      pageName="role"
    >
      <el-tree
        ref="elTreeRef"
        :data="menus"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckChange"
      ></el-tree>
    </page-model>
  </div>
</template>

<script lang="ts">
import { computed, ref, defineComponent, nextTick } from 'vue'

import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modelConfig } from './config/model.config'

import { usePageModel } from '@/hooks/use-page-model'

import { getMenuLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'

export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent,
    PageModel
  },
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = getMenuLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModelRef, defaulInfo, create, edit] = usePageModel(
      undefined,
      editCallback
    )

    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      searchFormConfig,
      contentTableConfig,
      modelConfig,
      pageModelRef,
      defaulInfo,
      create,
      edit,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped></style>
