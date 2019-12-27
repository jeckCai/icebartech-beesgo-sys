<!--
 * @Descripttion: 描述
 * @version: 版本
 * @Author: xiongbin
 * @Date: 2019-08-21 10:22:45
 * @LastEditors: 1490251116@qq.com
 * @LastEditTime: 2019-12-11 17:34:28
 --> 
<template>
  <div class="xb">
    <div class="input_modal" v-if="this.$store.state.resourceCodeList.indexOf('brand:ShopList:add')>=0">
      <el-button type="primary"  @click="handleAddAccount">新增商品</el-button>
    </div>
    <div class="input_modal">
      <div class="input-item">
        <span>商品一级分类</span>
        <el-input
          v-model="nameLike"
          placeholder="请输入"
          class="proName"
          @keyup.enter.native="getList"
        />
      </div>
      
      <div class="input-item">
        <span>商品二级分类</span>
        <el-input
          v-model=" childCategoryNameLike"
          placeholder="请输入"
          class="proName"
          @keyup.enter.native="getList"
        />
      </div>
      <div class="input-item">
        <span>商品名</span>
        <el-input
          v-model="itemNameLike"
          placeholder="请输入"
          class="proName"
          @keyup.enter.native="getList"
        />
      </div>
      <!-- <div class="input-item">
        <span>是否热门</span>
        <el-select v-model="isHot" placeholder="全部">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div> -->
      <div class="input-item">
        <span>商品状态</span>
        <el-select v-model="upShelf" placeholder="全部">
          <el-option label="全部" value="">
          </el-option>
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button type="primary"  @click="getList">查询</el-button>
    </div>
    <div class="table_con">
      <el-table :data="tableData">
        <el-table-column :formatter="formatter" prop="categoryName" width="180px" label="商品一级分类"/>
        <el-table-column :formatter="formatter" prop="childCategoryName" label="商品二级分类"/>
        <el-table-column :formatter="formatter" prop="itemName" label="商品名"/>
        <!-- <el-table-column :formatter="formatter" prop="isHot" label="是否是热门">
          <template slot-scope="scope">
            <span> {{scope.row.isHot=='y'?'是':'否'}}</span>
          </template>
        </el-table-column> -->
        <el-table-column :formatter="formatter" prop="department" label="平台审核状态">
          <template slot-scope="scope">
            <span v-if="scope.row.checkStatus=='FINISH'">  已审核 </span>
            <span v-if="scope.row.checkStatus=='REJECT'">已拒绝</span>
            <span v-if="scope.row.checkStatus=='WAITING'">未审核</span>
          </template>
        </el-table-column>
        <el-table-column :formatter="formatter" prop="upShelf" label="商品状态">
          <template slot-scope="scope">
            <span> {{scope.row.upShelf=='y'?'已上架':'已下架'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop label="操作" width="280px">
          <template slot-scope="scope">
            <el-button :type="scope.row.upShelf=='y'?'warning':'success'" size="mini" @click="handleShowUpdete(scope.row)" v-if="scope.row.checkStatus=='FINISH'&&scope.row.upShelf=='y'&&$store.state.resourceCodeList.indexOf('brand:ShopList:down')>=0">下架</el-button>
            <el-button :type="scope.row.upShelf=='y'?'warning':'success'" size="mini" @click="handleShowUpdete(scope.row)" v-if="scope.row.checkStatus=='FINISH'&&scope.row.upShelf!='y'&&$store.state.resourceCodeList.indexOf('brand:ShopList:up')>=0">上架</el-button>
            <el-button type="primary" size="mini" @click="handleShowModal(scope.row.id)" v-if="$store.state.resourceCodeList.indexOf('brand:ShopList:edit')>=0">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDeleteItem(scope.row.id)" v-if="$store.state.resourceCodeList.indexOf('brand:ShopList:delete')>=0">删除</el-button>
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
        options: [{
          value: 'y',
          label: '是'
        }, {
          value: 'n',
          label: '否'
        } ],
        options1: [{
          value: 'n',
          label: '已下架'
        }, {
          value: 'y',
          label: '已上架'
        } ],
        childCategoryNameLike:'',
        upShelf:'',
        isHot:'',
      itemNameLike : '',
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
        
         title = '确认下架吗?';
         message = '下架成功';
        params = { id, upShelf: 'n' };
      }else{//下架
       title = '确认上架吗?';
        message = '上架成功';
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
        name:'addShop'
      })
    },
    //获取列表
      getList() {
      const param = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      if(this.upShelf){
        this.pageIndex = 1
        param.upShelf=this.upShelf
      }
      if(this.isHot ){
        this.pageIndex = 1
        param.isHot =this.isHot 
      }
      if(this.itemNameLike ){
        this.pageIndex = 1
        param.itemNameLike =this.itemNameLike 
      }
      if(this.childCategoryNameLike  ){
        this.pageIndex = 1
        param.childCategoryNameLike  =this.childCategoryNameLike  
      }
      httpPost('SHOPLIST',param).then(res=>{
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
        path:'/addShop',
        query:{id:id}
      })
    },

     
    handleDeleteItem(id){
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(formDel)
          let params={id}
          formDel("SHOPDEL",params).then(res=>{
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
