<template>
  <div class="content-list">
    <div class="screen-box">
      <el-form label-width="80px" class="title-box">
        <el-form-item label="商场" class="lud">
            <el-select v-model="queryData.shopId" placeholder="请选择" clearable @change="getBrandList">
              <el-option v-for="(item,index) in shopList" :key="index" :label="item.shopName" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
         <el-form-item label="品牌" class="lud">
           <el-select v-model="queryData.branchNo" placeholder="请选择" clearable>
            <el-option v-for="(item,index) in brandList" :key="index" :label="item.branchName" :value="item.branchCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态" style="float:left;">
          <el-select v-model="queryData.orderStatus" placeholder="请选择" clearable>
             <el-option v-for="(item,index) in orderStatus" :key="index" :label="item.key" :value="item.val"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="时间" style="float:left;">
            <el-date-picker
              v-model="orderTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd">
           </el-date-picker>
        </el-form-item>
        <div style="float: left">
          <el-button class="left-btn" type="primary" @click="select">查询</el-button>
        </div>
      </el-form>
    </div>
    <div class>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="outOrderCode" label="订单编号" width="180"></el-table-column>
        <el-table-column prop="itemName" label="商品名" width="180"></el-table-column>
        <el-table-column prop="goodPrice" label="价格" width="180"></el-table-column>
        <el-table-column prop="count" label="数量" width="180"></el-table-column>
        <el-table-column prop="totalPrice" label="订单金额" width="180"></el-table-column>
        <el-table-column prop="actualPrice" label="实付款"/>
        <el-table-column prop="orderStatus" label="订单状态">
          <template slot-scope="scope">
            <div v-html="getOrderStatus(scope.row.orderStatus)"></div>
          </template>
        </el-table-column>
        <el-table-column prop="deliveryType" label="发货方式">
           <template slot-scope="scope">
            <div v-if="scope.row.deliveryType == 'EXPRESS'">物流发货</div>
          </template>
        </el-table-column>

        <el-table-column prop="userName" label="下单用户"/>
        <el-table-column prop="orderTime" label="下单时间"/>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20,30,40]"
        layout="total, sizes, prev, pager, next,jumper"
        :total="pageCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { httpPost,formDel } from "../../util/post";
export default {
  data() {
    return {
      currentPage: 1,
      pageCount: null,
      tableData: [],
      orderStatus:[
         {key:'全部',val:''},
         {key:'待支付',val:'WAIT_PAY'},
         {key:'待发货',val:'WAIT_SEND'},
         {key:'待收货',val:'WAIT_RECEIVING'},
         {key:'已完成',val:'COMPLETED'},
         {key:'用户主动取消',val:'CANCEL_ADMIN'},
         {key:'后台取消',val:'CANCEL_USER'},
         {key:'超时取消',val:'CANCEL_TIMEOUT'},
      ],
      orderTime:['',''], //订单时间
      queryData:{
            shopId:"", // 店铺id
            branchNo:"", //品牌id
            orderStatus:"", // 订单状态
            startTimeGe:"", // 下单开始时间
            endTimeLe:"", // 下单结束时间
            pageIndex: 1,
            pageSize: 10,
        
      },
      shopList:[], // 商场列表
      brandList:[], // 品牌列表
      statusList:[], // 订单状态列表
    };
  },
  created() {
    this.getOrderList();
    this.getShopList();
  },
  methods: {
    getOrderStatus(type) {
      let val = "";
      switch (type) {
        case "WAIT_PAY":
          val = "待付款";
          break;
        case "WAIT_SEND":
          val = "待发货";
          break;
        case "WAIT_RECEIVING":
          val = "待收货";
          break;
        case "CANCEL_USER":
          val = "已取消";
          break;
        case "CANCEL_TIMEOUT":
          val = "超时关闭";
          break;
        default:
          val = "";
          break;
      }
      return val;
    },
    // 订单详情
    handleDeatile(id){
       this.$router.push('/sysOrderDetail?id='+id);
    },
    // 取消订单
    handleCancel(id){
      this.$confirm("确认取消该订单吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let params={id}
            formDel('CANCELORDER',params).then(res=>{
              if(res.code==200){
                  this.$message.success("删除成功");
                  this.getOrderList();
              }else{
                this.$message.warning("网络错误");
              }
            })
          })
          .catch(() => {});
    },
    select() {
      this.queryData.currentPage = 1;
      this.queryData.pageIndex = 1;
      this.getOrderList();
    },
    handleSizeChange(val) {
      this.queryData.pageSize = val;
      this.getOrderList();
    },
    handleCurrentChange(val) {
      this.queryData.pageIndex = val;
      this.getOrderList();
    },
    // 获取商场列表
    getShopList(){
        httpPost("SHOPMAP").then(res => {
          if (!res) return;
          this.shopList = res.data;
        });
    },
    // 获取品牌列表
    getBrandList(){
        let params ={
          shopId:this.queryData.shopId
        }
        if(params.shopId == ''){
          return
        }
        httpPost("BRANCHMAP",params).then(res => {
          if (!res) return;
          this.brandList = res.data;
        });
    },
    // 获取订单列表
    getOrderList() {
      this.queryData.startTimeGe = this.orderTime[0];
      this.queryData.endTimeLe = this.orderTime[1];
      httpPost("ORDERLIST", this.queryData).then(res => {
        if (!res) return;
        this.tableData = res.data;
        this.pageCount = res.count;
      });
    },
  }
};
</script>

<style lang="scss">
.add-box {
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
  border-bottom: 1px solid rgba(187, 187, 187, 1);
  align-items: center;
}
.content-list {
  .screen-box {
    margin: 10px 0;
  }
  .lud {
    float: left;
    text-align: center;
  }
  .lud-select {
    width: 100px;
  }
}
.el-button--primary {
  background-color: #409eff;
  border-color: #409eff;
}
.el-date-editor .el-range-separator{
    padding: 0 20px;
}
</style>
