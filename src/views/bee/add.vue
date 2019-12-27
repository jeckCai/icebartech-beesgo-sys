<!--
 * @Description: 新增蜜蜂
 * @Author: weizhengda
 * @Date: 2019-11-13 20:03:31
 * @LastEditTime : 2019-12-23 14:24:48
 * @LastEditors  : 1490251116@qq.com
 -->

<template>
  <div class="xb">
   <div class="input_modal">
      <el-row style="padding:20px ;display: flex; align-items: center">
        <el-col :span="12"><div class="grid-content bg-purple">蜜蜂管理>新增蜜蜂</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light"  style="text-align: right">
           <el-button type="primary"  @click="$router.go(-1)">返回</el-button>
          </div></el-col>
     </el-row>
    </div>
    <div class="input_modal" style="padding:20px 100px;">
      <el-form ref="ruleForm" :model="formData" :rules="rules"  label-width="120px" label-position="left" class="demo-ruleForm">
        <el-form-item label="头像" prop="avatarKey">
          <uploadOne
              :clear="false"
              :imgUrl.sync="formData.avatar.imageUrl"
              :isShowImg="true"
              @upLoadSuccess="v=>{formData.avatarKey =v.fileKey}"
            ></uploadOne>
        </el-form-item>
        <el-form-item label="蜜蜂编码" prop="extended.beeCode">
           <el-col :span="5">
             <el-input type="text"  v-model="formData.extended.beeCode" disabled  placeholder="系统自动生成"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="蜜蜂名称" prop="nickname">
          <el-col :span="5">
             <el-input type="text" v-model="formData.nickname" placeholder="请输入"></el-input>
          </el-col> 
        </el-form-item>
        <el-form-item label="姓名" prop="truename">
          <el-col :span="5">
             <el-input type="text" v-model="formData.truename" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="蜜蜂岗位" prop="beesJob">
          <el-col :span="5">
            <el-select v-model="formData.beesJob" placeholder="请选择蜜蜂岗位">
                <el-option :label="item.label" :value="item.value" v-for="(item,index) in jobList" :key="index"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="蜜蜂经营方式" prop="extended.beeMode">
          <el-col :span="5">
             <el-input type="text" v-model="formData.extended.beeMode" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="蜜蜂注册日期" prop="extended.registerDay">
          <el-col :span="5">
             <el-date-picker type="date" placeholder="选择日期" v-model="formData.extended.registerDay" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
       
        <el-form-item label="蜜蜂等级" prop="extended.beeGrade">
          <el-col :span="5">
             <el-input type="text" v-model="formData.extended.beeGrade" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="备注"  prop="extended.remarks"> -->
        <el-form-item label="备注"   >
          <el-col :span="5">
             <el-input type="textarea" v-model="formData.extended.remarks" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="账户名" prop="username">
          <el-col :span="5">
             <el-input type="text" v-model="formData.username" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-col :span="5">
             <el-input type="string" v-model="formData.password" :placeholder="formData.id?'******':'请输入'"></el-input>
          </el-col>
        </el-form-item>
         <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validateMobilePhone,validateIdCard,validateEmail} from '@/util/validate'
import { httpPost,httpGet,httpPut } from '@/util/post'
import { format } from 'path';
export default {
  name: 'addShop',
  data() {
      return {
        jobList:[
           {label:"店长",value:'OWNER'},
           {label:"普通店员",value:'STAFF'}
        ],
        formData:{
            avatar:{
               imageUrl:""
            },
           	avatarKey: "",
            beesJob: "",
            password: "",
            truename: "",
            username: "",
            nickname:"",
            extended: {
                account:'',
                remarks:'',
                beeGrade:'',
                registerDay:"",
                beeMode:"",
                beeCode:"",
                beeName:""
            } 
        },
        rules: {
            avatarKey:[
                  { required: true, message: '请上传头像 ',  trigger: 'change' },
            ],
            beesJob: [
              { required: true, message: '请输入蜜蜂岗位',  trigger: 'change'},
            ],
            password: [
              { required: true, message: '请输入登录密码',  trigger: 'blur' },
              { min:6, message:"登录密码最小6位", trigger: 'blur'}
            ],
            truename: [
              { required: true, message: '请输入姓名', trigger: 'blur' }
            ],
            username: [
              { required: true, message: '请输入账户名', trigger: 'blur' }
            ],
            nickname:[
              { required: true, message: '请输入蜜蜂名称',  trigger: 'blur' }
            ],
           extended:{
              account: [
                { required: true, message: '请输入账号',  trigger: 'blur' }
              ],
              remarks: [
                { required: true, message: '请输入备注',  trigger: 'blur' }
              ],
              beeGrade: [
                { required: true, message: '请输入蜜蜂等级',  trigger: 'blur' }
              ],
              registerDay:[
                { required: true, message: '请输入注册日期',  trigger: 'blur' }
              ],
              beeMode:[
                { required: true, message: '请输入蜜蜂经营方式',  trigger: 'blur' }
              ],
              // beeCode:[
              //   { required: true, message: '请输入蜜蜂编码',  trigger: 'blur' }
              // ],
              // beeName:[
              //   { required: true, message: '请输入蜜蜂名称',  trigger: 'blur' }
              // ],
          }
        },
      };
  },
  computed: {
    pwd() {
      return this.formData.password;
    }
  },
  watch: {
    pwd(newValue, oldValue) {
      if(newValue){
        this.rules.password = [
              { required: true, message: '请输入登录密码',  trigger: 'blur' },
              { min:6, message:"登录密码最小6位", trigger: 'blur'}
            ]
      }else{
         this.rules.password = [];
      }
   }
  },
  mounted() {
     let id = this.$router.currentRoute.query.id;
     if(id){
        this.rules.password = [];
        this.getDetail(id);
     }
  },
  
  components:{
    uploadOne: resolve => require(["@/components/upload/uploadOne"], resolve),
  },

  methods: {
    getDetail(id){
          httpGet('BEEADD',id).then(res=>{
              if (res.code == 200) {
                    this.formData = res.data;
                    this.formData.extended = JSON.parse(this.formData.extended);
              }else{
                  window.vm.$message({
                    type: 'warning',
                    message: res.message
                  })
              }
          }) 
      },
    // 提交表单
    submitForm(formName) {
        console.log('params=',JSON.stringify(this.formData))
        this.$refs[formName].validate((valid) => {
          if (valid) {
              if(this.formData.id){
                 httpPut('BEEADD',this.formData).then(res=>{
                    console.log(res)
                    if (res.code == 200) {
                       window.vm.$message({
                        type: 'success',
                        message: '保存成功'
                      })
                      this.$router.go(-1);
                  }else{
                      window.vm.$message({
                        type: 'warning',
                        message: res.message
                      })
                  }
                }) 
              }else{
                httpPost('BEEADD',this.formData).then(res=>{
                  console.log(res)
                  if (res.code == 200) {
                      window.vm.$message({
                        type: 'success',
                        message: '保存成功'
                      })
                    this.$router.go(-1);
                }else{
                    window.vm.$message({
                      type: 'warning',
                      message: res.message
                    })
                }
              }) 
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  }
}
</script>
<style lang="scss" scope>
.modal_input {
  display: inline-block;
  margin-right: 20px;
  clear: both;
  height: 50px;
  line-height: 50px;
  position: relative;
  .el-input {
    width: 168px;
  }
 
}
</style>
