<!--
 * @Descripttion: 描述
 * @version: 版本
 * @Author: xiongbin
 * @Date: 2019-08-21 10:22:45
 * @LastEditors: 1490251116@qq.com
 * @LastEditTime: 2019-11-11 13:34:57
 --> 
<template>
  <div class="container">
    <div class="input_modal">
      <!-- <div class="homeTop">首页</div> -->
      <img width="30%" style="margin:10% 40% 10% 30%" src="../../assets/images/logo.png">
      <!-- <ul>
        <li>
          <p>今日新增会员</p>
          <span>100</span>
        </li>
         <li>
          <p>会员总数</p>
          <span>100</span>
        </li>
         <li>
          <p>月销售额</p>
          <span>100</span>
        </li>
         <li>
          <p>销售总额</p>
          <span>100</span>
        </li>
         <li>
          <p>月订单数</p>
          <span>100</span>
        </li>
         <li>
          <p>订单总数</p>
          <span>100</span>
        </li>
      </ul> -->

    </div>
  </div>
</template>

<script>
// import { account } from '@/agent'

export default {
  name: 'home',
  data() {
    return {
      
    }
  },

  mounted() {
    // this.getList()
  },

  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
.modal_input {
  display: inline-block;
  margin-right: 20px;
  clear: both;
  height: 50px;
  line-height: 50px;
  position: relative;
}
.input_modal{
    .homeTop{
      padding: 30px;
      border-bottom: 1px solid #ccc;
    }
    ul{
        list-style: none;
        display: flex;
        height: 700px;
        li{
          list-style: none;
          border: 1px solid #ccc;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          width: 180px;
          height: 80px;
          margin-right: 30px;
        }
    }
}
</style>
