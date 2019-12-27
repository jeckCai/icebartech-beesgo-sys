<template>
  <div class="warp">
    <div class="add-box">
      <div>岗位管理</div>
       <el-button @click="editRoleManagement()">新增岗位</el-button>
    </div>
    <div class>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="roleName" label="岗位名称" width="180"></el-table-column>
        <el-table-column prop="roleDescribe" label="描述" width="180"></el-table-column>
        <el-table-column prop="topPermissionNames" label="拥有权限"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editRoleManagement(scope.row.id,scope.row.topPermissionNames)"
            >编辑</el-button>
            <el-button size="mini" type="danger" @click="roleDel(scope.row.id)">删除</el-button>
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
      ctlist: {
        title: ""
      },
      currentPage: 1,
      pageSize: 10,
      pageIndex: 1,
      pageCount: null,
      tableData: []
    };
  },
  created() {
    this.roleList();
  },
  methods: {
    contentlistFrom() {},
    handleSizeChange(val) {
      this.pageSize = val;
      this.roleList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.roleList();
    },
    roleList() {
      let param = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      formPost("FINDAPPROLEBYPAGE", param).then(res => {
        if (!res) return;
        this.tableData = res.bussData;
        this.pageCount = res.count;
      });
    },
    editRoleManagement(rlid, pName) {
      console.log(rlid);
      this.$router.push({
        path: "/userManageEdit",
        query: {
          rlid: rlid || 0
          // pName:pName||''
        }
      });
    },
    roleDel(id) {
      let param = {
        roleId: id
      };
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          formPost("DELETEROLEBYROLEID", param).then(res => {
            if (!res) return;
            this.$message.success("删除成功");
            this.roleList();
          });
        })
        .catch(() => {});
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
