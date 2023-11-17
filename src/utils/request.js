import axios from 'axios'

let baseURL = 'http://localhost:3000'

const AXIOS_OPTS = {
  // baseURL: baseURL,
  timeout: 60000,
  withCredential: true
}

const service = axios.create(AXIOS_OPTS)

function download(resp, fileName) {
  if(!resp) {
    return
  }
  if(window.navigator.msSaveOrOpenBlob) {
    try {
      window.navigator.msSaveOrOpenBlob(resp, fileName)
    } catch (e) {
      this.$toast.fail(e)
    }
  } else {
    let url = window.URL.createObjectURL(new Blob([resp.data]));
    if (resp.data == null) {
      url = window.URL.createObjectURL(new Blob([resp]));
    }
    let link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    let downloadFileName;
    if(fileName) {
      downloadFileName = fileName
    } else {
      downloadFileName = resp.headers['content-disposition'];
      downloadFileName = downloadFileName.substr(downloadFileName.indexOf('=') + 1)
    }
    link.setAttribute('download', downloadFileName);
    document.body.appendChild(link)
    link.click();
    document.body.removeAttribute(link)
    window.URL.revokeObjectURL
  }
}
service.download = download
export default service