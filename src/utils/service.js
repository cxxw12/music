import service from "./request";

service.interceptors.request.use(
  req => {
    req.headers['token'] = localStorage.getItem('token') || '';
    if(req.method == 'get' && req.url.indexOf('?') == -1) {
      req.url = `${req.url}?_t${new Date().getTime()}`
    }
    return req;
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  resp => {
    const token = resp.headers['token'];
    if(token) {
      localStorage.setItem('token', token)
    }
    const data = resp.data;
    if(!window.preview) {
      if(data.type === 'application/octet-stream') {
        service.download(data)
      }
      if(data.type === 'multipart/form-data' || data.type === 'application/vnd.ms-excel') {
        let downloadFileName = resp.headers['content-disposition']
        downloadFileName = downloadFileName.substr(downloadFileName.indexOf('=') + 1);
        service.download(data, decodeURIComponent(downloadFileName))
      }
      if(data.code && data.code != 200) {
        return Promise.reject(data)
      }
    }
    return data
  },
  error => {
    const resp = error.response;
    if(resp.status == '401') {
      top.location = '/login'
      top.location.reload();
      return Promise.reject();
    }else {
      let msg = resp.data ? resp.data.message : '发生未知错误,，请联系管理员'
      return Promise.reject({ message: msg, code: resp.status + ''})
    }
  }
)