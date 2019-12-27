<template>
  <div class="content-list">
    <div class="screen-box">
      <el-form label-width="80px"
               class="title-box">
        <el-form-item label="商场名称"
                      class="lud">
          <el-input v-model="shopNameLike"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="品牌"
                      class="lud">
          <el-input v-model="branchNameLike"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="账号名"
                      class="lud">
          <el-input v-model="usernameLike"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="审核状态"
                      style="float:left;">
          <el-select v-model="auditStatus"
                     placeholder="请选择"
                     clearable>
            <el-option label="全部"
                       value></el-option>
            <el-option label="待审核"
                       value="REVIEW"></el-option>
            <el-option label="审核通过"
                       value="PASS"></el-option>
            <el-option label="审核未通过"
                       value="REJECT"></el-option>
          </el-select>
        </el-form-item>
        <div style="float: left">
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
        <el-table-column prop="branchName"
                         label="品牌名"></el-table-column>
        <el-table-column prop="username"
                         label="账号名"></el-table-column>
        <el-table-column prop="auditStatus"
                         label="步骤">
          <template slot-scope="scope">
            <span v-if="scope.row.auditStatus=='AUDITING'">品牌资料等待审核</span>
            <span v-if="scope.row.auditStatus=='PASS'">品牌资料审核通过</span>
            <span v-if="scope.row.auditStatus=='REVIEW'">等待品牌提交资料</span>
            <span v-if="scope.row.auditStatus=='REJECT'">品牌资料审核未通过</span>

          </template>
        </el-table-column>
        <el-table-column prop="auditStatus"
                         label="审核状态">
          <template slot-scope="scope">
            <span v-if="scope.row.auditStatus=='AUDITING'">待审核</span>
            <span v-if="scope.row.auditStatus=='PASS'">审核通过</span>
            <span v-if="scope.row.auditStatus=='REVIEW'"></span>
            <span v-if="scope.row.auditStatus=='REJECT'">审核未通过</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="250">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="success"
                       @click="details(scope.row.id)">查看</el-button>
           <el-button v-if="scope.row.auditStatus=='AUDITING'" size="mini" type="primary" @click="details(scope.row.id,1)">审核</el-button>
           <!-- <el-button size="mini" type="primary"  @click="showPwd = true;brandId=scope.row.id">重置密码</el-button> -->
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
     <!-- 修改密码dialog -->
    <!-- <el-dialog title="修改登陆密码"
               :visible.sync="showPwd"
               width="500px">
      <el-form :model="formData"
               :rules="rules"
               label-width="90px">
        <el-form-item label="登陆密码"
                      prop="password">
          <el-input type="string"
                    v-model="formData.password"
                    placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="showPwd = false">取 消</el-button>
        <el-button type="primary"
                   @click="savePwd">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import { httpPost, strPut ,httpPut} from "../../util/post";
export default {
  data () {
    return {
      shopNameLike: "",
      branchNameLike: "",
      usernameLike: "",
      auditStatus: "",
      currentPage: 1,
      pageSize: 10,
      pageIndex: 1,
      pageCount: null,
      tableData: [],
      dialogVisible: false, //弹出层
      reason: "",
      id: "",
      status: "",
      brandId:""
      // showPwd: false, //修改密码
      //  formData: {
      //   password: ""
      // },
      // rules: {
      //    password: [
      //       { required: true, message: '请输入登陆密码 ', trigger: 'blur' },
      //       { min: "6", message: '密码最小为6位', trigger: 'blur' }
      //     ]
      // }
    };
  },
  created () {
    this.branchList();
  },
  methods: {
    select () {
      this.currentPage = 1;
      this.pageIndex = 1;
      this.branchList();
    },
    handleSizeChange (val) {
      this.pageSize = val;
      this.branchList();
    },
    handleCurrentChange (val) {
      this.pageIndex = val;
      this.branchList();
    },
    // 查看详情
    details (id,isLook) {
      this.$router.push({
        path: "/sysBrandEdit?id=" + id,
        query: {
          isLook: isLook?1:0
        }
      });
    },
     // 修改密码
    // savePwd () {
    //   if(!this.formData.password){
    //      this.$message.warning('登录密码不能为空!');
    //      return;
    //   }
    //   let params = {
    //     id: this.brandId,
    //     password: this.formData.password
    //   }
    //    this.$confirm("确定修改密码吗?", "提示", {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning"
    //     })
    //     .then(() => {
    //       httpPut("SHOP", params).then(res => {
    //         if (!res) return;
    //         this.showPwd = false;
    //         this.$message.success('修改密码成功');
    //         this.formData.password='';
    //         this.branchList();
    //       });
    //     })
    //     .catch(() => {});  
    // },
    branchList () {
      let param = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      if (this.shopNameLike) {
        param.shopNameLike = this.shopNameLike;
      }
      if (this.branchNameLike) {
        param.branchNameLike = this.branchNameLike;
      }
      if (this.usernameLike) {
        param.usernameLike = this.usernameLike;
      }
      if (this.auditStatus) {
        param.auditStatus = this.auditStatus;
      }
      httpPost("ADMINBRANCHPAGE", param).then(res => {
        if (!res) return;
        this.tableData = res.data;
        this.pageCount = res.count;
      });
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
