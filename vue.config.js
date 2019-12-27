/*
 * @Descripttion: 描述
 * @version: 版本
 * @Author: xiongbin
 * @Date: 2019-11-08 14:54:24
 * @LastEditors: 1490251116@qq.com
 * @LastEditTime: 2019-11-29 16:31:59
 */
var path = require('path')
const resolve = dir => path.join(__dirname, dir)
module.exports = {
  // 基本路径
  publicPath: './',
  productionSourceMap: false,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: true,
  parallel: undefined,
  css: undefined,
  devServer: {
    port: "9999", //代理端口
    open: false, //项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
    proxy: {
      '/api': { //代理api
        target: "https://beesgo.chinabeego.com/", //测试服务器地址
        changeOrigin: true, //是否跨域
        ws: true, // proxy websockets
      }
    },
  },
  // http://192.168.1.143:60818/
  // http://abc.baojia-yjz.com/
  // 配置路径别名    
  chainWebpack: config => {
    config.resolve.alias   
      .set('jquery', resolve('./node_modules/jquery/src/jquery.js'))
  },
   
}