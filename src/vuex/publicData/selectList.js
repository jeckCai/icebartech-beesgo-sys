import {
  formPost,
  httpPost
} from '@/util/post'
/**
 * 各种下拉框数据根目录 state
 */
export default {
  namespaced: true,
  state: {
    //中国所有省份
    allProvince: null
  },
  mutations: {
    upDate(state, v) {
      state[v.name] = v.value
    }
  },
  actions: {
    //中国所有省份
    getProvinceList({
      commit
    }) {
    formPost('LOADDICTIONARY', {
        codeType: 'province'
      }).then(res => {
        if (!res) return
        commit('upDate', {
          value: res.bussData,
          name: 'AllProvince'
        })
      })
    }
  }
}