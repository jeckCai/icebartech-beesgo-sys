<template>
  <div class="warp">
    <div class="content-headerbox">新增/编辑权限</div>
    <div style=" display: flex;">
      <el-tree
        :data="permissionData"
        default-expand-all
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
      <div class="editbox" style="width: 400px">
        <el-form :model="addForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="父级名称">
            <el-input disabled v-model="jurisdictionData.parentName" placeholder="读取选中的资源名称，不可更改"></el-input>
          </el-form-item>
          <el-form-item label="父级ID">
            <el-input disabled v-model="addForm.parentId" placeholder="读取选中的资源名称的层级，不可更改"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="addForm.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="addForm.type" placeholder="请选择">
              <el-option label="菜单" value="0"></el-option>
              <el-option label="按钮" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="资源码">
            <el-input v-model="addForm.code" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="back">取消</el-button>
            <!-- <el-button type="primary" @click="permissionAdd">增加</el-button>
            <el-button type="primary" @click="permissionEdit">编辑</el-button>-->
            <el-button type="primary" @click="saveSumbit">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { httpPost, formPost, httpGet, formGet } from "../../util/post";
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name"
      },
      addForm: {
        code: "",
        name: "",
        parentId: 0,
        parentLevel: 0,
        type: ""
      },
      userId: "",
      permissionData: [],
      jurisdictionData: ""
    };
  },
  components: {},
  created() {
    this.getPermissionList();
    this.userId = this.$router.currentRoute.query.acid;
    if (this.userId != 0) {
      let description = JSON.parse(sessionStorage.getItem("description"));
      this.addForm.code = description.resourceCode;
      this.addForm.name = description.name;
      this.addForm.parentId = description.parentId;
      this.addForm.permissionId = description.id;
      this.addForm.type = JSON.stringify(description.buttonType);
    }
  },
  methods: {
    // 菜单列表
    getPermissionList() {
      formGet("PERMISSIONGETMENU").then(res => {
        if (!res) return;
        this.permissionData = res.data;
      });
    },
    //权限菜单添加
    permissionAdd() {
      httpPost("PERMISSIONADD", this.addForm).then(res => {
        if (!res) return;
        this.$message.success(`成功`);
        this.getPermissionList();
        this.back();
      });
    },
    // 权限菜单编辑
    permissionEdit() {
      httpPost("PERMISSIONEDIT", this.addForm).then(res => {
        if (!res) return;
        this.$message.success(`成功`);
        this.getPermissionList();
        this.back();
      });
    },
    handleNodeClick(data) {
      this.jurisdictionData = data;
      console.log(data)
      if (this.userId != 0) {
       
        this.addForm = {
          code: data.resourceCode,
          name: data.name,
          parentId: data.parentId,
          parentLevel: data.level,
          permissionId: data.id,
          type: JSON.stringify(data.buttonType)
        };
      } else {
        this.addForm.parentId=data.id;
        this.addForm.parentLevel = data.level;
        this.jurisdictionData.parentName = data.name;
      }
    },
    back() {
      this.$router.go(-1);
    },
    saveSumbit() {
      console.log(this.addForm)
      if (!this.addForm.code || !this.addForm.name || !this.addForm.type) {
        this.$message.warning("请完善必填信息");
        return;
      }

      this.$confirm("确定保存吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.userId != 0) {
            this.permissionEdit();
          } else {
            this.permissionAdd();
          }
        })
        .catch(() => {});
    }
  }
};
</script>

 <style scoped>
.flex {
  display: flex;
}
.el-tree {
  min-width: 300px;
  margin-top: 25px;
}
</style>
