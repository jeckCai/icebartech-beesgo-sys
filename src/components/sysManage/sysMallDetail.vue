<template>
  <div class="wrap">
    <div class="flex space-between rot_title">
      <div>商场管理》商场详情</div>
      <el-button type="primary"
                 @click="back">返回</el-button>
    </div>
    <el-form ref="form"
             :model="formData"
             :rules="rules"
             label-width="120px">
      <h5>账户信息</h5>
      <el-form-item label="商场名:">
        <div v-html="formData.shopName"></div>
      </el-form-item>
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
      <h5>商场资料</h5>
      <span class="m-title">基本资料：</span>
      <el-form-item label="商场名:">
        <div v-html="formData.shopName"></div>
      </el-form-item>
      <el-form-item label="商场图:">
        <img width="150px"
             v-for="(item,index) in formData.image1s"
             :key="index"
             :src="item.imageUrl" />
      </el-form-item>
      <el-form-item label="商场编码:">
        <div v-html="formData.shopCode"></div>
      </el-form-item>
      <el-form-item label="经营方式:">
        <div v-html="getBusiness(formData.business)"></div>
      </el-form-item>
      <el-form-item label="商场合同号:">
        <div v-html="extended.contractNo"></div>
      </el-form-item>
      <el-form-item label="商场地址:">
        <div v-if="extended"
             v-html="extended.areaProvince+extended.areaCity+extended.areaDistrict+extended.address"></div>
      </el-form-item>
      <el-form-item label="商场电话:">
        <div v-html="formData.phone"></div>
      </el-form-item>
      <el-form-item label="商场主页:">
        <div style="width: 400px;"
             v-html="formData.info"></div>
      </el-form-item>
      <el-form-item label="商场介绍:">
        <div class="flex">
          <img width="150px"
               class="right-btn"
               v-for="(item,index) in formData.image2s"
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
        <img width="150px"
             :src="formData.license.imageUrl" />
      </el-form-item>
      <h5>商场操作</h5>
      <el-form-item label="商场状态:">
        <span style="display:inline-block;width:100px"
              v-html="getStatus(formData.auditStatus)"></span>
        <el-button size="mini"
                   type="primary"
                   v-if="formData.auditStatus=='AUDITING'&&isLook"
                   @click="shopAuditStatus(formData.id,'pass')">同意</el-button>
        <el-button size="mini"
                   type="danger"
                   v-if="formData.auditStatus=='AUDITING'&&isLook"
                   @click="shopAuditStatus(formData.id,'reject')">拒绝</el-button>
      </el-form-item>
      <el-form-item v-if="formData.auditStatus=='REJECT'"
                    label="原因:">
        <div v-html="formData.rejectReason"></div>
      </el-form-item>
      <h5>品牌信息</h5>
      <template>
        <el-table border
                  :data="tableData"
                  style="width: 800px">
          <el-table-column prop="categoryName"
                           label="品牌分类">
          </el-table-column>
          <el-table-column prop="branchName"
                           label="品牌名称">
          </el-table-column>
        </el-table>
      </template>
      <div class="pagination"
           style="width:800px;">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[10,20,30,40]"
                       layout="total, sizes, prev, pager, next,jumper"
                       :total="pageCount"></el-pagination>
      </div>
    </el-form>
    <!-- 审核拒绝dialog -->
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="500px">
      <el-form ref="diaForm"
               :model="diaForm"
               :rules="diaRules"
               label-width="100px">
        <el-form-item label="拒绝原因"
                      prop="reason">
          <el-input type="textarea"
                    rows="5"
                    maxlength="60"
                    v-model="diaForm.reason"
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
        password: ""
      },
      isEditPwd: false,
      diaForm: {
        reason: "", //审核理由
      },
      diaRules: {
        reason: [
          { required: true, message: '请输入拒绝原因', trigger: 'blur' },
        ]
      },
      rules: {
        formData: {
          password: [
            { required: true, message: '请输入登陆密码 ', trigger: 'blur' },
            { min: "6", message: '密码最小为6位', trigger: 'blur' }
          ]
        }
      },
      tableData: [],
      isLook: ""//是否是查看
    }
  },
  components: {
    bgEditor: resolve => require(["../upload/bg-editor"], resolve),
  },
  created () {
    this.isLook = this.$router.currentRoute.query.isLook;
  },
  methods: {
    // 获取商场详情
    getDatail () {
      let id = this.$route.query.id;
      httpGet("SHOP", id).then(res => {
        if (!res) return;
        this.formData = res.data;
        this.extended = JSON.parse(res.data.extended);
      });
    },
    // 获取商场品牌列表
    getBrandList () {
      let id = this.$route.query.id;
      let params = {
        shopId: id
      }
      httpPost("BRANDLIST", params).then(res => {
        if (!res) return;
        this.tableData = res.data;
        this.pageCount = res.pageCount
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
          business = '合伙';
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
    // 同意审核
    shopAuditStatus (id, status) {
      if (status == "pass") {
        this.$confirm("同意该商场入驻平台且商场资料填写完整无误?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            strPut("SHOP", id + "/pass").then(res => {
              if (!res) return;
              this.$message.success(res.message);
              this.dialogVisible = false;
              this.getDatail();
            });
          })
          .catch(() => { });
      } else {
        this.dialogVisible = true;
      }
    },
    // 拒绝审核
    shopAudit (id, status) {
      let isReason = "";
      if (this.diaForm.reason) {
        isReason = `/${this.diaForm.reason}`;
      }
      strPut("SHOP", id + "/reject" + isReason).then(res => {
        if (!res) return;
        this.$message.success(res.message);
        this.dialogVisible = false;
        this.getDatail();
      });
    },
    isConfirm (formName) {
      if (!this.diaForm.reason || /^\s*$/.test(this.diaForm.reason)) {
        this.$message.warning("请输入拒绝原因");
        return;
      }
      this.shopAudit(this.formData.id, this.formData.auditStatus);

    },
    handleEditorContent (val) {
      this.formData.info = val;
    },
    handleSizeChange (val) {
      this.pageSize = val;
      this.getBrandList();
    },
    handleCurrentChange (val) {
      this.pageIndex = val;
      this.getBrandList();
    },
    back () {
      this.$router.go(-1);
    }
  },
  mounted () {
    this.getDatail();
    this.getBrandList();
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
img {
  max-width: 100%;
  margin-bottom: 10px;
}
.m-title{
  font-size: 15px;
   color: #606266;
   font-weight: 700;
}
</style>