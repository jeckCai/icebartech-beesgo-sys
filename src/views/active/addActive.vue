<!--
 * @Descripttion: 描述
 * @version: 版本
 * @Author: xiongbin
 * @Date: 2019-08-21 10:22:45
 * @LastEditors: 1490251116@qq.com
 * @LastEditTime: 2019-12-09 15:02:02
 --> 
<template>
  <div class="xb">
   <div class="input_modal">
      <el-row style="padding:20px ;display: flex; align-items: center">
        <el-col :span="12"><div class="grid-content bg-purple">活动管理>新增活动</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light"  style="text-align: right">
           <el-button type="primary"  @click="handleBack()">返回</el-button>
          </div></el-col>
     </el-row>
    </div>
    <div class="input_modal" style="padding:20px 0;">
      <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" label-position="right" class="demo-ruleForm">
        <el-form-item label="活动图" prop="imageKey" required>
          <uploadOne
              :clear="false"
              :imgUrl.sync="imageUrl"
              :isShowImg="true"
              @upLoadSuccess="v=>{formData.imageKey =v.fileKey}"
            ></uploadOne>
        </el-form-item>
        <el-form-item label="活动名称" prop="name" required>
          <el-col :span="5">
            <el-form-item >
             <el-input :disabled="type==1" type="text" v-model="formData.name"  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
         <el-form-item label="活动时间">
          <el-col :span="3">
            <el-form-item  prop="sdate" required>
               <el-date-picker
                v-model="formData.sdate"
                type="date"
                :disabled="type==1"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="1">-----</el-col>
          <el-col :span="3">
            <el-form-item  prop="edate" required>
               <el-date-picker
                v-model="formData.edate"
                type="date"
                :disabled="type==1"
                 format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="活动详情" prop="info" required>
          <el-col :span="12">
             <bgEditor v-if="type!==1" id="summernote" :minHeight="200" :content="formData.info" @editorData="handleEditorContent" />
              <div v-else class="showDetail"  v-html="formData.info">
             </div>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" :disabled="type==1">提交审核</el-button>
          <!-- <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { httpPost,httpGet,httpPut } from '@/util/post'//

export default {
  name: 'addShop',
  data() {
      return { 
        edit:0,//新增0编辑1
        id:'',//商品id
        type:0,
        formData:{
            name:"", // 活动名称
            sdate:"", // 蜂蜜
            edate:'',
            info:'',
            imageKey:''
        },
        imageUrl:'',
        rules: {
          name:[
            { required: true, message: '请选择活动名称 ', trigger: 'blur' },
          ],
          sdate:[
            { required: true, message: '请输入活动开始时间', trigger: 'blur' },
          ],
          edate:[
            { required: true, message: '请输入活动结束时间', trigger: 'blur' },
          ],
          info:[
            { required: true, message: '请输入活动详情', trigger: 'blur' },
          ],
           imageKey:[
            { required: true, message: '请上传活动图', trigger: 'change' },
          ],
        },
      };
  },

  mounted() {
    if(this.$route.query.id){
      this.getDetail(this.$route.query.id);
      this.edit=1;
      this.type=this.$route.query.type;
    }
  },
  components:{
    uploadOne: resolve => require(["@/components/upload/uploadOne"], resolve),
    upload: resolve => require(["@/components/upload/upload"], resolve),
    bgEditor: resolve => require(["@/components/upload/bg-editor"], resolve),
  },

  methods: {
    getDetail(id){
      this.id=id
      httpGet('ACTIVELISTDETAIL',id).then(res=>{
        this.formData.info=res.data.info;
        this.formData.name=res.data.name;
        this.formData.edate=res.data.edate;
        this.formData.sdate=res.data.sdate;
        this.formData.imageKey=res.data.imageKey;
        this.imageUrl=res.data.image.imageUrl;
      })
    },
    handleEditorContent(v){
      this.formData.info=v
    },
     handleBack(){
      this.$router.back()
    }, 
    // 提交表单
    submitForm(formName) {
        let data=this.formData;
        this.$refs[formName].validate((valid) => {
          if (valid) { 
               this.$confirm('活动资料填写完整无误，确认提交平台审核?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                   if(this.edit==0){//新增
                      httpPost('ACTIVELISTADD',data).then(res=>{
                      if(res.code==200){
                          this.$message({
                            type: 'success',
                            message: '新增成功!'
                          })
                          setTimeout(()=>{
                            this.handleBack()
                          },500)
                          }
                    })
                    }else{//编辑  
                    data.id=this.id;
                      httpPut('ACTIVELISTPUT',data).then(res=>{
                        if(res.code==200){
                          this.$message({
                            type: 'success',
                            message: '修改成功!'
                          })
                          setTimeout(()=>{
                            this.handleBack()
                          },500)
                          }
                      })
                    }
                }).catch(() => {
                        
                });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  }
}
</script>
<style lang="scss" scoped>
.showDetail{
  height: 400px;
  width: 800px;
  overflow: scroll;
  padding: 10px;
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
