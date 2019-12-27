<template>
  <div class="warp">
    <div class="add-box">
      <div>角色管理</div>
      <el-button @click="editRoleManagement()">新增角色</el-button>
    </div>
    <div class>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
        <el-table-column prop="roleDesc" label="描述" width="180"></el-table-column>
        <el-table-column label="拥有权限">
          <template slot-scope="scope">
            <span v-for="(i,key) in scope.row.permissions" :key="key">
              {{i.name}}
              <i v-if="key!==scope.row.permissions.length-1">，</i>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="editRoleManagement(scope.row.id,scope.row)">编辑</el-button>
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
import { httpPost, formGet, formPost, httpGet,httpDel } from '@/util/post';
export default {
  data() {
    return {
      ctlist: {
        title: ""
      },
      currentPage: 1,
      pageSize: 10,
      pageNumber: 1,
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
      this.pageNumber = val;
      this.roleList();
    },
    roleList() {
      let param = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      };
      formGet("ROLELIST", param).then(res => {
        if (!res) return;
        this.tableData = res.data.records;
        this.pageCount = res.data.total;
      });
    },
    editRoleManagement(rlid, description) {
      sessionStorage.setItem("description", JSON.stringify(description));
      this.$router.push({
        path: "/userManageEdit",
        query: {
          rlid: rlid || 0
        }
      });
    },
    roleDel(id) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          httpDel("ROLEDELETE", id).then(res => {
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
