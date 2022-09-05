<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick"><Expand /></el-icon>
    <div class="content">
      <sf-breadcrumb :breadcrumbs="breadcrumbs"></sf-breadcrumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { Expand } from '@element-plus/icons'
import UserInfo from './user-info.vue'
import SfBreadcrumb from '@/base-ui/breadcrumb'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
  components: {
    Expand,
    UserInfo,
    SfBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      // 发射事件通知父组件
      emit('foldChange', isFold.value)
    }
    // 面包屑数据
    const store = useStore()

    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      isFold,
      breadcrumbs,
      handleFoldClick
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
