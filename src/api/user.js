// import axios from '../utils/request'
import axios from 'axios'
const AXIOS_OPTS = {
  // baseURL: baseURL,
  timeout: 60000,
  withCredential: true
}
const service = axios.create(AXIOS_OPTS)

let baseURL = 'http://localhost:3000'
/* 获取用户绑定信息 */
// export function getAccount(param) {
//   return service.post(`${baseURL}/user/account`)
// }

/* 获取用户绑定信息 */
export function getAccount(param) {
  return service.post(`${baseURL}/user/playlist`,param)
}
// /user/account