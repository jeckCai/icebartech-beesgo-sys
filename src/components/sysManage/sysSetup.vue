<template>
  <div class="content-list">
    <!-- 面包屑 -->
    <el-breadcrumb separator="》">
      <el-breadcrumb-item :to="{ path: '/' }">系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">使用条款和营私协议</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 选项卡 -->
    <el-tabs class="tab" v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="使用条款和隐私协议" name="first">
        <el-form
          :model="agreement"
          :rules="agreementRules"
          ref="agreement"
          :label-width="labelWidth"
          class="demo-ruleForm"
        >
          <el-form-item label="用户端" prop="user" style="width: 1000px;padding-bottom: 20px;">
            <bgEditor
              :id="agreement.summernote1"
              :minHeight="200"
              :content="agreement.user"
              @editorData="handleEditorContent1"
            />
          </el-form-item>
          <el-form-item label="蜜蜂端" prop="bee" style="width: 1000px;padding-bottom: 20px;">
            <bgEditor
              :id="agreement.summernote2"
              :minHeight="200"
              :content="agreement.bee"
              @editorData="handleEditorContent2"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('agreement')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="引导页" name="second">
        <el-form
          ref="startPage"
          :label-width="labelWidth"
          class="demo-ruleForm"
        >
          <el-form-item label="引导页" prop="startPageimageUrls">
            <div class="showImg" v-show="startPageimageUrls.length>0">
              <div class="showImg_item" :key="index" v-for="(item,index) in startPageimageUrls">
                <img :src="item.imageUrl" />
                <i class="el-icon-close" @click="startPageimageUrls.splice(index,1)"></i>
              </div>
            </div>
            <div class="addImg">
              <uploadOne :clear="false" :isShowImg="false" @upLoadSuccess="e=>startPageimageUrls.push({imageKey:e.fileKey, imageUrl:e.fileUrl})"></uploadOne>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('startPage')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="设置会员" name="third">
        <el-form
          :model="menberSet"
          :rules="menberSetRules"
          ref="menberSet"
          :label-width="labelWidth"
          class="demo-ruleForm"
        >
          <el-form-item label="会员权益图" prop="imageUrl">
            <div class="addImg">
              <uploadOne
                :clear="menberSet.clear"
                :imgUrl.sync="menberSet.imageUrl"
                :isShowImg="true"
                @upLoadSuccess="
                  v => {
                    menberSet.image1sKey = v;
                  }
                "
              ></uploadOne>
            </div>
          </el-form-item>
          <el-form-item label="年卡价格" prop="cardPrice">
            <el-input style="width:200px;" v-model="menberSet.cardPrice"></el-input>
          </el-form-item>
          <el-form-item label="是否免费试用" prop="isfree">
            <el-switch v-model="menberSet.isfree"></el-switch>
          </el-form-item>
          <el-form-item label="会员权益" prop="rights" style="width: 1000px;padding-bottom: 50px;">
            <bgEditor
              :minHeight="300"
              :content="menberSet.rights"
              @editorData="handleEditorContent3"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('menberSet')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="APP更新" name="fourth">
        <el-row>
          <el-col :span="12">
            <el-form
              :model="appRefreshAndorid"
              :rules="appRefreshRulesAndorid"
              ref="appRefreshAndorid"
              :label-width="labelWidth"
              class="demo-ruleForm"
            >
              <el-form-item label="版本号" prop="version">
                <el-input
                  style="width:200px;"
                  v-model="appRefreshAndorid.version"
                  placeholder="版本号"
                ></el-input>
              </el-form-item>
              <el-form-item label="apk" prop="apk">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-change="apkUpload"
                  :auto-upload="false"
                >
                  <el-button slot="trigger" size="small" type="primary">上传到服务器</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="下载链接" prop="downLoad">
                <a type="primary" :href="downLoad" name="download"> {{downLoad}}</a>
              </el-form-item>
              <el-form-item label="是否强制更新" prop="isRefresh">
                <el-switch v-model="appRefreshAndorid.isRefresh"></el-switch>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('appRefreshAndorid')">保存</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <el-form
              :model="appRefreshIos"
              :rules="appRefreshRulesIos"
              ref="appRefreshIos"
              :label-width="labelWidth"
              class="demo-ruleForm"
            >
              <el-form-item label="版本号" prop="version">
                <el-input style="width:200px;" v-model="appRefreshIos.version" placeholder="版本号"></el-input>
              </el-form-item>
              <el-form-item label="是否强制更新" prop="isRefresh">
                <el-switch v-model="appRefreshIos.isRefresh"></el-switch>
              </el-form-item>
               <el-form-item label="下载链接" prop="uploadAddress">
                <el-input type="string" v-model="appRefreshIos.uploadAddress"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('appRefreshIos')">保存</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="订单超时" name="fivth">
        <el-form
          :model="orderSet"
          :rules="orderSetRules"
          ref="orderSet"
          :label-width="labelWidth"
          class="demo-ruleForm"
        >
          <el-form-item label="订单超时取消" prop="outTime">
            <el-input-number v-model="orderSet.outTime"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="setCancelTime()">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="推广" name="sixth">
        <el-form
          :model="spread"
          :rules="spreadRules"
          ref="spread"
          :label-width="labelWidth"
          class="demo-ruleForm"
        >
          <el-form-item label="推广图" prop="imageKey">
            <div class="addImg">
              <uploadOne
                :clear="spread.clear"
                :imgUrl.sync="spread.imageUrl"
                :isShowImg="true"
                @upLoadSuccess="
                  v => {
                    spread.imageKey = v;
                  }
                "
              ></uploadOne>
            </div>
          </el-form-item>
          <el-form-item label="是否启用" prop="isUse">
            <el-switch v-model="spread.isUse"></el-switch>
          </el-form-item>
          <el-form-item label="推广链接" prop="url">
            <el-input style="width:500px" v-model="spread.url"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('spread')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {
  httpPost,
  formPost,
  httpGet,
  formGet,
  formPut,
  httpPut
} from "../../util/post";
import axios from "axios";
export default {
  data() {
    return {
      labelWidth: "150px",
      activeName: "first",
      agreement: {
        user: "",
        bee: "",
        summernote1: "summernote1",
        summernote2: "summernote2"
      },
      startPageimageUrls:[],
      menberSet: {
        clear: false,
        imageUrl: "",
        image1sKey: "",
        cardPrice: "",
        isfree: false,
        rights: ""
      },
      appRefreshAndorid: {
        isRefresh: false,
        version: "",
        apk: ""
      },
      downLoad:"", //app 下载地址
      appRefreshIos: {
        isRefresh: false,
        version: "",
        uploadAddress:""
      },
      orderSet: {
        outTime: ""
      },
      spread: {
        clear: false,
        imageUrl: "",
        imageKey: "",
        isUse: false,
        url:"",
      },
      agreementRules: {
        user: [
          {
            required: true,
            message: "请输入使用条款和隐私协议",
            trigger: "blur"
          }
        ],
        bee: [
          {
            required: true,
            message: "请输入使用条款和隐私协议",
            trigger: "blur"
          }
        ]
      },
      menberSetRules: {
        imageUrl: [
          { required: true, message: "请上传会员权益图", trigger: "blur" }
        ],
        cardPrice: [
          { required: true, message: "请输入年卡价格", trigger: "blur" }
        ],
        isfree: [
          { required: true, message: "请选择是否免费试用", trigger: "blur" }
        ],
        rights: [{ required: true, message: "请输入会员权益", trigger: "blur" }]
      },
      appRefreshRulesAndorid: {
        version: [
          { required: true, message: "请输入安卓版本号", trigger: "blur" }
        ],
        // ios: [{ required: true, message: "请输入ios版本号", trigger: "blur" }],
        isRefresh: [
          { required: true, message: "请选择是否强制更新", trigger: "blur" }
        ],
        apk: [{ required: true, message: "请上传apk ", trigger: "blur" }]
      },
      appRefreshRulesIos: {
        version: [
          { required: true, message: "请输入IOS版本号", trigger: "blur" }
        ],
        // ios: [{ required: true, message: "请输入ios版本号", trigger: "blur" }],
        isRefresh: [
          { required: true, message: "请选择是否强制更新", trigger: "blur" }
        ],
        uploadAddress:[
          { required: true, message: "请输入下载链接", trigger: "blur" }
        ]
      },
      orderSetRules: {
        outTime: [
          { required: true, message: "请输入订单超时取消时间", trigger: "blur" }
        ]
      },
      spreadRules: {
        imageUrl: [
          {
            required: true,
            message: "请输入使用条款和隐私协议",
            trigger: "blur"
          }
        ],
        isUse: [
          {
            required: true,
            message: "请输入使用条款和隐私协议",
            trigger: "blur"
          }
        ],
        url:[
           {
            required: true,
            message: "请输入推广链接",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    uploadOne: resolve => require(["../upload/uploadOne"], resolve),
    bgEditor: resolve => require(["../upload/bg-editor"], resolve)
  },
  beforeMount() {
    this.getUserAgreement();
    this.getBeesAgreement();
   
    
  },
  methods: {
    handleClick(tab, event) {
      let name = tab.name;
      switch (name) {
        case "second":
          this.getStartPage();
          break;
        case "sixth":
          this.getSpread();
          break;
        case "fourth":
          this.getAppInfo();
          this.getAppAdderss();
          break;
        case 'fivth':
          this.getCancelTime();
        default:
          break;
      }
      console.log(tab, event);
    },
    handleEditorContent1(val) {
      this.agreement.user = val;
    },
    handleEditorContent2(val) {
      this.agreement.bee = val;
    },
    handleEditorContent3(val) {
      this.menberSet.rights = val;
    },
    // 推广
    getSpread() {
      httpGet("BEESPROPAGATEPIC").then(rps => {
        if (rps.code === 200) {
          this.spread = {
            isUse: rps.data.isUse,
            imageUrl: rps.data.fileUrl,
            url:rps.data.url,
            imageKey: {
              fileKey: rps.data.fileKey,
              fileUrl: rps.data.fileUrl
            }
          };
        }
      });
      // axios
      //   .get("http://192.168.1.152:60831/admin/sys_var/propagate_pic")
      //   .then(rps => {
      //     let data = rps.data.data;
      //     this.spread = {
      //       isUse: data.isUse,
      //       imageUrl: data.fileUrl,
      //       imageKey: {
      //         fileKey: data.fileKey,
      //         fileUrl: data.fileUrl
      //       }
      //     };
      //   });
    },
    putSpread(params) {
      let parmes = {
        isUse: params.isUse,
        fileKey: params.imageKey.fileKey,
        fileUrl: params.imageKey.fileUrl,
        url:params.url,
      };
      httpPut("BEESPROPAGATEPIC", { value: parmes }).then(rps => {});
      // axios.put("http://192.168.1.152:60831/admin/sys_var/propagate_pic", {
      //   value: parmes
      // });
    },
    // 启动页
    getStartPage() {
      let _this = this;
      httpGet("BEESSTARTPAGE").then(rps => {
        if (rps.code === 200) {
          _this.startPageimageUrls = rps.data;
        }
      });
    },
    putStartPage() {
      httpPut("BEESSTARTPAGE", { value: this.startPageimageUrls }).then(
        rps => {}
      );
    },
    handlePreview(uploadUrl, file) {
      this.http
        .put(uploadUrl, file.raw, {
          headers: {
            "Content-Type":"application/vnd.android.package-archive"
          }
        })
        .then(rps => {
          console.log("ok");
        });
    },
    apkUpload(file) {
      let _this = this;
      formPost("PUBLICFORMUPLOAD", {
        suffix: 'apk',
        contentType: "application/vnd.android.package-archive"
      })
        .then(result => {
          _this.$nextTick(() => {
            _this.appRefreshAndorid.apk = result.data.fileKey;
            _this.downLoad = result.data.fileUrl;
          });
          _this.handlePreview(result.data.uploadUrl, file);
        })
        .catch(err => {});
    },
    // 提价表单
    submitForm(tab) {
      let params = {};
      let httpUrl = "";
      this.$refs[tab].validate(valid => {
        if (valid) {
          switch (tab) {
            case "agreement":
              params = this.agreement;
              this.beesAgreement(params.bee);
              this.userAgreement(params.user);
              break;
            case "startPage":
              this.putStartPage();
              break;
            case "menberSet":
              params = this.menberSet;
              break;
            case "orderSet":
              params = this.orderSet;
              break;
            case "appRefreshIos":
              params = this.appRefreshIos;
              this.upDateAppInfo(true, params);
              break;
            case "appRefreshAndorid":
              params = this.appRefreshAndorid;
              this.upDateAppInfo(false, params);
              break;
            case "spread":
              params = this.spread;
              this.putSpread(params);
              break;
            default:
              params = {};
              break;
          }

          console.log("提交的数据=", params);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      if(tab ==='startPage'){
        this.putStartPage();
      }
    },

    // 蜜蜂端用户协议
    beesAgreement(param) {
      let params = {
        value: param
      };
      httpPut("BEESAGREEMENT", params).then(res => {
        if (!res) return;
        this.$message.success("设置成功");
      });
    },
    // 用户端协议
    userAgreement(param) {
      let params = {
        value: param
      };
      httpPut("USERAGREEMENT", params).then(res => {
        if (!res) return;
        this.$message.success("设置成功");
      });
    },
    // 获取用户协议
    getUserAgreement() {
      formGet("USERAGREEMENT").then(res => {
        if (!res) return;
        if (res.data != "没有设置用户协议") {
          this.agreement.user = res.data;
        }
      });
    },
    // 获取蜜蜂协议
    getBeesAgreement() {
      formGet("BEESAGREEMENT").then(res => {
        if (!res) return;
        if (res.data != "没有设置蜜蜂端用户协议") {
          this.agreement.bee = res.data;
        }
      });
    },
    // 获取app更新信息
    getAppInfo() {
      httpGet("GETAPPUPDATEIOS").then(res => {
        this.appRefreshIos = {
          version: res.data.version,
          isRefresh: res.data.forciblyDownload === "n" ? false : true,
          uploadAddress: res.data.uploadAddress,
        };
      });
      httpGet("GETAPPUPDATEANDROID").then(res => {
        this.appRefreshAndorid = {
          version: res.data.version,
          apk: res.data.androidApkKey,
          isRefresh: res.data.forciblyDownload === "n" ? false : true
        };
      });
    },
    // 保存app更新信息
    upDateAppInfo(type, parmes) {
      let request = "PUTAPPUPDATEANDROID";
      let params = {
        androidApkKey: parmes.apk,
        appType: "android",
        forciblyDownload: parmes.isRefresh ? "y" : "n",
        version: parmes.version,
      
      };
      if (type) {
        request = "PUTAPPUPDATEIOS";
        params.appType = 'IOS';
        params.uploadAddress = parmes.uploadAddress;
      }else{
        params.androidDownload=this.downLoad;
      }
      // axios.put('http://192.168.1.152:60831/admin/sys_var/android_version_update',params).then(rps=>console.log(rps))
      httpPut(request, params).then(rps => {
        if (rps.code === 200) {
        }
      });
    },
    // 获取app下载地址
    getAppAdderss() {
      let that = this;
      // axios.get('http://192.168.1.152:60831/admin/sys_var/android_download_url').then(rps=>{that.downLoad = res.data;})
      
      httpGet("GETAPPADDERSS").then(res => {
        if (res.code === 200) {
          that.downLoad = res.data;
        }
      });
    },
    // 获取订单超时时间
    getCancelTime(){
       httpGet("GETCANCELTIME").then(res => {
        if (res.code === 200) {
            this.orderSet.outTime = res.data.outTimeMinute;
        }
      });
    },
     // 设置订单超时时间
    setCancelTime(){
       this.orderSet.outTime = this.orderSet.outTime?this.orderSet.outTime:30;
       httpGet("UPDATECANCELTIME",this.orderSet.outTime).then(res => {
        if (res.code === 200) {
             this.$message.success("设置成功");
        }
      });
    },
  }
};
</script>
<style lang="scss">
.el-tabs,
.el-breadcrumb {
  padding: 20px;
  background: #fff;
  margin-bottom: 20px;
}
.el-upload__input {
  display: none !important;
}
.el-sup-row {
  display: flex;
  flex-wrap: wrap;
}
.showImg {
  .showImg_item {
    display: inline-block;
    width: 110px;
    height: 100px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      padding: 5px;
      display: inline-block;
    }
    i {
      position: absolute;
      right: 5px;
      top: 5px;
      font-size: 15px;
      cursor: pointer;
      &:hover {
        font-size: 20px;
      }
    }
  }
}
</style>
