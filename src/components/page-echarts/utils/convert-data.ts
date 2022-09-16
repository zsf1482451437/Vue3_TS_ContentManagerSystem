/*
 * @Description: 待编辑
 * @Author: SiFeng Zhai
 * @Date: 2022-09-16 20:10:37
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-09-16 20:13:03
 */
import { coordinateData } from './coordinate-data'

export const convertData = function (data: any) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const geoCoord = coordinateData[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  return res
}
