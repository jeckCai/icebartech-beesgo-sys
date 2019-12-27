
// 商品
<template>
  <div class="content">
    <el-row>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
        <el-form-item label="商场名">
         <el-select v-model="shopId" placeholder="请选择" @change="getList">
            <el-option v-for="(item, i) in shopList"  :key="i" :label="item.shopName" :value="item.id"></el-option> 
          </el-select>
        </el-form-item>
        <el-form-item label="品牌">
          <el-select v-model="branchNo" placeholder="请选择" @change="getList">
             <el-option v-for="(item, i) in brandList"  :key="i" :label="item.branchName" :value="item.id"></el-option> 
          </el-select>
        </el-form-item>
        <el-form-item label="商品名">
          <el-input v-model="itemNameLike" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-table border :data="tableData" size="mini">
        <el-table-column prop="shopName" label="商场名"></el-table-column>
        <el-table-column prop="branchNo" label="店铺号"></el-table-column>
        <el-table-column prop="branchName" label="品牌名"></el-table-column>
        <el-table-column prop="itemName" label="商品名"></el-table-column>
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
      itemNameLike:'',
      shopList:[],
      shopId:'',
      brandList:[],
      branchNo:'',
      formInline: {},
      tableData: [
        {
          imageUrl:
            "http://n.sinaimg.cn/news/1_img/upload/cf3881ab/66/w1000h666/20191128/14bf-iixnuaa0514900.jpg",
          name: "我是活动",
          starttime: 1235123123123,
          endtime: 1231231212313
        }
      ]
    };
  },
  mounted(){
    this.getList();
    this.getSgopList();
    this.getBrandList();
  },
  methods: {
    getSgopList() {
      let param = {};
      // if(this.shopNameLike ){
      //   this.pageIndex = 1
      //   param.shopNameLike =this.shopNameLike
      // }
      httpPost("SHOPLISTS", param).then(res => {
        if (res.code == 200) {
          let obj={
            shopName:'全部',
            id:''
          } 
          this.shopList = res.data; 
          this.shopList.unshift(obj)
          console.log(this.shopList)
        }
      });
    }, 
    onSubmit() {},
    selectItem(item) {
      this.$emit("selectChange", item);
    },
    //获取列表
      getList() { 
        let param={
          pageIndex:1,
          pageSize:9999,
        }
      if(this.itemNameLike ){
        this.pageIndex = 1
        param.itemNameLike =this.itemNameLike 
      } 
       if(this.shopId ){
        this.pageIndex = 1
        param.shopId =this.shopId;
        this.getBrandList(this.shopId);
      }else{
        this.getBrandList('');
      } 
      if(this.branchNo ){
        this.pageIndex = 1
        param.branchNo =this.branchNo 
      } 
      httpPost('GOODSLIST',param).then(res=>{
        if (res.code == 200) {
        this.tableData = res.data
      }
      }) 
    },
    //获取列表
      getBrandList(shopId) { 
      let param={}
      if(shopId){
        param.shopId=shopId
      }  
      httpPost('BRANCHS',param).then(res=>{
        if (res.code == 200) { 
          console.log(res.data)
        this.brandList = res.data
      }
      }) 
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