/*
 * @Descripttion: 描述
 * @version: 版本
 * @Author: xiongbin
 * @Date: 2019-11-08 14:54:24
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-23 16:35:10
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: '/sys/',
  routes: [{
    path: '/login', //登录页面
    name: 'login',
    component: resolve => require(['@/views/login/login-page'], resolve)
  }, {
    path: '/rechargePassword', //变更密码
    name: 'rechargePassword',
    component: resolve => require(['@/views/rechangePassword/recharge-password'], resolve)
  },
  {
    path: '/', //管理系统默认首页,只有 header 和 aside,除登录修改密码,其它页面全部为此页面的子路由
    name: 'index',
    component: resolve => require(['@/views/index/index'], resolve),
    children: [
      {
        path: '/home', //首页默认显示
        name: 'home',
        component: resolve => require(['@/views/home/list'], resolve)
      },
      {
        path: '/brandShopList', //商品
        name: 'brandShopList',
        component: resolve => require(['@/views/shop/list'], resolve)
      },
      {
        path: '/addShop', //新增商品
        name: 'addShop',
        component: resolve => require(['@/views/shop/addShop'], resolve)
      },
      {
        path: '/addShopNew', //新增商品
        name: 'addShopNew',
        component: resolve => require(['@/views/shop/addShopNew'], resolve)
      },
      {
        path: '/brandFreightSet', //运费模板
        name: 'brandFreightSet',
        component: resolve => require(['@/views/freightSset/list'], resolve)
      },
      {
        path: '/addFreightSset', //运费模板
        name: 'addFreightSset',
        component: resolve => require(['@/views/freightSset/addFreightSset'], resolve)
      },
      {
        path: '/commodityList', //属性设置
        name: 'commodityList',
        component: resolve => require(['@/views/commodityList/list'], resolve)
      },
      {
        path: '/staffSetting', //账号管理
        name: 'staffSetting',
        component: resolve => require(['@/components/authorityManage/staffSetting'], resolve)
      },
      {
        path: '/staffSettingEdit', //账号管理编辑
        name: 'staffSettingEdit',
        component: resolve => require(['@/components/authorityManage/staffSetting-edit'], resolve)
      },
      {
        path: '/userManage', //岗位管理
        name: 'userManage',
        component: resolve => require(['@/components/authorityManage/userManage'], resolve)
      },
      {
        path: '/userManageEdit', //岗位管理编辑
        name: 'userManageEdit',
        component: resolve => require(['@/components/authorityManage/userManage-edit'], resolve)
      },
      {
        path: '/brandBee', //蜜蜂列表
        name: 'brandBee',
        component: resolve => require(['@/views/bee/list'], resolve)
      },
      {
        path: '/beeAdd', //蜜蜂新增
        name: 'beeAdd',
        component: resolve => require(['@/views/bee/add'], resolve)
      },
      {
        path: '/beeEdit', //蜜蜂编辑
        name: 'beeEdit',
        component: resolve => require(['@/views/bee/edit'], resolve)
      },
      {
        path: '/brandInfo', //品牌资料
        name: 'brandInfo',
        component: resolve => require(['@/views/brandData/brandInfo'], resolve)
      },
      {
        path: '/brandQuickOrder', //快速下单
        name: 'brandQuickOrder',
        component: resolve => require(['@/views/order/quickOrder/list'], resolve)
      },
      {
        path: '/quickOrderDetail', //快速下单详情
        name: 'quickOrderDetail',
        component: resolve => require(['@/views/order/quickOrder/detail'], resolve)
      },
      {
        path: '/brandQuickSale', //快速售后
        name: 'brandQuickSale',
        component: resolve => require(['@/views/order/afterSale/list'], resolve)
      },
      {
        path: '/brandSelfOrder', //自主下单
        name: 'brandSelfOrder',
        component: resolve => require(['@/views/order/selfOrder/list'], resolve)
      },
      {
        path: '/selfOrderDetail', //自主下单详情
        name: 'selfOrderDetail',
        component: resolve => require(['@/views/order/selfOrder/detail'], resolve)
      },
      {
        path: '/brandSelfSale', //自主售后
        name: 'brandSelfSale',
        component: resolve => require(['@/views/order/afterSale/list'], resolve)
      },
      {
        path: '/afterSaleDetail', //售后详情
        name: 'afterSaleDetail',
        component: resolve => require(['@/views/order/afterSale/detail'], resolve)
      },  {
        path: '/logistics', //售后详情
        name: 'logistics',
        component: resolve => require(['@/views/order/logistics'], resolve)
      },{
        path: '/brandDiscount', //优惠券列表
        name: 'brandDiscount',
        component: resolve => require(['@/views/discount/list'], resolve)
      },
      {
        path: '/discountEdit', //优惠券新增编辑
        name: 'discountEdit',
        component: resolve => require(['@/views/discount/edit'], resolve)
      },
      {
        path: '/brandActive', //优惠活动列表
        name: 'brandActive',
        component: resolve => require(['@/views/active/list'], resolve)
      },
      {
        path: '/addActive', //优惠活动列表
        name: 'addActive',
        component: resolve => require(['@/views/active/addActive'], resolve)
      },
      {
        path: '/sysuser', //账号管理
        name: 'staffSetting',
        component: resolve => require(['@/views/authorityManage/staffSetting'], resolve)
      },
      {
        path: '/staffSettingEdit', //账号管理编辑
        name: 'staffSettingEdit',
        component: resolve => require(['@/views/authorityManage/staffSetting-edit'], resolve)
      },
      {
        path: '/sysrole', //岗位管理
        name: 'userManage',
        component: resolve => require(['@/views/authorityManage/userManage'], resolve)
      },
      {
        path: '/userManageEdit', //岗位管理编辑
        name: 'userManageEdit',
        component: resolve => require(['@/views/authorityManage/userManage-edit'], resolve)
      }
    ]
  }]
})