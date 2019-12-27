// 活动
<template>
  <div class="content">
    <el-row>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
        <el-form-item label="活动分类">
          <el-select v-model="type" placeholder="请选择" @change="getList">
            <el-option label="平台" value="平台"></el-option>
            <el-option label="品牌" value="品牌"></el-option>
            <el-option label="商场" value="商场"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动名">
          <el-input v-model="activityName" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-table border :data="tableData" size="mini">
        <el-table-column prop="imageUrl" label="活动图" width="75">
          <template slot-scope="scope">
            <img :src="scope.row.image.imageUrl" alt style="width:75px" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="活动名称"></el-table-column>
        <el-table-column prop="sdate" label="活动开始时间"></el-table-column>
        <el-table-column prop="edate" label="活动结束时间"></el-table-column>
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
import { httpPost,formDel,httpDel,httpPut ,strPut} from '@/util/post'
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
      activityName:"",
      formInline: {},
      type:'平台',
      tableData: [
        // {
        //   imageUrl:
        //     "http://n.sinaimg.cn/news/1_img/upload/cf3881ab/66/w1000h666/20191128/14bf-iixnuaa0514900.jpg",
        //   name: "我是活动",
        //   starttime: 1235123123123,
        //   endtime: 1231231212313
        // }
      ]
    };
  },
  mounted(){
    this.getList()
  },
  methods: {
    onSubmit() {
      console.log(this.type)
    },
    selectItem(item) {
      this.$emit("selectChange", item);
    },
    //获取列表
      getList() { 
        let param={}
        if(this.activityName){
          this.pageIndex = 1
          param.nameLike =this.activityName 
           param.pageIndex =1
        }
      if(this.type=='平台'){
         httpPost('ACTIVELIST',param).then(res=>{
            if (res.code == 200) {
            this.tableData = res.data
          }
        }) 
      }else if(this.type=='品牌'){
       
        httpPost('ACTIVEBANNER',param).then(res=>{
            if (res.code == 200) {
            this.tableData = res.data
          }
        }) 
      }else if(this.type=='商场'){
        
        httpPost('SHOPACTIVELISTS',param).then(res=>{
            if (res.code == 200) {
            this.tableData = res.data
          }
        }) 
      }
     
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