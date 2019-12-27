<!--
 * @Descripttion: 描述
 * @version: 版本
 * @Author: weizhengda
 --> 
<template>
  <div class="xb">
    <div class="input_modal" v-if="this.$store.state.resourceCodeList.indexOf('brand:Bee:add')>=0">
      <el-button type="primary"  @click="handleAddAccount">新增蜜蜂</el-button>
    </div>
    <div class="input_modal">
      <div class="input-item">
        <span>姓名</span>
        <el-input
          v-model="queryData.truenameLike"
          placeholder="请输入"
          class="proName"
          @keyup.enter.native="getList"
        />
      </div>
      <el-button type="primary"  @click="getList">查询</el-button>
    </div>
    <div class="table_con">
     
      <el-table :data="tableData">
        <el-table-column :formatter="formatter" prop="avatarKey" width="180px" label="头像">
             <template slot-scope="scope">
                 <img style="width:100px" :src="scope.row.avatar.imageUrl" alt="">
             </template>
        </el-table-column>
        <el-table-column :formatter="formatter" prop="nickname" label="蜜蜂名称"/>
        <el-table-column :formatter="formatter" prop="truename" label="姓名"/>
        <el-table-column :formatter="formatter" prop="username" label="账号名"/>
        <el-table-column :formatter="formatter" prop="gmtCreated" label="创建时间"/>
        <el-table-column prop label="操作" width="250px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" v-if="$store.state.resourceCodeList.indexOf('brand:Bee:edit')>=0" @click="viewBee(scope.row.id)">编辑</el-button>
            <el-button type="primary" size="mini" v-if="$store.state.resourceCodeList.indexOf('brand:Bee:look')>=0" @click="editBee(scope.row.id)">查看</el-button>
            <el-button type="danger" size="mini" v-if="$store.state.resourceCodeList.indexOf('brand:Bee:delete')>=0" @click="delBee(scope.row.id)">删除</el-button>
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
        beesStatusArr: [{
          value: 'IDLE',
          label: '空闲'
        }, {
          value: 'BUSY',
          label: '忙碌'
        } ],
      total: 0,
      tableData: [],
      isAddCityModal: false,
      queryData:{
          shopId: 0,
          truenameLike: "",
        	beesStatus: "", // 蜜蜂状态
          pageIndex: 1,
          pageSize: 10,
         
      }
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
        name:'beeAdd'
      })
    },
    // 查看
    viewBee(id){
       this.$router.push('/beeAdd?id='+id)
    },
    // 编辑
    editBee(id){
        this.$router.push('/beeEdit?id='+id)
    },
    // 删除
    delBee(id){
        this.$confirm("确定删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          httpDel("BEEADD", id).then(res => {
            if (!res) return;
            this.$message.success("删除成功");
            this.getList();
          });
        })
        .catch(() => {});   
    },
    //获取列表
    getList() {
      httpPost('BEELIST',this.queryData).then(res=>{
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
