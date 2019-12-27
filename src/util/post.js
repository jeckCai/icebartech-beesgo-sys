import findUrl from './findUrl'
import { stringify } from 'qs';

export function httpPost (url, param = {}) {
  let connection = findUrl(url);
  return new Promise(function (resolve, reject) {
    axios_("post",connection,param,resolve)
  })
} 
export function formPost (url, param = {}) {
  return new Promise(function (resolve, reject) {
    axios_("post",findUrl(url),stringify(Object.assign(param)),resolve)
  })
}
export function httpGet (url, param, params) {
  let connection = param ? `${findUrl(url)}/${param}` : findUrl(url)
  return new Promise(function (resolve, reject) {
    axios_("get",connection,param,resolve)
  })
}
export function formGet (url, param, params) {
  let connection = param ? `${findUrl(url)}?${stringify(Object.assign(param))}` : findUrl(url)
  return new Promise(function (resolve, reject) {
    axios_("get",connection,param,resolve)
  })
}
export function strGet (url, param, params) {
  let connection = param ? `${findUrl(url)}${param}` : findUrl(url)
  return new Promise(function (resolve, reject) {
    axios_("get",connection,param,resolve)
  })
}
export function httpDel (url, param, params) {
  let connection = param ? `${findUrl(url)}/${param}` : findUrl(url)
  return new Promise(function (resolve, reject) {
    axios_("delete",connection,param,resolve)
  })
}
export function formDel (url, param, params) {
  let connection = param ? `${findUrl(url)}?${stringify(Object.assign(param))}` : findUrl(url)
  return new Promise(function (resolve, reject) {
    axios_("delete",connection,param,resolve)
  })
}
export function formPut (url, param, params) {
  let connection = param ? `${findUrl(url)}?${stringify(Object.assign(param))}` : findUrl(url)
  return new Promise(function (resolve, reject) {
    axios_("put",connection,param,resolve)
  })
}
export function httpPut (url, param = {}) {
  let connection = findUrl(url);
  return new Promise(function (resolve, reject) {
    axios_("put",connection,param,resolve)
  })
}
export function strPut (url, param, params) {
  let connection = param ? `${findUrl(url)}/${param}` : findUrl(url)
  return new Promise(function (resolve, reject) {
    axios_("put",connection,param,resolve)
  })
}
export function downExel (url, param = {}) {
  let connection = findUrl(url) + "?" + stringify(Object.assign(param, {
    token: sessionStorage.getItem('token')
  }))
  window.open(connection, '_blank')
}
function axios_(method,url,data,resolve){
  axios({
    method:method,
    url: url,
    data: data,
    headers:{
      "token": sessionStorage.getItem('sessionId'),
      "loginType":'LOGIN_ADMIN_PASSWORD'
    }
  }).then(res => {
    resolve(res);
  })
}
// get传值，拼接到URL后面以为key=value形式
export function getString (url, id) {
  const connection = findUrl(url) + "?" + stringify({
    token: sessionStorage.getItem('sessionId')
  }) + "&" + "id" + "=" + id;
  return new Promise(function (resolve, reject) {
    axios.post(connection).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}


