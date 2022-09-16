<!--
 * @Description: 待编辑
 * @Author: SiFeng Zhai
 * @Date: 2022-09-16 16:18:55
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-09-16 20:21:00
-->
<template>
  <div class="line-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, withDefaults } from 'vue'
import BaseEchart from '@/base-ui/echart'

const props = withDefaults(
  defineProps<{
    title?: string
    xLabel: string[]
    values: any[]
  }>(),
  {
    title: ''
  }
)

const options = computed(() => {
  return {
    title: {
      text: props.title
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.xLabel
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '分类销量',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: props.values
      }
    ]
  }
})
</script>

<style lang="scss" scoped></style>
