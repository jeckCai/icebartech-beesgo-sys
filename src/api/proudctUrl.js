/*
 * @Descripttion: 描述
 * @version: 版本
 * @Author: xiongbin
 * @Date: 2019-11-08 14:54:24
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-24 00:12:05
 * @LastEditTime: 2019-12-03 18:08:54
 */
export default function (str) {
  let path = 'api/';
  let path2 = 'shop/branch/';
  let path3 = 'oauth2/sys/';
  const Controller = {
    url: {
      //角色管理
      ROLEDELETE: path3 + 'role/delete',//删除角色
      ROLELIST: path3 + 'role/list',//获取所有权限列表
      ROLEADD: path3 + 'role/add',//保存角色与权限
      ROLEUPDATE: path3 + 'role/update',//编辑角色

       // 权限
      GETMENURESOURCE:path3+'permission/getMenuResource',//获取资源码
      PERMISSIONLIST: path3 + 'permission/list',//获取资源列表
      PERMISSIONADD: path3 + 'permission/add',//添加权限菜单
      PERMISSIONEDIT: path3 + 'permission/edit',//编辑权限菜单
      PERMISSIONGETMENU: path3 + 'permission/getMenu',//获取所有菜单
      PERMISSIONDDELBYIDS: path3 + 'permission/delByIds',//删除权限

      //用户管理
      LOGIN: 'oauth2/sys/login', //登录接口
      LOGINOUT: 'oauth2/sys/signout', // 登出接口 // 登出接口
      UPDUSERPWD: 'user/updUserPWD', //重置密码接口
      USERINFO: path3 + 'user/info',//获取用户信息
      USERINFO: path3 + 'user/info',//获取用户信息
      USERLIST: path3 + 'user/list',//用户列表
      USERADD: path3 + 'user/add',//用户新增
      USEREDIT: path3 + 'user/edit',//编辑用户
      USERDELBYIDS: path3 + 'user/delByIds',//删除



      DELETEADMINUSERBYUSERID: 'user/deleteAdminUserByUserId',
      FINDADMINUSERBYPAGE: 'user/findAdminUserByPage',//分页获取用户列表
      FINDADMINUSERDETAILBYUSERID: 'user/findAdminUserDetailByUserId',
      FINDUSERPERMISSIONS: 'user/findUserPermissions',
      SAVEADMINUSER: 'user/saveAdminUser',
      FORBIDDENADMINUSER: 'user/forbiddenAdminUser',//设置管理员是否禁用
      //xb商品管理
      SHOPLIST: 'item/biz/item/page', //登录接口 
      SHOPINSERT:'item/biz/item/insert', //  新增商品
      CATEGORYTREE:'item/biz/category/tree_List', // 商品分类列表
      SHOPDEL:'item/biz/item/delete', // 商品删除
      SHOPDETAILE:'item/biz/item', // 商品删除
      SHOPSKU:'item/biz/item/findSkuByGooId', // 获取商品sku 
      SHOPUPDATE:'item/biz/item/update', // 编辑商品 
      SHOPCHECKUPSELF:'item/biz/item/upShelf', //上架下架
      // 蜜蜂
      BEELIST: path2 + 'bees/page', // 蜜蜂分页
      BEEADD: path2 + 'bees/', // 添加蜜蜂
      BEEMAP: path2 + 'bees/list', // 蜜蜂列表
      // 运费模板
      FRIGHT:'item/biz/fright/page', //运费模板   
      INSERT:'item/biz/fright/insert', //运费模板保存   
      INSERTDEL:'item/biz/fright/delete', //运费模板删除 
      INSERTDTAIL:'item/biz/fright', //运费模板获取详情/item/biz/fright/update  
      INSERTUPDATE: 'item/biz/fright/update', //运费模板获取详情/item/biz/fright/update  
      //新增属性
      ATTRIBUTE:'item/biz/attribute/page', //新增属性  分页
      TOP_LIST:'item/biz/category/top_list', //获取一级分类
      ATTRIBUTESAVE:'item/biz/attribute/save', //运费模板保存  /item/biz/attribute/delete
      ATTRIBUTEDEL:'item/biz/attribute/delete', //s删除  /item/biz/attribute/delete
      ATTRIBUTEUPDATE:'item/biz/attribute/update', //修改  /item/biz/attribute/delete
      // 保存商品接口

      BRANCHINFO: path2 + 'branch/',//品牌详情,修改
      
      // 订单管理
      findBranchPage:'order/admin/findBranchPage',  // 自主下单列表
      selfOrderDetail: 'order/admin/find/', // 自主订单详情
      orderSend: 'order/admin/send', // 订单发货
      quickOrder: 'order/admin/pageQuickByBranch', // 快速下单列表
      inStock:'order/admin/inStock', // 订单备货
      afterSalePage:'order/admin/after/order/page', // 订单售后列表
      afterSaleDetail:'order/admin/after/order/detail', // 订单售后详情
      afterSaleCheck:'order/admin/after/order/check', // 订单售后审核
      logistics:'order/admin/logistics/',// 查看物流
      updateFright:'order/admin/updateFright', // 编辑订单运费

      // 优惠券管理
      COUPONLIST: 'pay/admin/coupon/list', // 优惠券列表
      COUPONCREATE:'pay/admin/coupon/create', // 添加优惠券
      COUPONUPDATE: 'pay/admin/coupon/update', // 编辑优惠券
      COUPONDEL: 'pay/admin/coupon/remove', // 删除优惠券
      // 活动管理
      ACTIVELIST:'shop/branch/activity/page',//活动列表
      ACTIVELISTADD:'shop/branch/activity/',//活动新增 
      ACTIVELISTDEL:'shop/branch/activity',//活动删除
      ACTIVELISTDETAIL:'shop/branch/activity',//活动详情
      ACTIVELISTPUT:'shop/shop/activity/',//活动修改
    }       
  };
  let url = Controller.url[str] || null
  if (url) url = `${url}`;
  return url;
}