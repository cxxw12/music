import axios from 'axios'

let baseURL = 'http://localhost:3000'
/* 登录 */
export function login(phone, password) {
  return axios.get(`${baseURL}/login/cellphone?phone=${phone}&password=${password}`)
}

/* 游客登录 */
export function anonimousLogin() {
  return axios.get(`${baseURL}/register/anonimous`)
}

/* 二维码生成key */
export function loginRrKey() {
  return axios.get(`${baseURL}/login/qr/key?timerstamp=${Date.now()}`)
}

/* 二维码生成 */
export function loginRrCreate(key) {
  return axios.get(`${baseURL}/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`)
}

/* 二维码扫码状态 */
export function loginRrCheck(key) {
  return axios.get(`${baseURL}/login/qr/check?key=${key}&timerstamp=${Date.now()}`)
}

/* 登陆状态 */
export function loginStatus(cookie) {
  return axios.post(`${baseURL}/login/status?timerstamp=${Date.now()}`, cookie)
}

/* 发送手机验证码 */
export function postNumber(phone) {
  return axios.get(`${baseURL}/captcha/sent?phone=${phone}`)
}

/* 验证手机验证码是否正确 */
export function checkVerCode(phone, code) {
  return axios.get(`${baseURL}/captcha/verify?phone=${phone}&captcha=${code}`)
}