import axios from 'axios'
import { parse } from './response'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
const service = axios.create({
  baseURL: process.env.VUE_APP_API_PATH,
  timeout: 15000
})

// request拦截器
service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers['X-Kite-Token'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 1) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 3 * 1000
      })
      parse(res.code)
      return Promise.reject(response.data)
    } else {
      return response.data
    }
  },
  (error) => {
    console.info(error)
    const data = error.response ? error.response.data : null
    const msg = (data && data.msg) || '网络错误'
    Message({
      message: msg,
      type: 'error',
      duration: 3 * 1000
    })
    if (data) {
      parse(data.code)
    }
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

// 处理get请求
const get = (url, params, config = {}) => service.get(url, { ...config, params })
// 处理delete请求，为了防止和关键词delete冲突，方法名定义为deletes
const del = (url, params, config = {}) => service.delete(url, { ...config, params })
// 处理post请求
const post = (url, params, config = {}) => service.post(url, params, config)
// 处理put请求
const put = (url, params, config = {}) => service.put(url, params, config)
// 处理patch请求
const patch = (url, params, config = {}) => service.patch(url, params, config)

export default {
  get,
  del,
  post,
  put,
  patch
}
