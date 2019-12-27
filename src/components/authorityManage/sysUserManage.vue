<template>
  <div class="content-list">
    <div class="screen-box">
      <el-form label-width="100px" class="title-box">
        <el-form-item label="昵称" class="lud">
          <el-input v-model="nicknameLike" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="手机号" class="lud">
          <el-input v-model="mobileLike" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="sex" placeholder="请选择" clearable>
            <el-option label="全部" value></el-option>
            <el-option label="男" value="n"></el-option>
            <el-option label="女" value="y"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否会员">
          <el-select
            v-model="vipEnable"
            placeholder="请选择"
            clearable
            style="width: 200px"
          >
            <el-option label="全部" value></el-option>
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="会员到期时间"
          class="lud"
          style="padding-left: 10px;"
        >
          <el-col :span="11">
            <el-date-picker
              type="datetime"
              placeholder="请选择"
              v-model="edateLt"
              style="width: 200px"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <div>
          <el-button class="left-btn" type="primary" @click="select"
            >查询</el-button
          >
        </div>
      </el-form>
    </div>
    <div class>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop label="头像">
          <template slot-scope="scope" v-if="avatar">
            <img :src="scope.row.avatar.imageUrl" class="pictureStyle" />
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">
            <span v-if="scope.row.sex == 'n'">男</span>
            <span v-if="scope.row.sex == 'y'">女</span>
          </template>
        </el-table-column>
        <el-table-column label="是否是会员">
          <template slot-scope="scope">
            <span v-if="scope.row.vipEnable == true">是</span>
            <span v-if="scope.row.vipEnable == false">否</span>
          </template>
        </el-table-column>
        <el-table-column prop="gmtCreated" label="注册时间"></el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.enable=='n'"
              size="mini"
              type="success"
              @click="enable(scope.row.id,scope.row.enable)"
              >启用</el-button
            >
            <el-button
             v-if="scope.row.enable=='y'"
             size="mini" type="success" @click="enable(scope.row.id,scope.row.enable)"
              >禁用</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next,jumper"
        :total="pageCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { httpPost, strPut, httpDel, httpPut ,strPost} from "../../util/post";
export default {
  data() {
    return {
      mobileLike: "", //手机号
      nicknameLike: "", //昵称
      sex: "", //性别
      vipEnable: "", //是否会员
      edateLt: "", //到期时间
      currentPage: 1,
      pageSize: 10,
      pageIndex: 1,
      pageCount: null,
      tableData: []
    };
  },
  created() {
    this.userList();
  },
  methods: {
    select() {
      this.currentPage = 1;
      this.pageIndex = 1;
      this.userList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.userList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.userList();
    },
    userList() {
      let param = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        mobileLike: this.mobileLike,
        nicknameLike: this.nicknameLike,
        sex: this.sex,
        vipEnable: this.vipEnable,
        edateLt: this.edateLt
      };
      httpPost("ADMINUSERPAGE", param).then(res => {
        if (!res) return;
        this.tableData = res.data;
        this.pageCount = res.count;
      });
    },
    enable(id,enable) {
      var text;
      if(enable=="y"){
        text='禁用'
      }
      if(enable=="n"){
         text='启用'
      }
      this.$confirm("确定"+text+"吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
           strPost("ADMINUSERENABLE", id + "/enable").then(res => {
            if (!res) return;
            this.$message.success(text+"成功");
            this.userList();
          });
        })
        .catch(() => {});
    }
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
.title-box {
  background-color: #fff;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  height: auto;
}
.content-list {
  .screen-box {
    margin: 10px 0;
  }
  .lud {
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
.pictureStyle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
