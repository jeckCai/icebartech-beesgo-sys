// 增加，修改优惠banner
<template>
  <div class="edit_banner">
    <el-card class="card">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/sysDiscountsBanner' }">优惠Banner列表</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.params.id ?'编辑banner' :'新增banner'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="content">
        <el-form :model="formData"
                 :rules="rules"
                 ref="formData"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="banner图"
                        prop="bannerKey">
            <!-- <uploadOne :clear="false" :imgUrl="formData.bannerKey" :isShowImg="true" @upLoadSuccess="upLoadSuccess"/> -->
            <uploadOne :clear="clear"
                       :imgUrl.sync="imageUrl"
                       :isShowImg="true"
                       @upLoadSuccess="
                v => {
                  formData.bannerKey = v.fileKey;
                }
              "></uploadOne>
          </el-form-item>
          <el-form-item label="banner详情"
                        prop="info">
            <Editor :minHeight="500"
                    :content="formData.info"
                    @editorData="handleEditorContent" />
          </el-form-item>
        </el-form>
        <div class="footer">
          <el-button plain
                     @click="$router.go(-1)">返回</el-button>
          <el-button type="primary"
                     plain
                     @click="submit('formData')">保存</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import uploadOne from '@/components/upload/uploadOne';
import Editor from '@/components/upload/bg-editor'
import { httpPost, httpPut, httpGet } from "../../util/post";
export default {
  data () {
    return {
      formData: {
        bannerKey: "",
        info: ""
      },
      imageUrl: "",
      clear: false,
      bannerId: '',
      rules: {
        // name: {
        //   required: true
        // }
        bannerKey: [
          { required: true, message: "请选择banner图", trigger: "blur" }
        ],
        info: [
          { required: true, message: "请输入banner详情", trigger: "blur" }
        ]
      }

    }
  },
  methods: {
    upLoadSuccess (obj) {
      let { fileKey, fileUrl } = obj;
    },
    handleEditorContent (info) {
      this.formData.info = info;
    },
    submit (formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(_this.formData)
          if (_this.bannerId != 0) {
            _this.updateBannerCoupon()
          } else {
            _this.addBannerCoupon()
          }
        }
      })

    },
    back () {
      this.$router.go(-1);
    },
    // 新增
    addBannerCoupon () {
      httpPost("BANNERCOUPONPUDATE", this.formData).then(res => {
        if (!res) return;
        this.$message.success("保存成功");
        this.back();
      });
    },
    // 修改
    updateBannerCoupon () {
      this.formData.id = this.bannerId;
      httpPut("BANNERCOUPONPUDATE", this.formData).then(res => {
        if (!res) return;
        this.$message.success("保存成功");
        this.back();
      });
    },
    getdetail () {
      httpGet("BANNERCOUPONPUDATE", this.bannerId).then(res => {
        if (!res) return;
        this.imageUrl = res.data.banner.imageUrl;
        this.formData = {
          bannerKey: res.data.bannerKey,
          info: res.data.info
        }
      });
    }
  },
  components: { Editor, uploadOne },
  created () {
    this.bannerId = this.$router.currentRoute.query.cid;
    if (this.bannerId != 0) {
      this.getdetail();
    }

  }
};
</script>
<style lang="scss" scoped>
.edit_banner {
  .card {
    .breadcrumb {
      background: none;
      border-bottom: 1px solid #ddd;
    }
    .footer {
      text-indent: 100px;
    }
  }
}
</style>