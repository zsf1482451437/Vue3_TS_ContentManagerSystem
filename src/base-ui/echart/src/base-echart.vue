<!--
 * @Description: 待编辑
 * @Author: SiFeng Zhai
 * @Date: 2022-09-16 09:24:46
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-09-16 15:24:55
-->
<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, defineProps, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEchart from '../hooks/useEchart'

const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const echartDivRef = ref<HTMLElement>()

onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value!)
  // 当数据刷新时重新传入option
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style lang="scss" scoped></style>
