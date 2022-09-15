<!--
 * @Description: 待编辑
 * @Author: SiFeng Zhai
 * @Date: 2022-08-31 15:31:47
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-09-15 10:20:17
-->
<template>
  <!-- 新建弹出框 -->
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      width="30%"
      center
      destroy-on-close
    >
      <sf-form v-bind="modelConfig" v-model="formData"></sf-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import SfForm from '@/base-ui/form'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    SfForm
  },
  props: {
    modelConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})
    const title = ref('新建')

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modelConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      },
      { immediate: true }
    )

    // 点击确定按钮
    const store = useStore()
    const confirm = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新建
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }

    return {
      dialogVisible,
      formData,
      confirm,
      title
    }
  }
})
</script>

<style lang="scss" scoped></style>
