/*
 * @Description: 待编辑
 * @Author: SiFeng Zhai
 * @Date: 2022-09-05 19:10:14
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-09-15 07:55:10
 */
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
