<template>
  <div class="warp">
    <div class="content-headerbox">
      <span>设置品牌资料</span>
      <span v-if="auditStatus=='REVIEW'"
            class="title green">待提交资料给平台审核</span>
      <span v-if="auditStatus=='AUDITING'"
            class="title green">审核中</span>
      <span v-if="auditStatus=='PASS'"
            class="title blue">审核通过</span>
      <div v-if="auditStatus=='REJECT'"
           class="title red">
        <span>审核不通过</span>
        <span v-if="contentData.rejectReason">, {{contentData.rejectReason}}</span>
      </div>
    </div>

    <div class="editbox"
         v-if="auditStatus=='REVIEW'">
      <span class="m-title"
            style="margin-top: 20px;">基本资料：</span>
      <el-form :model="ruleForm"
               ref="ruleForm"
               :rules="rules"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="品牌分类"
                      prop="categoryId">
          <!-- <el-input v-model="categoryName"
                    disabled
                    placeholder="请输入"
                    :maxlength="140"
                    style="width: 300px"></el-input> -->
          <el-select v-model="ruleForm.categoryId"
                     clearable
                     placeholder="请选择">
            <el-option clearable
                       v-for="item in topListData"
                       :key="item.id"
                       :label="item.categoryName"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="品牌名称"
                      prop="branchName">
          <el-input v-model="ruleForm.branchName"
                    disabled
                    placeholder="请输入"
                    :maxlength="140"
                    style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="店铺号"
                      prop="username">
          <el-input v-model="username"
                    disabled
                    placeholder="请输入"
                    :maxlength="140"
                    style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="联系人"
                      prop="extended.linkman">
          <el-input v-model="ruleForm.extended.linkman"
                    placeholder="请输入"
                    style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="联系电话"
                      prop="extended.phone">
          <el-input
                    v-model="ruleForm.extended.phone"
                    placeholder="请输入"
                    style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="品牌图"
                      prop="branchIconKey">
          <div class="addImg">
            <uploadOne :clear="clear"
                       :imgUrl.sync="imageUrl"
                       :isShowImg="true"
                       @upLoadSuccess="v=>{ruleForm.branchIconKey =v.fileKey}"></uploadOne>
          </div>
        </el-form-item>
        <el-form-item label="品牌位置"
                      prop="extended.address">
          <el-input v-model="ruleForm.extended.address"
                    placeholder="请输入"
                    style="width: 300px"></el-input>
        </el-form-item>

        <el-form-item label="今日活动"
                      prop="extended.todayActivity">
          <el-input v-model="ruleForm.extended.todayActivity"
                    placeholder="请输入"
                    style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="详情"
                      prop="info"
                      style="width: 1000px;padding-bottom: 50px;">
          <bgEditor :minHeight="300"
                    :content="ruleForm.info"
                    @editorData="handleEditorContent" />
        </el-form-item>
        <el-form-item label="品牌轮播图"
                      prop="imgKeys">
          <div class="album">
            <div class="addImg" v-for="(item,index) in imgKey" :key="index">
              <uploadOne :keyIndex="index" :clear="true" :isShowImg="true" :imgUrl.sync="item.fileUrl" @deleteImg="deleteFalseImg" @upLoadSuccess="upLoadSuccess"></uploadOne>
              <i class="el-icon-close deleteIcon" @click="deleteImg(index)"></i>
              <!-- <img class="delete"
                   @click="deleteImg(index)"
                   src="../../assets/images/x.png" />
              <img :src="item.fileUrl" /> -->
            </div>
            <div class="addImg"
                 v-show="imgKey.length<9">
              <uploadOne :clear="clear"
                         :isShowImg="false"
                         @upLoadSuccess="v=>{imgKey.push(v)}"></uploadOne>
            </div>
          </div>
        </el-form-item>
        <span class="m-title">证照信息：</span>
        <el-form-item label="企业名称"
                      style="margin-top: 20px;"
                      prop="extended.enterpriseName"
                      label-width="120px">
          <el-input v-model="ruleForm.extended.enterpriseName"
                    placeholder="请输入"
                    style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="营业执照注册号"
                      label-width="120px"
                      prop="extended.registrationNumber">
          <el-input v-model="ruleForm.extended.registrationNumber"
                    placeholder="请输入"
                    style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="企业类型"
                      label-width="120px"
                      prop="extended.firmType">
          <el-input v-model="ruleForm.extended.firmType"
                    placeholder="请输入"
                    style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="企业住所"
                      label-width="120px"
                      prop="extended.firmAddress">
          <el-input v-model="ruleForm.extended.firmAddress"
                    placeholder="请输入"
                    style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人"
                      label-width="120px"
                      prop="extended.representative">
          <el-input v-model="ruleForm.extended.representative"
                    placeholder="请输入"
                    style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="企业注册资金"
                      label-width="120px"
                      prop="extended.registerMoney">
          <el-input v-model="ruleForm.extended.registerMoney"
                    placeholder="请输入"
                    style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="成立日期"
                      label-width="120px"
                      prop="extended.registerDate">
          <el-date-picker v-model="ruleForm.extended.registerDate"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                          style="width: 300px">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="营业期限"
                      label-width="120px"
                      prop="extended.allottedDate">
          <el-date-picker v-model="ruleForm.extended.allottedDate"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                          style="width: 300px">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="经营范围"
                      label-width="120px"
                      prop="extended.manageScope">
          <el-input type="textarea"
                    rows="5"
                    maxlength="60"
                    v-model="ruleForm.extended.manageScope"
                    style="width: 250px"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="企业登记机关"
                      label-width="120px"
                      prop="extended.registry">
          <el-input v-model="ruleForm.extended.registry"
                    placeholder="请输入"
                    style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="营业执照"
                      prop="licenseKey"
                      label-width="120px">
          <div class="addImg">
            <uploadOne :clear="clear"
                       :imgUrl.sync="licenseUrl"
                       :isShowImg="true"
                       @upLoadSuccess="v=>{ruleForm.licenseKey =v.fileKey}"></uploadOne>
          </div>
        </el-form-item>
        <el-form-item style="margin-top:100px;">
          <el-button @click="backRemove">取消</el-button>
          <el-button type="primary"
                     @click="saveSumbit('ruleForm')">保 存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mallInfo"
         v-else>
      <el-button type="primary"
                 class="statusBtn"
                 @click="updateStatus">修改资料</el-button>
      <span class="m-title">基本资料：</span>
      <div class="flex">
        <span class="_title">品牌分类：</span>
        <span>{{contentData.categoryName}}</span>
      </div>
      <div class="flex">
        <span class="_title">品牌名称：</span>
        <span>{{contentData.branchName}}</span>
      </div>
      <div class="flex">
        <span class="_title">店铺名:</span>
        <span>{{contentData.username}}</span>
      </div>
      <div class="flex">
        <span class="_title">品牌图：</span>
        <img v-if="contentData"
             width="100px"
             :src='contentData.branchIcon&&contentData.branchIcon.imageUrl' />
      </div>
      <div class="flex">
        <span class="_title">品牌位置:</span>
        <span>{{extended.address}}</span>
      </div>
      <div class="flex">
        <span class="_title">今日活动:</span>
        <span>{{extended.todayActivity}}</span>
      </div>
      <div class="flex">
        <span class="_title">详情:</span>
        <div class="richText border-t-b"
             v-html="contentData.info"></div>
      </div>
      <div class="flex">
        <span class="_title">品牌轮播图：</span>
        <div v-if="contentData.branchImages"
             class="imgs">
          <img class="imgData"
               v-for="(i,key) in contentData.branchImages"
               :key="key"
               :src='i.imageUrl' />
        </div>
      </div>
      <span class="m-title">证照信息：</span>
      <div class="flex">
        <span class="_title">企业名称：</span>
        <span v-if="extended">{{extended.enterpriseName}}</span>
      </div>
      <div class="flex">
        <span class="_title">营业执照注册号：</span>
        <span v-if="extended">{{extended.registrationNumber}}</span>
      </div>
      <div class="flex">
        <span class="_title">企业类型：</span>
        <span v-if="extended">{{extended.firmType}}</span>
      </div>
      <div class="flex">
        <span class="_title">企业住所：</span>
        <span v-if="extended">{{extended.firmAddress}}</span>
      </div>
      <div class="flex">
        <span class="_title">法定代表人：</span>
        <span v-if="extended">{{extended.representative}}</span>
      </div>
      <div class="flex">
        <span class="_title">企业注册资金：</span>
        <span v-if="extended">{{extended.registerMoney}}</span>
      </div>
      <div class="flex">
        <span class="_title">成立日期：</span>
        <span v-if="extended">{{extended.registerDate}}</span>
      </div>
      <div class="flex">
        <span class="_title">营业期限：</span>
        <span v-if="extended">{{extended.allottedDate}}</span>
      </div>
      <div class="flex">
        <span class="_title">经营范围：</span>
        <span v-if="extended">{{extended.manageScope}}</span>
      </div>
      <div class="flex">
        <span class="_title">企业登记机关：</span>
        <span v-if="extended">{{extended.registry}}</span>
      </div>
      <div class="flex">
        <span class="_title">营业执照：</span>
        <img class="imgData"
             v-if="contentData.licenseKey"
             :src='contentData.license && contentData.license.imageUrl' />
      </div>
    </div>
  </div>
