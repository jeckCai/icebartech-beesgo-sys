<template>
  <div class="warp">
    <div class="rot_title">商场管理》新增商场</div>
    <div class="editbox">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="商场名" prop="shopName">
          <el-input v-model="form.shopName"  placeholder="请输入" style="width: 195px"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入" style="width: 195px"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 100px;">
          <el-button @click="back" style="margin-right: 80px;">返回</el-button>
          <el-button type="primary" @click="saveSumbit('form')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { httpPost} from "../../util/post";
export default {
  data() {
     var isRightCharacter = (rule, value, callback) => {
      let reg = /[\u4E00-\u9FA5]/g;
      reg.test(value) ? callback(new Error("不能输入汉字!")) : callback();
    };
    return {
      form: {
        shopName: "",
        password: ""
      },
      rules:{
         shopName: [
            { required: true, message: '请输入商场名称', trigger: 'blur' },
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
  },
  methods: {
    saveSumbit(formName) {
       this.$refs[formName].validate((valid) => {
          if (valid) {
              httpPost("SHOP", this.form).then(res => {
                if (!res) return;
                this.$message.success("保存成功");
                this.back();
              });
          } else {
            console.log('error submit!!');
            return false;
          }
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