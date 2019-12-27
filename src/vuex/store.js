/*
 * @Descripttion: 描述
 * @version: 版本
 * @Author: xiongbin
 * @Date: 2019-11-08 14:54:24
 * @LastEditors: 1490251116@qq.com
 * @LastEditTime: 2019-12-02 14:38:05

 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { formPost ,httpGet,formGet,httpPost} from '../util/post'
const vm = Vue

export default new Vuex.Store({
  state: { //全局数据储存
    //用户信息
    avatarUrl: "",
    mobile: "",
    roleKeys: [],
    sessionId: "",
    trueName: "",
    userId: null,
    userName: "",
    routerPath: [],
    resourceCodeList:[]
  },
  mutations: { //数据更新
    upDate (state, v) {
      state[v.name] = v.value
    },
  },
  actions: {
    loginhandler ({}, param) { //用户登录
      httpPost('LOGIN', param).then(res => {
        if(res.code===200){
          window.vm.$message({
            message: '登录成功',
            type: 'success'
          });
          sessionStorage.setItem('sessionId', res.data.token);
          setTimeout(() => {
            window.vm.$router.push({
              name: 'home'
            })
          }, 1000);
        }else{
          window.vm.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },
    loginOut () { //用户登出
      formPost('LOGINOUT').then(res => {
        if (!res) return;
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('sessionId');
        window.vm.$router.push({
          name: 'login'
        })
      });
    },
    getUserInfo () { //获取用户信息
      return Promise.resolve(
        httpGet('USERINFO').then(res => {
          if (!res) return;
          sessionStorage.setItem('user', JSON.stringify(res.data));
        })
      )
    },
    getMenuResource({commit}){//获取资源码
      let param={
        userId:JSON.parse(sessionStorage.getItem("user")).id,
        codeType:'user'
      }
      return Promise.resolve(
      formGet('GETMENURESOURCE',param).then(res => {
        commit("upDate", {
          value: res.data,
          name: 'resourceCodeList'
        })
      })
      )
    },
    getMenuList ({ //用户权限可访问的侧边栏列表
      commit
    }) {
      let param={
        id:JSON.parse(sessionStorage.getItem("user")).id,
        codeType:'user'
      }
      return Promise.resolve(
      formGet('PERMISSIONGETMENU',param).then(res => {
        commit("upDate", {
          value: res.data,
          name: 'routerPath'
        })
      })
      )
    }
  },
  modules: {
    //各种子模块
    selectlist: require('@/vuex/publicData/selectList.js'),
    storeConfig: { //门店管理
      namespaced: true,
      modules: {
        // brand, 分级模块
      }
    },
  }
})