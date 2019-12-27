<!--
 * @Descripttion: 描述
 * @version: 版本
 * @Author: xiongbin
 * @Date: 2019-08-21 10:22:45
 * @LastEditors: 1490251116@qq.com
 * @LastEditTime: 2019-12-05 16:45:52
 --> 
<template>
  <div class="xb">
   <div class="input_modal">
      <el-row style="padding:20px ;display: flex; align-items: center;width:100%">
        <el-col :span="12"><div class="grid-content bg-purple">活动管理>活动详情</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light"  style="text-align: right">
           <el-button type="primary"  @click="handleBack()">返回</el-button>
          </div></el-col>
     </el-row>
    </div>
    <div class="input_modal" style="padding:20px 0;">
      <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" label-position="right" class="demo-ruleForm">
        <el-form-item label="活动图" >
          <img style="width:100px;height:100px;" :src="imageUrl" alt="">
        </el-form-item>
        <el-form-item label="活动名称" >
          <el-col :span="5">
            <el-form-item >
             <el-input type="text" disabled=true v-model="formData.name"  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
         <el-form-item label="活动时间">
          <el-col :span="9">
            <el-form-item >
               <el-date-picker
                v-model="formData.sdate"
                type="date"
                disabled=true
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2">-----</el-col>
          <el-col :span="2">
            <el-form-item >
               <el-date-picker
                v-model="formData.edate"
                disabled=true
                type="date"
                 format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="活动详情">
          <el-col :span="12">
            <el-form-item >
             <bgEditor   id="summernote" :minHeight="200" :content="formData.info" @editorData="handleEditorContent" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="审核" v-if="view==1">
          <el-button type="primary" @click="handlePass('pass')" >通过</el-button>
          <el-button type="danger"  @click="handlePass('reject')">拒绝</el-button>
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
        },
      };
  },

  mounted() {
    if(this.$route.query.id){
      this.getDetail(this.$route.query.id);
      this.edit=1;
    }
    if(this.$route.query.type==0){
      this.view=0
    }else if(this.$route.query.type==1){
       this.view=1
    }
  },
  components:{
    uploadOne: resolve => require(["@/components/upload/uploadOne"], resolve),
    bgEditor: resolve => require(["@/components/upload/bg-editor"], resolve),
  },

  methods: {
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
      this.id=id
      httpGet('SHOPACTIVELISTDETAIL',id).then(res=>{
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

