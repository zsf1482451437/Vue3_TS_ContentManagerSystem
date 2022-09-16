/*
 * @Description: 待编辑
 * @Author: SiFeng Zhai
 * @Date: 2022-09-16 10:31:32
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-09-16 20:01:14
 */
import * as Echarts from 'echarts'
import ChinaMapData from '../data/china.json'

Echarts.registerMap('china', ChinaMapData)

export default function (el: HTMLElement) {
  const echartInstance = Echarts.init(el)

  const setOptions = (options: Echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  // 响应式适配
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
  const updateSzie = () => {
    echartInstance.resize()
  }

  return {
    echartInstance,
    setOptions,
    updateSzie
  }
}
