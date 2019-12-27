<template>
  <div class="bannerManage_warp">
    <el-card>
      <el-row class="bannerManage_row">
        <el-col :span="24">
          <el-button type @click="handleEdit('')">新增Banner</el-button>
        </el-col>
      </el-row>
      <el-row class="bannerManage_row">
        <el-col :span="24">
          <span>链接地址 </span> 
          <el-select v-model="formData.linkType">
            <el-option label="全部" value=" "></el-option>
            <el-option label="商场" value="SHOP"></el-option>
            <el-option label="品牌" value="GOODS"></el-option>
            <el-option label="商品" value="BRANCH"></el-option>
            <el-option label="活动" value="ACTIVITY"></el-option>
          </el-select>
          <el-button @click="getData">查询</el-button>
        </el-col>
      </el-row>
      <el-row class="bannerManage_row">
        <el-col :span="24">
          <el-table :data="tableData" border size="mini">
            <el-table-column prop="scope.$index" label="序号" width="180" type="index"></el-table-column>
            <el-table-column prop="date" label="banner图">
              <template slot-scope="scope">
                <img :src="scope.row.banner?scope.row.banner.imageUrl:''" :alt="scope.row.content" class="img"  style="width:75px"  />
              </template>
            </el-table-column>
            <el-table-column prop="linkType" label="链接地址"></el-table-column>
            <el-table-column prop="linkname" label="链接名称"></el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="footer_pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[10, 20, 30, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import pageMixins from "@/mixins/pageMixins";
import { httpPost,formDel,httpDel,httpPut ,strPut} from '@/util/post'
export default {
  name: "bannerManage",
  mixins: [pageMixins],
  data() {
    return {
      formData: {
        linkType:'',
      },
      tableData: []
    };
  },
  methods: {
    getData() {
      let parmes ={
        pageIndex:this.pageNum,
        pageSize:this.pageSize,
        linkType:this.formData.linkType
      }
      httpPost('BANNERLIST',parmes).then(rps=>{
        if(rps.code===200){
          this.tableData = rps.data;
          this.total = rps.count;
        }
      })
      // axios.get()
      httpPost('BANNERLIST',parmes).then(res=>{
        if (res.code == 200) {
        this.tableData = res.data
      }
      }) 
    },
    handleDelete(id) {
      this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          httpDel("BANNERDEL",id).then(res=>{
           if(res.code==200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
             this.getData()
            }
        }) 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    handleEdit(item) {
      if(item){
        this.$router.push({name:'addBannerManage',query:{id: item   || null}})
      }else{
        this.$router.push({name:'addBannerManage' })
      }
      
    }
  },
  created(){
    this.getData()
  }
};
</script>
<style lang="scss" scoped>
.bannerManage_warp {
  /deep/ .el-card__body {
    padding: 0;
  }
  .bannerManage_row {
    border-bottom: 1px solid #edf3fc;
    padding: 20px;
    .footer_pagination {
      text-align: center;
      padding: 10px;
    }
    .el-button {
      margin: 0 10px;
    }
    .img{
      width: 75px;
      max-width: 57px;
    }
  }
}
</style>