<template>
  <div class="content-list">
    <div class="screen-box">
      <el-form label-width="80px" class="title-box">
        <el-form-item label="商场名" class="lud">
          <el-input v-model="queryData.shopNameLike" placeholder="请输入"></el-input>
        </el-form-item>
         <el-form-item label="品牌名" class="lud">
          <el-input v-model="queryData.branchNameLike" placeholder="请输入"></el-input>
        </el-form-item>
        <!-- <el-form-item label="蜜蜂态" style="float:left;">
          <el-select v-model="queryData.beesStatus" placeholder="请选择" clearable>
            <el-option label="全部" value=""></el-option>
            <el-option label="空闲" value="IDLE"></el-option>
            <el-option label="在线" value="BUSY"></el-option>
          </el-select>
        </el-form-item> -->
        <div style="float: left">
          <el-button class="left-btn" type="primary" @click="select">查询</el-button>
        </div>
      </el-form>
    </div>
    <div class>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="shopName" label="商场名" ></el-table-column>
        <el-table-column prop="branchName" label="品牌名" ></el-table-column>
        <el-table-column prop="truename" label="蜜蜂名称" ></el-table-column>
        <el-table-column prop="salesAmout" label="销售额" />
        <el-table-column prop="salesCount" label="销售笔数" />
        <el-table-column prop="responseCount" label="响应次数" />
        <el-table-column prop="workHours" label="工作时长" />
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20,30,40]"
        layout="total, sizes, prev, pager, next,jumper"
        :total="pageCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { httpPost, strPut } from "../../util/post";
export default {
  data() {
    return {

      currentPage: 1,
      pageCount: null,
      tableData: [],
      queryData:{
        	beesStatus: "", // 蜜蜂状态
          branchNameLike: "", // 品牌名称
          shopNameLike: "", // 商场名称
          pageIndex: 1,
          pageSize: 10,
        
      }
    };
  },
  created() {
    this.beeList();
  },
  methods: {
    select() {
      this.queryData.currentPage = 1;
      this.queryData.pageIndex = 1;
      this.beeList();
    },
    handleSizeChange(val) {
      this.queryData.pageSize = val;
      this.beeList();
    },
    handleCurrentChange(val) {
      this.queryData.pageIndex = val;
      this.beeList();
    },
    beeList() {
      httpPost("BEELIST", this.queryData).then(res => {
        if (!res) return;
        this.tableData = res.data;
        this.pageCount = res.count;
      });
    },
  }
};
</script>

<style lang="scss">
.add-box {
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
  border-bottom: 1px solid rgba(187, 187, 187, 1);
  align-items: center;
}
.content-list {
  .screen-box {
    margin: 10px 0;
  }
  .lud {
    float: left;
    text-align: center;
  }
  .lud-select {
    width: 100px;
  }
}
.el-button--primary {
  background-color: #409eff;
  border-color: #409eff;
}
</style>
