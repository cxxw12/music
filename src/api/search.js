import axios from 'axios'

let baseURL = 'http://localhost:3000'
/* 热搜列表(简略) */
export function getHotList() {
  return axios.get(`${baseURL}/search/hot`)
}
/* 搜索建议 */
// export function getSearchSuggest(params) {
//   return axios.get(`${baseURL}/search/suggest?keywords=${params}&type=mobile`)
// }

export function getSearchSuggest(params) {
  return axios({
    url: `${baseURL}/search/suggest`,
    method: 'get',
    params: params
  })
}
