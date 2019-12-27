<template>
  <div class="warp">
    <div class="rot_title">品牌管理》<span v-if="cid==0">新增品牌</span><span v-else>编辑品牌</span></div>
    <div class="editbox">
      <el-form ref="form" :model="form"  :rules="rules" label-width="80px">
        <el-form-item label="品牌" prop="branchName">
          <el-input v-model="form.branchName" placeholder="请输入" style="width: 195px"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入" style="width: 195px"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 100px;">
          <el-button @click="back" style="margin-right: 80px;">取消</el-button>
          <el-button type="primary" @click="saveSumbit()">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { httpPost, httpPut } from "../../util/post";
export default {
  data() {
     var isRightCharacter = (rule, value, callback) => {
      let reg = /[\u4E00-\u9FA5]/g;
      reg.test(value) ? callback(new Error("不能输入汉字!")) : callback();
    };
    return {
      form: {
        branchName: "",
        password: ""
      },
      cid: "",
      rules:{
         branchName: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
          ],
         password: [
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { min: 6,  message: '登录密码最小6位', trigger: 'blur' },
            { validator: isRightCharacter, trigger: "blur" }
         ]
      }
    };
  },
  created() {
    this.cid = this.$router.currentRoute.query.cid;
    if (this.cid != 0) {
      let description = JSON.parse(sessionStorage.getItem("description"));
      this.form.branchName=description.branchName;
      this.form.username=description.username;
    }
  },
  methods: {
    saveSumbit() {
      if (!this.form.branchName || !this.form.password) {
        this.$message.warning("请输入完整信息");
        return;
      }
      if (this.form.password.length<6) {
        this.$message.warning("密码不能少于6位");
        return;
      }
      if (this.cid != 0) {
        this.form.id = this.cid;
        this.branchEdit();
      } else {
        this.branchAdd();
      }
    },
    branchAdd() {
      httpPost("BRANCH", this.form).then(res => {
        if (!res) return;
        this.$message.success("增加成功");
        this.back();
      });
    },
    branchEdit() {
        httpPut("BRANCH", this.form).then(res => {
          if (!res) return;
          this.$message.success("编辑成功");
          this.back();
        });
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style  >
.rot_title {
  padding: 10px 20px;
  border-bottom: 1px solid rgba(187, 187, 187, 1);
}
.textareaBox .el-form-item__error {
  left: 300px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 108px;
  height: 108px;
  line-height: 108px;
  text-align: center;
}
.avatar-uploader {
  position: relative;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload__input {
  display: none;
}
</style>