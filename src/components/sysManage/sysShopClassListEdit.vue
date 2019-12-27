<template>
  <div class="content-list">
    <div class="screen-box">
      <div class="title-box">
        <el-button class="left-btn" type="primary" @click="mallAdd(2)">新增一级分类</el-button>
        <el-button class="left-btn" type="primary" @click="mallAdd(1)">返回</el-button>
      </div>
      <el-form label-width="80px" class="title-box">
        <el-form-item label="一级分类" class="lud">
          <el-input v-model="categoryNameLike" placeholder="请输入"></el-input>
        </el-form-item>
        <div style="float: left">
          <el-button class="left-btn" type="primary" @click="select">查询</el-button>
        </div>
      </el-form>
    </div>
    <div class>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="categoryName" label="一级分类" width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="success" @click="handleDel(scope.row.id)">删除</el-button>
            <el-button
              size="mini"
              type="primary"
              v-if="scope.row.auditStatus=='REVIEW'"
              @click="shopAuditStatus(scope.row.id,'pass')"
            >同意</el-button>
            <el-button
              size="mini"
              type="danger"
              v-if="scope.row.auditStatus=='REVIEW'"
              @click="shopAuditStatus(scope.row.id,'reject')"
            >拒绝</el-button>
          </template>
        </el-table-column>
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
    <!-- 审核拒绝dialog -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="500px">
      <el-form label-width="70px">
        <el-form-item label="拒绝原因">
          <el-input type="textarea" rows="5" maxlength="60" v-model="reason" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="isConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增二级分类dialog -->
    <el-dialog :title="title" :visible.sync="dialogAddClass" width="500px">
      <el-form label-width="120px">
        <el-form-item label="一级分类" required>
          <el-input type="text" rows="3" maxlength="60" v-model="categoryName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="排序"  >
          <el-input type="number" rows="3" maxlength="60" v-model="sort" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddClass = false">取 消</el-button>
        <el-button type="primary" @click="isConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { httpPost, formDel, formPost,httpPut } from "../../util/post";
export default {
  data() {
    return {
      categoryName:'',
      categoryNames:'',
      categoryNameLike: "",
      oneData:[],
      sort:'',
      sorts:'',
      username: "",
      auditStatus: "",
      currentPage: 1,
      pageSize: 10,
      pageIndex: 1,
      pageCount: null,
      tableData: [],
      dialogVisible: false, //弹出层
      dialogAddClass:false,//新增二级分类弹窗成
      reason: "",
      id: "",
      status: "",
      edit:0,
      title:'新增一级分类',
    };
  },
  components:{
    uploadOne: resolve => require(["../upload/uploadOne"], resolve),
  },
  created() {
    this.mallList();
  },
  methods: {
    select() {
      this.currentPage = 1;
      this.pageIndex = 1;
      this.mallList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.mallList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.mallList();
    },
    mallList() {
      let param = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        parentId: 0
      };
      if (this.categoryNameLike) {
        param.categoryNameLike = this.categoryNameLike;
      }
      httpPost("CATEGORYTOPPAGE", param).then(res => {
        if (!res) return;
        this.tableData = res.data;
        this.pageCount = res.count;
      });
    },
    mallAdd(e) {
        if(e==2){//新增二级分类
        this.dialogAddClass=true;
        this.categoryName=""
        this.title="新增一级分类"
        this.edit=0;
        }else{//管理一级分类
            this.$router.back()
        }
    },
    handleEdit(e) {  
        console.log(e)
        this.dialogAddClass=true;
        this.categoryName=e.categoryName;
        this.id=e.id;
        this.title="编辑一级分类";
        this.edit=1;
        this.sort=e.sort; 
        this.sorts=e.sort; 
        this.categoryNames=e.categoryName; 
    },
     //删除
    handleDel(id){
      this.$confirm("确认删除该分类商品吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let params={id}
            formDel('CATEGORYDEL',params).then(res=>{
              if(res.code==200){
                  this.$message.success("删除成功");
                  this.mallList();
              }else{
                // this.$message.warning("请删除关联子分类");
              }
            })
          })
          .catch(() => {});
    },
 
 
    isConfirm() {
      if (!this.categoryName) {
        this.$message.warning("请输入一级分类名称");
        return;
      }
      let params={
          parentId:0,
          categoryName:this.categoryName
      }
      if(this.sort!==''){
        params.sort=this.sort;
      }
      if(this.edit==0){
         httpPost('CATEGORYSAVE',params).then(res=>{
          if(res.code==200){
              this.$message.success("新增成功");
              this.mallList();
              this.dialogAddClass=false;
          } 
      })
      }else{
        let param={
            id:this.id,
            categoryName:this.categoryName,
             sort:this.sort
        }
        // if(Number(this.sort)!==Number(this.sorts)){
        //    param.sort=this.sort;
        // }
        // if(this.categoryNames!==this.categoryName){
        //    param.categoryName=this.categoryName;
        // }
        
           httpPut('CATEGORYUPDATE',param).then(res=>{
              if(res.code==200){
                  this.$message.success("编辑成功");
                  this.dialogAddClass=false;
                  this.mallList();
              } 
          })
      }
     
    }
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
</style>
