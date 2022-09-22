/*
 * @Description: 待编辑
 * @Author: SiFeng Zhai
 * @Date: 2022-05-17 15:16:51
 * @LastEditors: SiFeng Zhai
 * @LastEditTime: 2022-09-22 10:10:26
 */
import SFRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const sfRequest = new SFRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default sfRequest
