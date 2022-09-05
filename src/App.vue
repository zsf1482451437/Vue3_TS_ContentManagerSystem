<template>
  <div class="app">
    <el-config-provider :locale="locale"
      ><router-view></router-view
    ></el-config-provider>
  </div>
</template>

<script lang="ts">
import { zhCn } from 'element-plus/lib/locale'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    return {
      locale: zhCn
    }
  }
})
</script>

<style lang="less" scoped>
.app {
  height: 100%;
}
</style>
