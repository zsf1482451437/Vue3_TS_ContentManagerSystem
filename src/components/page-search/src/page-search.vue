<!--
 * @Description: 搜索组件
 * @Author: SiFeng Zhai
 * @Date: 2022-05-26 16:30:56
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-08-09 11:36:17
-->
<template>
  <div class="page-search">
    <sf-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="query">搜索</el-button>
        </div>
      </template>
    </sf-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import SfForm from '@/base-ui/form'

export default defineComponent({
  components: {
    SfForm
  },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['resetClick', 'queryClick'],
  setup(props, { emit }) {
    // 双向绑定的属性，应该由配置文件的field来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }

    const formData = ref(formOriginData)

    // 重置
    const reset = () => {
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
      }
      emit('resetClick')
    }
    // 搜索
    const query = () => {
      emit('queryClick', formData.value)
    }
    return {
      formData,
      reset,
      query
    }
  }
})
</script>

<style scoped>
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
