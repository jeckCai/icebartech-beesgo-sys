/*
 * @Descripttion: 描述
 * @version: 版本
 * @Author: xiongbin
 * @Date: 2019-11-16 14:59:24
 * @LastEditors: 1490251116@qq.com
 * @LastEditTime: 2019-11-17 21:30:15
 */
"use strict";

import Vue from 'vue';
import axios from "axios";
let baseUrl = '';
if (process.env.NODE_ENV == 'development') {
  baseUrl = ""
} else if (process.env.NODE_ENV == 'production') {
  baseUrl = process.env.VUE_APP_BASEURL
} else {
  baseUrl = ""
}

if(!baseUrl){
  baseUrl="https://beesgo.chinabeego.com/api/"
}
let config = {
  baseURL:baseUrl
};
const _axios = axios.create(config);
console.log(sessionStorage.getItem('token'))
// _axios.defaults.headers['token'] = sessionStorage.getItem('token');
_axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// _axios.defaults.headers = {
//   "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
// }
let loading;
_axios.interceptors.request.use(
  function (config) {
    if (!config.url) {
      alert({
        type: 'warn',
        message: '请求地址不能为空'
      })
    }
    loading = vm.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    let res = null;
    switch (response.data.code) {
      case 200:
        res = response.data || true;
        loading.close();
        break;
      case 401: //401 登陆过期跳转
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        loading.close()
        window.vm.$message({
          type: 'warning',
          message: '重新登录'
        })
        setTimeout(() => {
          window.vm.$router.push({
            name: 'login'
          })
        }, 2000)
        break;
      case 500:
        loading.close();
        res = response.data;
        window.vm.$message({
          type: 'warning',
          message: res.message
        })
        break;
      default:
        if (response.data.code !== 200 && response.data.message) {
          loading.close();
          //除了200以外其它情况只打印消息
          window.vm.$message({
            type: 'warning',
            message: response.data.message
          })
        }
        loading.close();
        break;
    }
    return res;
  },
  function (error) {
    loading.close();
    window.vm.$message({
      type: 'error',
      message: '服务端报错'
    })
    return Promise.reject(error);
  }
);

Plugin.install = function (Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios;
      }
    },
    $axios: {
      get () {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;