import axios from 'axios'

let baseURL = 'http://localhost:3000'

/* 获取歌曲评论详情 */
export function getCommentsList(params) {
  return axios({
    url: `${baseURL}/comment/music`,
    method: 'get',
    params: params
  })
}