import axios from 'axios'

let baseURL = 'http://localhost:3000'
/* 获取banner */
export function getRecommendDetailList(params) {
    return axios.get(`${baseURL}/playlist/detail?id=${params}`)
}