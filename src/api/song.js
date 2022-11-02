import axios from 'axios'

let baseURL = 'http://localhost:3000'
/* 获取歌单详情 */
export function getRecommendDetailList(params) {
    return axios.get(`${baseURL}/playlist/detail?id=${params}`)
}
/* 获取音乐url */
export function getSongUrl(params) {
  return axios.get(`${baseURL}/song/url?id=${params}`)
}
/* 获取歌词 */
export function getLyric(params) {
  return axios.get(`${baseURL}/lyric?id=${params}`)
}
/* 获取歌曲详情 */
export function getSongDetail(params) {
  return axios.get(`${baseURL}/song/detail?ids=${params}`)
}

/* 喜欢音乐 */
export function getSongLike(params) {
  return axios.get(`${baseURL}/like?id=${params.id}&like=${params.like}`)
}
