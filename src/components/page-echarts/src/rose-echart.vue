<!--
 * @Description: 待编辑
 * @Author: SiFeng Zhai
 * @Date: 2022-09-16 15:48:38
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-09-16 16:06:06
-->
<template>
  <div class="rose-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import BaseEchart from '@/base-ui/echart'

import { IDataType } from '../types'

const props = defineProps<{
  roseData: IDataType[]
}>()

const options = computed(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '类别数据',
        type: 'pie',
        radius: [10, 100],
        center: ['50%', '50%'],
        roseType: 'radius',
        itemStyle: {
          borderRadius: 5
        },
        data: props.roseData
      }
    ]
  }
})
</script>

<style lang="scss" scoped></style>
