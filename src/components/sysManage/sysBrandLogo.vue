<template>
  <div>
    <div class="input_modal">
      <el-button type="primary" @click="addOrEdit()">新增品牌LOGO</el-button>
    </div>
    <div class="input_modal">
      <div class="input-item">
        <span>品牌名称</span>
        <el-input
          v-model="branchNameLike"
          placeholder="请输入"
          class="proName"
          @keyup.enter.native="getList"
        />
      </div>
      <el-button type="primary" style="margin-left:20px" @click="getList"
        >查询</el-button
      >
    </div>
    <div class="table_con">
      <el-table :data="tableData">
        <el-table-column
          prop="brandName"
          width="180px"
          label="品牌名称"
        ></el-table-column>
        <el-table-column label="LOGO">
          <template slot-scope="scope">
            <img :src="scope.row.logoImageInfo.imageUrl" class="img" />
          </template>
        </el-table-column>
        <el-table-column prop="gmtCreated" label="创建时间"></el-table-column>
        <el-table-column prop label="操作" width="200px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="addOrEdit(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDeleteItem(scope.row.id, scope.row.brandName)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageIndex"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import { httpPost, formDel,httpGet } from "@/util/post";
export default {
  name: "account-list",
  data() {
    return {
      branchNameLike: "",
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      tableData: []
    };
  },

  mounted() {
    this.getList();
  },

  methods: {
    // 新增编辑
    addOrEdit(cid) {
      this.$router.push({
        name: "sysAddBrandLogo",
        query: {
          cid: cid || 0
        }
      });
    },
    //获取列表
    getList() {
      const param = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      if (this.branchNameLike) {
        this.pageIndex = 1;
        param.branchNameLike = this.branchNameLike;
      }
      httpPost("SHOPLOGOPAGE", param).then(res => {
        if (res.code == 200) {
          this.tableData = res.data;
          this.total = res.count;
        }
      });
    },
    handleDeleteItem(id, name) {
      this.$confirm(`确定删除${name}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(id,name)
          httpGet("SHOPLOGODELETE", id).then(res => {
            if (!res) return;
            this.$message.success("删除成功");
            this.getList();
          });
        })
        .catch(() => {});
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },

    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    }
  }
};
</script>
<style lang="scss" scoped>
.input_modal {
  background: white;
  padding: 10px;
  display: flex;
  margin-bottom: 10px;
  .input-item {
    display: flex;
    span {
      flex-shrink: 0;
      text-align: center;
      align-items: center;
      display: flex;
      margin-right: 5px;
    }
  }
}
.modal_input {
  display: inline-block;
  margin-right: 20px;
  clear: both;
  height: 50px;
  line-height: 50px;
  position: relative;
  .el-input {
    width: 168px;
  }
}
.img {
  width: 73px;
}
</style>
