<template>
  <div class="edit_banner">
    <el-card class="card">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/sysDiscountsBanner' }"
            >品牌LOGO管理列表</el-breadcrumb-item
          >
          <el-breadcrumb-item>{{
            $route.params.id ? "编辑LOGO" : "新增LOGO"
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="content">
        <el-form
          :model="formData"
          :rules="rules"
          ref="formData"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="品牌名称" prop="brandName">
            <el-input
              v-model="formData.brandName"
              placeholder="请输入"
              :maxlength="140"
              style="width: 220px"
            ></el-input>
          </el-form-item>
          <el-form-item label="LOGO图" prop="logoImageKey">
            <uploadOne
              :clear="clear"
              :imgUrl.sync="imageUrl"
              :isShowImg="true"
              @upLoadSuccess="
                v => {
                  formData.logoImageKey = v.fileKey;
                }
              "
            ></uploadOne>
          </el-form-item>
          <el-form-item label="关联分类" prop="categoryId">
            <el-select
              v-model="formData.categoryId"
              clearable
              placeholder="请选择分类"
            >
              <el-option
                clearable
                v-for="item in categoryData"
                :key="item.id"
                :label="item.categoryName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序" prop="brandName">
            <el-input
              v-model="formData.sort"
              placeholder="请输入"
              :maxlength="100"
              type="number"
              style="width: 220px"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="footer">
          <el-button plain @click="$router.go(-1)">返回</el-button>
          <el-button type="primary" plain @click="submit('formData')"
            >保存</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import uploadOne from "@/components/upload/uploadOne";
import { httpPost, httpPut, httpGet } from "../../util/post";
export default {
  data() {
    return {
      formData: {
        brandName: "",
        logoImageKey: "",
        categoryId: "",
        sort: ""
      },
      imageUrl: "",
      clear: false,
      categoryData: [],
      rules: {
        brandName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" }
        ],
        logoImageKey: [
          { required: true, message: "请选择品牌logo", trigger: "blur" }
        ],
        categoryId: [
          { required: true, message: "请选择关联分类", trigger: "blur" }
        ],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }]
      }
    };
  },
  methods: {
    upLoadSuccess(obj) {
      let { fileKey, fileUrl } = obj;
    },
    submit(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.logoSave();
        }
      });
    },
    categorylist() {
      httpPost("TOP_LIST", {}).then(res => {
        if (res.code == 200) {
          this.categoryData = res.data;
        }
      });
    },
    back() {
      this.$router.go(-1);
    },
    // 保存
    logoSave() {
      if (this.cid != 0) {
        this.formData.id = this.cid;
      }
      console.log(this.formData);
      httpPost("SHOPLOGOSAVA", this.formData).then(res => {
        if (!res) return;
        this.$message.success("保存成功");
        this.back();
      });
    },
    getdetail() {
      httpGet("SHOPLOGOFINDONE", this.cid).then(res => {
        if (!res) return;
        let data = res.data;
        this.imageUrl = data.logoImageInfo.imageUrl;
        this.formData = {
          brandName: data.brandName,
          categoryId: data.categoryId,
          sort: data.sort,
          logoImageKey: data.logoImageKey
        };
      });
    }
  },
  components: { uploadOne },
  created() {
    this.cid = this.$router.currentRoute.query.cid;
    this.categorylist();
    if (this.cid != 0) {
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
