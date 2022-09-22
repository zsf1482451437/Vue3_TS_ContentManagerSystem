<!--
 * @Description: 待编辑
 * @Author: SiFeng Zhai
 * @Date: 2022-09-05 19:10:14
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-09-22 10:20:50
-->
<template>
  <div class="dashboard">
    <!-- 顶 -->
    <div class="top">
      <el-row :gutter="10">
        <template v-for="item in topPanelData" :key="item.title">
          <el-col :md="12" :lg="6" :xl="6">
            <statistical-panel :panelData="item" />
          </el-col>
        </template>
      </el-row>
    </div>
    <!-- 上 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <sf-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </sf-card>
      </el-col>
      <el-col :span="10">
        <sf-card title="不同城市商品数量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </sf-card>
      </el-col>
      <el-col :span="7">
        <sf-card title="分类商品数量">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </sf-card>
      </el-col>
    </el-row>
    <!-- 下 -->
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <sf-card title="分类商品数量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </sf-card>
      </el-col>
      <el-col :span="12">
        <sf-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </sf-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'

import StatisticalPanel from '@/components/statistical-panel'
import SfCard from '@/base-ui/card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    SfCard,
    StatisticalPanel,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')

    // 顶部数据
    const topPanelData = computed(() => store.state.dashboard.topPanelDatas)
    // 饼图和玫瑰图数据
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    // 面积折线图数据
    const categoryGoodsSale = computed(() => {
      const xLabel: string[] = []
      const values: any[] = []

      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabel.push(item.name)
        values.push(item.goodsCount)
      }

      return { xLabel, values }
    })
    // 柱状图数据
    const categoryGoodsFavor = computed(() => {
      const xLabel: string[] = []
      const values: any[] = []

      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabel.push(item.name)
        values.push(item.goodsFavor)
      }

      return { xLabel, values }
    })
    // 地图数据
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })
    return {
      topPanelData,
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped lang="less">
.dashboard {
  background-color: #f5f5f5;
  .content-row {
    margin-top: 20px;
  }
}
</style>
