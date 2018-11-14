import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
// 创建axios实例
const request = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})
// request拦截器
request.interceptors.request.use(config => {
  config.headers = {
    'content-Type': 'application/json'
  }
  config.data = JSON.stringify(config.data)
  console.log('reqdata:' + config.data)
  if (store.getters.authInfo) { // 如果后端检测不到awu_authInfo返回登录超时
    config.headers['awu_authInfo'] = store.getters.authInfo
  }
  return config
}, error => {
  Promise.reject(error)
})
// respone拦截器
request.interceptors.response.use(
  response => {
    const res = response.data
    console.log('resdata:' + JSON.stringify(response.data))
    if (res.code !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      // eslint-disable-next-line
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('ResponseError' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default request
