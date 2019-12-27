<template>
  <div class="wrap">
     <div class="flex space-between rot_title">
      <div>品牌管理》品牌详情</div>
      <el-button type="primary" @click="back">返回</el-button>
    </div>
    <el-form ref="form"
             :model="formData"
             label-width="120px">
      <h5>账户信息</h5>
      <el-form-item label="账号名:">
        <div v-html="formData.username"></div>
      </el-form-item>
      <el-form-item label="登录密码:"
                    prop="password">
        <el-row :gutter="20">
          　<el-col :span="3"
                  :offset="1">*******</el-col>
          <el-col :span="2"
                  :offset="1">
          </el-col>
        </el-row>
      </el-form-item>
      <h5>品牌资料</h5>
       <span class="m-title">基本资料：</span>
      <el-form-item label="商城名:">
        <div v-html="formData.shopName"></div>
      </el-form-item>
      <el-form-item label="品牌名:">
        <div v-html="formData.branchName"></div>
      </el-form-item>
      <el-form-item label="品牌图:">
        <img width="180px"
             v-if="formData.branchIcon"
             :src='formData.branchIcon.imageUrl' />
      </el-form-item>
      <el-form-item label="品牌编码:">
        <div v-html="formData.branchCode"></div>
      </el-form-item>
      <el-form-item label="地址:">
        <div v-if="formData.extended"
             v-html="JSON.parse(formData.extended).address"></div>
      </el-form-item>
      <el-form-item label="品牌主页:">
        <div v-html="formData.info"></div>
      </el-form-item>
       <el-form-item label="品牌介绍:">
        <div class="flex" v-if="formData.branchImages">
          <img width="150px"
               class="right-btn"
               v-for="(item,index) in formData.branchImages"
               :key="index"
               :src="item.imageUrl" />
        </div>
      </el-form-item>
      <span class="m-title">证照信息：</span>
      <el-form-item label="企业名称:">
        <div v-html="extended.enterpriseName"></div>
      </el-form-item>
      <el-form-item label="营业执照注册号:">
        <div v-html="extended.registrationNumber"></div>
      </el-form-item>
       <el-form-item label="企业类型:">
        <div v-html="extended.firmType"></div>
      </el-form-item>
       <el-form-item label="企业住所:">
        <div v-html="extended.firmAddress"></div>
      </el-form-item>
       <el-form-item label="法定代表人:">
        <div v-html="extended.representative"></div>
      </el-form-item>
       <el-form-item label="企业注册资金:">
        <div v-html="extended.registerMoney"></div>
      </el-form-item>
       <el-form-item label="成立时间:">
        <div v-html="extended.registerDate"></div>
      </el-form-item>
      <el-form-item label="营业期限:">
        <div v-html="extended.allottedDate"></div>
      </el-form-item>
       <el-form-item label="经营范围:">
        <div v-html="extended.manageScope"></div>
      </el-form-item>
       <el-form-item label="企业登记机关:">
        <div v-html="extended.registry"></div>
      </el-form-item>
       <el-form-item label="营业执照:">
        <img width="150px" v-if="formData.license"
             :src="formData.license.imageUrl" />
      </el-form-item>
      <h5>品牌操作</h5>
      <el-form-item label="品牌状态:">
        <span style="display:inline-block;width:100px"
              v-html="getStatus(formData.auditStatus)"></span>
               <el-button size="mini"
                   type="primary"
                   v-if="formData.auditStatus=='AUDITING'&&isLook"
                   @click="brandAuditStatus(formData.id,'pass')">同意</el-button>
        <el-button size="mini"
                   type="danger"
                   v-if="formData.auditStatus=='AUDITING'&&isLook"
                   @click="brandAuditStatus(formData.id,'reject')">拒绝</el-button>
      </el-form-item>
      <el-form-item label="未通过原因:"
                    v-if="formData.rejectReason&&formData.auditStatus!='AUDITING'">
        <div v-html="formData.rejectReason"></div>
      </el-form-item>
    </el-form>
     <!-- 审核拒绝dialog -->
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="500px">
      <el-form  label-width="100px">
        <el-form-item label="拒绝原因"
                      prop="reason">
          <el-input type="textarea"
                    rows="5"
                    maxlength="60"
                    v-model="reason"
                    onkeyup="this.value=this.value.replace(/\s+/g,'')"
                    placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="isConfirm('diaForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { httpPost, httpGet, strPut, httpPut } from "../../util/post";
export default {
  data () {
    return {
      dialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      pageIndex: 1,
      pageCount: null,
      extended: "",
      formData: {
      },
      isEditPwd: false,
      reason:"",//拒绝审核理由
       diaRules: {
        reason: [
          { required: true, message: '请输入拒绝原因', trigger: 'blur' },
        ]
      },
      isLook:""//是否是查看
    }
  },
  components: {
    bgEditor: resolve => require(["../upload/bg-editor"], resolve),
  },
  created(){
    this.isLook = this.$router.currentRoute.query.isLook;
  },
  methods: {
    // 获取商场详情
    getDatail () {
      let id = this.$route.query.id;
      httpGet("ADMINBRANCH", id).then(res => {
        if (!res) return;
        this.formData = res.data;
        this.extended = JSON.parse(res.data.extended);
      });
    },
    getBusiness (val) {
      let business = " ";
      switch (val) {
        case 'SELF':
          business = '蜜蜂购自营';
          break;
        case 'RENT':
          business = '租赁';
          break;
        case 'JOIN':
          business = '加盟';
          break;
        case 'UNION':
          business = '联盟';
          break;
        case 'PARTNERSHIP':
          PARTNERSHIP = '合伙';
          break;
        default:
          business = '';
          break
      }
      return business;
    },
    getStatus (val) {
      let status = " ";
      switch (val) {
        case 'AUDITING':
          status = '待审核';
          break;
        case 'PASS':
          status = '审核通过';
          break;
        case 'REVIEW':
          status = '待提交资料';
          break;
        case 'REJECT':
          status = '审核未通过';
          break;
        default:
          status = '';
          break
      }
      return status;
    },
    handleEditorContent (val) {
      this.formData.info = val;
    },
     back() {
      this.$router.go(-1);
    },
     brandAudit (id, status) {
      let isReason = "";
      if (this.reason) {
        isReason = `/${this.reason}`;
      }
      strPut("ADMINBRANCH", id + "/" + status + isReason).then(res => {
        if (!res) return;
        this.$message.success(res.message);
        this.dialogVisible = false;
        this.getDatail();
      });
    },
    brandAuditStatus (id, status) {
      this.id = id;
      this.status = status;
      if (status == "pass") {
        this.$confirm("同意该品牌入驻商场且品牌资料填写完整无误?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.brandAudit(id, status);
          })
          .catch(() => { });
      } else {
        this.dialogVisible = true;
      }
    },
    isConfirm () {
      if (!this.reason||/^\s*$/.test(this.reason)) {
        this.$message.warning("请输入拒绝原因");
        return;
      }
      this.brandAudit(this.id, this.status);
    }
  },
  mounted () {
    this.getDatail();
  }
}
</script>
<style lang="scss">
.wrap {
  background: #fff;
  padding: 20px 20px;
}
.rot_title {
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
.el-form {
  padding: 10px 30px;
}
.el-form h5 {
  padding: 5px;
  color: #000;
  font-weight: bold;
  border-left: 5px solid #409eff;
}
.el-form-item {
  margin: 0;
}
.m-title{
  font-size: 15px;
   color: #606266;
   font-weight: 700;
}
</style>