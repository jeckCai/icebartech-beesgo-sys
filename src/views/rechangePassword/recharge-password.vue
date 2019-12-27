<template>
  <div class="wrap">
    <div class="login-wrap">
      <div class="login-title">蜜蜂GO品牌管理系统-重置密码</div>
      <div id="darkbannerwrap"></div>
      <input type="text" @keyup.enter="login" v-model="oldPassword" placeholder="旧密码">
      <input type="password" @keyup.enter="login" v-model="password" placeholder="新密码">
      <input type="password" @keyup.enter="login" v-model="confirmNewPWD " placeholder="确认新密码" @keyup.exact="confirmPass">
      <div class="login-tips" v-if="tipToggle">两次输入不一致</div>
      <div class="login-button">
        <button class="btn btn-primary" type="button" @click="login">确认修改</button>
      </div>
    </div>
  </div>
</template>

<script>
import {httpPost,formPost} from '../../util/post'
  export default {
    name: 'login',
    data() {
      return {
        oldPassword: '',
        password: '',
        confirmNewPWD: '',
        tipToggle: false
      }
    },
    methods: {
      login() {
        let param = {
          oldPWD: this.oldPassword,
          newPWD: this.password,
          confirmNewPWD: this.confirmNewPWD,
          sessionId: sessionStorage.getItem('sessionId')
        }

        formPost('UPDUSERPWD',param)
          .then(res => {
            if (!res) return;
            this.$message({
              type: 'success',
              message: '密码修改成功!'
            });
            setTimeout(() => {
              this.$router.push({
                name: "login"
              });
            }, 2000)
          })
      },
      confirmPass() {
        if (this.password == this.confirmNewPWD) {
          this.tipToggle = false;
        } else {
          this.tipToggle = true;
        }
      }
    }
  }
</script>

<style scoped>
  .wrap {
    height: 100%;
    background: url(../../assets/images/bg.jpg) no-repeat center;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    z-index: 999;
  }

  .login-wrap {
    position: relative;
    top: 150px;
    margin: 0px auto 0 auto;
    min-height: 420px;
    max-width: 420px;
    padding: 40px;
    background-color: #ffffff;
    margin-left: auto;
    margin-right: auto;
    border-radius: 4px;
    /* overflow-x: hidden; */
    box-sizing: border-box;
  }

  .login-title {
    margin: 10px 0 0 -58px;
    padding: 18px 10px 18px 60px;
    background:rgba(0, 153, 255, 1);
    position: relative;
    color: #fff;
    font-size: 16px;
  }

  #darkbannerwrap {
    background: url(../../assets/images/aiwrap.png);
    width: 18px;
    height: 10px;
    margin: 0 0 20px -58px;
    position: relative;
  }

  input[type=text],
  input[type=file],
  input[type=password],
  input[type=email],
  select {
    border: 1px solid #DCDEE0;
    vertical-align: middle;
    border-radius: 3px;
    height: 50px;
    padding: 0px 16px;
    font-size: 14px;
    color: #555555;
    outline: none;
    width: 90%;
    margin-bottom: 25px;
    box-sizing: content-box;
  }

  .login-tips {
    margin-top: -20px;
    margin-bottom: 20px;
    text-align: right;
    font-size: 12px;
    color: red;
  }

  .login-button button {
    padding: 12px 24px;
    margin: 0px;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    width: 100%;
    cursor: pointer;
    color: #ffffff;
    background-color: rgba(0, 153, 255, 1);
    border-radius: 3px;
    border: none;
  }
</style>