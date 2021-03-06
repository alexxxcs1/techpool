import axios from 'axios'

import AskPost from './AskPost'


let ol = 'http://h5.rup-china.com/techpool2019/public/index.php/index/'
let cm = 'http://192.168.1.153/tianpu/index.php/index/'
const host = ol;

// 实例化 ajax请求对象
const ajaxinstance = axios.create({
  baseURL: host,
  timeout: 50000,
  // withCredentials: true,
  headers: {
    // responseType: 'JSON',
    // 'Content-Type': 'application/json'
  }
})
// 添加拦截器，处理 公用请求参数，和通用请求头部
ajaxinstance
  .interceptors
  .request
  .use((config) => {
    // TODO
    return config
  }, (error) => {
    Promise.reject(error)
  })

// 请求响应拦截器
ajaxinstance
  .interceptors
  .response
  .use((response) => {
    // TODO
    return response.data
  }, (error) => {
    return Promise.reject(error)
  })

/**
 * [API api接口封装]
 * @type {Object}
 */
const API = {
  ...AskPost(ajaxinstance),
}

export default API
