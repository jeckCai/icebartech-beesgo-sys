<!--
 * @Descripttion: 描述
 * @version: 版本
 * @Author: xiongbin
 * @Date: 2019-08-21 10:22:45
 * @LastEditors: 1490251116@qq.com
 * @LastEditTime: 2019-12-09 17:43:26
 --> 
<template>
  <div class="xb">
   <div class="input_modal">
      <el-row style="padding:20px ;display: flex; align-items: center;width:100%">
        <el-col :span="12">
          <div class="grid-content bg-purple" v-if="type==0">活动管理>新增活动</div>
          <div class="grid-content bg-purple" v-if="type==1">活动管理>活动详情</div>
          <div class="grid-content bg-purple" v-if="type==2">活动管理>活动编辑</div>
          <div class="grid-content bg-purple" v-if="type==3">活动管理>活动审核</div>
        </el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light"  style="text-align: right">
           <el-button type="primary"  @click="handleBack()">返回</el-button>
          </div></el-col>
     </el-row>
    </div>
    <div class="input_modal" style="padding:20px 0;">
      <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" label-position="right" class="demo-ruleForm">
        <el-form-item label="活动图"  v-if="type==1||type==3" >
          <img style="width:100px;height:100px;" :src="imageUrl" alt="">
        </el-form-item>
        <el-form-item label="活动图" v-else prop="imageKey" required>
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
             <el-input type="text" :disabled='type==0||type==2?false:true' v-model="formData.name"  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
         <el-form-item label="活动时间" prop="sdate" required>
          <el-col :span="9">
            <el-form-item   >
               <el-date-picker
                v-model="formData.sdate"
                type="date"
                :disabled='type==0||type==2?false:true'
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2">-----</el-col>
          <el-col :span="2">
            <el-form-item  prop="edate" required>
               <el-date-picker
                v-model="formData.edate"
                :disabled='type==0||type==2?false:true'
                type="date"
                 format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="活动详情"  prop="info" required>
          <el-col :span="24">
             <bgEditor v-if="type==0||type==2"  id="summernote" :minHeight="200" :content="formData.info" @editorData="handleEditorContent" />
             <div v-else class="showDetail"  v-html="formData.info">
             </div>
          </el-col>
        </el-form-item>
        <el-form-item label="审核" v-if="type==3">
          <el-button type="primary" @click="handlePass('pass')" >通过</el-button>
          <el-button type="danger"  @click="handlePass('reject')">拒绝</el-button>
        </el-form-item>

        <!-- 新增0编辑1 -->
        <el-form-item label=" " v-if="type==0||type==2">
          <el-button type="primary" @click="handleSave('ruleForm')" >保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { httpPost,httpGet,httpPut ,strPut} from '@/util/post'//

export default {
  name: 'addShop',
  data() {
      return { 
        disabled:false,//type=0?false:true
        to:'sys',//判断是商场还是品牌还是总后台
        type:0,//type=0新增；1查看 2编辑 3审核 
        view:0,//用户查看还是审核
        edit:0,//新增0编辑1
        id:'',//商品id
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
            { required: true, message: '请输入活动图', trigger: 'blur' },
          ],
        },
      };
  },

  mounted() {
    this.to=this.$route.query.to;//sys总平台进来;mall商场进来;brand品牌进来
    console.log(this.to)
    this.type=this.$route.query.type;//sys总平台进来;mall商场进来;brand品牌进来
    if(this.$route.query.id){//查看编辑审核
      this.disabled=true;
      this.getDetail(this.$route.query.id);
      this.edit=1;
    }else{//新增
      this.disabled=false;
      this.edit=0;
    }
    // if(this.$route.query.type==0){
    //   this.view=0
    // }else if(this.$route.query.type==1){
    //    this.view=1
    // }
  },
  components:{
    uploadOne: resolve => require(["@/components/upload/uploadOne"], resolve),
    bgEditor: resolve => require(["@/components/upload/bg-editor"], resolve),
  },

  methods: {
    // 新增编辑保存
    handleSave(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          let params=this.formData;
           this.$confirm('活动资料填写完整无误，确认提交平台审核?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    if(this.to=='sys'){//总平台
                    console.log('平台')
                      if(this.id!=''){//编辑
                        params.id=this.id;
                        httpPut('ACTIVESYSADD',params).then(res=>{
                                  if(res.code==200){
                                    this.$message({type: 'success',message: '修改成功!'})
                                    setTimeout(()=>{
                                      this.handleBack()
                                  },500)
                                }
                            })
                      }else{//新增
                          httpPost('ACTIVESYSADD',params).then(res=>{
                                if(res.code==200){
                                    this.$message({ type: 'success', message: '新增成功!' })
                                  setTimeout(()=>{
                                      this.handleBack()
                                  },500)
                                  }
                            })
                      }
                    }else if(this.to='mall'){//商场 
                      console.log('商场')
                         if(this.id!=''){//编辑
                        params.id=this.id;
                        httpPut('ACTIVESYSADD',params).then(res=>{
                                  if(res.code==200){
                                    this.$message({type: 'success',message: '修改成功!'})
                                    setTimeout(()=>{
                                      this.handleBack()
                                  },500)
                                }
                            })
                      }else{//新增
                          httpPost('ACTIVESYSADD',params).then(res=>{
                                if(res.code==200){
                                    this.$message({ type: 'success', message: '新增成功!' })
                                  setTimeout(()=>{
                                      this.handleBack()
                                  },500)
                                  }
                            })
                      }
                    }else{
                      console.log('品牌')
                         if(this.id!=''){//编辑
                        params.id=this.id;
                        httpPut('ACTIVESYSADD',params).then(res=>{
                                  if(res.code==200){
                                    this.$message({type: 'success',message: '修改成功!'})
                                    setTimeout(()=>{
                                      this.handleBack()
                                  },500)
                                }
                            })
                      }else{//新增
                          httpPost('ACTIVESYSADD',params).then(res=>{
                                if(res.code==200){
                                    this.$message({ type: 'success', message: '新增成功!' })
                                  setTimeout(()=>{
                                      this.handleBack()
                                  },500)
                                  }
                            })
                      }
                    }
                  }).catch(()=>{})
          
        }else{
          console.log('填写不完整')
        }
      })
    },
    //获取富文本框
    handleEditorContent(v){
      this.formData.info=v;
    },




      handlePass (status) {
      if (status == "pass") {
        this.$confirm("同意该活动吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            strPut("ACTIVEPASS", this.id + "/pass").then(res => {
              if (!res) return;
              this.$message.success(res.message);
              this.handleBack()
            });
          })
          .catch(() => { });
      } else {
         this.$confirm("拒绝该活动吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            strPut("ACTIVEPASS", this.id + "/reject").then(res => {
              if (!res) return;
              this.$message.success(res.message);
              this.handleBack()
            });
          })
          .catch(() => { });
      }
    },
    getDetail(id){
      this.id=id;
      let path;
       if(this.to=='shop'){
        path='ACTIVESYSDEL'
       }else{
         path='ACTIVESYSADD'
       }
        
      httpGet(path,id).then(res=>{
        this.formData.info=res.data.info;
        this.formData.name=res.data.name;
        this.formData.edate=res.data.edate;
        this.formData.sdate=res.data.sdate;
        this.formData.imageKey=res.data.imageKey;
        this.imageUrl=res.data.image.imageUrl;
      })
    }, 
     handleBack(){
      this.$router.back()
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
.input_modal{
    padding: 10px;
    background: white;
    margin-bottom: 10px;
    display: flex;
}
.input-item{
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.input-item span{
    width: 100px;
    display: inline-block;
    margin-left: 10px;
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

