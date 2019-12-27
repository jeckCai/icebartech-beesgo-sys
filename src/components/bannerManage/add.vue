<template>
  <el-card class="addBanner_warp">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/sysSetIndexBanner' }"
          >banner管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{
          $route.query.id ? "编辑banner" : "新增banner"
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row class="addbanner_row">
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="100px"
        size="small"
        class="demo-dynamic"
      >
        <el-form-item
          prop="imageUrl"
          label="banner图"
          :rules="[{ required: true, message: '请上传图片', trigger: 'blur' }]"
        >
          <UploadImg
            :clear="false"
            :imgUrl.sync="dynamicValidateForm.imageUrl"
            :isShowImg="true"
            @upLoadSuccess="
              v => {
                bannerKey = v.fileKey;
              }
            "
          />
        </el-form-item>
        <el-form-item
          prop="link"
          label="链接地址"
          :rules="[{ required: true, message: '请选择链接', trigger: 'blur' }]"
        >
          <span
            class="btn_span"
            v-for="(item, index) in linkBtns"
            :key="index"
            :class="{ avtive: item.linkType === active }"
            @click="tarSwath(item.type, item.linkType)"
            >{{ item.value }}</span
          >
        </el-form-item>
        <el-form-item v-if="showLinkValue" label="输入活动地址">
          <el-input
            style="width:200px"
            type="text"
            v-model="linkValue"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="!showLinkValue" prop="link" label="请选择">
          <el-input
            readonly
            style="width:200px"
            :value="name"
            placeholder="请选择"
            @click.native="showModal"
          />
        </el-form-item>
        <el-form-item size="medium">
          <el-button @click="$router.go(-1)">返回</el-button>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <bannerModal
      :visible.sync="visible"
      :title="title"
      @onchange="onchange"
      :itemType="itemType"
    />
  </el-card>
</template>
<script>
import UploadImg from "@/components/upload/uploadOne";
import bannerModal from "./itemModal";
import { httpPost, httpGet, httpPut, strPut } from "@/util/post"; //
export default {
  data() {
    return {
      dynamicValidateForm: {
        imageUrl: "",
        linkName: ""
      },
      cid: "",
      name: "",
      visible: false,
      linkValue: "",
      showLinkValue: "",
      bannerKey: "",
      id: "0",
      title: "",
      item: {},
      active: "SHOP",
      itemType: "SHOP",
      pageIndex: 1,
      pageSize: 10,
      linkBtns: [
        { type: 1, value: "商场", title: "选择商场", linkType: "SHOP" },
        { type: 2, value: "品牌", title: "选择品牌", linkType: "BRANCH" },
        { type: 3, value: "商品", title: "选择商品", linkType: "GOODS" },
        { type: 4, value: "活动", title: "选择活动", linkType: "ACTIVITY" },
        { type: 5, value: "活动链接", title: "输入活动链接", linkType: "LINK" }
      ]
    };
  },
  mounted() {
    if (this.$route.query.id) {
      this.cid = this.$route.query.id;
      this.getDetail(this.$route.query.id);
    }
  },
  methods: {
    tarSwath(active, linkType) {
      console.log(linkType);
      this.active = linkType;
      this.id = "";
      this.name = "";
      linkType == "LINK"
        ? (this.showLinkValue = true)
        : (this.showLinkValue = false);
    },
    upLoadSuccess() {},
    onSubmit() {
      let linkType = this.linkBtns.filter(item => {
        if (item.linkType == this.active) {
          return item.linkType;
        }
      });
      let params = {
        bannerKey: this.bannerKey,
        linkId: linkType[0].linkType == "LINK" ? -1 : this.id,
        linkType: linkType[0].linkType,
        linkValue: this.linkValue
      };
      if (this.cid) {
        params.id = this.cid;
      }
      console.log(params);
      this.$confirm("确认活动资料填写完整无误?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.cid) {
            httpPut("ADDBRAND", params).then(res => {
              if (res.code == 200) {
                this.$message({ type: "success", message: "编辑成功!" });
                this.$router.go(-1);
              }
            });
          } else {
            httpPost("ADDBRAND", params).then(res => {
              if (res.code == 200) {
                this.$message({ type: "success", message: "新增成功!" });
                this.$router.go(-1);
              }
            });
          }
        })
        .catch(() => {});
    },
    getDetail(id) {
      httpGet("BANNERDEATIL", id).then(res => {
        if (res.code === 200) {
          let { bannerKey, linkName, linkId, linkType, banner } = res.data;
          this.dynamicValidateForm.imageUrl = banner.imageUrl;
          this.item.shopName = linkName;
          this.active = linkType;
          this.bannerKey = bannerKey;
          console.log(this.bannerKey);
        }
      });
    },
    onchange(item) {
      console.log(item);
      this.id = item.id;
      if (this.active == "SHOP") {
        //商场
        this.name = item.shopName;
      } else if (this.active == "BRANCH") {
        //品牌
        this.name = item.branchName;
      } else if (this.active == "GOODS") {
        //shop
        this.name = item.itemName;
      } else if (this.active == "ACTIVITY") {
        //active
        this.name = item.name;
      }

      console.log(this.name);
      console.log(this.active);
      this.visible = !this.visible;
    },
    showModal() {
      let o = this.linkBtns.filter(item => {
        if (item.linkType == this.active) {
          return item;
        }
        // return item.linkType == this.active;
      })[0];
      console.log(o);
      this.visible = !this.visible;
      this.title = o.title;
      this.itemType = o.linkType;
    },
    getDataInfo(id) {
      httpGet("PUTBANNER", id).then(rps => {
        if (rps.code === 200) {
          let { bannerKey, linkName, linkId, linkType, banner } = rps.data;
          this.dynamicValidateForm.imageUrl = banner.imageUrl;
          this.active = linkType;
          this.bannerKey = rps.data.bannerKey;
          this.linkValue = rps.data.linkValue;
        }
      });
    }
  },
  created() {
    let id = this.$route.query.id;
    if (id) {
      this.getDataInfo(id);
    }
  },
  components: { UploadImg, bannerModal }
};
</script>
<style lang="scss" scoped>
.addBanner_warp {
  .breadcrumb {
    background: none;
    border-bottom: 1px solid #ddd;
  }
  .addbanner_row {
    .btn_span {
      padding: 5px 20px;
      color: #101010;
      font-size: 14px;
      text-align: center;
      font-family: Roboto;
      margin-left: 10px;
      cursor: pointer;
      border: 1px solid #bbbbbb;
      &:first-child {
        margin-left: 0;
      }
      &:hover {
        border-color: #0189ff;
      }
    }
    .avtive {
      border-color: #0189ff;
    }
  }
}
</style>
