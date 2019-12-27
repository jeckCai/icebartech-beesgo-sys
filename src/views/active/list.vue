<!--
 * @Descripttion: 描述
 * @version: 版本
 * @Author: xiongbin
 * @Date: 2019-08-21 10:22:45
 * @LastEditors: 1490251116@qq.com
 * @LastEditTime: 2019-12-07 17:45:36
 --> 
<template>
  <div class="xb">
    <div class="input_modal">
      <el-button type="primary"  @click="handleAddAccount">新增活动</el-button>
    </div>
    <div class="input_modal">
      <div class="input-item">
        <span>活动名称</span>
        <el-input
          v-model="nameLike"
          placeholder="请输入"
          class="proName"
          @keyup.enter.native="getList"
        />
      </div>  
      <div class="input-item">
        <span>状态</span>
        <el-select v-model="auditStatus" placeholder="全部">
          <el-option label="全部" value=""></el-option>
          <el-option label="审核通过" value="PASS"></el-option>
          <el-option label="待审核" value="REVIEW"></el-option>
          <el-option label="审核未通过" value="REJECT"></el-option>
          
        </el-select>
      </div>
      <div class="input-item">
        <span>审核结果</span>
        <el-select v-model="upShelf" placeholder="全部">
           <el-option label="全部" value=""></el-option>
          <el-option label="审核通过" value="PASS"></el-option>
          <el-option label="审核不通过" value="REVIEW"></el-option>
        </el-select>
      </div>
      <el-button type="primary"  @click="getList">查询</el-button>
    </div>
    <div class="table_con">
      <el-table :data="tableData">
        <el-table-column :formatter="formatter" prop="categoryName" width="180px" label="活动图">
          <template slot-scope="scope">
            <img style="width:100px" :src="scope.row.image.imageUrl" alt="">
          </template>
        </el-table-column>
        <el-table-column :formatter="formatter" prop="name" label="活动名称"/>
        <el-table-column :formatter="formatter" prop="sdate" label="活动开始时间"/>
        <el-table-column :formatter="formatter" prop="edate" label="活动结束时间"/>
        <el-table-column :formatter="formatter" prop="auditStatusDesc" label="审核状态"/>
        <el-table-column :formatter="formatter" prop="isSaleDesc" label="活动状态"> </el-table-column>
        <el-table-column prop label="操作" width="280px">
          <template slot-scope="scope">
            <el-button :type="scope.row.upShelf=='y'?'warning':'success'" size="mini" @click="handleShowUpdete(scope.row)" v-if="scope.row.checkStatus=='FINISH'">{{scope.row.upShelf=='y'?'下架':'上架'}}</el-button>
            <el-button type="primary"  v-if="scope.row.auditStatusDesc!=='审核通过'" size="mini" @click="handleShowModal(scope.row.id,0)">编辑</el-button>
            <el-button type="primary"  v-else size="mini" @click="handleShowModal(scope.row.id,1)">查看</el-button>

            <el-button type="danger" v-if="scope.row.auditStatusDesc!=='审核通过'" size="mini" @click="handleDeleteItem(scope.row.id)">删除</el-button>
            <el-button type="info" v-else size="mini" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div> 

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
import { httpPost,formDel,httpDel,httpPut } from '@/util/post'

export default {
  name: 'account-list',
  data() {
    return { 
        options1: [{
          value: 'n',
          label: '已下架'
        }, {
          value: 'y',
          label: '已上架'
        } ],
        childCategoryNameLike:'',
        upShelf:'',
      auditStatus:'',
      itemName : '',
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
    handleShowUpdete(e){
      let id=e.id;
      let message=''
      let title=''
      let params={}
      if(e.upShelf=='y'){//下架
        title = '确认上架吗?';
        message = '下架成功';
        params = { id, upShelf: 'n' };
      }else{//下架
        title = '确认下架吗?';
         message = '下架成功';
         params = { id, upShelf: 'y' };
      }
      this.$confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        httpPut('SHOPCHECKUPSELF', params).then(res => {
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: message
            });
            this.getList();
          } else {
            this.$message({
              type: 'warning',
              message: '网络异常!'
            });
          }
        })
      }).catch(() => {
      });
    },
    // 格式化元素，当为空的时候显示 "- -"
    formatter(row, column, cellValue) {
      return cellValue || '- -'
    },
    // 新增账号
    handleAddAccount(){
      this.$router.push({
        name:'addActive'
      })
    },
    //获取列表
      getList() {
      const param = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      if(this.auditStatus){
        this.pageIndex = 1
        param.auditStatus=this.auditStatus
      }
      if(this.isHot ){
        this.pageIndex = 1
        param.isHot =this.isHot 
      }
      if(this.nameLike ){
        this.pageIndex = 1
        param.nameLike =this.nameLike 
      }
      if(this.childCategoryNameLike  ){
        this.pageIndex = 1
        param.childCategoryNameLike  =this.childCategoryNameLike  
      }
      httpPost('ACTIVELIST',param).then(res=>{
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
 
    handleShowModal(id,type) {
      this.id = !Number(id) ? null : id
      this.$router.push({
        path:'/addActive',
        query:{id:id,type}
      })
    },

     
    handleDeleteItem(id){
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          httpDel("ACTIVELISTDEL",id).then(res=>{
           if(res.code==200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
             this.getList()
            }
        }) 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
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
