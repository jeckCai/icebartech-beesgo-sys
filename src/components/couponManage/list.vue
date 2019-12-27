<!--
 * @Descripttion: 描述
 * @version: 版本
 * @Author: weizhengda
 --> 
<template>
  <div class="xb">
    <div class="input_modal">
      <el-button type="primary"  @click="handleAddAccount">新增优惠券</el-button>
    </div>
    <div class="input_modal">
     
      <el-form :inline="true" :model="queryData" class="demo-form-inline">
            <el-form-item label="优惠券名称">
                <el-input v-model="queryData.couponName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="优惠券类型">
                <el-select v-model="queryData.couponType" placeholder="全部">
                    <el-option v-for="(item,index) in couponTypeArr" :key="index" :label="item.key" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getList">查询</el-button>
            </el-form-item>
       </el-form>
    </div>
    <div class="table_con">
      <el-table :data="tableData" style="width: 100%">
         <el-table-column
            type="index"
            width="50"
            label="序号">
          </el-table-column>
        <el-table-column :formatter="formatter" prop="couponModelTitle" label="模板名称"/>
        <el-table-column :formatter="formatter" prop="couponType" label="优惠券类型">
             <template slot-scope="scope">
                <div v-if="scope.row.couponType == 1">无门槛指定券</div>
                 <div v-if="scope.row.couponType == 2">有门槛指定券</div>
                  <div v-if="scope.row.couponType == 3">折扣金额</div>
             </template>
        </el-table-column>
        <!-- <el-table-column :formatter="formatter" prop="couponPercent" label="折扣百分比"/> -->
        <el-table-column :formatter="formatter" prop="couponName" label="优惠券名称"/>
        <el-table-column :formatter="formatter" prop="couponQuota" label="数量(张)"/>
        <el-table-column :formatter="formatter" prop="couponLimitCount" label="限领张数"/>
        <el-table-column :formatter="formatter" label="使用期限" width="200px">
             <template slot-scope="scope">
                 <div>{{scope.row.usedStartTime.substring(0,10)}}——{{scope.row.usedEndTime.substring(0,10)}}</div>
             </template>
        </el-table-column>
        <el-table-column :formatter="formatter" prop="gmtCreated" label="使用情况" width="200px">
            <template slot-scope="scope"> 
                  <div>已发放(已领取{{scope.row.takeCount}},已使用{{scope.row.usedCount}})</div>
            </template>
        </el-table-column>
        <el-table-column :formatter="formatter" prop="auditStatus" label="优惠券状态">  
            <template slot-scope="scope"> 
                  <div v-if="scope.row.auditStatus == 0">待审核</div>
                  <div v-if="scope.row.auditStatus == 1">审核中</div>
                  <div v-if="scope.row.auditStatus == 2">审核通过</div>
                  <div v-if="scope.row.auditStatus == 3">审核拒绝</div>
            </template>
        </el-table-column>
        <!-- <el-table-column :formatter="formatter" prop="couponRemark" label="优惠说明" show-overflow-tooltip/> -->
        <el-table-column prop label="操作" width="300px" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" v-if="scope.row.auditStatus != 0" @click="editConpou(scope.row.id,'view')">查看</el-button>
            <el-button type="primary" size="mini" v-if="scope.row.auditStatus == 0" @click="editConpou(scope.row.id,'edit')">编辑</el-button>
            <el-button type="primary" size="mini" v-if="scope.row.auditStatus == 1" @click="checkConpou(scope.row.id,2)">同意</el-button>
            <el-button type="danger" size="mini"  v-if="scope.row.auditStatus == 1" @click="checkConpou(scope.row.id,3)">拒绝</el-button>
            <el-button type="primary" size="mini"  v-if="scope.row.auditStatus == 2 && scope.row.shelvesStatus == 0 " @click="handleShelves(scope.row.id,1)">上架</el-button>
            <el-button type="danger" size="mini"  v-if="scope.row.auditStatus == 2 && scope.row.shelvesStatus == 1 " @click="handleShelves(scope.row.id,0)">下架</el-button>
            <el-button type="danger" size="mini"  v-if="scope.row.auditStatus == 0 || scope.row.auditStatus == 3" @click="delConpou(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryData.pageIndex"
        :page-size="queryData.pageSize"
        :page-sizes="[10,20,30,40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </div>
  </div>
</template>
 
<script>
import { httpPost,httpDel} from '@/util/post'

export default {
  name: 'account-list',
  data() {
    return {
       
      total: 0,
      tableData: [],
      isAddCityModal: false,
      couponTypeArr:[
          {key:'全部',value:''}, 
          {key:'无门槛指定券',value:'1'}, 
          {key:'有门槛指定券',value:'2'},
          {key:'折扣金额',value:'3'},
      ],
      queryData:{
            couponName:"", // 优惠券名称
            couponType:"", // 优惠券类型
            pageIndex: 1,
            pageSize: 10,
      },
    }
  },

  mounted() {
    this.getList()
  },

  methods: {
    // 格式化元素，当为空的时候显示 "- -"
    formatter(row, column, cellValue) {
      return cellValue || '- -'
    },  
    jsonParse(key){
       let json = '';
       if(key){
          json = JSON.parse(key);
       }
       return json
    },
    // 新增
    handleAddAccount(){
      this.$router.push({
        name:'sysCouponEdit'
      })
    },
    // 查看编辑
    editConpou(id,type){
        this.$router.push('/sysCouponEdit?id='+id+'&type='+type)
    },
    // 删除
    delConpou(id){
        this.$confirm("确定删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          httpDel("COUPONDEL", id).then(res => {
            if(res.code == 200){
                this.$message.success("删除成功");
                this.getList();
            }
          });
        })
        .catch(() => {});   
    },
    // 审核优惠券
    checkConpou(id,state){
        let params = {
          couponModelId:id,
          auditStatus:state
        }
        let message = state==2? '同意':'拒绝';
        this.$confirm("确定"+message+"审核吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          httpPost("COUPONCHECK", params).then(res => {
            if(res.code == 200){
              this.$message.success("操作成功");
              this.getList();
            }
         
          });
        })
        .catch(() => {});  
    },
    // 优惠券上下架
    handleShelves(id,type) {
      let message = type == 0?'下架':'上架';
      let params = {
          couponModelId: id,
          shelvesCode: type
      }
       this.$confirm("确定"+message+"吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
           httpPost('COUPONSHELVES',params).then(res=>{
              if (res.code == 200) {
              this.$message.success("操作成功");
                    this.getList();
              }
            }) 
        })
        .catch(() => {});  
    },
    //获取列表
    getList() {
      httpPost('COUPONLIST',this.queryData).then(res=>{
        if (res.code == 200) {
        this.tableData = res.data.records;
        this.total = res.data.total;
      }
      }) 
    },

    async handleDeleteItem(id) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(async () => {
          let { data = {} } = await account.deleteDevces(id)
            if(data.code==200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
             this.getList()
            }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    handleSizeChange(val) {
      this.queryData.pageSize = val
      this.getList()
    },

    handleCurrentChange(val) {
      this.queryData.pageIndex = val
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
.input_modal{
    padding: 10px;
    background: white;
    margin-bottom: 10px;
    display: flex;
}
</style>
