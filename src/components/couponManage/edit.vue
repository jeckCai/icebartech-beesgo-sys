<!--
 * @Descripttion: 描述
 * @version: 版本
 * @Author: xiongbin
 * @Date: 2019-08-21 10:22:45
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-26 14:35:07
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
        <el-form-item label="模板名称" prop="couponModelTitle" >
          <el-col :span="5">
            <el-form-item >
             <el-input type="text" v-model="formData.couponModelTitle" :disabled="isView"  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="优惠券模板类型" prop="couponType">
          <el-radio-group v-model="formData.couponType" label="优惠券模板类型" prop="couponType" :disabled="isView">
            <el-radio :label="item.value" :value="item.value" v-for="(item,index) in couponTypeArr" :key="index">{{item.key}}</el-radio>
          </el-radio-group>
        </el-form-item>
         <el-form-item v-if="formData.couponType == 2" label="门槛金额(元)" prop="withAmount" >
          <el-col :span="5">
            <el-form-item >
             <el-input type="text" v-model="formData.withAmount" oninput = "value=value.replace(/[^\d]/g,'')" :disabled="isView"  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
         <el-form-item v-if="formData.couponType == 1 || formData.couponType == 2 " label="优惠金额(元)" prop="usedAmount" >
          <el-col :span="5">
            <el-form-item >
             <el-input type="text" v-model="formData.usedAmount" oninput = "value=value.replace(/[^\d]/g,'')" :disabled="isView"  placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
         <el-form-item v-if="formData.couponType == 3" label="折扣百分比"  prop="couponPercent" >
          <el-col :span="5">
            <el-form-item >
             <el-input type="text" v-model="formData.couponPercent" oninput = "value=value.replace(/[^\d]/g,'')" :disabled="isView" placeholder="请输入1-100"></el-input>%
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item v-if="formData.couponType == 3" label="最大折扣金额(元)" prop="deductionMax" >
          <el-col :span="5">
            <el-form-item >
             <el-input type="text" v-model="formData.deductionMax" oninput = "value=value.replace(/[^\d]/g,'')" :disabled="isView" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="优惠券名称" prop="couponName" >
          <el-col :span="5">
            <el-form-item >
             <el-input type="text" v-model="formData.couponName" :disabled="isView" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
         <el-form-item label="数量(张)" prop="couponQuota" >
          <el-col :span="5">
            <el-form-item >
             <el-input type="string" v-model="formData.couponQuota" oninput = "value=value.replace(/[^\d]/g,'')" :disabled="isView" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="使用期限" prop="usedTime">
          <el-col :span="6">
             <el-date-picker   
               type="daterange" 
               range-separator="至"
               start-placeholder="开始日期"
               end-placeholder="结束日期"
               v-model="formData.usedTime" 
               value-format="yyyy-MM-dd"
               :disabled="isView"
               style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
         <el-form-item label="限领张数" prop="couponLimitCount" >
          <el-col :span="5">
            <el-form-item >
             <el-input type="string" v-model="formData.couponLimitCount" oninput = "value=value.replace(/[^\d]/g,'')" :disabled="isView" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
         <el-form-item label="优惠说明"  prop="couponRemark">
          <el-col :span="5">
             <el-input type="textarea" :rows="5" v-model="formData.couponRemark" :disabled="isView" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item v-if="!isView">
           <el-button type="primary" @click="$router.back()">返回</el-button>
           <el-button type="primary" @click="submitForm('ruleForm','check')">提交审核</el-button>
           <el-button type="primary" v-if="!isView" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { httpPost,httpGet,httpPut} from '@/util/post'

export default {
  name: 'addShop',
  data() {
      return { 
        isView:false, // 查看模式
        couponTypeArr:[
          {key:'无门槛指定券',value:1}, 
          {key:'有门槛指定券',value:2},
          {key:'折扣金额',value:3},
        ],
        formData:{
            couponModelTitle:"", // 优惠券模板名称
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
            couponName: "", // 优惠券名称标题（有图片则显示图片）
            couponType: 1, // 1固定折扣，2百分比折扣，3不指定金额
            issueEndTime: "", // 发放结束时间
            issueStartTime: "", // 发放开始时间
            takeCount: "", // 已领取的优惠券数量
            usedAmount: "", // 用券金额
            usedCount: "", // 已使用的优惠券数量
            usedTime:"", // 使用时间
            usedEndTime: "", // 使用结束时间
            usedStartTime: "", // 使用开始时间
            validDays: "", // 自领取之日起有效天数
            validType: "", // 时效:1绝对时效（领取后XXX-XXX时间段有效）  2相对时效（领取后N天有效 自动过期）
            withAmount: "", // 满多少金额
            deductionMax:"", // 最大折扣金额
        },
        rules: {
          couponModelTitle:[
            { required: true, message: '请输入模板名称 ', trigger: 'blur' },
          ],
          couponName:[
            { required: true, message: '请输入优惠券名称 ', trigger: 'blur' },
          ],
          usedAmount:[
            { required: true, message: '请输入优惠金额(元)', trigger: 'blur' },
          ],
          withAmount:[
            { required: true, message: '请输入门槛金额 ', trigger: 'blur' },
          ],
          couponPercent:[
            { required: true, message: '请输入最大折扣百分比', trigger: 'blur' },
          ],
          deductionMax:[
            { required: true, message: '请输入最大折扣金额', trigger: 'blur' },
          ],
          couponType:[
            { required: true, message: '请选择优惠券模板类型 ', trigger: 'change' },
          ],
          couponQuota:[
            { required: true, message: '请输入数量(张)', trigger: 'blur' },
          ],
          usedTime:[
            { required: true, message: '请选择使用期限', trigger: 'change' },
          ],
          couponLimitCount:[
            { required: true, message: '请输入限领张数', trigger: 'blur' },
          ],
          couponRemark:[
            { required: true, message: '请输入优惠说明', trigger: 'blur' },
          ],
        },
      };
  },
  mounted() {
     let id = this.$router.currentRoute.query.id;
     let type = this.$router.currentRoute.query.type;
     this.isView = type=='view'? true:false;
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
    // 优惠券详情
    getDetail(id){
      httpGet('COUPONDETAIL',id).then(res=>{
        if (res.code == 200) {
          this.formData = res.data;
          this.formData.usedTime =  [this.formData.usedStartTime, this.formData.usedEndTime];
      }
      }) 
    },
    // 提交表单
    submitForm(formName,check) {
        if(this.formData.couponLimitCount>this.formData.couponQuota){
              window.vm.$message({
                type: 'warning',
                message: "优惠券限领张数不能大于优惠券数量！"
              })
              return
        }
        this.formData.usedStartTime = this.formData.usedTime[0];
        this.formData.usedEndTime = this.formData.usedTime[1];
        this.formData.auditStatus = check?1:0; // 是否提交审核
        this.$refs[formName].validate((valid) => {
          if (valid) {
              if(this.formData.id){
                httpPut('COUPONUPDATE',this.formData).then(res=>{
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
               httpPost('COUPONCREATE',this.formData).then(res=>{
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
<style lang="scss" scoped>
.input_modal {
  margin-bottom: 20px;
  background: #fff;
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
