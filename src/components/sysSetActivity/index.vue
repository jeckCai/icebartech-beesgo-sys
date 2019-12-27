<template>
  <div class="activity_warp">
    <el-card class="card">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>活动设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="content">
        <el-card class="activity_item_card">
          活动板块1
          <el-row>
            <el-col :span="12">
              <div class="activty_item">
                <div>
                  <span class="rtext">
                    <i class="red">*</i>活动图(左)
                  </span>
                  <div class="rinput">
                    <UploadImg
                      :clear="false"
                      :imgUrl.sync="formItem.leftActivityUrl"
                      :isShowImg="true"
                      @upLoadSuccess="i=>{formItem.leftActivityKey = i.fileKey}"
                    />
                    <p>上传XXX*XXX图片</p>
                  </div>
                </div>
                <div>
                  <span class="rtext">
                    <i class="red">*</i>选择活动
                  </span>
                  <el-input
                    class="rinput"
                    readonly
                    placeholder="请选择"
                    size="mini"
                    v-model="formItem.leftActivityName"
                    @click.native="selectActivity(1)"
                  ></el-input>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="activty_item">
                <div>
                  <span class="rtext">
                    <i class="red">*</i>活动图(右)
                  </span>
                  <div class="rinput">
                    <UploadImg
                      :clear="false"
                      :imgUrl.sync="formItem.rightActivityUrl"
                      :isShowImg="true"
                      @upLoadSuccess="i=>{formItem.rightActivityKey = i.fileKey}"
                    />
                    <p>上传XXX*XXX图片</p>
                  </div>
                </div>
                <div>
                  <span class="rtext">
                    <i class="red">*</i>选择活动
                  </span>
                  <el-input
                    class="rinput"
                    readonly
                    placeholder="请选择"
                    size="mini"
                    @click.native="selectActivity(2)"
                    v-model="formItem.rightActivityName"
                  ></el-input>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>

        <el-card class="activity_item_card">
          活动板块2
          <div class="activty_item">
            <div>
              <span class="rtext">
                <i class="red">*</i>活动图
              </span>
              <div class="rinput">
                <UploadImg
                  :clear="false"
                  :imgUrl.sync="formItem.downActivityUrl"
                  :isShowImg="true"
                  @upLoadSuccess="i=>{formItem.downActivityKey = i.fileKey}"
                />
              </div>
            </div>
            <div>
              <span class="rtext">
                <i class="red">*</i>选择活动
              </span>
              <el-input
                class="rinput"
                readonly
                placeholder="请选择"
                size="mini"
                @click.native="selectActivity(3)"
                v-model="formItem.downActivityName"
              ></el-input>
            </div>
          </div>
        </el-card>
        <el-row class="activty_footer_item">
          <el-col :span="24">
            <span class="rtext">添加瀑布流</span>
            <div class="rinput">
              <UploadImg
                :clear="false"
                :imgUrl.sync="formItem.waterActivityUrl"
                :isShowImg="true"
                @upLoadSuccess="i=>{formItem.waterActivityKey = i.fileKey}"
              />
            </div>
          </el-col>
          <el-col :span="24">
            <span class="rtext">预览链接</span>
            <div class="rinput" @click="drawer=!drawer">
              <a>www.baidu.com</a>
            </div>
          </el-col>
        </el-row>
        <el-button @click="$router.go(-1)">返回</el-button>
        <el-button type="success" plain @click="submit">保存</el-button>
      </div>
    </el-card>
    <activityModal :visible.sync="visible" :title="'选择活动'" @onchange="onchange" />
    <div v-if="drawer">
      <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
        <div class="page-display">
          <div class="display-wrapper">
            <section class="mofang-demo">
              <iframe src="https://beesgo.chinabeego.com/user/download.html" frameborder="0" width="100%" height="100%" scrolling="no"></iframe>
            </section>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import activityModal from "./activityModal";
