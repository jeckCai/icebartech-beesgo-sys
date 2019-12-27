<!--
 * @Descripttion: 描述
 * @version: 版本
 * @Author: xiongbin
 * @Date: 2019-08-21 10:22:45
 * @LastEditors  : 1490251116@qq.com
 * @LastEditTime : 2019-12-23 14:09:07
 --> 
<template>
  <div class="xb">
    <div class="input_modal">
      <el-button type="primary"  @click="handleAddAccount">新增运费模板</el-button>
    </div>
    <div class="input_modal">
      <div class="input-item">
        <span>模板名称</span>
        <el-input
          v-model="frightNameLike"
          placeholder="请输入"
          class="proName"
          @keyup.enter.native="getList"
        />
      </div>
      <el-button type="primary"  @click="getList">查询</el-button>
    </div>
    <div class="table_con">
      <el-table :data="tableData">
        <el-table-column :formatter="formatter" type="index" width="180px" label="序号"/>
        <el-table-column :formatter="formatter" prop="frightName" label="模板名称"/>
        <el-table-column  prop="isFreeShipping" label="是否包邮">
         <template slot-scope="scope">
            <span>{{scope.row.isFreeShipping=='y'?'是':'否'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop label="操作" width="200px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleShowModal(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDeleteItem(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="提示" :visible.sync="isAddCityModal" width="30%">
      <div class="modal_input">
        <span>城市名称：</span>
        <el-input
          v-model="inputName"
          placeholder="请输入"
          class="proName"
          @keyup.enter.native="searchCity"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isAddCityModal = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageIndex"
        :page-size="pageSize"
        :page-sizes="[10,20,30,40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import { httpPost,formDel } from '@/util/post' 
export default {
  name: 'account-list',
  data() {
    return {
        options: [{
          value: 'y',
          label: '是'
        }, {
          value: 'n',
          label: '否'
        } ],
        options1: [{
          value: 'y',
          label: '已下架'
        }, {
          value: 'n',
          label: '已上架'
        } ],
       
      frightNameLike : null,
      departmentLike  : null,
      mobileLike  : null,
      nameLike  : null, 
      id: null,
      inputName: null,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      isAddCityModal: false
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
    // 新增账号
    handleAddAccount(){
      this.$router.push({
        name:'addFreight'
      })
    },
    //获取列表
      getList() {
      const param = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      if(this.frightNameLike){
        this.pageIndex = 1
        param.frightNameLike=this.frightNameLike
      }   
      httpPost('FRIGHT',param).then(res=>{
        if (res.code == 200) {
        this.tableData = res.data
        this.total = res.count
      }
      }) 
    },
    //禁用
    handleDisabled({disableStatus ,id }){ 
      let title=disableStatus=='n'?'确定禁用吗？':'确定启用吗？';
      let param = `?id=${id}` 
       this.$confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(
         async ()=>{
            if(disableStatus=='n'){//禁用  
          const{ data }= await account.disEnable(param)
          if(data.code==200){
              this.$message({
              type: 'success',
              message: '禁用成功!'
            })
          }
          this.getList()  
          }else{//启用
            const { data } = await account.enable(param)
            if(data.code==200){
              this.$message({
              type: 'success',
              message: '启用成功!'
            })
          }
            this.getList()  
          }
         }

           )
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用'
          })
        }) 
      
    },
 
    handleShowModal(id) {
      this.id = !Number(id) ? null : id
      this.$router.push({
        path:'/addFreight',
        query:{id:id}
      })
    },

    async handleConfirm() {
      let param
      if (this.id) {
        param = { id: this.id, name: this.inputName }
      } else {
        param = { name: this.inputName }
      }
      const { data = {} } = await account.save(param)
        this.handleShowModal()
        this.getList()
        this.inputName = null
    },

      handleDeleteItem(id) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then( ()=>{
        let params={id}
        formDel("INSERTDEL",params).then(res=>{
          if(res.code==200){
             this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList()
          }else{
            this.$message({
              type: 'warning',
              message: '网络错误'
            })
          }
          console.log(res)
        })
      }
        
      )
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },

    handleCurrentChange(val) {
      this.pageIndex = val
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
.input_modal{
    background: white;
    padding: 10px;
    display: flex;
    margin-bottom: 10px;
    .input-item{
        display: flex;
        span{
            flex-shrink:0;
            text-align: center;
            align-items: center;
            display: flex;
            margin-right: 5px;
        }
    }
}
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
