<template>
  <div class="home">
    <el-container style="height:100%">
      <el-header class="header" style="height:70px">
        <header>
          <!-- <div class="header-left" @click="toHome">
                      <img src="../../assets/images/admin.png">
                      <span>XXXXX</span>
          </div>-->
          <span class="title">蜜蜂GO后台管理系统</span>
          <p class="min-title">欢迎{{userName}}登录后台管理系统!</p>
          <el-dropdown class="header-right" @command="handleCommand">
            <span class="el-dropdown-link">
              <!-- <img v-if="avatarUrl" :src="avatarUrl"> -->

              <img src="../../assets/images/default.png" />
              {{userName}}
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0">重置密码</el-dropdown-item>
              <el-dropdown-item command="1">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </header>
      </el-header>
      <el-container>
        <el-aside width="200" style="height:100vh">
          <el-menu
            style="height:100%;padding-top: 80px;"
            unique-opened
            :default-active="activeRouter"
            background-color="#fff"
            router
            text-color="#333"
          >
            <el-submenu
              v-for="(vOne) in routerPath"
              :key="vOne.id"
              :index="vOne.resourceCode.replace(':', '')"
            >
              <template slot="title">
                <span>{{vOne.name}}</span>
              </template>
              <template v-if="vOne.children.length">
                <div v-for="(vTwo) in vOne.children" :key="vTwo.id">
                  <el-submenu
                    :index="vTwo.resourceCode.replace(':', '')"
                    v-if="vTwo.children.length"
                  >
                    <template slot="title">{{vTwo.name}}</template>
                    <div v-for="(vThree) in vTwo.children" :key="vThree.id">
                      <el-submenu
                        :index="vThree.resourceCode.replace(':', '')"
                        v-if="vThree.children.length"
                      >
                        <template slot="title">{{vThree.name}}</template>
                      </el-submenu>
                      <el-menu-item
                        v-else
                        :index="vThree.resourceCode.replace(':', '')"
                      >{{vThree.name}}</el-menu-item>
                    </div>
                  </el-submenu>
                  <el-menu-item v-else :index="vTwo.resourceCode.replace(':', '')">{{vTwo.name}}</el-menu-item>
                </div>
              </template>
              <el-menu-item v-else :index="vOne.resourceCode.replace(':', '')">{{vOne.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
// import { routerPath } from "../../views/index/routerPath";
export default {
  data() {
    return {
      activeRouter: "",
      userName: "",
      avatarUrl: ""
    };
  },
  created() {
    this.getUserInfo().then(val => {
      this.getMenuList();
      this.getMenuResource();
    });
    let active = "/" + this.$router.currentRoute.path.split("/")[1];
    this.activeRouter = active;
  },
  computed: {
    ...mapState(["routerPath"])
  },
  updated() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user)
    this.userName = user.loginName;
    // this.avatarUrl = user.headImage;
    // this.$store.commit("upDate",{
    //       value: user.resourceCodeList,
    //       name: 'resourceCodeList'
    //     });
  },
  methods: {
    ...mapActions([
      "loginOut",
      "getMenuList",
      "getUserInfo",
      "getMenuResource"
    ]),
    handleCommand(command) {
      if (command == "1") {
        this.loginOut();
      } else {
        this.$router.push({
          name: "rechargePassword"
        });
      }
    }
    // toHome() {
    //   this.$router.push({
    //     name: "home"
    //   });
    // }
  },
  components: {},
  watch: {
    $route() {
      this.activeRouter = "/" + this.$router.currentRoute.path.split("/")[1];
    }
  }
};
</script>
<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
}

.content-headerbox {
  font-size: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #bbb;
  font-weight: 400;
  color: #101010;
}
.title {
  position: absolute;
  z-index: 1;
  font-size: 23px;
  text-align: center;
  line-height: 70px;
  color: #fff;
}
.min-title {
  float: left;
  margin-left: 250px;
  line-height: 70px;
  font-size: 14px;
  color: #fff;
  font-weight: 600;
}

