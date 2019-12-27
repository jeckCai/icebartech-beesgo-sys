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
                <el-input v-model="queryData.couponTitle" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="优惠券类型">
                <el-select v-model="queryData.couponType" placeholder="全部">
                    <el-option v-for="(item,index) in couponTypeArr" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="有效状态">
                <el-select v-model="queryData.sendType" placeholder="全部">
                    <el-option v-for="(item,index) in effectTypeArr" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="领取状态">
               <el-select v-model="queryData.sendType" placeholder="全部">
                    <el-option v-for="(item,index) in useTypeArr" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getList">查询</el-button>
            </el-form-item>
       </el-form>
    </div>
    <div class="table_con">
      <el-table :data="tableData">
        <el-table-column :formatter="formatter" prop="couponTitle" label="优惠券名称"/>
        <el-table-column :formatter="formatter" prop="couponType" label="优惠券类型"/>
        <el-table-column :formatter="formatter" prop="couponQuota" label="发放数量"/>
        <el-table-column :formatter="formatter" prop="takeCount" label="领取数量"/>
        <el-table-column :formatter="formatter" prop="usedCount" label="已使用数量"/>
        <el-table-column :formatter="formatter" prop="usedEndTime" label="有效时间"/>
        <el-table-column :formatter="formatter" prop="gmtCreated" label="有效状态"/>
        <el-table-column :formatter="formatter" prop="gmtCreated" label="领取状态"/>
        <el-table-column prop label="操作" width="200px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editConpou(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="delConpou(scope.row.id)">删除</el-button>
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
        {key:'满减券',value:''}, 
        {key:'折扣券',value:''},
      ],
       effectTypeArr:[
        {key:'未生效',value:''}, 
        {key:'生效中',value:''},
        {key:'已过期',value:''},
      ],
       useTypeArr:[
        {key:'未领取',value:''}, 
        {key:'领取中',value:''},
        {key:'已领完',value:''},
      ],
      queryData:{
            couponTitle:"", // 优惠券名称
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
        name:'discountEdit'
      })
    },
    // 编辑
    editConpou(id){
        this.$router.push('/couponEdit?id='+id)
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
            if (!res) return;
            this.$message.success("删除成功");
            this.getList();
          });
        })
        .catch(() => {});   
    },
    //获取列表
    getList() {
      httpPost('COUPONLIST',this.queryData).then(res=>{
        if (res.code == 200) {
        this.tableData = res.data
        this.total = res.count
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
.modal_input {
  display: inline-block;
  margin-right: 20px;
  clear: both;
  height: 50px;
  line-height: 50px;
  position: relative;
  .el-input {
    width: 168px;
  }
}
</style>
