<!--
 * @Author: your name
 * @Date: 2019-11-19 15:58:27
 * @LastEditTime : 2019-12-24 19:27:53
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \icebartech-beesgo-brand\src\views\order\selfOrder\detail.vue
 -->

<template>
    <div class="quickOrderDetail">
        <!-- 头部 -->
          <div class="xb">
            <div class="input_modal">
                <el-row style="display: flex; align-items: center">
                    <el-col :span="12"><div class="grid-content bg-purple">订单管理》订单详情</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-light"  style="text-align: right">
                    <el-button type="primary"  @click="$router.go(-1)">返回</el-button>
                    </div></el-col>
                </el-row>
            </div>
          </div>
          <!-- 订单详情 -->
          <div class="form">
               <div class="flex">
                    <span class="_title">快速单号：</span>
                    <span v-html="form.outOrderCode"></span>
               </div>
               <div class="flex">
                    <span class="_title">订单状态：</span>
                    <span v-html="getOrderStatus(form.orderStatus)"></span>
               </div>
               <div class="flex" v-if="form.userName">
                    <span class="_title">下单用户: </span>
                    <span v-html="form.userName"></span>
               </div>
               <div class="flex">
                    <span class="_title">商品名: </span>
                    <span v-html="form.itemName"></span>
               </div>
                <div class="flex">
                    <div class="_title" style="height:180px;">吊牌图: </div>
                    <img style="width:100px;margin-right:10px;"  :src="form.goodsDTO.tagImage.imageUrl" alt="">
               </div>
                <div class="flex">
                    <span class="_title">尺码:</span>
                    <span  v-html="form.goodsDTO.modelSize"></span>
               </div>
                <div class="flex">
                    <span class="_title">价格:</span>
                    <span  v-html="form.goodPrice"></span>
               </div>
                 <div class="flex">
                    <span class="_title">数量:</span>
                    <span v-html="form.count"></span>
               </div>
           
               <div class="flex">
                    <span class="_title">订单金额:</span>
                    <span>{{form.totalPrice}}元</span>
               </div>
                <div v-if="form.orderStatus == 'WAIT_RECEIVING'">
                <div class="flex">
                        <span class="_title">运费:</span>
                        <span v-html="form.frightPrice"></span>
                </div>
                <div class="flex">
                        <span class="_title">实付款:</span>
                        <span>{{form.actualPrice}}元</span>
                </div>
                <div class="flex" v-if="form.payType">
                        <span class="_title">支付方式:</span>
                        <span v-if="form.payType=='WXPAY'">微信支付</span>
                        <span v-if="form.payType=='ALIPAY'">支付宝支付</span>
                </div>
                    <div class="flex">
                        <span class="_title">下单时间:</span>
                        <span v-html="form.orderTime"></span>
                </div>
                    <div class="flex">
                        <span class="_title">发货方式:</span>
                        <span v-if="form.deliveryType == 'EXPRESS'">物流发货</span>
                        <span v-else>门店自提</span>
                </div>
                    <div class="flex">
                        <span class="_title">收货人:</span>
                        <span v-html="form.userName"></span>
                </div>
                    <div class="flex">
                        <span class="_title">收货电话:</span>
                        <span v-html="form.userMobile"></span>
                </div>
                 <div class="flex">  
                        <span class="_title">收货地址:</span>
                        <span v-html="form.address"></span>
                </div>
                 <div class="flex">  
                        <span class="_title">物流公司:</span>
                        <span v-html="getExpressName(form.expressType)"></span>
                </div>
                 <div class="flex">  
                        <span class="_title">物流单号:</span>
                        <span v-html="form.wayBillCode"></span>
                </div>
               </div>
          </div>
    </div>
</template>
<script>
import { httpPost,httpGet} from '@/util/post'

export default {
    data(){
        return {
           form:{
                orderId:"",
                orderStatus:"",
                userName:"",
           }
        }
    },
    mounted(){
       this.getDetail();
    },
    methods:{
         getExpressName(type){
            let val = '';
            switch(type){
                case 'WAIT_PAY':
                    val = '顺丰';
                    break;
                case 'ZT':
                    val = '中通';
                    break;
                case 'YT':
                    val = '圆通';
                    break; 
                case 'HT':
                    val = '汇通';
                    break;  
                case 'YD':
                    val = '韵达';
                case 'ST':
                    val = '申通';
                    break; 
                case 'YZ':
                    val = '邮政包裹/平邮';
                    break; 
                case 'EMS':
                    val = 'EMS';
                    break;  
                case 'TT':
                    val = '天天';
                    break;  
                case 'DB':
                    val = '德邦';
                    break;  
                default:
                    val = '';
                    break;
            }

            return val + '快递';
        },
         getOrderStatus(type){
            let val = '';
            switch(type){
                case 'WAIT_PAY':
                    val = '待付款';
                    break;
                case 'WAIT_SEND':
                    val = '待发货';
                    break;
                case 'WAIT_RECEIVING':
                    val = '待收货';
                    break; 
                case 'CANCEL_USER':
                    val = '已取消';
                    break; 
                case 'COMPLETED':
                    val = '已完成';
                    break;   
                case 'CANCEL_TIMEOUT':
                    val = '超时关闭';
                    break;  
                case 'CANCEL_TIMEOUT':
                    val = '超时关闭';
                    break;  
                default:
                    val = '';
                    break;
            }

            return val;
            
        },
        //获取订单详情
        getDetail() {
                let id= this.$router.currentRoute.query.id;
                httpGet('selfOrderDetail',id).then(res=>{
                    if (res.code == 200) {
                    this.form = res.data
                }
         }) 
        }
    }
}
</script>
<style scoped>
  .form{
      width:100%;
      padding:30px 80px;
      background:#fff;
  }
  .form .flex{
      padding-bottom: 20px;
  }
     .form .flex ._title{
          display: inline-block;
          margin-right: 20px;
     }
</style>    