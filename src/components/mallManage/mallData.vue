<template>
  <div class="warp">
    <div class="content-headerbox">
      <span>设置商场资料</span>
      <span v-if="auditStatus == 'REVIEW'" class="title green"
        >待提交资料给平台审核</span
      >
      <span v-if="auditStatus == 'AUDITING'" class="title green">审核中</span>
      <span v-if="auditStatus == 'PASS'" class="title blue">审核通过</span>
      <div v-if="auditStatus == 'REJECT'" class="title red">
        <span>审核不通过</span>
        <span>,{{ contentData.rejectReason }}</span>
      </div>
    </div>

    <div class="editbox" v-if="auditStatus == 'REVIEW'">
      <span class="m-title" style="margin-top: 20px;">基本资料：</span>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        :label-position="labelPosition"
        class="demo-ruleForm"
      >
        <el-form-item label="商场名" prop="extended.shopName">
          <el-input
            disabled
            v-model="ruleForm.extended.shopName"
            placeholder="请输入"
            :maxlength="140"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="商场图" prop="image1sKey">
          <div class="addImg">
            <uploadOne
              :clear="clear"
              :imgUrl.sync="imageUrl"
              :isShowImg="true"
              @upLoadSuccess="
                v => {
                  ruleForm.image1sKey = v.fileKey;
                }
              "
            ></uploadOne>
          </div>
        </el-form-item>
        <el-form-item label="商场编码" prop="shopNo">
          <el-input
            disabled
            v-model="ruleForm.shopNo"
            placeholder="请输入"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="经营方式" prop="business">
          <el-select
            style="margin-left: 10px;margin-top: 10px"
            v-model="ruleForm.business"
            placeholder="请选择"
            clearable
          >
            <el-option label="请选择" value></el-option>
            <el-option label="蜜蜂购自营" value="SELF"></el-option>
            <el-option label="租赁" value="RENT"></el-option>
            <el-option label="加盟" value="JOIN"></el-option>
            <el-option label="联盟" value="UNION"></el-option>
            <el-option label="合伙" value="PARTNERSHIP"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商场合同号" prop="extended.contractNo">
          <el-input
            v-model="ruleForm.extended.contractNo"
            placeholder="请输入"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="商场地址" class="areaRow" prop="extended.address">
          <el-select
            v-model="areaProvince"
            clearable
            placeholder="请选择省"
            @change="selectGetProvince"
          >
            <el-option
              clearable
              v-for="item in areaNameData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="areaCity"
            clearable
            placeholder="请选择市"
            @change="selectGetCities"
          >
            <el-option
              clearable
              v-for="item in cityNameData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="areaDistrict"
            clearable
            placeholder="请选择区"
            @change="selectGetArea"
          >
            <el-option
              clearable
              v-for="item in districtNameData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-input
            v-model="ruleForm.extended.address"
            style="width: 250px"
            placeholder="请输入详细地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="商场电话" prop="phone">
          <el-input
            v-model="ruleForm.phone"
            placeholder="请输入"
            type="number"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="商场主页" prop="info" style="width: 1000px;">
          <bgEditor
            :minHeight="500"
            :content="ruleForm.info"
            @editorData="handleEditorContent"
          />
        </el-form-item>
        <el-form-item label="商场轮播图" prop="imgKey">
          <div class="album">
            <div class="addImg" v-for="(item,index) in imgKey" :key="index">
              <uploadOne :clear="false"  :keyIndex="index" :isShowImg="true" :imgUrl.sync="item.fileUrl" @deleteImg="deleteFalseImg" @upLoadSuccess="upLoadSuccess"></uploadOne>
              <i class="el-icon-close deleteIcon" @click="deleteImg(index)"></i>
            </div>
            <!-- <div class="addImg" v-for="(item, index) in imgKey" :key="index">
              <img
                class="delete"
                @click="deleteImg(index)"
                src="../../assets/images/x.png"
              />
              <img :src="item.fileUrl" />
            </div> -->
            <div class="addImg" v-show="imgKey.length < 9">
              <uploadOne
                :clear="clear"
                :isShowImg="false"
                @upLoadSuccess="
                  v => {
                    imgKey.push(v);
                  }
                "
              ></uploadOne>
            </div>
          </div>
        </el-form-item>
        <span class="m-title">证照信息：</span>
        <el-form-item
          label="企业名称"
          style="margin-top: 20px;"
          prop="extended.enterpriseName"
          label-width="120px"
        >
          <el-input
            v-model="ruleForm.extended.enterpriseName"
            placeholder="请输入"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="营业执照注册号"
          label-width="120px"
          prop="extended.registrationNumber"
        >
          <el-input
            v-model="ruleForm.extended.registrationNumber"
            placeholder="请输入"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="企业类型"
          label-width="120px"
          prop="extended.firmType"
        >
          <el-input
            v-model="ruleForm.extended.firmType"
            placeholder="请输入"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="企业住所"
          label-width="120px"
          prop="extended.firmAddress"
        >
          <el-input
            v-model="ruleForm.extended.firmAddress"
            placeholder="请输入"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="法定代表人"
          label-width="120px"
          prop="extended.representative"
        >
          <el-input
            v-model="ruleForm.extended.representative"
            placeholder="请输入"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="企业注册资金"
          label-width="120px"
          prop="extended.registerMoney"
        >
          <el-input
            v-model="ruleForm.extended.registerMoney"
            placeholder="请输入"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="成立日期"
          label-width="120px"
          prop="extended.registerDate"
        >
          <el-date-picker
            v-model="ruleForm.extended.registerDate"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            style="width: 300px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="营业期限"
          label-width="120px"
          prop="extended.allottedDate"
        >
          <el-date-picker
            v-model="ruleForm.extended.allottedDate"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            style="width: 300px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="经营范围"
          label-width="120px"
          prop="extended.manageScope"
        >
          <el-input
            type="textarea"
            rows="5"
            maxlength="60"
            v-model="ruleForm.extended.manageScope"
            style="width: 250px"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="企业登记机关"
          label-width="120px"
          prop="extended.registry"
        >
          <el-input
            v-model="ruleForm.extended.registry"
            placeholder="请输入"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="营业执照" prop="licenseKey" label-width="120px">
          <div class="addImg">
            <uploadOne
              :clear="clear"
              :imgUrl.sync="licenseUrl"
              :isShowImg="true"
              @upLoadSuccess="
                v => {
                  ruleForm.licenseKey = v.fileKey;
                }
              "
            ></uploadOne>
          </div>
        </el-form-item>
        <el-form-item style="margin-top:100px;">
          <el-button @click="backRemove">取消</el-button>
          <el-button type="primary" @click="saveSumbit('ruleForm')"
            >保 存</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="mallInfo" v-else>
      <el-button v-if="this.$store.state.resourceCodeList.indexOf('mall:data:update')>=0" type="primary" class="statusBtn" @click="updateStatus"
        >修改资料</el-button
      >
      <span class="m-title">基本资料：</span>
      <div class="flex">
        <span class="_title">商场名：</span>
        <span>{{ contentData.shopName }}</span>
      </div>
      <div class="flex">
        <span class="_title">商场图：</span>
        <img
          class="imgData"
          v-if="contentData.image1s"
          :src="contentData.image1s[0].imageUrl"
        />
      </div>
      <div class="flex">
        <span class="_title">商场编号：</span>
        <span>{{ contentData.shopCode }}</span>
      </div>
      <div class="flex">
        <span class="_title">经营方式：</span>
        <span v-if="contentData.business == 'SELF'">蜜蜂购自营</span>
        <span v-if="contentData.business == 'RENT'">租赁</span>
        <span v-if="contentData.business == 'JOIN'">加盟</span>
        <span v-if="contentData.business == 'UNION'">连盟</span>
        <span v-if="contentData.business == 'PARTNERSHIP'">合伙</span>
      </div>
      <div class="flex">
        <span class="_title">商场合同号：</span>
        <span v-if="extended">{{ extended.contractNo }}</span>
      </div>
      <div class="flex">
        <span class="_title">商场地址：</span>
        <span v-if="extended"
          >{{ extended.areaProvince }}{{ extended.areaCity
          }}{{ extended.areaDistrict }}{{ extended.address }}</span
        >
      </div>
      <div class="flex">
        <span class="_title">商场电话：</span>
        <span>{{ contentData.phone }}</span>
      </div>
      <div class="flex">
        <span class="_title">商场主页：</span>
        <div
          class="richText border-t-b"
          v-if="contentData.info"
          v-html="contentData.info"
        ></div>
      </div>
      <div class="flex">
        <span class="_title">商场轮播图：</span>
        <div v-if="contentData.image2s" class="imgs">
          <img
            class="imgData"
            v-for="(i, key) in contentData.image2s"
            :key="key"
            :src="i.imageUrl"
          />
        </div>
      </div>
      <span class="m-title">证照信息：</span>
      <div class="flex">
        <span class="_title">企业名称：</span>
        <span v-if="extended">{{ extended.enterpriseName }}</span>
      </div>
      <div class="flex">
        <span class="_title">营业执照注册号：</span>
        <span v-if="extended">{{ extended.registrationNumber }}</span>
      </div>
      <div class="flex">
        <span class="_title">企业类型：</span>
        <span v-if="extended">{{ extended.firmType }}</span>
      </div>
      <div class="flex">
        <span class="_title">企业住所：</span>
        <span v-if="extended">{{ extended.firmAddress }}</span>
      </div>
      <div class="flex">
        <span class="_title">法定代表人：</span>
        <span v-if="extended">{{ extended.representative }}</span>
      </div>
      <div class="flex">
        <span class="_title">企业注册资金：</span>
        <span v-if="extended">{{ extended.registerMoney }}</span>
      </div>
      <div class="flex">
        <span class="_title">成立日期：</span>
        <span v-if="extended">{{ extended.registerDate }}</span>
      </div>
      <div class="flex">
        <span class="_title">营业期限：</span>
        <span v-if="extended">{{ extended.allottedDate }}</span>
      </div>
      <div class="flex">
        <span class="_title">经营范围：</span>
        <span v-if="extended">{{ extended.manageScope }}</span>
      </div>
      <div class="flex">
        <span class="_title">企业登记机关：</span>
        <span v-if="extended">{{ extended.registry }}</span>
      </div>
      <div class="flex">
        <span class="_title">营业执照：</span>
        <img
          class="imgData"
          v-if="contentData.licenseKey"
          :src="contentData.license.imageUrl"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  httpPost,
  formPost,
  httpPut,
  httpGet,
  formGet,
  strGet
} from "../../util/post";
export default {
  data() {
    var checkphone = (rule, value, callback) => {
      // let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
      if (value == "") {
        callback(new Error("请输入手机号"));
      } else if (!this.isCellPhone(value)) {
        //引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的手机号!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        image1sKey: "", //商场图key
        image2sKey: "", //商场详情图key列表
        business: "", //经营方式
        shopNo: "", //商场编号
        phone: "", //商场电话
        info: "",
        licenseKey: "", //营业执照key
        extended: {
          //扩展字段
          shopName: "", //商场名
          areaProvince: "", //省
          areaCity: "", //市
          areaDistrict: "", //区
          address: "",
          lat:"",
          lng:"",
          contractNo: "", //商场合同号
          enterpriseName: "", //企业名称
          registrationNumber: "", //营业执照注册号
          firmType: "", //企业类型
          firmAddress: "", //企业住所
          representative: "", //法定代表人
          registerMoney: "", //企业注册资金
          registerDate: "", //成立时间
          allottedDate: "", //营业期限
          manageScope: "", //经营范围
          registry: "" //企业登记机关
        }
      },
      imgKey: [], //单个图片key
      imgKeys: [], //多个图片key
      cid: "",
      imageUrl: "",
      licenseUrl: "",
      clear: false,
      detailContent: "", // 富文本内容
      editorOption: {}, // 富文本编辑器配置
      areaNameData: [], //省份列表
      cityNameData: [], //市列表
      districtNameData: [], //区列表
      areaProvince: "", //省
      areaCity: "", //市
      areaDistrict: "", //区
      auditStatus: "", //审核状态
      contentData: "",
      labelPosition: "left", //对其方式
      extended: "", //拓展字段
      rules: {
        "extended.shopName": [
          { required: true, message: "请输入商场名称", trigger: "blur" }
        ],
        image1sKey: [
          { required: true, message: "请选择商场图", trigger: "blur" }
        ],
        shopNo: [
          { required: true, message: "请输入商场编码", trigger: "blur" }
        ],
        business: [
          { required: true, message: "请选择经营方式", trigger: "blur" }
        ],
        "extended.contractNo": [
          { required: true, message: "请输入商场合同号", trigger: "blur" }
        ],
        "extended.address": [
          { required: true, message: "请选择商场地址", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入商场电话", trigger: "blur" }],
        info: [
          { required: true, message: "请输入商场主页内容", trigger: "blur" }
        ],
        imgKey: [
          { required: false, message: "请选择商场轮播图", trigger: "blur" }
        ],
        "extended.enterpriseName": [
          { required: true, message: "请输入企业名称", trigger: "blur" }
        ],
        "extended.registrationNumber": [
          { required: true, message: "请输入营业执照注册号", trigger: "blur" }
        ],
        "extended.firmType": [
          { required: true, message: "请输入企业类型", trigger: "blur" }
        ],
        "extended.firmAddress": [
          { required: true, message: "请输入企业住所", trigger: "blur" }
        ],
        "extended.representative": [
          { required: true, message: "请输入法定代表人", trigger: "blur" }
        ],
        "extended.registerMoney": [
          { required: true, message: "请输入企业注册资金", trigger: "blur" }
        ],
        "extended.registerDate": [
          { required: true, message: "请选择成立日期", trigger: "blur" }
        ],
        "extended.allottedDate": [
          { required: true, message: "请选择营业期限", trigger: "blur" }
        ],
        "extended.manageScope": [
          { required: true, message: "请输入经营范围", trigger: "blur" }
        ],
        "extended.registry": [
          { required: true, message: "请输入企业登录机关", trigger: "blur" }
        ],
        licenseKey: [
          { required: true, message: "请选择营业执照", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    uploadOne: resolve => require(["../upload/uploadOne"], resolve),
    bgEditor: resolve => require(["../upload/bg-editor"], resolve)
  },
  created() {
    this.cid = this.$router.currentRoute.query.cid;
    this.detail();
    this.provinceList();
  },
  methods: {
    //检查手机号
    isCellPhone(val) {
      if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
        return false;
      } else {
        return true;
      }
    },
    // 获取省
    provinceList() {
      httpGet("PROVINCES").then(res => {
        this.areaNameData = res.data;
      });
    },
    //获取市
    citiesList(id) {
      let param = {
        provinceId: id
      };
      if (id) {
        formGet("CITIES", param).then(res => {
          this.cityNameData = res.data;
        });
      }
    },
    // 获取区县
    areaList(id) {
      let param = {
        cityId: id
      };
      if (id) {
        formGet("AREAS", param).then(res => {
          this.districtNameData = res.data;
        });
      }
    },
    selectGetProvince(vId) {
      this.citiesList(vId);
      let obj = {};
      obj = this.areaNameData.find(item => {
        return item.id === vId;
      });
      if (obj) {
        this.ruleForm.extended.areaProvince = obj.name;
      }
      this.areaCity = "";
      this.areaDistrict = "";
    },
    selectGetCities(vId) {
      this.areaList(vId);
      let obj = {};
      obj = this.cityNameData.find(item => {
        return item.id === vId;
      });
      if (obj) {
        this.ruleForm.extended.areaCity = obj.name;
      }
      this.areaDistrict = "";
    },
    selectGetArea(vId) {
      let obj = {};
      obj = this.districtNameData.find(item => {
        return item.id === vId;
      });
      if (obj) {
        this.ruleForm.extended.areaDistrict = obj.name;
      }
    },
    saveSumbit(formName) {
      let _this=this;
      let extended=this.ruleForm.extended
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.imgKeys = [];
          this.imgKey.forEach(e => {
            if(e.fileKey){
              this.imgKeys.push(e.fileKey);
            }
          });
          this.ruleForm.image2sKey = JSON.stringify(this.imgKeys).replace(
            /["\[\]]/g,
            ""
          );
          this.ruleForm.province=this.ruleForm.extended.areaProvince;
          this.ruleForm.city=this.ruleForm.extended.areaCity;
          this.ruleForm.district=this.ruleForm.extended.areaDistrict;
          this.ruleForm.address=this.ruleForm.extended.address;
          this.geoCode(extended.areaProvince+extended.areaCity+extended.areaDistrict+extended.address,function(){
            httpPut("SHOPSHOP", _this.ruleForm).then(res => {
              if(!res) return;
              _this.$message.success("保存成功");
              _this.detail();
            });
          });
         
        }
      });
    },
    backRemove() {
      this.$router.go(-1);
    },
    // 富文本输入的内容
    handleEditorContent(val) {
      this.ruleForm.info = val;
    },
    deleteImg(index) {
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
    upLoadSuccess(obj){
      if(obj.fileKey){
        this.imgKeys[obj.index]=obj;
        this.imgKey[obj.index]=obj;
      }
    },
    detail() {
      strGet("SHOPSHOP").then(res => {
        this.imgKeys = [];
        this.imgKey = [];
        let data = res.data;
        this.auditStatus = data.auditStatus;
        this.contentData = data;
        this.ruleForm.extended.shopName = data.shopName;
        this.ruleForm.shopNo = data.shopCode;
        if (data.extended) {
          this.extended = JSON.parse(data.extended);
          this.imageUrl = data.image1s[0].imageUrl;
          this.licenseUrl = data.license.imageUrl;
          this.ruleForm = {
            image1sKey: data.image1s[0].imageKey, //商场图key
            image2sKey: data.image2sKey, //商场详情图key列表
            licenseKey: data.licenseKey, //营业执照key
            business: data.business, //经营方式
            shopNo: data.shopCode, //商场编号
            phone: data.phone, //商场电话
            info: data.info,
            province: data.province, //省
            city: data.city, //市
            district: data.district, //区
            address: data.address,
            latitude:data.latitude,
            longitude:data.longitude,
            extended: {
              //扩展字段
              shopName: data.shopName, //商场名
              areaProvince: this.extended.areaProvince, //省
              areaCity: this.extended.areaCity, //市
              areaDistrict: this.extended.areaDistrict, //区
              address: this.extended.address,
              lat:this.extended.lat,
              lng:this.extended.lng,
              contractNo: this.extended.contractNo,
              enterpriseName: this.extended.enterpriseName, //企业名称
              registrationNumber: this.extended.registrationNumber, //营业执照注册号
              firmType: this.extended.firmType, //企业类型
              firmAddress: this.extended.firmAddress, //企业住所
              representative: this.extended.representative, //法定代表人
              registerMoney: this.extended.registerMoney, //企业注册资金
              registerDate: this.extended.registerDate, //成立时间
              allottedDate: this.extended.allottedDate, //营业期限
              manageScope: this.extended.manageScope, //经营范围
              registry: this.extended.registry //企业登记机关
            }
          };
          this.areaProvince = this.extended.areaProvince;
          this.areaCity = this.extended.areaCity;
          this.areaDistrict = this.extended.areaDistrict;
          data.image2s.forEach(e => {
            this.imgKey.push({
              fileUrl: e.imageUrl,
              fileKey: e.imageKey
            });
          });
        }
      });
    },
    updateStatus() {
      this.auditStatus = "REVIEW";
    },
    geoCode(address,fun) {
      let _this=this;
        var geocoder = new AMap.Geocoder();
        geocoder.getLocation(address, function(status, result) {
          if (status === "complete" && result.geocodes.length) {
            var lnglat = result.geocodes[0].location;
            _this.ruleForm.extended.lat=lnglat.lat;
            _this.ruleForm.extended.lng=lnglat.lng;
            _this.ruleForm.latitude=lnglat.lat;
            _this.ruleForm.longitude=lnglat.lng;
             if(fun){
               fun()
             }
          } else {
             _this.$message.warning("根据地址查询位置失败");
            return;
          }
        });
    }
  }
};
</script>

<style scoped>
.amap-wrapper {
  width: 500px;
  height: 500px;
}
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
  overflow: scroll;
  width: 800px;
  margin-top: -20px;
  margin-left: 80px;
}
.statusBtn {
  position: absolute;
  left: 600px;
  top: 190px;
}
.areaRow .el-select {
  margin-right: 10px;
}
.note-editor {
  width: 90%;
}
.el-input {
  padding-bottom: 10px;
}
.imgData {
  width: 130px;
  height: 130px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.imgs {
  width: 900px;
  margin-left: 90px;
  margin-top: -20px;
}
.border-t-b {
  border: 1px solid #eee;
}
.m-title {
  font-size: 17px;
  color: #333;
  margin-top: 20px;
}
.mallInfo {
  padding-top: 20px;
}
.el-input[data-v-275ea0b4] {
  padding-bottom: 0;
}
</style>
