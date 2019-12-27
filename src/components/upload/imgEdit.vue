<template>
  <div>
    <el-upload
      ref="upload"
      class="avatar-uploader"
      :auto-upload="false"
      :imgUrl="imgUrl"
      action
      accept=".png, .jpg, .gif"
      :show-file-list="false"
      :on-change="changeUpload"
    >
      <img v-if="(img||imgUrl) && isShowImg" :src="img||imgUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body :top="'10vh'">
      <div class="cropper-content">    
        <div class="cropper" style="text-align:center">
          <vueCropper
            ref="cropper"
            :src="option.img"
            :dragMode="option.dragMode"
            :aspectRatio="autoCropWidth/autoCropHeight"
          ></vueCropper>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="finish" :loading="loading">确认</el-button>
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
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
export default {
  data() {
    return {
      cropper:'',
      img: "",
      uploadUrl: "",
      fileKey: "",
      fileName: "",
      fileType: "",
      dialogVisible: false,
      loading: false,
      option: {
        img: "", // 裁剪图片的地址
        dragMode: 'move', // 拖拽图片模式
        aspectRatio:180/180
      }
    };
  },
  props: {
    imgUrl: String,
    imgKey: String,
    clear: Boolean,
    addImg: String,
    isShowImg: Boolean,
    autoCropWidth:Number,
    autoCropHeight:Number
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
    changeUpload(file, fileList) {
      let that = this;
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error("上传文件大小不能超过 5MB!");
        return false;
      }
      this.fileName = file.name.split('.')[0];
      this.fileType = file.raw.type;
      var reader = new FileReader(); // 这里使用FileReader() 来得到图片地址
      reader.onload = function(e) {
        that.$nextTick(() => {
          that.option.img = e.target.result;
          that.dialogVisible = true;
        });
      };
      reader.readAsDataURL(file.raw);
    },
    finish() {
      let that = this;
      this.$refs.cropper.getCroppedCanvas().toBlob((blob)=>{
          that.loading = true;
          let fileItem={
            name:that.fileName,
            type:that.fileType
          }
          that.beforeAvatarUpload(fileItem).then(rps=>{
            that.rewriteUpload(blob)
          })
      },'image/png')
      
      // this.$refs.cropper.getCropBlob(data => {
      //   that.loading = true;
      //   let fileItem={
      //     name:that.fileName,
      //     type:that.fileType
      //   }
      //   that.beforeAvatarUpload(fileItem).then(rps=>{
      //     this.rewriteUpload(data)
      //   })
        
      // });
    },
    // 请求拿到阿里云的文件上传地址
    beforeAvatarUpload(item) {
      let that = this;
      return new Promise((resolve,reject)=>{
        formPost("PUBLICFORMUPLOAD", {
        suffix: item.name,
        contentType: item.type
      }).then(result => {
          that.uploadUrl = result.data.uploadUrl;
          that.fileKey = result.data.fileKey;
          that.downloadUrl = result.data.fileUrl;
          resolve(result)
        }).catch(err => {
          reject("请求图片地址出错");
        });
      })
     
    },
    rewriteUpload(content) {
      console.log(this.uploadUrl);
      this.http
        .put(this.uploadUrl, content, {
          headers: {
            "Content-Type": this.fileType
          }
        })
        .then(() => {
          this.dialogVisible = false;
          this.loading = false;
          this.img = this.downloadUrl; //显示图片
          this.$emit("upLoadSuccess", {
            fileKey: this.fileKey,
            fileUrl: this.downloadUrl
          });
        });
    },
  },
  mounted(){
    // this.initCropper()
  },
  components:{VueCropper}
};
</script>

<style lang='scss'>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.cropper-content {
  .cropper {
    width: auto;
    height: 400px;
    overflow: hidden;
  }
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>