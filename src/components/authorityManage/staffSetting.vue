<template>
  <div class="content-list">
    <!-- 员工管理 -->
    <!-- <div class="content-headerbox">员工管理</div> -->
    <div class="screen-box">
      <el-form ref="form" :model="form" label-width="80px" class="title-box">
        <el-form-item label="账号名" class="lud">
          <el-input v-model="form.account" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="姓名" class="lud">
          <el-input v-model="form.nickname" placeholder="请输入"></el-input>
        </el-form-item>
        <div style="float: right">
          <el-button type="primary" @click="select">查询</el-button>
          <el-button v-if="this.$store.state.resourceCodeList.indexOf('sys:user:add')>=0" type="primary" @click="editAccountManagement()">新增账号</el-button>
        </div>
      </el-form>
    </div>
    <div class>
      <el-table :data="accountManagementData" style="width: 100%">
        <el-table-column prop="account" label="账号名"></el-table-column>
        <el-table-column prop="nickname" label="姓名"></el-table-column>
        <el-table-column prop="roleName" label="所属角色"></el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editAccountManagement(scope.row.id,scope.row)"
            >编辑</el-button>
            <el-button size="mini" type="danger" @click="accountDel(scope.row.id)">删除</el-button>
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
import { httpPost, formPost, formGet, httpDel } from "../../util/post";
export default {
  data() {
    return {
      form: {
        nickname: ""
      },
      currentPage: 1,
      pageSize: 10,
      pageNumber: 1,
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
      this.pageNumber = val;
      this.currentPage = val;
      this.userPageList();
    },
    editAccountManagement(acid, description) {
      sessionStorage.setItem('description', JSON.stringify(description));
      this.$router.push({
        path: "/staffSettingEdit",
        query: {
          acid: acid || 0
        }
      });
    },
    select() {
      this.currentPage = 1;
      this.pageNumber = 1;
      this.userPageList();
    },
    // 列表
    userPageList() {
      let param = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      };
      if (this.form.nickname) {
        param.nickname = this.form.nickname;
      }
      formGet("USERLIST", param).then(res => {
        if (!res) return;
        this.accountManagementData = res.data.records;
        this.pageCount = res.data.total;
      });
    },
    accountDel(id) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          httpDel("USERDELBYIDS", id).then(res => {
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
