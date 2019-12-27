<template>
  <div>
    <!-- <video width="100%" :src="dialogImageUrl" controls="controls" ></video> -->
    <el-upload class="avatars-uploader" :type="type" :limit="maxNub" action :before-upload='beforeUp' :http-request="rewriteUpload" :disabled="isUser" list-type="picture-card" :file-list="urlList" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"   >
      <i class="el-icon-plus"></i>
    </el-upload>
    
    <el-dialog width="30%" :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl">
      
    <!-- <video width="100%" :src="dialogImageUrl" controls="controls" ></video> -->
    </el-dialog>
  </div>
</template>
<script>
  /**
* props
* 入参 imgUrlArray.要显示的图片地址数组.['url','url'] 格式
*  keyList
给后端用的 文件KEY
maxNub
上传张数限制
* 出参 触发事件
*  @ upLoadSuccess  事件 , 参数是   ['url','url'] 格式
*/
import { httpPost, formPost, httpGet, httpPut } from "../../util/post";
  export default {
    data() {
      return {
        dialogVisible: false,
        dialogImageUrl: "",
        uploadUrl: "",
        downloadUrl: "",
        urlList: [],
      };
    },
    props: {
      imgUrl: Array,
      keyList: String,
      type:'',
      maxNub: {
        default () {
          return 9
        }
      },
      isUser:{
          default () {
          return false
        }
      },
    },
    watch: {
      imgUrl(v) {
        if (v&&v.length > 0) {
          let arr = []
          v.map(val => {
            arr.push({
              uid: Math.random() * 10 + new Date().getTime(),
              url: val
            })
          })
          this.urlList = arr;
          setTimeout(() => {
            let inUrl = this.keyList.split(',')
            this.urlList.map((val, i) => {
              val.key = inUrl[i]
            })
            this.backList()
          }, 500);
        }else{
           this.urlList = [];
        }
      }
    },
    methods: {
      handleRemove(file) {
        let index;
        this.urlList.map((v, i) => {
          if (v.uid === file.uid) index = i;
        })
        this.urlList.splice(index, 1)
        this.backList();
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      rewriteUpload(content) {
        this.http.put(this.uploadUrl, content.file, {
          headers: {
            'Content-Type': content.file.type,
          }
        }).then(() => {
          this.urlList.push({
            uid: content.file.uid,
            url: this.downloadUrl,
            key: this.fileKey
          })
          this.backList();
        })
      },
      beforeUp(file) {
        // if(this.type=="AVI"||this.type=="3GP"||this.type=="mp4"||this.type=="FLV"||this.type=="rm"||this.type=="rmvb"||this.type=="mov"){
        //   this.$message({
        //   message: '请上传视频类型',
        //   type: 'warning'
        // });
        // return
        // }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return false;
        }
        return new Promise((resolve, reject) => {
           formPost('PUBLICFORMUPLOAD', {
            suffix: file.name.split('.')[1],
            contentType: file.type
          }).then((result) => {
            console.log(result)
            this.uploadUrl = result.bussData.uploadUrl
            this.fileKey = result.bussData.fileKey
            this.downloadUrl = result.bussData.downloadUrl
            resolve(result)
          })
        })
      },
      backList() {
        let list = '';
        this.urlList.map(v => {
          list += (v.key + ',')
        })
        console.log(this.urlList)
        // this.$emit('upLoadSuccess', list.substr(0, list.length - 1)) //上传成功后传递数据给父组件 返回值为 图片地址
        this.$emit('upLoadSuccess', this.urlList) //上传成功后传递数据给父组件 返回值为 图片地址
      }
    }
  }
</script>

<style lang='scss'>
  .avatars-uploader {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    padding: 4px 0;
    overflow: hidden;

    .el-upload--picture-card {
      height: 100px;
      width: 100px;
      line-height: 100px;
    }

    .el-upload-list__item {
      height: 100px;
    }
  }
</style>