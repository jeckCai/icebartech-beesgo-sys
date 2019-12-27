/*
 * @Descripttion: 描述
 * @version: 版本
 * @Author: xiongbin
 * @Date: 2019-11-11 10:21:54
 * @LastEditors  : 1490251116@qq.com
 * @LastEditTime : 2019-12-25 19:28:05
 */

export default function (str) {
  let path = 'oauth2/sys/';
  let xbpath = 'item/';
  let oauth2Path = 'oauth2/oauth2/';
  let adminshopPath = 'shop/admin/';
  let shop = 'shop/'
  let shopPath = 'shop/shop/';

  let banner = 'banner/'

  let basePath = 'base/admin/'

  const Controller = {
    url: {
      //角色管理
      ROLEDELETE: path + 'role/delete',//删除角色
      ROLELIST: path + 'role/list',//获取所有权限列表
      ROLEADD: path + 'role/add',//保存角色与权限
      ROLEUPDATE: path + 'role/update',//编辑角色

      //成员管理
      LOGIN: path + 'login', //登录接口
      LOGINOUT: path + 'signout', // 登出接口
      UPDUSERPWD: path + 'user/modifyPassword', //重置密码接口
      // GETMENULIST:path+'permission/getMenuList',//获取权限菜单
      // GETALLLIST:path+'permission/getAllList',//获取权限目录
      USERINFO: path + 'user/info',//获取用户信息
      USERLIST: path + 'user/list',//用户列表
      USERADD: path + 'user/add',//用户新增
      USEREDIT: path + 'user/edit',//编辑用户
      USERDELBYIDS: path + 'user/delByIds',//删除

      // 用户管理
      ADMINUSERPAGE:'base/admin/user/page',//用户分页
      ADMINUSERENABLE:'base/admin/user/',//用户禁用启用
      // 权限
      // PERMISSIONGETMENULIST:path+'permission/getMenuList',//获取权限菜单
      GETMENURESOURCE: path + 'permission/getMenuResource',//获取资源码
      PERMISSIONLIST: path + 'permission/list',//获取资源列表
      PERMISSIONADD: path + 'permission/add',//添加权限菜单
      PERMISSIONEDIT: path + 'permission/edit',//编辑权限菜单
      // PERMISSIONGETALLLIST:path+'permission/getAllList',//获取全部权限菜单
      // PERMISSIONGETROLEMENU:path+'permission/getRoleMenu',//获取菜单角色限权
      PERMISSIONGETMENU: path + 'permission/getMenu',//获取所有菜单
      PERMISSIONDDELBYIDS: path + 'permission/delByIds',//删除权限

      // 商场
      SHOPLIST: adminshopPath + 'shop/page',//商场分页
      SHOP: adminshopPath + 'shop/',//新增,修改,详情,删除,审核
      SHOPSHOP: shopPath + 'shop/',//商场商场详情，修改
      SHOPMAP: adminshopPath + 'shop/list', // 商场列表

      //品牌
      BRANCH: shopPath + 'branch/',//新增,修改,详情,删除，审核
      BRANCHPAGE: shopPath + 'branch/page',//商城品牌分页
      BRANCHMAP: adminshopPath + 'branch/liset', // 品牌列表

      // 总平台品牌
      ADMINBRANCH: adminshopPath + 'branch/',//新增,修改,详情,删除，审核
      ADMINBRANCHPAGE: adminshopPath + 'branch/page',//品牌分页


      // 商场品牌
      BRANDLIST: adminshopPath + 'branch/page', // 商场品牌列表

      // xb商品分类 
      CATEGORY: xbpath + 'biz/category/child_page',//获取二级
      CATEGORYTOP: xbpath + 'biz/category/top_list',//获取一级列表不分页 
      CATEGORYTOPPAGE: xbpath + 'biz/category/top_page',//获取一级列表分页 
      CATEGORYID: xbpath + 'biz/category/',
      CATEGORYSAVE: xbpath + 'biz/category/save',
      CATEGORYDEL: xbpath + 'biz/category/delete',
      CATEGORYUPDATE: xbpath + 'biz/category/update',


      //品牌蜜蜂
      BEELIST: shop + 'admin/bees/page', // 列表/item/check/page
      //商品审核页面
      SHOPCHECKLIST: xbpath + 'check/page', // 列表//item/check/update
      SHOPCHECKUPDATE: xbpath + 'check/update', // 审核
      SHOPCHECKUPSELF: xbpath + 'check/upShelf', //上架下架
      SHOPSKU:'item/biz/item/findSkuByGooId', // 获取商品sku 
      SHOPDETAILE:'item/biz/item', // 商品详情

      // 商品属性
      CATEGORYTREE: xbpath + 'biz/category/tree_List', // 商品分类列表
      ATTRIBUTE: xbpath + 'biz/attribute/page', //新增属性  分页
      TOP_LIST: xbpath + 'biz/category/top_list', //获取一级分类
      ATTRIBUTEDEL: xbpath + 'biz/attribute/delete', //s删除  /item/biz/attribute/delete
      ATTRIBUTESAVE: xbpath + 'biz/attribute/save', //运费模板保存  /item/biz/attribute/delete
      ATTRIBUTEUPDATE: xbpath + 'biz/attribute/update', //修改  /item/biz/attribute/delete
      ATTRIBUTEUPDEL: xbpath + 'biz/attribute/delete/attributeValue', //删除单个属性
      ATTRIBUTE:'item/biz/attribute/page', //新增属性  分页
      CATEGORYTREE:'item/biz/category/tree_List', // 商品分类列表

      // 平台订单
      ORDERLIST: 'order/admin/pageByShop', // 订单列表
      ORDERDETAIL: 'order/admin/find', // 订单详情
      CANCELORDER: 'order/admin/cancelOrder/', // 取消订单
      AFTERSALELIST:'order/admin/after/order/platform/page',// 售后订单列表
      AFTERSALEDETAIL:'order/admin/after/order/detail/', //售后订单详情
      AFTERSALECHECK:'order/admin/after/order/shop/check', // 售后订单审核
      AFTERSALEPAY:'pay/user/refund/order', // 售后订单退款

      // 优惠券管理
      COUPONLIST: 'pay/admin/platform/coupon/list', // 优惠券列表
      COUPONCREATE: 'pay/admin/platform/coupon/create', // 添加优惠券
      COUPONUPDATE: 'pay/admin/platform/coupon/update', // 编辑优惠券
      COUPONDETAIL: 'pay/admin/platform/coupon/modelDetail', // 优惠券详情
      COUPONDEL: 'pay/admin/platform/coupon/remove', // 删除优惠券
      COUPONCHECK: 'pay/admin/platform/coupon/audit', // 优惠券审核
      COUPONSHELVES:'pay/admin/platform/coupon/shelves',// 上下架

      // 活动管理
      ACTIVELIST: 'shop/admin/activity/page',//活动分页
      ACTIVELISTDETAILSHOP: 'shop/admin/activity',//查看详情
      ACTIVEPASS: 'shop/admin/activity',//审核通过

      // Banner管理
      PUTBANNER:banner +'/admin/banner/', // put and post
      BANNERLIST:banner +'admin/banner/page', //Banner列表
      // 优惠券banner
      BANNERCOUPONPAGE:banner+'admin/banner_coupon/page',
      BANNERCOUPON:banner+'admin/banner_coupon/',
      
      ACTIVESYSADD:'shop/admin/activity/',//新增-编辑
      ACTIVESYSDEL:'shop/shop/activity',//删除
      ACTIVESYSDELS:'shop/admin/activity',//删除
      ACTIVESALE:'shop/admin/activity',//上下架活动 
      // PUTBANNER: banner + '/admin/banner/', // put and post
      BANNERLIST: banner + 'admin/banner/page', //Banner列表
      BRANDACTIVESYSDEL:'shop/brand/activity',//后台品牌查看

      ACTIVESYSADD: 'shop/admin/activity/',//新增-编辑
      ACTIVESYSDEL: 'shop/shop/activity',//删除 
      ACTIVESYSDELS: 'shop/admin/activity',//删除
      ACTIVESALE: 'shop/admin/activity',//上下架活动 
      // 商场活动
      SHOPACTIVELIST: 'shop/shop/activity/page',
      SHOPACTIVELISTS: 'shop/admin/activity/shop_page',//总平台上传
      SHOPACTIVELISTDETAIL: 'shop/admin/activity',//查看详情
      SHOPACTIVEADD: 'shop/shop/activity/',//新增-编辑
      ACTIVEBANNER: 'shop/admin/activity/branch_page ',//品牌活动分页

      // 设置协议
      BEESAGREEMENT:basePath+'sys_var/beesAgreement',//修改,获取蜜蜂协议
      USERAGREEMENT:basePath+'sys_var/agreement',//修改，获取用户协议
      GETAPPUPDATEIOS:basePath +'sys_var/iOS_version', //ios app更新 
      GETAPPUPDATEANDROID:basePath +'sys_var/android_version',  //android
      PUTAPPUPDATEIOS:basePath +'sys_var/iOS_version_update',  //
      PUTAPPUPDATEANDROID:basePath +'sys_var/android_version_update', //
      GETAPPADDERSS:basePath +'sys_var/android_download_url',  //app地址
      BEESSTARTPAGE:basePath +'sys_var/start_page',  //启动页获取，修改
      BEESPROPAGATEPIC:basePath+'sys_var/propagate_pic', //推广页签
      ACTIVITYSYS : basePath + 'sys_var/activity',  // 创建活动
      ACTIVITYPERVIEW:basePath+'sys_var/preview',  //获取预览链接

      //商场列表

      SHOPLISTS: 'shop/admin/shop/list',//商场列表无分页 
      BRANCHS: 'shop/admin/branch/liset',//品牌列表无分页 
      GOODSLIST: 'item/app/item/page',//商品列表无分页 
      ACTIVELSITS: 'shop/admin/activity/liset',//活动列表无分页 
      ADDBRAND: 'banner/admin/banner/',//新增barner
      // 轮播图
      BANNERLIST: 'banner/admin/banner/page',//barnerlist  
      BANNERDEL: 'banner/admin/banner',//删除 
      BANNERDEATIL: 'banner/admin/banner/',//详情 

      // 系统设置
      GETCANCELTIME: 'order/order/cancel/findOne', // 获取订单超时时间
      UPDATECANCELTIME: 'order/order/cancel/update', // 设置订单

      // 优惠banner设置
      BANNERCOUPON: banner + 'admin/banner_coupon/page',//分页
      BANNERCOUPONPUDATE: banner + 'admin/banner_coupon/',//修改，新增，详情，删除
      // 运费模板
      FRIGHT:'item/biz/fright/page', //运费模板
      INSERTDEL:'item/biz/fright/delete', //运费模板删除 
      INSERT:'item/biz/fright/insert', //运费模板新增
      INSERTDTAIL:'item/biz/fright', //运费模板获取详情 
      INSERTUPDATE: 'item/biz/fright/update', //运费模板更新

      //品牌logo管理
      SHOPLOGOPAGE:'shop/logo/page',//列表
      SHOPLOGOFINDONE:'shop/logo/findOne/',//详情
      SHOPLOGODELETE:'shop/logo/delete/',//删除
      SHOPLOGOSAVA:'shop/logo/save'//保存
    }
  };
  let url = Controller.url[str] || null
  if (url) url = `${url}`;
  return url;
}