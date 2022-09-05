<!--
 * @Description: 角色列表页
 * @Author: SiFeng Zhai
 * @Date: 2022-05-22 21:47:24
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-08-09 09:11:58
-->
<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    return { searchFormConfig, contentTableConfig }
  }
})
</script>

<style scoped></style>