</template>

<script>
import { httpPost, httpGet, strGet, httpPut } from '@/util/post'
export default {
  data () {
    return {
      ruleForm: {
        branchName: "",//品牌名称
        categoryId: "",//品牌分类
        branchIconKey: "",//品牌图
        branchImageKeys: "",//品牌轮播图
        info: "",
        licenseKey: "",//营业执照key
        extended: {
          //扩展字段
          address: "", //品牌位置
          todayActivity: "",//今日活动         
          linkman: "",//联系人
          phone: "",//联系电话
          enterpriseName: "",//企业名称
          registrationNumber: "",//营业执照注册号
          firmType: "",//企业类型
          firmAddress: "",//企业住所
          representative: "",//法定代表人
          registerMoney: "",//企业注册资金
          registerDate: "",//成立时间
          allottedDate: "",//营业期限
          manageScope: "",//经营范围
          registry: "",//企业登记机关

        }
      },
      categoryName: "",//品牌分类名称
      username: "",//账号名
      imgKey: [], //图片key
      imgKeys: [],//多个图片key
      licenseUrl: "",
      detailContent: "", // 富文本内容
      editorOption: {}, // 富文本编辑器配置
      cid: "",
      imageUrl: "",
      clear: false,
      auditStatus: "", //审核状态
      contentData: "",
      topListData: [],//品牌分类
      extended: '',//拓展字段
      rules: {
        branchName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
        ],
        categoryId: [
          { required: true, message: '请选择分类', trigger: 'blur' },
        ],
        // username: [
        //   { required: true, message: '请输入店铺号', trigger: 'blur' },
        // ],
        'extended.phone': [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
        ],
        'extended.linkman': [
          { required: true, message: '请输入联系人', trigger: 'blur' },
        ],
        branchIconKey: [
          { required: true, message: '请选择品牌图', trigger: 'blur' },
        ],
        'extended.address': [
          { required: true, message: '请输入品牌位置', trigger: 'blur' },
        ],
        'extended.todayActivity': [
          { required: true, message: '请输入今日活动', trigger: 'blur' },
        ],
        info: [
          { required: true, message: '请输入详情', trigger: 'blur' },
        ],
        //   imgKeys: [
        //   { required: true, message: '请选择品牌轮播图', trigger: 'blur' }
        // ],
        'extended.enterpriseName': [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        'extended.registrationNumber': [
          { required: true, message: '请输入营业执照注册号', trigger: 'blur' }
        ],
        'extended.firmType': [
          { required: true, message: '请输入企业类型', trigger: 'blur' }
        ],
        'extended.firmAddress': [
          { required: true, message: '请输入企业住所', trigger: 'blur' }
        ],
        'extended.representative': [
          { required: true, message: '请输入法定代表人', trigger: 'blur' }
        ],
        'extended.registerMoney': [
          { required: true, message: '请输入企业注册资金', trigger: 'blur' }
        ],
        'extended.registerDate': [
          { required: true, message: '请选择成立日期', trigger: 'blur' }
        ],
        'extended.allottedDate': [
          { required: true, message: '请选择营业期限', trigger: 'blur' }
        ],
        'extended.manageScope': [
          { required: true, message: '请输入经营范围', trigger: 'blur' }
        ],
        'extended.registry': [
          { required: true, message: '请输入企业登录机关', trigger: 'blur' }
        ],
        licenseKey: [
          { required: true, message: '请选择营业执照', trigger: 'blur' }
        ]
      }
    };
  },
  components: {
    uploadOne: resolve => require(["../../components/upload/uploadOne"], resolve),
    bgEditor: resolve => require(["../../components/upload/bg-editor"], resolve)
  },
  created () {
    this.cid = this.$router.currentRoute.query.cid;
    this.detail();
    this.topList();
  },
  methods: {
    saveSumbit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.imgKeys = [];
          this.imgKey.forEach(e => {
            if(e.fileKey){
              this.imgKeys.push(e.fileKey);
            }
            
          })
          this.ruleForm.branchImageKeys = JSON.stringify(this.imgKeys).replace(/["\[\]]/g, "");
          if (
            !this.ruleForm.branchName ||
            !this.ruleForm.categoryId ||
            !this.ruleForm.branchIconKey ||
            !this.ruleForm.branchImageKeys ||
            !this.ruleForm.extended.address ||
            !this.ruleForm.extended.todayActivity ||
            !this.ruleForm.extended.linkman ||
            !this.ruleForm.extended.phone ||
            !this.ruleForm.info
          ) {
            this.$message.warning("请填写完整的品牌信息");
            return;
          }
          console.log(this.ruleForm);
          httpPut("BRANCHINFO", this.ruleForm).then(res => {
            if (!res) return;
            this.$message.success("保存成功");
            this.detail()
          });
        }
      })
    },
    upLoadSuccess(obj){
      if(obj.fileKey){
        this.imgKey[obj.index]=obj;
        this.imgKeys[obj.index]=obj;
      }
    },
    backRemove () {
      this.$router.go(-1);
    },
    // 富文本输入的内容
    handleEditorContent (val) {
      this.ruleForm.info = val;
    },
    deleteImg (index,item) {
      console.log(index,item)

      this.imgKey.splice(index, 1);
      this.imgKeys.splice(index, 1);
    },
    deleteFalseImg(index){
      this.imgKey.forEach((item,idx)=>{
        if(idx == index){
          item.fileKey='';
          item.fileUrl='';
        }
      })
      this.imgKeys.forEach((item,idx)=>{
        if(idx == index){
          item.fileKey='';
          item.fileUrl='';
        }
      })
    },
    // 品牌分类
    topList () {
      httpPost('TOP_LIST', {}).then(res => {
        if (res.code == 200) {
          this.topListData = res.data
        }
      })
    },
    detail () {
      strGet("BRANCHINFO").then(res => {
        this.imgKeys = [];
        this.imgKey = [];
        let data = res.data;
        this.auditStatus = data.auditStatus;
        this.categoryName = data.categoryName;
        this.ruleForm.branchName = data.branchName;
        this.username = data.username;
        this.contentData = res.data;
        if (data.extended) {
          this.extended = JSON.parse(data.extended);
          this.imageUrl = data.branchIcon && data.branchIcon.imageUrl;
          this.licenseUrl = data.license && data.license.imageUrl;
          this.ruleForm = {
            branchName: data.branchName,//品牌名称
            categoryId: data.categoryId,//品牌分类
            branchIconKey: data.branchIconKey,//品牌图
            branchImageKeys: data.branchImageKeys,
            licenseKey: data.licenseKey,//营业执照key
            info: data.info,
            extended: {
              //扩展字段
              address: this.extended.address, //品牌位置
              todayActivity: this.extended.todayActivity,//今日活动         
              linkman: this.extended.linkman,//联系人
              phone: this.extended.phone,//联系电话
              enterpriseName: this.extended.enterpriseName,//企业名称
              registrationNumber: this.extended.registrationNumber,//营业执照注册号
              firmType: this.extended.firmType,//企业类型
              firmAddress: this.extended.firmAddress,//企业住所
              representative: this.extended.representative,//法定代表人
              registerMoney: this.extended.registerMoney,//企业注册资金
              registerDate: this.extended.registerDate,//成立时间
              allottedDate: this.extended.allottedDate,//营业期限
              manageScope: this.extended.manageScope,//经营范围
              registry: this.extended.registry,//企业登记机关

            }
          }
        }
        data.branchImages.forEach(e => {
          this.imgKey.push({
            fileUrl: e.imageUrl,
            fileKey: e.imageKey
          })
        })
      });
    },
    updateStatus () {
      this.auditStatus = 'REVIEW'
    }
  }
};
</script>

<style scoped>
.el-upload__input {
  display: none !important;
}
.el-sup-row {
  display: flex;
  flex-wrap: wrap;
}
.title {
  font-size: 20px;
  margin-left: 120px;
}
.content-headerbox {
  display: flex;
  align-items: center;
}
.mallInfo .flex {
  margin: 20px 0;
}
.mallInfo .flex ._title {
  margin-right: 10px;
}
.mallInfo .richText {
  height: 400px;
  width: 800px;
  overflow: scroll;
  padding: 10px;
}
.statusBtn {
  position: absolute;
  left: 600px;
  top: 190px;
}
.note-editor.note-frame {
  width: 90%;
}
.border-t-b {
  border: 1px solid #eee;
}
.imgData {
  width: 130px;
  height: 130px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.m-title {
  font-size: 17px;
  color: #333;
  margin-top: 20px;
}
.mallInfo {
  padding-top: 20px;
}
</style>
