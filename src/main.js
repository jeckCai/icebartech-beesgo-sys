import Vue from 'vue'
import 'normalize.css'
import './util/axios'
import './util/element'
import router from './router/router'
import store from './vuex/store'
import echarts from 'echarts'

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
import './directive/index'
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// import axios from 'axios'
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios,axios);
import VueAMap from 'vue-amap'

Vue.use(VueQuillEditor)
Vue.use(VueAMap)
Vue.prototype.http = axios;
Vue.prototype.$echarts = echarts;

Vue.config.productionTip=false;
VueAMap.initAMapApiLoader({
  key:'8893d873638361c81b744463aade9d33',
  // 插件集合 （插件按需引入）
  plugin:['AMap.Geocoder']
})
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

// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })

// new Vue({
//   render: h => h(App),
// }).$mount('#app')
