<!--
 * @Description: 待编辑
 * @Author: SiFeng Zhai
 * @Date: 2022-09-16 14:58:19
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-09-16 15:28:01
-->
<template>
  <div class="pie-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import BaseEchart from '@/base-ui/echart'
import { IDataType } from '../types'

const props = defineProps<{
  pieData: IDataType[]
}>()
// 防止数据刷新时图表不更新
const options = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style lang="scss" scoped></style>
