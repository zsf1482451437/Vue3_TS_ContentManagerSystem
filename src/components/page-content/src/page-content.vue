<!--
 * @Description: 公共页面组件
 * @Author: SiFeng Zhai
 * @Date: 2022-06-02 11:31:53
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-09-05 08:50:05
-->
<template>
  <div class="page-content">
    <sf-table
      :listData="dataList"
      :listCount="listCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 头部插槽 -->
      <template #headerHandler>
        <el-button
          type="primary"
          szie="default"
          v-if="isCreate"
          @click="createClick"
          >新建{{ contentTableConfig.title }}</el-button
        >
      </template>
      <!-- 列中的插槽 -->
      <!-- 状态列 -->
      <template #status="scope"
        ><el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}
        </el-button></template
      >
      <!-- 创建时间列 -->
      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <!-- 更新时间列 -->
      <template #updateAt="scope">
        <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
      </template>
      <!-- 操作列 -->
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            size="small"
            type="primary"
            @click="editClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            size="small"
            type="danger"
            @click="deleteClick(scope)"
            >删除</el-button
          >
        </div>
      </template>
      <!-- 在page-content中动态插入剩余插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </sf-table>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent, ref, watch } from 'vue'
import SfTable from '@/base-ui/table'
import { usePermission } from '@/hooks/use-permission'

export default defineComponent({
  components: {
    SfTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    }
  },
  emits: ['creatBtn', 'editBtn'],
  setup(props, { emit }) {
    const store = useStore()

    // 0.获取操作权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 2.发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 3.从vuex中获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )

    const listCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    // 4.获取其它动态插槽
    const otherPropSlots = props.contentTableConfig?.propsList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )
    // 5.删除、新建、编辑
    const deleteClick = (item: any) => {
      store.dispatch(`system/deletePageDataAction`, {
        pageName: props.pageName,
        id: item.row.id
      })
    }

    const createClick = () => {
      emit('creatBtn')
    }

    const editClick = (item: any) => {
      emit('editBtn', item)
    }

    return {
      dataList,
      listCount,
      getPageData,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      createClick,
      deleteClick,
      editClick
    }
  }
})
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
  .handle-btns {
    .el-button--small {
      padding: 5px;
    }
  }
}
</style>
