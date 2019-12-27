/*
 * @Descripttion: 描述
 * @version: 版本
 * @Author: xiongbin
 * @Date: 2019-11-08 14:54:24
 * @LastEditors: 1490251116@qq.com
 * @LastEditTime: 2019-11-16 12:59:12
 */
import Vue from 'vue'
import 'normalize.css'
import './util/axios'
import './util/element'
import router from './router/router'
import store from './vuex/store'

// import 'jquery'

import 'element-ui/lib/theme-chalk/index.css'
import $ from "jquery";
import 'bootstrap/js/modal.js'
import 'bootstrap/js/dropdown.js'
import 'bootstrap/js/tooltip.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import 'summernote'
import 'summernote/dist/lang/summernote-zh-CN.js'
import 'summernote/dist/summernote.css'
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// import axios from 'axios'
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios,axios);
Vue.use(VueQuillEditor)
Vue.prototype.http = axios;

document.addEventListener('click',function(ele){
  if(ele.target.nodeName ==='IMG'){
    let _img = ele.target.getAttribute('src');
    let _div =document.createElement('div');
    _div.className='mask_img_bg';
    _div.innerHTML=`<img src="${_img}"/>`;
    document.body.appendChild(_div)
    document.querySelector('.mask_img_bg').onclick=function(){
      document.body.removeChild(document.querySelector('.mask_img_bg'))
    }
  }
})
window.vm = new Vue({
  router,
  store,
}).$mount('#app')
if(sessionStorage.getItem('sessionId')==null){
  window.vm.$message({
    message: '重新登录',
    type: 'warning'
  });
  setTimeout(()=>{
    window.vm.$router.push({
      name: 'login'
    })
  },500)
  
}

// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })

// new Vue({
//   render: h => h(App),
// }).$mount('#app')