#app {
  height: 100%;
}

.home {
  height: 100%;

  .header {
    background: #409eff;
    position: fixed;
    width: 100%;
    z-index: 999;

    img {
      height: 40px;
    }

    .header-left {
      float: left;
      margin: 15px;
      font-size: 32px;
      cursor: pointer;
      line-height: 48px;

      img {
        height: 50px;
        margin-right: 15px;
        float: left;
      }
    }

    .el-dropdown {
      float: right;
      margin: 17px 22px;
      font-size: 22px;
      color: #fff;
    }

    .el-dropdown-link {
      display: flex;
      display: flex;
      align-items: center;
      cursor: pointer;

      span {
        color: #fff;
      }

      p {
        color: #000;
      }

      img {
        background: #fff;
        position: relative;
        margin-right: 10px;
        width: 35px;
        height: 35px;
        border: 1px solid #eee;
        border-radius: 50%;
        -webkit-border-radius: 50%;
      }
    }
  }
}
</style>
<style>
.el-aside {
  width: 200px;
  position: fixed;
  /* margin-top: 70px; */
  z-index: 9;
  overflow-x: hidden;
}
.el-main {
  margin-left: 200px;
  margin-top: 70px;
  background: #edf3fc;
}
.el-submenu .el-menu-item {
  min-width: auto;
}

.pagination {
  text-align: center;
  margin-top: 0;
  padding: 50px 0;
  width: 100%;
  background-color: #fff;
  position: relative;
}
.warp {
  background-color: #fff;
  padding: 30px;
  min-height: 88vh;
}
.el-button--primary {
  background-color: #409eff;
  border-color: #409eff;
}

.editbox {
  padding-top: 20px;
}

.avater-icons {
  width: 58px;
  height: 58px;
  border-radius: 100px;
  display: inline-block;
  vertical-align: middle;
}

.el-table th,
.el-table td {
  text-align: center;
}

.el-form-item.is-success .el-input__inner,
.el-form-item.is-success .el-input__inner:focus,
.el-form-item.is-success .el-textarea__inner,
.el-form-item.is-success .el-textarea__inner:focus {
  border-color: #dcdfe6;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 108px;
  height: 108px;
  line-height: 108px;
  text-align: center;
}

.avatar {
  width: 108px;
  height: 108px;
  display: block;
}
.el-menu-item:hover {
  background-color: #409eff;
  color: #fff;
}
.el-menu-item.is-active {
  background-color: #409eff !important;
  color: #fff;
}
.title-box {
  background-color: #fff;
  height: 80px;
  margin-bottom: 10px;
}
.title-box .el-form-item,
.title-box .el-button {
  margin-top: 20px;
}
input[type="file"] {
  display: none;
}
.form-group input[type="file"] {
  display: block;
}
.t-title {
  border-left: 5px solid #606266;
  font-size: 16px;
  font-weight: 600;
  color: #606266;
  padding: 5px;
  margin: 10px 0;
}
.album {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
}
.addImg {
  position: relative;
  width: 120px;
}
.addImg img {
  width: 110px;
  height: 110px;
  margin-bottom: 10px;
}
.addImg .deleteIcon{
  position: absolute;
    right: 10px;
    top: -7px;
    color: red;
    font-weight: bold;
    border: 1px solid red;
    border-radius: 10px;
}
.addImg .delete {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 0;
  top: -12px;
}
.blue {
  color: #409eff;
}
.red {
  color: red;
}
.green {
  color: green;
}
.yellow {
  color: #ffbb00;
}
.left-btn{
  margin-left: 10px;
}
.right-btn{
  margin-right: 10px;
}
.flex{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.space-between{
 justify-content:space-between
}
.element::-webkit-scrollbar {display:none}
.el-loading-spinner .el-loading-text{
  font-size: 20px;
}
.el-loading-spinner i{
  font-size: 30px;
}
</style>