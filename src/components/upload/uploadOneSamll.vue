<template>
  <div class="upload1">
    <div class="img" v-if="(img||imgUrl) && isShowImg">
      <img :src="img||imgUrl" class="avatar" />
      <span class="item-actions">
        <el-tooltip content="查看" placement="top">
          <span class="item-preview" @click="previewImg">
            <i class="el-icon-view"></i>
          </span>
        </el-tooltip>
        <el-tooltip content="删除" placement="top">
          <span class="item-delete" @click="deleteImg">
          <i class="el-icon-delete"></i>
          </span>
        </el-tooltip>
      </span>
    </div>
    <el-upload
      v-else
      ref="upload"
      class="avatar-uploader"
      :imgUrl="imgUrl"
      :http-request="rewriteUpload"
      action
      accept=".png, .jpg, .gif"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
    >
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-dialog :visible.sync="centerDialogVisible" fullscreen center append-to-body>
      <div style="text-align:center">
        <img :src="img||imgUrl" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
/**
 * props
 * 入参 imgUrl 要显示的图片地址 字符串 格式
 * imgKey  文件的filekey
 *
 * 出参 触发事件
 *  @ upLoadSuccess  事件 , url参数是 字符串 格式
 */
import qs from "qs";
import { httpPost, formPost, httpGet, httpPut } from "../../util/post";
export default {
  data() {
    return {
      centerDialogVisible: false,
      img: "",
      uploadUrl: "",
      fileKey: ""
    };
  },
  props: {
    imgUrl: String,
    imgKey: String,
    clear: Boolean,
    addImg: String,
    isShowImg: Boolean,
    keyIndex:Number
  },
  watch: {
    clear() {
      if (this.clear) {
        this.img = "";
      } else {
      }
    },
    clear: {
      handler() {
        if (this.clear) {
          this.img = "";
          console.log(this.img);
        } else {
        }
      },
      immediate: true
    },
    addImg: {
      handler() {
        if (this.addImg) {
          this.img = this.addImg;
        } else {
          this.img = "";
        }
      },
      immediate: true
    },
    imgUrl(v) {
      this.img = v;
    },
    imgKey(v) {
      this.$emit("upLoadSuccess", v);
    }
  },
  methods: {
    rewriteUpload(content) {
      console.log(this.uploadUrl);
      this.http
        .put(this.uploadUrl, content.file, {
          headers: {
            "Content-Type": content.file.type
          }
        })
        .then(() => {
          this.img = this.downloadUrl; //显示图片
          // this.$emit('upLoadSuccess', this.fileKey)
          this.$emit("upLoadSuccess", {
            fileKey: this.fileKey,
            fileUrl: this.downloadUrl,
            index:this.keyIndex
          });
        });
    },
    //上传前,一些装备工作
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.$message.error("图片大小不能超过 5MB!");
        return false;
      }
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "jpg";
      const extension2 = testmsg === "png";
      const extension3 = testmsg === "gif";
      if (!extension && !extension2 && !extension3) {
        this.$message.error("上传格式错误");
        return false;
      }
      return new Promise((resolve, reject) => {
        formPost("PUBLICFORMUPLOAD", {
          suffix: file.name.split(".")[1],
          contentType: file.type
        })
          .then(result => {
            console.log(result);
            this.uploadUrl = result.data.uploadUrl;
            this.fileKey = result.data.fileKey;
            this.downloadUrl = result.data.fileUrl;
            resolve(result);
          })
          .catch(err => {
            reject("请求图片地址出错");
          });
      });
    },
    previewImg() {
      this.centerDialogVisible = !this.centerDialogVisible;
    },
    deleteImg() {
      this.img = "";
      this.$emit("upLoadSuccess", { fileKey: "", fileUrl: ""});
      this.$emit("update:imgUrl","")
      this.$emit("deleteImg",this.keyIndex)
    }
  }
};
</script>

<style lang='scss' scope>
.upload1 {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .img {
    position: relative;
    width: 20px;
    height: 20px;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .item-actions {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
    &:hover {
      opacity: 1;
    }
    .item-preview {
      position: absolute;
      top: 30px;
      left: 20px;
      cursor: pointer;
    }
    .item-delete {
      position: absolute;
      top: 30px;
      left: 55px;
      cursor: pointer;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
     width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
  }

  .avatar {
    width: 20px;
    height: 20px;
    display: block;
  }
}
</style>