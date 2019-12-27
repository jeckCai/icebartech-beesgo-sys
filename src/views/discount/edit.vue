<!--
 * @Descripttion: 描述
 * @version: 版本
 * @Author: xiongbin
 * @Date: 2019-08-21 10:22:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-29 17:47:40
 --> 
<template>
  <div class="xb">
   <div class="input_modal">
      <el-row style="padding:20px ;display: flex; align-items: center">
        <el-col :span="12"><div class="grid-content bg-purple">优惠券管理》编辑优惠券</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light"  style="text-align: right">
           <el-button type="primary"  @click="$router.back()">返回</el-button>
          </div></el-col>
     </el-row>
    </div>
    <div class="input_modal" style="padding:20px 0;">
      <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="150px" label-position="right" class="demo-ruleForm">
        <el-form-item label="优惠券名称" prop="couponTitle" required>
          <el-col :span="5">
            <el-form-item >
             <el-input type="text" v-model="formData.couponTitle"  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
         <el-form-item label="优惠券类型" prop="couponType">
          <el-col :span="5">
            <el-select v-model="formData.couponType" placeholder="请选择">
                <el-option :label="item.key" :value="item.value" v-for="(item,index) in couponTypeArr" :key="index"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="满减" prop="amount">
          <el-col :span="20">
                  <el-col :span="5" class="form-input">
                      <el-form-item  prop="withAmount">
                          <span>满</span><el-input type="string" v-model="formData.withAmount" placeholder="请输入"></el-input>
                      </el-form-item>
                  </el-col>
                   <el-col :span="5"  class="form-input">
                      <el-form-item  prop="usedAmount">
                          <span>减</span> <el-input  type="string" v-model="formData.usedAmount" placeholder="请输入"></el-input>
                      </el-form-item>
                 </el-col>
          </el-col>
        </el-form-item>
         <el-form-item label="发放数量" prop="couponQuota" required>
          <el-col :span="5">
            <el-form-item >
             <el-input type="string" v-model="formData.couponQuota"  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="有效时间" prop="usedEndTime">
          <el-col :span="5">
             <el-date-picker type="date" placeholder="选择日期" v-model="formData.usedEndTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
         <el-form-item label="优惠券描述"  prop="couponRemark">
          <el-col :span="5">
             <el-input type="textarea" :rows="5" v-model="formData.couponRemark" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="详情" prop="couponServiceRemark" required>
          <el-col :span="12">
            <el-form-item >
             <bgEditor id="summernote" :minHeight="200" :content="formData.couponServiceRemark" @editorData="handleEditorContent" />
            </el-form-item>
          </el-col>
        </el-form-item>
  
        <el-form-item>
           <el-button type="primary" @click="$router.back()">返回</el-button>
           <el-button type="primary" >提交审核</el-button>
           <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
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
        couponTypeArr:[
          {key:'满减券',value:'1'}, 
          {key:'折扣券',value:'2'},
        ],
        formData:{
            amount: true,
           	couponIcon: "", // 优惠券显示图片
            couponIconExpire: "", // 已过期图片
            couponIconUsed: "", // 已使用图片
            couponLimitCount: "", // 限制领取数量上限
            couponQuota: "", //配额：发券数量
            couponRemark: "", // 优惠说明
            couponSerialNumber: "", //店铺或商品流水号（店铺优惠券和商品优惠券）
            couponService: "", //服务：eg:10店铺优惠券 11新人店铺券  20商品优惠券  30类目优惠券  60平台优惠券 61新人平台券
            couponServiceCondition: "", //使用范围
            couponServiceRange: "", // 使用范围
            couponServiceRemark: "", //当前用途说明
            couponTitle: "", // 优惠券名称标题（有图片则显示图片）
            couponType: "", // 1固定折扣，2百分比折扣，3不指定金额
            issueEndTime: "", // 发放结束时间
            issueStartTime: "", // 发放开始时间
            takeCount: "", // 已领取的优惠券数量
            usedAmount: "", // 用券金额
            usedCount: "", // 已使用的优惠券数量
            usedEndTime: "", // 使用结束时间
            usedStartTime: "", // 使用开始时间
            validDays: "", // 自领取之日起有效天数
            validType: "", // 时效:1绝对时效（领取后XXX-XXX时间段有效）  2相对时效（领取后N天有效 自动过期）
            withAmount: ""  // 满多少金额
        },
        rules: {
          couponTitle:[
            { required: true, message: '请输入优惠券名称 ', trigger: 'blur' },
          ],
          couponType:[
            { required: true, message: '请输入优惠券名称 ', trigger: 'blur' },
          ],
          couponQuota:[
            { required: true, message: '请输入发放数量 ', trigger: 'blur' },
          ],
          amount : [
              { required: true, message: '',  trigger: 'blur' },
            ],
          withAmount:[
            { required: true, message: '请输入满额 ', trigger: 'blur' },
          ],
          usedAmount:[
            { required: true, message: '请输入减额 ', trigger: 'blur' },
          ],
          usedEndTime:[
            { required: true, message: '请选择有效时间', trigger: 'change' },
          ],
          couponRemark:[
            { required: true, message: '请输入优惠券描述', trigger: 'blur' },
          ],
          couponServiceRemark:[
            { required: true, message: '请输入详情', trigger: 'blur' },
          ]
        },
      };
  },
  mounted() {
     let id = this.$router.currentRoute.query.id;
     if(id){
       this.getDetail(id);
     }
  },
  components:{
    bgEditor: resolve => require(["@/components/upload/bg-editor"], resolve),
  },

  methods: {

    handleEditorContent(v){
      this.formData.couponServiceRemark = v;
    },
    // 
    getDetail(id){
       const param = {
         id:id
      }
      httpPost('ATTRIBUTE',param).then(res=>{
        if (res.code == 200) {
        this.tableData = res.data
      }
      }) 
    },
    // 提交表单
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              let url = this.formData.id? '':'';
              httpPut(url,this.formData).then(res=>{
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
.form-input span{
   display: inline-block;
   margin:0 20px;
}
.form-input .el-input{
  display: inline-block;
  width: 100px;
}
.el-col-5 {
  width: 200px;
}

</style>