import UploadImg from "@/components/upload/uploadOne";
import {httpPost,httpGet,httpPut} from "../../util/post";
export default {
  data() {
    return {
      visible: false,
      drawer:false,
      formItem: {
        downActivityId: "",
        downActivityKey: "",
        downActivityUrl:"",
        downActivityName: "",
        leftActivityId: "",
        leftActivityKey: "",
        leftActivityUrl:"",
        leftActivityName: "",
        rightActivityId: "",
        rightActivityKey: "",
        rightActivityUrl:"",
        rightActivityName: "",
        waterActivityId: "",
        waterActivityKey: "",
        waterActivityUrl:'',
        waterActivityName: ""
      },
      activityType: 1,
      previewUrl:''
    };
  },
  methods: {
    onchange(item) {
      switch (this.activityType) {
        case 1:
          this.formItem.leftActivityName = item.name;
          this.formItem.leftActivityId = item.id;
          break;
        case 2:
          this.formItem.rightActivityName = item.name;
          this.formItem.rightActivityId = item.id;
          break;
        case 3:
          this.formItem.downActivityName = item.name;
          this.formItem.downActivityId = item.id;
          break;

        default:
          break;
      }
      this.visible = false;
    },
    pushActivity(type) {
      if (type === 1) {
        this.formItem.oneActivity.push({
          imageurl: "",
          activity: "",
          sort: ""
        });
      } else {
        this.formItem.twoActivity.push({
          imageurl: "",
          activity: "",
          sort: ""
        });
      }
    },
    close(type, idx) {
      if (type === 1) {
        this.formItem.oneActivity.splice(idx, 1);
      } else {
        this.formItem.twoActivity.splice(idx, 1);
      }
    },
    selectActivity(sum, type) {
      this.visible = !this.visible;
      this.activityType = sum;
    },
    getData(){
      httpGet('ACTIVITYSYS').then(rps=>{
        if(rps.code===200){
          let data = rps.data;
          this.formItem = {
            downActivityId: data.downActivityId,
            downActivityKey: data.downActivityKey,
            downActivityUrl:data.downActivity.imageUrl,
            downActivityName: data.downActivityName,
            leftActivityId: data.leftActivityId,
            leftActivityKey: data.leftActivityKey,
            leftActivityUrl:data.leftActivity.imageUrl,
            leftActivityName: data.leftActivityName,
            rightActivityId: data.rightActivityId,
            rightActivityKey: data.rightActivityKey,
            rightActivityUrl:data.rightActivity.imageUrl,
            rightActivityName: data.rightActivityName,
            waterActivityId: data.waterActivityId,
            waterActivityKey: data.waterActivityKey,
            waterActivityUrl:data.waterActivity.imageUrl,
            waterActivityName: data.waterActivityName
          }
        }
      })
    },
    getLinkPreview(){
      httpGet('ACTIVITYPERVIEW').then(rps=>{
        if(rps.code===200){
          this.previewUrl = rps.data;
        }
      })
    },
    submit() {
      console.log(this.formItem)
      httpPut('ACTIVITYSYS',this.formItem).then(rps=>{
        if(rps.code===200){
          this.$message.success('操作成功！')
        }
      })
    }
  },
  created(){
    this.getData();
    this.getLinkPreview();
  },
  components: { activityModal, UploadImg }
};
</script>
<style lang="scss" scoped>
.activity_warp {
  .card {
    .breadcrumb {
      background: none;
    }
    .content {
      padding: 0 15px;
      /deep/.el-collapse-item__header {
        font-size: 14px;
      }
      .activity_item_card {
        width: 80%;
        margin: 5px 20px;
        position: relative;
        .activty_item {
          div {
            padding: 5px 10px;
            vertical-align: middle;
          }
        }
        .sort_item {
          padding: 10px;
        }
      }
      .add_activity_item {
        margin-left: 20px;
        margin-bottom: 10px;
      }
      .rtext {
        width: 100px;
        display: inline-block;
        text-align: left;
        font-size: 14px;
        .red {
          color: red;
          padding: 2px;
        }
      }
      .rinput {
        width: calc(100% - 120px);
        display: inline-block;
      }
      .close {
        position: absolute;
        right: 10px;
        top: 10px;
      }
      .activty_footer_item {
        .el-col {
          display: flex;
          align-items: center;
          padding: 10px 0;
        }
      }
    }
  }
  .page-display{
    position: relative;
    .display-wrapper{
      position: relative;
      width: 330px;
      height: 645px;
      margin: auto;
      -webkit-transform: none;
      transform: none;
      top: auto;
      background: url(../../assets/images/iphone.png) no-repeat center 0;
      background-size: 100%;
      .mofang-demo{
        position: absolute;
        top: 64px;
        left: 21px;
        right: 23px;
        bottom: 22px;
        overflow: hidden;
        border-radius: 0 0 35px 35px;
        border: 1px solid #edf0f4;
        border-top: none;
        background-color: #edf0f4;
        iframe{
          width: 0;
          max-width: 100%;
          min-width: 100%;
        }
      }
    }
  }
}
</style>