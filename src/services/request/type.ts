import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface SFRequestInterceptors<T = AxiosResponse> {
  // 可选的请求和响应拦截
  requestInterceptor?: (config: any) => any
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface SFRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: SFRequestInterceptors<T>
  showLoading?: boolean
}
