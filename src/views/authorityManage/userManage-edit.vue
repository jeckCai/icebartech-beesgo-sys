<template>
  <div class="warp">
    <div class="content-headerbox">新增/修改角色</div>
    <div class="editbox" style="width: 400px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称">
          <el-input v-model="ruleForm.roleName"  placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            type="textarea"
            rows="5"
            maxlength="60"
            v-model="ruleForm.roleDesc"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="拥有权限" prop="active_nature">
          <el-tree
            :data="allPermission"
            show-checkbox
            node-key="id"
            ref="tree"
            highlight-current
            default-expand-all
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
        <el-form-item>
          <el-button @click="backRemove">取消</el-button>
          <el-button type="primary" @click="saveSumbit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { httpPost, formPost, httpGet, formGet, formPut } from '@/util/post';
// import routerPath from "../../views/index/routerPath";
export default {
  data() {
    return {
      active_nature: {},
      allPermission: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      ruleForm: {
        roleName: "",
        roleDesc: "",
        permissionList: []
      },
      permissionIds: [],
      rlid: "",
      pIds: [],
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        roleDesc: [
          { min: 0, max: 60, message: "长度最大为60个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.rlid = this.$router.currentRoute.query.rlid;
    this.getPermissionList();
    if (this.rlid != 0) {
      let description = JSON.parse(sessionStorage.getItem("description"));
      console.log(description);
      this.ruleForm.roleName = description.roleName;
      this.ruleForm.roleDesc = description.roleDesc;
    }
    // this.jurisdiction();
    // this.allPermission = routerPath.routerPath;
  },
  methods: {
    saveSumbit() {
      let parentArr = this.$refs.tree.getHalfCheckedKeys(); //获取半选中状态的id
      let childArr = this.$refs.tree.getCheckedKeys(); //获取全选中的id
      this.permissionIds = parentArr.concat(childArr);
      if (!this.ruleForm.roleName || this.permissionIds.length == 0) {
        this.$message.warning("请输入完整用户信息");
        return;
      }
      let param = {
        roleName: this.ruleForm.roleName,
        roleDesc: this.ruleForm.roleDesc,
        permissionList: this.permissionIds
      };
      if (this.rlid != 0) {
        param.roleId = this.rlid;
        this.roleUpdate(param);
      } else {
        this.roleAdd(param);
      }
    },
    roleUpdate(param) {
      formPut("ROLEUPDATE", param).then(res => {
        if (!res) return;
        this.$message.success("编辑成功");
        this.backRemove();
      });
    },
    roleAdd(param) {
      formPost("ROLEADD", param).then(res => {
        if (!res) return;
        this.$message.success("增加成功");
        this.backRemove();
      });
    },
    backRemove() {
      this.$router.go(-1);
    },
    // getAllRole() {
    //   return Promise.resolve(
    //     httpGet("PERMISSIONGETMENULIST",JSON.parse(sessionStorage.getItem("user")).id).then(res => {
    //       if (!res) return;

    //       // this.active_nature = res.bussData;
    //       // this.allPermission = res.bussData;
    //     })
    //   );
    // },

    // roleInfoById() {
    //   let param = {
    //     roleId: this.rlid
    //   };
    //   return Promise.resolve(
    //     formPost("GETROLEINFOBYROLEID", param).then(res => {
    //       if (!res) return;
    //       let data = res.bussData;
    //       this.ruleForm = {
    //         roleName: data.roleName,
    //         roleDescribe: data.roleDescribe,
    //         topPermissionNames: data.topPermissionNames.split(",")
    //       };
    //       this.pIds = res.bussData.permissionIds;
    //       let childId = [];
    //       for (var i = 0; i < res.bussData.permissionIds.length; i++) {
    //         this.allPermission.forEach(e => {
    //           if (res.bussData.permissionIds[i] == e.id) {
    //             res.bussData.permissionIds.splice(i, 1);
    //             e.childPermissions.forEach(child => {
    //               if (child.childPermissions.length > 0) {
    //                 childId.push(child.id);
    //               }
    //             });
    //           }
    //         });
    //       }
    //       for (var i = 0; i < res.bussData.permissionIds.length; i++) {
    //         childId.forEach(j => {
    //           if (res.bussData.permissionIds[i] == j) {
    //             res.bussData.permissionIds.splice(i, 1);
    //           }
    //         });
    //       }
    //       this.$refs.tree.setCheckedKeys(res.bussData.permissionIds);
    //     })
    //   );
    // },

    // jurisdiction() {
    // if (this.rlid) {
    //   this.getAllRole().then(val => {
    //     this.roleInfoById();
    //   });
    // } else {
    //   this.getAllRole();
    // }
    // },
    getPermissionList() {
      let param = {
        codeType: "role"
      };
      if (this.rlid != 0) {
        param.id = this.rlid;
      }
      formGet("PERMISSIONGETMENU", param).then(res => {
        this.allPermission = res.data;
        let checkedKeys = [];
        res.data.forEach(ele => {
          if (ele.children && ele.children.length > 0) {
            ele.children.forEach(e => {
              if (e.state == 1) {
                if (e.children && e.children.length > 0) {
                  e.children.forEach(three => {
                    if (three.state == 1) {
                      checkedKeys.push(three.id);
                    }
                  });
                } else {
                  checkedKeys.push(e.id);
                }
              }
            });
          }else{
            if(ele.state == 1)
            checkedKeys.push(ele.id);
          }
        });
        this.$refs.tree.setCheckedKeys(checkedKeys);
      });
    }
  }
};
</script>

<style>
</style>
