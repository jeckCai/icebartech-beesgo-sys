<!--
 * @Author: your name
 * @Date: 2019-11-19 15:58:27
 * @LastEditTime : 2019-12-23 16:44:48
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
                    <el-col :span="12"><div class="grid-content bg-purple">订单管理》物流详情</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-light"  style="text-align: right">
                    <el-button type="primary"  @click="$router.go(-1)">返回</el-button>
                    </div></el-col>
                </el-row>
            </div>
          </div>
          <!-- 物流单号 -->
          <div class="form">
               <div class="flex">
                    <span class="_title">物流公司：</span>
                    <span ></span>
               </div>
               <div class="flex">
                    <span class="_title">物流单号：</span>
                    <span></span>
               </div>
          </div>
          <!-- 物流信息 -->
          <div class="info">
              <div class="item">
                  <div class="time"></div>
                  <div class="text"></div>
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
                default:
                    val = '';
                    break;
            }

            return val;
            
        },
        //获取物流详情
        getDetail() {
                let id= this.$router.currentRoute.query.id;
                httpGet('logistics',id).then(res=>{
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