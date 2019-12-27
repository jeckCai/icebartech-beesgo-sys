// 优惠banner列表页面
<template>
  <div class="discount_banner_warp">
    <el-card class="card">
      <el-row class="card_row">
        <el-col :span="24">
          <el-button @click="handleEdit()">新增banner</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table border
                    :data="tableData">
            <el-table-column prop="scope.$index"
                             label="序号"
                             width="180"
                             type="index"></el-table-column>
            <el-table-column prop="date"
                             label="banner图">
              <template slot-scope="scope">
                <img :src="scope.row.banner.imageUrl"
                     class="img" />
              </template>
            </el-table-column>
            <el-table-column label="操作"
                             width="180">
              <template slot-scope="scope">
                <el-button size="mini"
                           @click="handleEdit(scope.row.id)">编辑</el-button>
                <el-button size="mini"
                           type="danger"
                           @click="handleDelete(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="currentPage"
                           :page-sizes="[10,20,30,40]"
                           layout="total, sizes, prev, pager, next,jumper"
                           :total="pageCount"></el-pagination>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { httpPost, strPut, httpDel, httpPut } from "../../util/post";
export default {
  name: "discountBanner",
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      pageIndex: 1,
      pageCount: null,
      tableData: []
    };
  },
  created () {
    this.bannerCouponList();
  },
  methods: {
    bannerCouponList () {
      let param = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      httpPost("BANNERCOUPON", param).then(res => {
        if (!res) return;
        this.tableData = res.data;
        this.pageCount = res.count;
      });
    },
    handleDelete (id) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          httpDel("BANNERCOUPONPUDATE", id).then(res => {
            if (!res) return;
            this.$message.success("删除成功");
            this.bannerCouponList()
          });
        })
        .catch(() => { });
    },
    handleEdit (id) {
      this.$router.push({
        path: "/discountsAddBanner",
        query: {
          cid: id || 0
        }
      });
    },
    handleSizeChange (val) {
      this.pageSize = val;
      this.bannerCouponList();
    },
    handleCurrentChange (val) {
      this.pageIndex = val;
      this.bannerCouponList();
    },
  }
};
</script>
<style lang="scss" scoped>
.discount_banner_warp {
  .card {
    .card_row {
      margin-bottom: 16px;
    }
    .img {
      width: 73px;
    }
    .footer_pagination {
      text-align: center;
      padding-top: 10px;
    }
  }
}
</style>