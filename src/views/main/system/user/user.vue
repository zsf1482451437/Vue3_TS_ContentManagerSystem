<!--
 * @Description: 用户管理
 * @Author: SiFeng Zhai
 * @Date: 2022-05-22 21:46:31
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-09-05 16:18:57
-->
<template>
  <div class="user">
    <!-- 搜索部分 -->
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetClick="reset"
      @queryClick="query"
    ></page-search>
    <!-- 列表部分 -->
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @creatBtn="create"
      @editBtn="edit"
    ></page-content>
    <!-- 新建对话框 -->
    <page-model
      ref="pageModelRef"
      :modelConfig="modelConfigRef"
      :defaultInfo="defaultInfo"
      pageName="users"
    ></page-model>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modelConfig } from './config/model.config'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModel } from '@/hooks/use-page-model'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    PageSearch,
    PageContent,
    PageModel
  },
  name: 'user',
  setup() {
    const [pageContentRef, reset, query] = usePageSearch()
    // 控制密码表单项的隐藏与显示
    const newCallback = () => {
      // 拿到密码表单项的属性
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      // 拿到密码表单项的属性
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }
    // 动态添加部门和角色的选项
    const store = useStore()

    const modelConfigRef = computed(() => {
      let departmentItem: any = null
      modelConfig.formItems.map((item) => {
        if (item.field === 'departmentId') {
          departmentItem = item
        }
      })
      // 给对应配置文件的options添加数据
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return {
          title: item.name,
          value: item.id
        }
      })
      let roleItem: any = null
      modelConfig.formItems.map((item) => {
        if (item.field === 'roleId') {
          roleItem = item
        }
      })
      roleItem!.options = store.state.entireRole.map((item) => {
        return {
          title: item.name,
          value: item.id
        }
      })
      // 获得最新的配置文件
      return modelConfig
    })

    // 获取公共表单项并控制特有表单项
    const [pageModelRef, defaultInfo, create, edit] = usePageModel(
      newCallback,
      editCallback
    )

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      reset,
      query,
      modelConfigRef,
      pageModelRef,
      defaultInfo,
      create,
      edit
    }
  }
})
</script>

<style scoped></style>
