<!--
 * @Description: 新增蜜蜂
 * @Author: weizhengda
 * @Date: 2019-11-13 20:03:31
 * @LastEditTime : 2019-12-20 10:54:07
 * @LastEditors  : Please set LastEditors
 -->

<template>
  <div class="xb">
   <div class="input_modal">
      <el-row style="padding:20px ;display: flex; align-items: center">
        <el-col :span="12"><div class="grid-content bg-purple">蜜蜂管理》蜜蜂详情</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light"  style="text-align: right">
           <el-button type="primary"  @click="$router.go(-1)">返回</el-button>
          </div></el-col>
     </el-row>
    </div>
    <div class="input_modal" style="padding:20px 100px;">
      <el-form ref="ruleForm" :inline="true" :model="formData" :rules="rules"  label-width="120px" label-position="right" class="demo-ruleForm">
            <el-form-item label="头像" prop="avatarKey">
                <img  style="width:80px;height:80px;border-radius:50%" :src="formData.avatar.imageUrl" alt="">
            </el-form-item>
            <el-form-item label="蜜蜂编号" prop="id">
                <div v-html="formData.id"></div>
            </el-form-item>
          <el-form-item label="蜜蜂名称" prop="nickname">
            <div v-html="formData.nickname"></div>
          </el-form-item>
      </el-form>
       <el-form ref="ruleForm" :inline="true" :model="formData" :rules="rules"  label-width="120px" label-position="right" class="demo-ruleForm">
            <el-form-item label="姓名" prop="truename">
                <div v-html="formData.truename"></div>
            </el-form-item>
            <el-form-item label="蜜蜂岗位" prop="beesJob">
              <div v-html="formData.beesJob"></div>
            </el-form-item>
              <el-form-item label="蜜蜂经营方式" prop="extended.beeMode">
                <div v-html="formData.extended.beeMode"></div>
              </el-form-item>
       </el-form>
       <el-form ref="ruleForm" :inline="true" :model="formData" :rules="rules"  label-width="120px" label-position="right" class="demo-ruleForm">
            <el-form-item label="蜜蜂注册日期" prop="truename">
                <div v-html="formData.extended.registerDay.substring(0,10)"></div>
            </el-form-item>
            <el-form-item label="蜜蜂等级" prop="beesJob">
              <div v-html="formData.extended.beeGrade"></div>
            </el-form-item>
              <el-form-item label="备注" prop="extended.beeMode">
                <div v-html="formData.extended.remarks"></div>
              </el-form-item>
       </el-form>
        <el-form ref="ruleForm" :inline="true" :model="formData" :rules="rules"  label-width="120px" label-position="right" class="demo-ruleForm">
              <el-form-item label="账号" prop="truename">
                  <div v-html="formData.username"></div>
              </el-form-item>
              <el-form-item label="密码" prop="beesJob">
                <div>******</div>
              </el-form-item>
       </el-form>
       <div style="margin:20px 0;height:1px;background:#f0f0f0"></div>
       <el-form ref="ruleForm" :model="formData" :rules="rules"  label-width="120px" label-position="left" class="demo-ruleForm">
        <el-form-item label="身份证号" prop="extended.IDCode" style="width:600px !important">
            <span style="display:inline-block;padding-right:20px;" v-html="formatValue(formData.extended.IDCode)"></span>
            <el-button @click="dialogFormVisible = true">修改信息</el-button>
        </el-form-item>
        <el-form-item label="手机号" prop="extended.phone">
             <div v-html="formatValue(formData.extended.phone)"></div>
        </el-form-item>
        <el-form-item label="住址" prop="extended.address">
             <div v-html="formatValue(formData.extended.address)"></div>
        </el-form-item>
        <el-form-item label="联系电话"  prop="extended.tel">
          <div v-html="formatValue(formData.extended.tel)"></div>
        </el-form-item>
        <el-form-item label="银行开户名" prop="extended.bankAccountName">
           <div v-html="formatValue(formData.extended.bankAccountName)"></div>
        </el-form-item>
        <el-form-item label="开户银行" prop="extended.bankName">
            <div v-html="formatValue(formData.extended.bankName)"></div>
        </el-form-item>
        <el-form-item label="开户省市" prop="extended.bankCity">
          <div v-html="formatValue(formData.extended.bankCity)"></div>
        </el-form-item>
        <el-form-item label="支行名称"  prop="extended.subbranch">
          <div v-html="formatValue(formData.extended.subbranch)"></div>
        </el-form-item>
        <el-form-item label="银行账号" prop="extended.bankAccount">
          <div v-html="formatValue(formData.extended.bankAccount)"></div>
        </el-form-item>
        <el-form-item label="微信"  prop="extended.wechat">
          <div v-html="formatValue(formData.extended.wechat)"></div>
        </el-form-item>
        <el-form-item label="邮箱" prop="extended.email">
          <div v-html="formatValue(formData.extended.email)"></div>
        </el-form-item>
        <el-form-item label="QQ" prop="extended.qq">
          <div v-html="formatValue(formData.extended.qq)"></div>
        </el-form-item>
      </el-form>
    </div>
    <!-- 修改蜜蜂信息弹窗 -->
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" :model="formData" :rules="rules" label-width="150px" label-position="right">
              <el-form-item label="身份证号" prop="extended.IDCode">
          <el-col :span="10">
             <el-input type="text" v-model="formData.extended.IDCode" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号" prop="extended.phone">
          <el-col :span="10">
             <el-input type="text" v-model="formData.extended.phone" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="住址" prop="extended.address">
          <el-col :span="10">
             <el-input type="text" v-model="formData.extended.address" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="联系电话"  prop="extended.tel">
          <el-col :span="10">
             <el-input type="text" v-model="formData.extended.tel" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="银行开户名" prop="extended.bankAccountName">
          <el-col :span="10">
             <el-input type="text" v-model="formData.extended.bankAccountName" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="开户银行" prop="extended.bankName">
          <el-col :span="10">
             <el-input type="text" v-model="formData.extended.bankName" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="开户省市" prop="extended.bankCity">
          <el-col :span="10">
             <el-input type="text" v-model="formData.extended.bankCity" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="支行名称"  prop="extended.subbranch">
          <el-col :span="10">
             <el-input type="text" v-model="formData.extended.subbranch" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="银行账号" prop="extended.bankAccount">
          <el-col :span="10">
             <el-input type="text" v-model="formData.extended.bankAccount" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="微信"  prop="extended.wechat">
          <el-col :span="10">
             <el-input type="text" v-model="formData.extended.wechat" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱" prop="extended.email">
          <el-col :span="10">
             <el-input type="text" v-model="formData.extended.email" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="qq" prop="extended.qq">
          <el-col :span="10">
             <el-input type="text" v-model="formData.extended.qq" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('dataForm')">确 定</el-button>
        </div>
    </el-dialog>
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
        dialogFormVisible:false,
        jobList:[
           {label:"店主",value:'OWNER'},
           {label:"员工",value:'STAFF'}
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
            extended: {
                account:'',
                remarks:'',
                beeGrade:'',
                qq:"",
                email:'',
                wechat:'',
                bankAccount:"",
                subbranch:'',
                bankCity:"",
                bankName:'',
                bankAccountName:"",
                tel:"",
                phone:"",
                address:'',
                IDCode:"",
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
              { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
           extended:{
              account: [
                { required: true, message: '请输入账号',  trigger: 'blur' }
              ],
              remarks: [
                { required: true, message: '请输入账号',  trigger: 'blur' }
              ],
              beeGrade: [
                { required: true, message: '请输入蜜蜂等级',  trigger: 'blur' }
              ],
              qq: [
                { required: true, message: '请输入qq',  trigger: 'blur' }
              ],
              email: [
                { required: true, validator:validateEmail,  trigger: 'blur' }
              ],
              wechat: [
                { required: true, message: '请输入微信',  trigger: 'blur' }
              ],
              bankAccount:[
                { required: true, message: '请输入银行账号',  trigger: 'blur' }
              ],
              subbranch:[
                { required: true, message: '请输入支行名称',  trigger: 'blur' }
              ],
              bankCity:[
                { required: true, message: '请输入开户省市',  trigger: 'blur' }
              ],
              bankName:[
                { required: true, message: '请输入开户银行',  trigger: 'blur' }
              ],
              bankAccountName:[
                { required: true, message: '请输入银行开户名',  trigger: 'blur' }
              ],
              tel:[
                { required: true, message: '请输入联系电话',  trigger: 'blur' }
              ],
              phone:[
                { required: true,  validator: validateMobilePhone, trigger: 'blur' }
              ],
              address:[
                { required: true, message: '请输入住址',  trigger: 'blur' }
              ],
              IDCode:[
                { required: true, validator: validateIdCard, trigger: 'blur' }
              ],
              registerDay:[
                { required: true, message: '请输入注册日期',  trigger: 'blur' }
              ],
              beeMode:[
                { required: true, message: '请输入蜜蜂经营方式',  trigger: 'blur' }
              ],
              beeCode:[
                { required: true, message: '请输入蜜蜂编号',  trigger: 'blur' }
              ],
              beeName:[
                { required: true, message: '请输入蜜蜂名称',  trigger: 'blur' }
              ],
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
    formatValue(val){
       val = val?val:"未填";
       return val;
    },
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
                    this.dialogFormVisible = false;
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
.input_modal .el-form-item{
  min-width: 250px;
}
.el-form-item{
  margin-bottom: 20px;
}
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
