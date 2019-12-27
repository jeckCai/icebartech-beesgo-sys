<template>
  <div class="content-list">
    <div class="screen-box">
      <div class="title-box">
        <el-button class="left-btn" type="primary" @click="mallAdd(2)">新增二级分类</el-button>
        <el-button class="left-btn" type="primary" @click="mallAdd(1)">管理一级分类</el-button>
      </div>
      <el-form label-width="120px" class="title-box">
        
        <el-form-item label="所属一级分类" style="float:left;">
          <el-select v-model="auditStatus" placeholder="请选择" clearable>
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(item,i) in top_list" :key="i" :label="item.categoryName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" class="lud">
          <el-input v-model="categoryNameLike" placeholder="请输入"></el-input>
        </el-form-item>
        <div style="float: left">
          <el-button class="left-btn" type="primary" @click="select">查询</el-button>
        </div>
      </el-form>
    </div>
    <div class>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="shopName" label="二级分类图标" width="180">
             <template slot-scope="scope">
                 <img v-if="scope.row.categoryImageKey" style="width:100px" :src="scope.row.categoryImage?scope.row.categoryImage.imageUrl:''" alt="">
                 <span v-else>--</span>
            </template>
        </el-table-column>
        <el-table-column prop="categoryName" label="二级分类" width="540">
          <!-- <template slot-scope="scope">
                 <span v-show="scope.row.childList.length==0">--</span>
                 <span v-for="(item,i) in scope.row.childList" :key="i">{{item.categoryName}}</span>
            </template> -->
        </el-table-column>
        <el-table-column prop="parentName" show-overflow-tooltip label="所属一级分类" width="180">
          <!-- <template slot-scope="scope">
                 <span v-if="scope.row.parentList.length!=0">{{scope.row.parentList[0].categoryName}}</span>
            </template> -->
          
        </el-table-column>
        <!-- <el-table-column label="审核状态">
          <template slot-scope="scope">
            <span v-if="scope.row.auditStatus=='PASS'">审核通过</span>
            <span v-if="scope.row.auditStatus=='REVIEW'">待审核</span>
            <span v-if="scope.row.auditStatus=='REJECT'">审核未通过</span>
          </template>
        </el-table-column> -->
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
    <template v-if="dialogAddClass">
    <el-dialog :title="title" :visible.sync="dialogAddClass" width="500px">
      <el-form label-width="120px">
        <el-form-item label="一级分类" required>
           <el-select v-model="parentId" placeholder="请选择" clearable>
            <el-option v-for="(item,i) in top_list" :key="i" :label="item.categoryName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类图标"  >
            <uploadOne
              :clear="clear" 
              :isShowImg="true"
              :imgUrl.sync="imgUrl"
              @upLoadSuccess="v=>{categoryImageKey =v.fileKey}"
            ></uploadOne>
        </el-form-item>
        <el-form-item label="二级分类" required>
          <el-input type="text" rows="3" maxlength="60" v-model="categoryName" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddClass = false">取 消</el-button>
        <el-button type="primary" @click="addClassTwo">确 定</el-button>
      </div>
    </el-dialog>
    </template>
  </div>
</template>

<script>
import { httpPost, strPut,formDel,httpPut } from "../../util/post";
export default {
  data() {
    return {
      title:'新增二级分类',
     parentId:null,//一级id
     tableData: [],
     categoryName:'',
     categoryImageKey:'',
      categoryNameLike: "",
      top_list:[],
      top_list1:[],
      imgUrl:'',
      username: "",
      auditStatus: "",
      currentPage: 1,
      pageSize: 10,
      pageIndex: 1,
      pageCount: null,
      
      dialogVisible: false, //弹出层
      dialogAddClass:false,//新增二级分类弹窗成
      reason: "",
      id: "",
      status: "",
      clear:false, 
      imgUrl:'',
      edit:0,
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
        // parentId: 0
      };
      if (this.categoryNameLike) {
        param.categoryNameLike = this.categoryNameLike;
      }
      if (this.username) {
        param.usernameLike = this.username;
      }
      if (this.auditStatus) {
        param.parentId = this.auditStatus;
      }
      httpPost("CATEGORY", param).then(res => {
        if (!res) return;
        this.tableData = res.data;
        this.pageCount = res.count;
      });
      httpPost("CATEGORYTOP", {}).then(res => {
        if (!res) return;
        this.top_list = res.data; 
        // let data=JSON.parse(JSON.stringify(res.data))
        // this.top_list1 = data.unshift({categoryName:'全部',id:1}); 
        // this.top_list1 = data; 
        // console.log(data)
      });
    },
    //编辑
    handleEdit(e){
      console.log(e)
      this.title='编辑二级分类'
      this.dialogAddClass=true;
      this.categoryName=e.categoryName;
      this.parentId=e.parentId; 
      this.imgUrl=e.categoryImage.imageUrl;
      this.categoryImageKey=e.categoryImage.imageKey; 
      this.edit=1; 
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
                // this.$message.warning("网络错误");
              }
            })
          })
          .catch(() => {});
    },
    // 新增二级分类
    addClassTwo(e){
        if(this.parentId==''||this.parentId==null){
            this.$message.warning('请选择一级分类');
            return;
        }else if(this.categoryName==''){
            this.$message.warning('请填写二级分类');
            return;
        }
        // else if(this.categoryImageKey==''){
        //     this.$message.warning('请上传二级分类图标');
        //     return;
        // }
        let params={
            parentId:this.parentId,
            categoryImageKey:this.categoryImageKey,
            categoryName:this.categoryName,
        }
        if(this.categoryImageKey){
          params.categoryImageKey=this.categoryImageKey
        }
        if(this.edit==0){
              httpPost('CATEGORYSAVE',params).then(res=>{
              if(res.code==200){
                  this.$message.success("新增成功");
                  this.dialogAddClass=false;
                  this.mallList();
              } 
          })
        }else{
          let item=this.tableData.find((item,i)=>{
            if(item.parentId==this.parentId){
              return item
            }
          })
          console.log(item)
          let param={
            id:item.id,
            categoryImageKey:this.categoryImageKey,
            categoryName:this.categoryName,
        }
           httpPut('CATEGORYUPDATE',param).then(res=>{
              if(res.code==200){
                  this.$message.success("编辑成功");
                  this.dialogAddClass=false;
                  this.mallList();
              } 
          })
        }
    
    },
    mallAdd(e) {
        if(e==2){//新增二级分类
        this.dialogAddClass=true;
         this.title='新增二级分类'
         this.imgUrl=''
        this.edit=0;
        this.categoryName='';
        this.categoryImageKey='';
        this.clear=true; 
        this.parentId=null;
        }else{//管理一级分类
          this.$router.push({
            path: "/sysShopClassListEdit"
        });
        }
    
    },
    shopAudit(id, status) {
      let isReason = "";
      if (this.reason) {
        isReason = `/${this.reason}`;
      }
      strPut("SHOP", id + "/" + status + isReason).then(res => {
        if (!res) return;
        this.$message.success(res.message);
        this.dialogVisible=false;
        this.mallList();
      });
    },
    shopAuditStatus(id, status) {
      this.id = id;
      this.status = status;
      if (status == "pass") {
        this.$confirm("同意该商场入驻平台且商场资料填写完整无误?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.shopAudit(id, status);
          })
          .catch(() => {});
      } else {
        this.dialogVisible = true;
      }
    },
    isConfirm() {
      if (!this.reason) {
        this.$message.warning("请输入拒绝原因");
        return;
      }
      this.shopAudit(this.id, this.status);
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
