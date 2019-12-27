/**
 * Created by Eric on 2017/12/11.
 *
 * 表格组件
 *      此组件必须引用bootstrap.css\jquery\font-awesome\summernote

 *  参数说明:
 *          @param {String} upLoadUrl  图片上传接口地址
 *          @param {String} content  获取编辑器内容
 *          @param {Integer} minHeight 编辑器最低高度
 *  使用方式:
 *      ex:<bg-editor 
                :minHeight="300" 
                :uploadUrl="uploadApi" 
                :content="getApi"
                @editorData='editorInfo'>
            </bg-editor>
 *       @editorData 取得编辑器内容
 *
 *
 */
<template>
  <div>
    <div :id="id"></div>
  </div>
</template>
<script>
import $ from "jquery";
import { httpPost, formPost, httpGet, httpPut } from "../../util/post";
// import {
//     publicSysApi
// } from '@/agent'
export default {
  data() {
    return {
      imgData: ""
    };
  },
  props: {
    uploadUrl: String,
    canEdit: {
      type: Boolean,
      default: true
    },
    minHeight: {
      type: Number,
      default: 300
    },
    content: {
      type: String,
      default: ""
    },
    id:{
      type:String,
      default:'summernote'
    }
  },
  watch: {  },
  mounted() {
    setTimeout(() => {
      $("#"+this.id).summernote("code", this.content);
    }, 2000);

    $("#"+this.id).summernote({
      toolbar: [
        //[groupName, [list of button]]
        ["style", ["bold", "italic", "underline", "clear"]],
        ["font", ["strikethrough", "superscript", "subscript"]],
        ["fontsize", ["fontsize"]],
        ["color", ["color"]],
        ["para", ["ul", "ol", "paragraph"]],
        ["height", ["height"]],
        ["picture", ["picture"]],
        // ['video',['video']],
        ["table", ["table"]],
        ["fullscreen", ["fullscreen"]]
        // ['codeview', ['codeview']],
        // ['help', ['help']]
      ],
      lang: "zh-CN",
      minHeight: this.minHeight, // set editor height
      dialogsFade: true,
      lineNumbers: false,
      callbacks: {
        onImageUpload: async files => {
          console.log(files)
          this.upImage(files,files.length)
          // let file = files[0]; 
          // const param = {
          //   suffix: file.name.split(".")[1], // 文件后缀  png
          //   contentType: file.type // 文件类型  image/png
          // };
          // formPost("PUBLICFORMUPLOAD", param)
          //   .then(result => {
          //     console.log(result.data.fileUrl);
          //     let upLoadUrl = result.data.uploadUrl;
          //     let downloadUrl = result.data.fileUrl;
          //     let fileKey = result.data.fileKey;
          //     this.http
          //       .put(upLoadUrl, file, {
          //         headers: {
          //           "Content-Type": file.type
          //         }
          //       })
          //       .then(res => {
          //        $("#"+this.id).summernote(
          //           "editor.insertImage",
          //           downloadUrl,
          //           $image => {
          //             $image.attr("src", downloadUrl);
          //             $image.attr("alt", fileKey);
          //           }
          //         );
          //       });
          //   })
          //   .catch(err => {});
          
        },
        onChange: (contents, $editable) => {
          this.$emit("editorData", contents);
        }
      },
      content(item) {}
    });
   
  },
  methods: {
    upImage(files,length){
      if(length==0){
        return;
      }
       const param = {
            suffix: files[length-1].name.split(".")[1], // 文件后缀  png
            contentType:  files[length-1].type // 文件类型  image/png
          };
          formPost("PUBLICFORMUPLOAD", param)
            .then(result => {
              console.log(result.data.fileUrl);
              let upLoadUrl = result.data.uploadUrl;
              let downloadUrl = result.data.fileUrl;
              let fileKey = result.data.fileKey;
              this.http
                .put(upLoadUrl, files[length-1], {
                  headers: {
                    "Content-Type": files[length-1].type
                  }
                })
                .then(res => {
                 $("#"+this.id).summernote(
                    "editor.insertImage",
                    downloadUrl,
                    $image => {
                      $image.attr("src", downloadUrl);
                      $image.attr("alt", fileKey);
                      this.upImage(files,length-1)
                    }
                  );
                });
            })
            .catch(err => {});
    }
  }
};
</script>

<style lang="scss" scoped>

</style>