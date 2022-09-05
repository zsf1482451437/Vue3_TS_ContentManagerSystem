<!--
 * @Description: 菜单管理
 * @Author: SiFeng Zhai
 * @Date: 2022-05-22 21:51:01
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-08-09 22:18:55
-->
<template>
  <div class="menu">
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="menu"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'sf-menu',
  components: {
    PageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
