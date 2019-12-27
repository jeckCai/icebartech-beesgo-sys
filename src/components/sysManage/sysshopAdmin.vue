<template>
  <div class="content-list">
    <div class="screen-box">
      <el-form label-width="100px"
               class="title-box" style="height:auto;display: flex;flex-wrap: wrap">
        <!-- <el-form-item label="商场名"
                      class="lud">
          <el-input v-model="shopName"
                    placeholder="请输入"></el-input>
        </el-form-item> -->
        <el-form-item label="品牌名称"
                      class="lud">
          <el-input v-model="branchName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="商品一级分类"
                      class="lud">
          <el-input v-model="parentCategoryName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="商品二级分类"
                      class="lud">
          <el-input v-model="childCategoryName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="商品名"
                      class="lud">
          <el-input v-model="itemNameLike"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="checkStatus"
                     placeholder="请选择"
                     clearable>
            <el-option label="全部"
                       value></el-option>
            <el-option label="待审核"
                       value="WAITING"></el-option>
            <!-- <el-option label="审核中"
                       value="AUDITING"></el-option> -->
            <el-option label="审核通过"
                       value="FINISH"></el-option>
            <el-option label="审核未通过"
                       value="REJECT"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品状态">
          <el-select v-model="upShelf"
                     placeholder="请选择"
                     clearable>
            <el-option label="全部"
                       value></el-option>
            <el-option label="已上架"
                       value="y"></el-option>
            <el-option label="已下架"
                       value="n"></el-option>
          </el-select>
        </el-form-item>
        <div>
          <el-button class="left-btn"
                     type="primary"
                     @click="select">查询</el-button>
        </div>
      </el-form>
    </div>
    <div class>
      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column prop="shopName"
                         label="商场名"></el-table-column>
        <el-table-column prop="branchNo"
                         label="店铺号"></el-table-column>
        <el-table-column prop="branchName"
                         label="品牌名称"></el-table-column>
        <el-table-column prop="categoryName"
                         label="商品一级分类"></el-table-column>
        <el-table-column prop="childCategoryName"
                         label="商品二级分类"> </el-table-column>
        <el-table-column prop="itemName"
                         label="商品名"></el-table-column>
        <el-table-column prop="price"
                         label="商品价格"></el-table-column>
        <el-table-column prop="username"
                         label="商品状态">
          <template slot-scope="scope">
            {{scope.row.upShelf=='y'?'已上架':'已下架'}}
          </template>
        </el-table-column>
        <el-table-column prop="username"
                         label="审核状态">
          <template slot-scope="scope">
            <span v-if="scope.row.checkStatus=='WAITING'">待审核</span>
            <span v-if="scope.row.checkStatus=='FINISH'">审核通过</span>
            <span v-if="scope.row.checkStatus=='REJECT'">审核不通过</span>
          </template>
        </el-table-column>
<!-- v-if="scope.row.checkStatus=='WAITING'||'REJECT'">通过</el-button> -->
        <el-table-column label="操作"
                         width="240">
          <template slot-scope="scope">
             <el-button size="mini"
                       type="primary"
                       @click="detail(scope.row.id)"
                       >查看</el-button>
            <el-button size="mini"
                       type="primary"
                       @click="handlePass(scope.row.id,1)"
                       v-if="scope.row.checkStatus!='FINISH'">通过</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handlePass(scope.row.id,0)"
                       v-if="scope.row.checkStatus=='WAITING'">拒绝</el-button>
            <!-- <el-button size="mini"
                       type="info"
                       v-if="scope.row.checkStatus=='REJECT'">已拒绝</el-button> -->
            <el-button size="mini"
                       :type="scope.row.upShelf=='n'?'warning':'info'"
                       @click="handleUp(scope.row.id,1,scope.row.upShelf)"
                       v-if="scope.row.checkStatus=='FINISH'">上架</el-button>
            <el-button size="mini"
                       :type="scope.row.upShelf=='y'?'success':'info'"
                       @click="handleUp(scope.row.id,0,scope.row.upShelf)"
                       v-if="scope.row.checkStatus=='FINISH'">下架</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[10,20,30,40]"
                     layout="total, sizes, prev, pager, next,jumper"
                     :total="pageCount"></el-pagination>
    </div>
    <!-- 审核拒绝dialog -->
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="500px">
      <el-form label-width="70px">
        <el-form-item label="拒绝原因">
          <el-input type="textarea"
                    rows="5"
                    maxlength="60"
                    v-model="reason"
                    placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="isConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { httpPost, strPut, httpPut } from "../../util/post";
