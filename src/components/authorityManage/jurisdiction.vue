<template>
  <div class="content-list">
    <!-- 权限管理 -->
    <div class="screen-box" v-if="this.$store.state.resourceCodeList.indexOf('sys:role:add')>=0">
      <el-form class="title-box">
        <div style="float: left;margin-left: 20px;">
          <el-button type="primary" @click="editJurisdiction()">新增账号</el-button>
        </div>
      </el-form>
    </div>
    <div class>
      <el-table :data="permissionData" style="width: 100%">
        <el-table-column prop="name" label="资源名称"></el-table-column>
        <el-table-column prop="resourceCode" label="资源码"></el-table-column>
        <el-table-column prop="buttonType" label="类型">
          <template slot-scope="scope">
            <div v-if="scope.row.buttonType=='0'">菜单</div>
            <div v-else>按钮</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" @click="editJurisdiction(scope.row.id,scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="accountDel(scope.row.id,scope.row.name)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { httpPost, formPost, httpGet, httpDel } from "../../util/post";
export default {
  data() {
    return {
      permissionData: []
    };
  },
  created() {
    this.getPermissionList();
  },
  methods: {
    editJurisdiction(acid, description) {
      //   this.$store.commit("setDescribe", {
      //     value: description,
      //     name: "describe"
      //   });
      sessionStorage.setItem("description", JSON.stringify(description));
      this.$router.push({
        path: "/jurisdictionEdit",
        query: {
          acid: acid || 0
        }
      });
    },
    // 列表
    getPermissionList() {
      httpGet("PERMISSIONLIST").then(res => {
        if (!res) return;
        this.permissionData = res.data;
      });
    },
    accountDel(userId,name) {
      this.$confirm(`确定删除${name}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          httpDel("PERMISSIONDDELBYIDS", userId).then(res => {
            if (!res) return;
            this.$message.success("删除成功");
            this.getPermissionList();
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
