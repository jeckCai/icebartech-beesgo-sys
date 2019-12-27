<!--
 * @Descripttion: 描述
 * @version: 版本
 * @Author: xiongbin
 * @Date: 2019-08-21 10:22:45
 * @LastEditors: 1490251116@qq.com
 * @LastEditTime: 2019-12-09 20:30:07
 --> 
<template>
  <div class="xb"> 
    <div class="input_modal">
      <div class="input-item">
         <el-button type="primary" style="margin-left:20px"  @click="handleShowModal('sys',0)">新增活动</el-button>
      </div> 
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
        <span>审核状态</span>
        <el-select v-model="auditStatus" placeholder="全部">
          <el-option label="全部" value=""></el-option>
          <el-option label="审核通过" value="PASS"></el-option>
          <el-option label="待审核" value="REVIEW"></el-option>
          <el-option label="审核未通过" value="REJECT"></el-option>
          
        </el-select>
      </div>
    
      <el-button type="primary" style="margin-left:20px"  @click="getList">查询</el-button>
    </div>
    <div class="table_con">
      <el-table :data="tableData">
        <el-table-column :formatter="formatter" prop="categoryName" width="180px" label="活动图">
          <template slot-scope="scope">
            <img style="width:100px;height:100px" :src="scope.row.image.imageUrl" alt="">
          </template>
        </el-table-column>
        <el-table-column :formatter="formatter" prop="name" label="活动名称"/>
        <el-table-column :formatter="formatter" prop="sdate" label="活动开始时间"/>
        <el-table-column :formatter="formatter" prop="edate" label="活动结束时间"/>
        <el-table-column :formatter="formatter" prop="auditStatusDesc" label="审核状态"/>
        <el-table-column :formatter="formatter" prop="isSaleDesc" label="活动状态"/>
        <el-table-column prop label="操作" width="380px">
          <template slot-scope="scope">
            <!-- <el-button :type="scope.row.upShelf=='y'?'warning':'success'" size="mini" @click="handleShowUpdete(scope.row)" v-if="scope.row.checkStatus=='FINISH'">{{scope.row.upShelf=='y'?'下架':'上架'}}</el-button> -->
            <el-button type="primary" size="mini" @click="handleShowModal('sys',1,scope.row.id)">查看</el-button>
            <el-button type="warning" v-if="scope.row.isSale=='n'" size="mini" @click="handleShowModal('sys',2,scope.row.id)">编辑</el-button>
            <el-button v-if="scope.row.auditStatus=='REVIEW'" type="primary" size="mini" @click="handleShowModal('sys',3,scope.row.id)">审核</el-button>
            <el-button  v-if="scope.row.auditStatus=='PASS'" type="danger" size="mini"  @click="handleSale(scope.row.isSale,scope.row.id)">
              {{scope.row.isSale=='n'?'上架':'下架'}}
            </el-button>
            <!-- <el-button type="danger" size="mini" @click="handleDeleteItem(scope.row.id)">设为推荐</el-button> -->
            <el-button type="danger" v-if="scope.row.isSale=='n'" size="mini" @click="handleDeleteItem(scope.row.id)">删除</el-button>
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
import { httpPost,formDel,httpDel,httpPut ,strPut} from '@/util/post'

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
    // 上下架
    handleSale(status,id){
      if(status=='n'){//上架
        this.$confirm("是否上架该活动?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
            strPut("ACTIVESALE", id + "/sale").then(res => {
              if (!res) return;
              this.$message.success('上架成功');
              this.getList()
            });
          }) 
      }else{//下架
        this.$confirm("是否下架该活动?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
            strPut("ACTIVESALE", id + "/disable_sale").then(res => {
              if (!res) return;
              if(res.code==200){
                this.$message.success('下架成功');
                this.getList()
              }
            });
          }) 

      }
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
 
    handleShowModal(to,type,id) {//to：sys是总平台进入；mall是商场进入；brand是品牌进入;type=0新增；1查看 2编辑 3审核 
      this.id = !Number(id) ? null : id
      this.$router.push({
        path:'/addActive',
        query:{id,type,to}
      })
    },

     
    handleDeleteItem(id){
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          httpDel("ACTIVESYSDELS",id).then(res=>{
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
.input_modal{
    padding: 10px;
    background: white;
    margin-bottom: 10px;
    display: flex;
}
.input-item{
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.input-item span{
    width: 100px;
    display: inline-block;
    margin-left: 10px;
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
