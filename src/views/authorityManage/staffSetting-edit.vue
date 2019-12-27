<template>
  <div class="warp">
    <div class="content-headerbox">新增/编辑账号</div>
    <div class="editbox" style="width: 400px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号名" prop="account">
          <el-input v-model="ruleForm.account" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="nickname">
          <el-input v-model="ruleForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            autocomplete="new-password"
            placeholder="请输入"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="ruleForm.confirmPassword" placeholder="请输入" type="password"></el-input>
        </el-form-item>
        <el-form-item label="所属角色" prop="roleId">
          <el-select v-model="ruleForm.roleId" placeholder="请选择">
            <el-option
              v-for="(item,index) in rList"
              :key="index"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="back">取消</el-button>
          <el-button type="primary" @click="saveSumbit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { httpPost, formPost, formGet } from '@/util/post';
export default {
  data() {
    var passXt = (rule, value, callback) => {
      value !== this.ruleForm.password
        ? callback(new Error("两次输入密码不一致!"))
        : callback();
    };
    var isRightPhoneNumer = (rule, value, callback) => {
      let reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      !reg.test(value) ? callback(new Error("手机号有误!")) : callback();
    };
    return {
      ruleForm: {
        account: "",
        nickname: "",
        password: "",
        confirmPassword: "",
        roleId: "",
        loginType:'LOGIN_ADMIN_PASSWORD'
      },
      userId: "",
      rList: [],
      imageUrl: "",
      clear: false,
      rules: {
        account: [
          { required: true, message: "请填写登录账号", trigger: "blur" }
        ],
        nickname: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        roleId: [
          { required: true, message: "请选择角色权限", trigger: "change" }
        ],
        password: [{ required: true, message: "请填写密码", trigger: "blur" }],
        confirmPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { validator: passXt, trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  created() {
    this.userId = this.$router.currentRoute.query.acid;
    this.roleList();
    if (this.userId != 0) {
      let description=JSON.parse(sessionStorage.getItem('description'));
      this.ruleForm.account=description.account;
      this.ruleForm.nickname=description.nickname;
      this.ruleForm.roleId=description.roleId;
    }
  },
  methods: {
    // detailByUserId(userId) {
    //   let param = {
    //     userId: userId
    //   };
    //   formPost("FINDADMINUSERDETAILBYUSERID", param).then(res => {
    //     if (!res) return;
    //     this.ruleForm = {
    //       userName: res.bussData.userName,
    //       mobile: res.bussData.mobile,
    //       roleId: parseInt(res.bussData.appRoleId),
    //       trueName: res.bussData.trueName,
    //       avatar: res.bussData.avatar
    //     };
    //     this.imageUrl = res.bussData.avatarUrl;
    //   });
    // },
    roleList() {
      let param = {
        pageNumber: 1,
        pageSize: 9999
      };
      formGet("ROLELIST", param).then(res => {
        if (!res) return;
        this.rList = res.data.records;
      });
    },
    back() {
      this.$router.go(-1);
    },
    saveSumbit() {
      let ruleForm = this.ruleForm;
      if (
        !ruleForm.account ||
        !ruleForm.nickname ||
        !ruleForm.password ||
        !ruleForm.confirmPassword ||
        !ruleForm.roleId
      ) {
        this.$message.warning("请完善必填信息");
        return;
      }
      if (ruleForm.password !== ruleForm.confirmPassword) {
        this.$message.warning("两次输入密码不一致");
        return;
      }

      this.$confirm("确定保存吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
           ruleForm.roleIds = [ruleForm.roleId];
          if (this.userId!=0) {
            ruleForm.id = this.userId;
            this.userEdit(ruleForm);
          } else {
            this.userAdd(ruleForm);
          }
        })
        .catch(() => {});
    },
    // 用户增加
    userAdd(ruleForm) {
      httpPost("USERADD", ruleForm).then(res => {
        if (!res) return;
        this.$message.success(`增加成功`);
        this.back();
      });
    },
    userEdit(ruleForm) {
      httpPost("USEREDIT", ruleForm).then(res => {
        if (!res) return;
        this.$message.success(`编辑成功`);
        this.back();
      });
    }
  }
};
</script>

<style>
</style>
