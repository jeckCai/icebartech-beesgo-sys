import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { httpPost, formPost ,httpGet,formGet} from '../util/post'
const vm = Vue

export default new Vuex.Store({
  state: { //全局数据储存
    //用户信息
    avatarUrl: "",
    mobile: "",
    roleKeys: [],
    token: "",
    trueName: "",
    userId: null,
    userName: "",
    routerPath: [],
    sectionList:null,
    sectionIconList:null,
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
        if (!res) return;
        if(res.code == 200){
            window.vm.$message({
              message: '登录成功',
              type: 'success'
            });
            sessionStorage.setItem('token', res.data.token);
            setTimeout(() => {
              window.vm.$router.push({
                name: 'index'
              })
            }, 1000);
          }
      });
    },
    loginOut () { //用户登出
      formPost('LOGINOUT').then(res => {
        if (!res) return;
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
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
          console.log(JSON.stringify(res.data))
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
        console.log(JSON.stringify(res.data))
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
        console.log(res)
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