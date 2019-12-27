/*
 * @Description: 常用表单验证
 * @Author: weizhengda
 * @Date: 2019-11-15 11:12:41
 * @LastEditTime: 2019-11-15 11:56:32
 * @LastEditors: weizhengda
 */



// 手机号码
export function validateMobilePhone (rule, value, callback){
    if (value === '') {
      callback(new Error('请输入手机号码'));
    } else {
      if (value !== '') { 
        var reg=/^1[3456789]\d{9}$/;
        if(!reg.test(value)){
          callback(new Error('请输入正确的的手机号码'));
        }
      } 
      callback();
    }
  };

// 固定电话

export function validateTel (rule, value, callback) {
    if (value === '') {
      callback(new Error('请输入固定电话'));
    } else {
      if (value !== '') { 
        var reg =/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
        if(!reg.test(value)){
          callback(new Error('请输入正确的固定电话'));
        }
      }
      callback();
    }
  };

// 邮箱验证
export function validateEmail (rule, value, callback) {
    if (value === '') {
      callback(new Error('请输入邮箱'));
    } else {
      if (value !== '') { 
        var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if(!reg.test(value)){
          callback(new Error('请输入正确的邮箱'));
        }
      }
      callback();
    }
  };

// 身份证号码验证
export function validateIdCard (rule, value, callback) {
    if (value === '') {
      callback(new Error('请输入身份证号码'));
    } else {
      if (value !== '') { 
        var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
        if(!reg.test(value)){
          callback(new Error('请输入正确的身份证号码'));
        }
      }
      callback();
    }
  };

//   微信号验证
export function validateWechat (rule, value, callback) {
    if (value === '') {
      callback(new Error('请输入微信号'));
    } else {
      if (value !== '') { 
        var reg= /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/;
        if(!reg.test(value)){
          callback(new Error('请输入正确的微信号'));
        }
      }
      callback();
    }
  };

