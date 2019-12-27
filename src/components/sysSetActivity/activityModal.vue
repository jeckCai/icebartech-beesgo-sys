<template>
  <div class="activity_modal">
    <el-dialog
      :visible.sync="visible"
      width="50%"
      :show-close="false"
      v-dialogDrag
      :close-on-click-modal="false"
    >
      <div slot="title" class="modal_title">
        <span class="ltext">{{title}}</span>
        <span class="rtext" @click="$emit('update:visible',false)">
          <i class="el-icon-close"></i>
        </span>
      </div>
      <div class="content">
        <el-row>
          <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
            <el-form-item label="活动分类">
              <el-select v-model="formInline.activityRegion" placeholder="请选择">
                <el-option label="平台" value="平台"></el-option>
                <el-option label="品牌" value="品牌"></el-option>
                <el-option label="商场" value="商场"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动名">
              <el-input v-model="formInline.activityName" placeholder="活动名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <el-row>
          <el-table border :data="tableData" size="mini">
            <el-table-column prop="imageUrl" label="活动图" width="75">
              <template slot-scope="scope">
                <img :src="scope.row.image.imageUrl" alt="" style="width:75px">
              </template>
            </el-table-column>
            <el-table-column prop="name" label="活动名称"></el-table-column>
            <el-table-column prop="sdate" label="活动开始时间"></el-table-column>
            <el-table-column prop="edate" label="活动结束时间" width="180"></el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button size="mini" @click="selectItem(scope.row)">选取</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {httpPost,httpGet,httpPut} from "../../util/post";
export default {
  name: "activityModal",
  props: {
    visible: {
      default: false,
      type: Boolean
    },
    title: {
      default: "选择活动",
      type: String
    }
  },
  data() {
    return {
      formInline: {},
      tableData: [
        {
          imageUrl:'http://n.sinaimg.cn/news/1_img/upload/cf3881ab/66/w1000h666/20191128/14bf-iixnuaa0514900.jpg',
          name:'我是活动',
          starttime:1235123123123,
          endtime:1231231212313,

        }
      ]
    };
  },
  methods: {
    selectItem(item){
      this.$emit('onchange',item)
    },
    getData(){
      let param={}
      httpPost('ACTIVELSITS',param).then(res=>{
          if (res.code == 200) {
          this.tableData = res.data
        }
      }) 
    },
    onSubmit(){
      this.getData()
    }
  },
  created(){
    this.getData()
  }
};
</script>
<style lang="scss" scoped>
.activity_modal {
  /deep/ .el-dialog__header {
    background: #0189ff;
    .ltext {
      color: #fff;
      font-size: 18px;
    }
    .rtext {
      color: #fff;
      font-size: 18px;
      cursor: pointer;
      position: absolute;
      right: 20px;
    }
  }
}
</style>