import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
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
        path: '/', //首页默认显示
        name: 'index',
        component: resolve => require(['@/components/statisticsCharts/chartsIndex'], resolve)
      },
      {
        path: '/sysuser', //账号管理
        name: 'staffSetting',
        component: resolve => require(['@/components/authorityManage/staffSetting'], resolve)
      },
      {
        path: '/staffSettingEdit', //账号管理编辑
        name: 'staffSettingEdit',
        component: resolve => require(['@/components/authorityManage/staffSetting-edit'], resolve)
      },
      {
        path: '/syspermission', //权限管理
        name: 'jurisdiction',
        component: resolve => require(['@/components/authorityManage/jurisdiction'], resolve)
      },
      {
        path: '/jurisdictionEdit', //权限管理编辑
        name: 'jurisdictionEdit',
        component: resolve => require(['@/components/authorityManage/jurisdiction-edit'], resolve)
      },
      {
        path: '/sysrole', //岗位管理
        name: 'userManage',
        component: resolve => require(['@/components/authorityManage/userManage'], resolve)
      },
      {
        path: '/userManageEdit', //岗位管理编辑
        name: 'userManageEdit',
        component: resolve => require(['@/components/authorityManage/userManage-edit'], resolve)
      },
      {
        path: '/sysmallManage', //总平台商场管理
        name: 'sysmallManage',
        component: resolve => require(['@/components/sysManage/sysMallManage'], resolve)
      },
      {
        path: '/sysMallAdd', //总平台商场新增
        name: 'sysMallAdd',
        component: resolve => require(['@/components/sysManage/sysMallAdd'], resolve)
      },
      {
        path: '/sysMallDetail', //总平台商场详情
        name: 'sysMallDetail',
        component: resolve => require(['@/components/sysManage/sysMallDetail'], resolve)
      },
      {
        path: '/malldata', //商场资料
        name: 'mallData',
        component: resolve => require(['@/components/mallManage/mallData'], resolve)
      },
      {
        path: '/brandAccount', //商场品牌账号管理
        name: 'brandAccount',
        component: resolve => require(['@/components/mallManage/brandAccount'], resolve)
      },
      {
        path: '/brandAccountEdit', //商场品牌管理
        name: 'brandAccountEdit',
        component: resolve => require(['@/components/mallManage/brandAccountEdit'], resolve)
      },
      {
        path: '/sysBrand', //总后台品牌管理
        name: 'sysBrand',
        component: resolve => require(['@/components/sysManage/sysBrand'], resolve)
      },
      {
        path: '/sysBrandEdit', //总后台品牌管理查看
        name: 'sysBrandEdit',
        component: resolve => require(['@/components/sysManage/sysBrandEdit'], resolve)
      },
      {
        path: '/sysBrandBeesgo', //总平台品牌蜜蜂
        name: 'sysBrandBeesgo',
        component: resolve => require(['@/components/sysManage/sysBrandBeesgo'], resolve)
      },
      {
        path: '/sysSetup', //总平台系统设置
        name: 'sysSetup',
        component: resolve => require(['@/components/sysManage/sysSetup'], resolve)
      },
      {
        path: '/sysShopClassList', //商品分类管理
        name: 'sysShopClassList',
        component: resolve => require(['@/components/sysManage/sysShopClassList'], resolve)
      },
      {
        path: '/sysShopClassListEdit', //商品分类管理
        name: 'sysShopClassListEdit',
        component: resolve => require(['@/components/sysManage/sysShopClassListEdit'], resolve)
      },
      {
        path: '/sysshopAdmin', //商品管理
        name: 'sysshopAdmin',
        component: resolve => require(['@/components/sysManage/sysshopAdmin'], resolve)
      },
      {
        path: '/sysShopInfo', //商品管理查看
        name: 'sysShopInfo',
        component: resolve => require(['@/components/sysManage/sysShopInfo'], resolve)
      },
      {
        path: '/syscommodityList', //商品属性管理
        name: 'syscommodityList',
        component: resolve => require(['@/components/sysManage/syscommodityList'], resolve)
      },{
        path: '/sysOrderList', //订单管理
        name: 'sysOrderList',
        component: resolve => require(['@/components/orderManage/saleOrderList'], resolve)
      },
      {
        path: '/sysSelfAfterSale', //自主售后管理列表
        name: 'sysSelfAfterSale',
        component: resolve => require(['@/components/orderManage/selfAfterSaleList'], resolve)
      }, {
        path: '/sysQuirkAfterSale', //自主售后管理列表
        name: 'sysQuirkAfterSale',
        component: resolve => require(['@/components/orderManage/quirkAfterSaleList'], resolve)
      },{
        path: '/sysAfterSaleDetail', //自主售后管理列表
        name: 'sysAfterSaleDetail',
        component: resolve => require(['@/components/orderManage/afterSaleDetail'], resolve)
      },
      {
        path: '/sysCouponList', //优惠券管理
        name: 'sysCouponList',
        component: resolve => require(['@/components/couponManage/list'], resolve)
      }, 
      {
        path: '/sysCouponEdit', //优惠券新增编辑
        name: 'sysCouponEdit',
        component: resolve => require(['@/components/couponManage/edit'], resolve)
      },
      {
        // path: '/sysActive', //总平台活动
        path: '/sysDiscountsBanner', //优惠banner
        name: 'sysDiscountsBanner',
        component: resolve => require(['@/components/discountBannerManage/index'], resolve)
      },
      {
        path: '/discountsAddBanner', //优惠Addbanner
        name: 'discountsAddBanner',
        component: resolve => require(['@/components/discountBannerManage/editBanner'], resolve)
      },
      {
        path: '/sysSetActivity', //首页设置-活动设置
        name: 'sysSetActivity',
        component: resolve => require(['@/components/sysSetActivity/index'], resolve)
      },
      {
        path: '/sysSetIndexBanner', //首页设置-banner设置
        name: 'sysSetIndexBanner',
        component: resolve => require(['@/components/bannerManage/index'], resolve)
      },
      {
        path: '/addBannerManage', //首页设置- add-banner
        name: 'addBannerManage',
        component: resolve => require(['@/components/bannerManage/add'], resolve)
      },
      { path: '/sysAdminActive', //优惠券新增编辑
        name: 'sysAdminActive',
        component: resolve => require(['@/components/sysManage/sysActiveManage'], resolve)
      },
      {
        path: '/addActive', //总平台活动新增编辑
        name: 'addActive',
        component: resolve => require(['@/components/sysManage/sysaddActivManage'], resolve)
      },
      {
        path: '/sysmallActive', //总平台-商场活动
        name: 'sysmallActive',
        component: resolve => require(['@/components/mallManage/sysActiveManage'], resolve)
      },
      {
        path: '/sysActiveBraner', //总平台-品牌活动
        name: 'sysActiveBraner',
        component: resolve => require(['@/components/sysManage/sysActiveBraner'], resolve)
      },
      {
        path: '/addmallActive', //总平台活动新增编辑
        name: 'addmallActive',
        component: resolve => require(['@/components/mallManage/sysaddActivManage'], resolve)
      },
      {
        path: '/mallActive', //商场活动管理
        name: 'mallActive',
        component: resolve => require(['@/components/mallManage/mallActive'], resolve)
      },
      {
        path: '/sysUserManage', //总后台用户管理
        name: 'sysUserManage',
        component: resolve => require(['@/components/authorityManage/sysUserManage'], resolve)
      },
      {
        path: '/brandFreightSet', //运费模板管理
        name: 'brandFreightSet',
        component: resolve => require(['@/components/freightSetManage/list'], resolve)
      },
      {
        path: '/addFreight', //运费模板新增
        name: 'addFreight',
        component: resolve => require(['@/components/freightSetManage/addFreight'], resolve)
      },
      {
        path: '/sysBrandLogo', //总后台品牌logo管理
        name: 'sysBrandLogo',
        component: resolve => require(['@/components/sysManage/sysBrandLogo'], resolve)
      },
      {
        path: '/sysAddBrandLogo', //总后台品牌logo新增
        name: 'sysAddBrandLogo',
        component: resolve => require(['@/components/sysManage/sysAddBrandLogo'], resolve)
      }
    ]
  }]
})