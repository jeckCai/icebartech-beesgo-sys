<!--
 * @Descripttion: 描述
 * @version: 版本
 * @Author: xiongbin
 * @Date: 2019-12-06 20:22:47
 * @LastEditors  : 1490251116@qq.com
 * @LastEditTime : 2019-12-25 13:57:45
 -->
// 商场
<template>
  <div class="content">
    <el-row>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
        <el-form-item label="商场名">
          <el-input v-model="shopNameLike" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-table border :data="tableData" size="mini">
        <el-table-column prop="shopName" label="商场名"></el-table-column>
        <el-table-column prop="imageUrl" label="活动图" width="75">
          <template slot-scope="scope">
            <img :src="scope.row.license.imageUrl" alt style="width:75px" />
          </template>
        </el-table-column>
        <el-table-column prop="extended" :formatter="formatter" label="商场地址"></el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-button size="mini" @click="selectItem(scope.row)">选取</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>
<script>
import { httpPost, formDel, httpDel, httpPut, strPut } from "@/util/post";
export default {
  name: "activityModal",
  props: {
    visible: {
      default: false,
      type: Boolean
    },
  },
  data() {
    return {
      formInline: {},
      tableData: [],
      oldtableData:[],
      shopNameLike:''
    };
  },
  created() {
    this.getList();
  },
  methods: {
    dealAdress(str){
      if(!str){
        return '无'
      }else{
        let arr=JSON.parse(str);
        return arr.areaProvince+arr.areaCity+arr.areaDistrict
      }
    },
    // 格式化元素，当为空的时候显示 "- -"
    formatter(row, column, cellValue) {
         if(!cellValue){
        return '无'
      }else{
        let arr=JSON.parse(cellValue);
        return arr.areaProvince+arr.areaCity+arr.areaDistrict
      }
    },
    onSubmit() {},
    selectItem(item) {
      this.$emit("selectChange", item);
    },
    //获取列表
    getList() {
      let param = {};
      if(this.shopNameLike ){
        this.pageIndex = 1
        param.shopNameLike =this.shopNameLike
      }
      httpPost("SHOPLISTS", param).then(res => {
        if (res.code == 200) {
          this.tableData = res.data;
          this.oldtableData = res.data;
        }
      });
    },
   
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