export default {
  data () {
    return {
      branchName:'',
      itemNameLike:'',
      parentCategoryName:'',
      checkStatus:'',
      upShelf:'',

      childCategoryName: "",
      username: "",
      auditStatus: "",
      currentPage: 1,
      pageSize: 10,
      pageIndex: 1,
      pageCount: null,
      tableData: [],
      dialogVisible: false, //弹出层
      reason: "",
      id: "",
      status: ""
    };
  },
  created () {
    this.mallList();
  },
  methods: {
    select () {
      this.currentPage = 1;
      this.pageIndex = 1;
      this.mallList();
    },
    handleSizeChange (val) {
      this.pageSize = val;
      this.mallList();
    },
    handleCurrentChange (val) {
      this.pageIndex = val;
      this.mallList();
    },
    mallList () {
      let param = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      if (this.branchName) {
        param.branchName = this.branchName;
      }
      if (this.itemNameLike) {
        param.itemNameLike = this.itemNameLike;
      }
      if (this.parentCategoryName) {
        param.parentCategoryName = this.parentCategoryName;
      }
      if (this.childCategoryName) {
        param.childCategoryName = this.childCategoryName;
      }
      if (this.checkStatus) {
        param.checkStatus = this.checkStatus;
      }
      if (this.upShelf) {
        param.upShelf = this.upShelf;
      }
      httpPost("SHOPCHECKLIST", param).then(res => {
        if (!res) return;
        this.tableData = res.data;
        this.pageCount = res.count;
      });
    },
    mallAdd () {
      this.$router.push({
        path: "/sysMallAdd"
      });
    },
    // roleDel (id) {
    //   this.$router.push({
    //     path: "/sysMallDetail?id=" + id
    //   });
    // },
     detail(id){
        this.$router.push({
          path: "/sysShopInfo",
          query: {
            id: id
          }
        });
    },
    shopAudit (id, status) {
      let isReason = "";
      if (this.reason) {
        isReason = `/${this.reason}`;
      }
      strPut("SHOP", id + "/" + status + isReason).then(res => {
        if (!res) return;
        this.$message.success(res.message);
        this.dialogVisible = false;
        this.mallList();
      });
    },
    //上架下架
    handleUp (id, e,flag) {
      if(e==0&&flag=='n'){
        return;
      }else if(e==1&&flag=='y'){
        return;
      }
      let title = ''
      let params = {}
      let message = ''
      if (e == 1) {
        title = '确认上架吗?';
        params = { id, upShelf: 'y' };
        message = '上架成功'
      } else {
        title = '确认下架吗?';
        params = { id, upShelf: 'n' }
        message = '下架成功'
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
            this.mallList();
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
    //通过/-拒绝审核
    handlePass (id, e) {
      let title = ''
      let params = {}
      let message = ''
      if (e == 1) {
        title = '确认通过审核吗?';
        params = { id, checkStatus: 'FINISH' };
        message = '审核成功'
      } else {
        title = '确认拒绝审核吗?';
        params = { id, checkStatus: 'REJECT' }
        message = '拒绝审核成功'
      }
      this.$confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        httpPut('SHOPCHECKUPDATE', params).then(res => {
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: message
            });
            this.mallList();
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


    shopAuditStatus (id, status) {
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
          .catch(() => { });
      } else {
        this.dialogVisible = true;
      }
    },
    isConfirm () {
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
