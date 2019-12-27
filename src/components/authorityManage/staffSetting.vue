<template>
  <div class="content-list">
    <!-- 员工管理 -->
    <!-- <div class="content-headerbox">员工管理</div> -->
    <div class="screen-box">
      <el-form ref="form" :model="form" label-width="80px" class="title-box">
        <el-form-item label="账号名" class="lud">
          <el-input v-model="form.mobile" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="姓名" class="lud">
          <el-input v-model="form.trueName" placeholder="请输入"></el-input>
        </el-form-item>
        <div style="float: right">
          <el-button type="primary" @click="select">查询</el-button>
          <el-button type="primary" @click="editAccountManagement()">新增账号</el-button>
        </div>
      </el-form>
    </div>
    <div class>
      <el-table :data="accountManagementData" style="width: 100%">
        <el-table-column prop="userId" label="用户ID"></el-table-column>
        <el-table-column prop="trueName" label="姓名"></el-table-column>
        <el-table-column prop="userName" label="手机号"></el-table-column>
        <el-table-column prop="roleName" label="岗位"></el-table-column>
        <el-table-column prop="isForbidden" label="状态">
          <template slot-scope="scope">
            <div v-if="scope.row.isForbidden==false">启用</div>
            <div v-if="scope.row.isForbidden==true">禁用</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-if="scope.row.isForbidden==true"
              @click="forbiddenAdminUser(scope.row.userId,false)"
            >启用</el-button>
            <el-button size="mini" v-else @click="forbiddenAdminUser(scope.row.userId,true)">禁用</el-button>
            <el-button
              size="mini"
              @click="editAccountManagement(scope.row.userId,scope.row.description)"
            >编辑</el-button>
            <el-button size="mini" type="danger" @click="accountDel(scope.row.userId)">删除</el-button>
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
  </div>
</template>

<script>
import { httpPost, formPost, httpPut } from "../../util/post";
export default {
  data() {
    return {
      form: {
        mobile: "",
        trueName: ""
      },
      currentPage: 1,
      pageSize: 10,
      pageIndex: 1,
      pageCount: null,
      accountManagementData: []
    };
  },
  created() {
    this.userPageList();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.userPageList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.currentPage = val;
      this.userPageList();
    },
    editAccountManagement(acid, description) {
      this.$store.commit("setDescribe", {
        value: description,
        name: "describe"
      });
      this.$router.push({
        path: "/staffSettingEdit",
        query: {
          acid: acid || 0
        }
      });
    },
    select() {
      this.currentPage = 1;
      this.pageIndex = 1;
      this.userPageList();
    },
    // 列表
    userPageList() {
      let param = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      if (this.form.mobile) {
        param.mobile = this.form.mobile;
      }
      if (this.form.trueName) {
        param.trueName = this.form.trueName;
      }
      formPost("FINDADMINUSERBYPAGE", param).then(res => {
        if (!res) return;
        this.accountManagementData = res.bussData;
        this.pageCount = res.count;
      });
    },
    forbiddenAdminUser(id, isforbidden) {
      let text;
      let param = {
        id: id,
        isforbidden: isforbidden
      };
      if (isforbidden == true) {
        text = "禁用";
      } else {
        text = "启用";
      }
      this.$confirm(`确定${text}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          formPost("FORBIDDENADMINUSER", param).then(res => {
            if (!res) return;
            this.$message.success(`${text}成功`);
            this.userPageList();
          });
        })
        .catch(() => {});
    },
    accountDel(userId) {
      let param = {
        userId: userId
      };
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          formPost("DELETEADMINUSERBYUSERID", param).then(res => {
            if (!res) return;
            this.$message.success("删除成功");
            this.userPageList();
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss">
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
