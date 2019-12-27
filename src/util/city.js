/*
 * @Descripttion: 描述
 * @version: 版本
 * @Author: xiongbin
 * @Date: 2019-11-18 14:18:39
 * @LastEditors: 1490251116@qq.com
 * @LastEditTime: 2019-11-18 19:56:22
 */
 let city=[{
    value: '广东省',
    label: '1',
    children: [{
      value: '深圳市',
      label: '深圳市',
      children: [{ value: '宝安区', label: '宝安区' } ]
    } ]
  }, 
   {
      value: '贵州省',
      label: '贵州省',
      children: [{
        value: '贵阳市',
        label: '贵阳市',
        children:[ { value: '花果园', label: '花果园' } ]
      }]
    } ,
   {
    value: '福建省',
    label: '福建省',
    children: [{
      value: '莆田市',
      label: '莆田市',
      children: [{ value: '城厢区', label: '城厢区' } ] 
    }]
  }]
  export default city;