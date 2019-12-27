<!--
 * @Descripttion: 描述
 * @version: 版本
 * @Author: xiongbin
 * @Date: 2019-08-21 10:22:45
 * @LastEditors  : 1490251116@qq.com
 * @LastEditTime : 2019-12-23 14:09:49
 --> 
<template>
  <div class="xb">
    <div class="input_modal">
      <el-row style="padding:20px;display: flex; align-items: center">
        <el-col :span="12">
          <div class="grid-content bg-purple">运费设置>{{title}}</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light" style="text-align: right">
            <el-button type="primary" @click="handleBack()">返回</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="input_modal" style="padding:20px 0;">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="模板名称" required>
          <el-col :span="5">
            <el-form-item prop="frightName">
              <el-input type="text" v-model="ruleForm.frightName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="宝贝地址" required >
          <el-col :span="12" >
            <el-form-item prop="goodsAddress">
              <el-cascader
                class="cascader1"
                :options="options"
                v-model="ruleForm.goodsAddress"
                separator=""
                :props="{label:'value',value:'value'}"
                >
              </el-cascader> 
             </el-form-item>
          </el-col>
        </el-form-item> 
        <el-form-item label="是否包邮" prop="name">
          <el-radio v-model="isFreeShipping" label="n">自定义运费</el-radio>
          <el-radio v-model="isFreeShipping" label="y">卖家承担运费</el-radio>
        </el-form-item>
        <el-form-item label="计价方式" prop="name">
          <el-radio v-model="fightPriceType" label="ITEM">按件数</el-radio>
          <!-- <el-radio v-model="fightPriceType" label="WIGHT">按重量</el-radio> -->
          <!-- <el-radio v-model="fightPriceType" label=" BULKING">按体积</el-radio> -->
        </el-form-item>
        <el-form-item label="运输方式" prop="name">
          <el-col :span="5">
            <el-form-item prop="itemName">
              <div>
                <el-radio v-model="kd" label="1">快递</el-radio>
              </div>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label=" " prop="name" v-show="show">
          <el-col :span="16">
            <el-form-item prop="itemName">
              <div class="xbConent">
                 <div class="xbConentItem">
                   <div style="width:10%;text-align: center">默认运费</div>
                   <div style="width:5%;text-align: center"><input v-model="defaultPriceParamList.goodsNum" type="text"></div>
                   <div style="width:5%;text-align: center">件内</div>
                   <div style="width:5%;text-align: center"><input v-model="defaultPriceParamList.defaultPrice" type="text"></div>
                   <div style="width:15%;text-align: center">元，每增加</div>
                   <div style="width:5%;text-align: center"><input v-model="defaultPriceParamList.addGoodsNum" type="text"></div>
                   <div style="width:15%;text-align: center">件，增加运费</div>
                   <div style="width:5%;text-align: center"><input v-model="defaultPriceParamList.addDefaultPrice" type="text"></div>
                   <div style="width:10%;text-align: center">元</div>
                  <!-- <el-col :span="2">默认运费</el-col> -->
                   <!-- <el-col :span="2"><input v-model="defaultPriceParamList.goodsNum" type="text"></el-col> -->
                   <!-- <el-col :span="2" style=" text-align: center">件内</el-col> -->
                    <!-- <el-col :span="2"><input v-model="defaultPriceParamList.defaultPrice" type="text"></el-col> -->
                    <!-- <el-col :span="3" style=" text-align: center">元，每增加</el-col> -->
                    <!-- <el-col :span="2"><input v-model="defaultPriceParamList.addGoodsNum" type="text"></el-col> -->
                    <!-- <el-col :span="3" style=" text-align: center">件，增加运费</el-col> -->
                     <!-- <el-col :span="2"><input v-model="defaultPriceParamList.addDefaultPrice" type="text"></el-col> -->
                    <!-- <el-col :span="3" style=" text-align: center">元</el-col> -->
                 </div>
                 <div class="xbConentItemTable"> 
                    <el-table :data="tableData" style="width: 100%">
                      <el-table-column prop="date" label="运送到" width="280px;" >
                        <template slot-scope="scope">
                          <el-cascader
                            :options="options"
                            v-model="scope.row.addressName"
                            separator="" 
                             :props="{label:'value',value:'value'}"
                            >
                          </el-cascader>
                        </template>
                        
                      </el-table-column>
                      <el-table-column prop="name" label="  " > </el-table-column>
                      <el-table-column prop="name" label="首件（件）" >
                         <template slot-scope="scope">
                         <el-input type="text" v-model="scope.row.goodsNum" placeholder="请输入"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column prop="name" label="首费（元）" >
                        <template slot-scope="scope">
                         <el-input type="text" v-model="scope.row.defaultPrice" placeholder="请输入"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column prop="name" label="续件数（件）"  >
                        <template slot-scope="scope">
                         <el-input type="text" v-model="scope.row.addGoodsNum" placeholder="请输入"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column prop="name" label="续费（元）" >
                        <template slot-scope="scope">
                         <el-input type="text" v-model="scope.row.addDefaultPrice" placeholder="请输入"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column prop label="操作" width="200px">
                      <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="handleDeleteItem(scope.$index, tableData)">删除</el-button>
                      </template>
                    </el-table-column>
                    </el-table> 
                 </div>
              </div>
              <div class="xbBlue" @click="addCity">为指定地区城市设置运费</div>
            </el-form-item>
          </el-col>
        </el-form-item> 
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form> 
    </div>
  </div>
</template>

<script>
import { httpGet,httpPost ,httpPut} from "@/util/post";
import citydata from "@/util/citydata";
export default {
  name: "addShop",
  data() {
    return { 
      show:true,
      title:'新增运费模板',
      edit:0,//0新增，1编辑
      id:'',
      options:citydata,
      tableData:[ ],
      info:{},
      defaultPriceParamList:{
        defaultPrice:'',
        addGoodsNum:'',
        addDefaultPrice:'',
         isDefaultFright:'y'
      },
      kd:'1',
      isFreeShipping:'n',
      fightPriceType:'ITEM',
      sendTimeType: "", //发货时间
      ruleForm: {
        frightName: "",
        goodsAddress:[],
      },
      rules: {
        frightName: [
          { required: true, message: "请输入模板名称", trigger: "blur" }
        ],
        goodsAddress: [{ required: true, message: "请输入宝贝地址", trigger: "change" }],
      },
    };
  },
  watch:{
    isFreeShipping:{
      handler(n,o){
        if(n=='n'){
          this.show=true;
        }else{
          this.show=false;
        }
      },
       immediate: true
    }
  },

  mounted() {
    if(this.$route.query.id){
      this.edit=1;
      this.title='编辑运费模板'
      this.getList(this.$route.query.id)
    } 
  },
  components: {
    uploadOne: resolve => require(["@/components/upload/uploadOne"], resolve)
  },

  methods: {
    // 选择宝宝地址
    handleChange(e){
      console.log(e)
    },
    //添加城市
    addCity(){
      let obj={goodsNum:'',defaultPrice:'',addGoodsNum:'',addDefaultPrice:'',addressName:[],isDefaultFright:'n'};
      this.tableData.push(obj)
    },
    // 删除
    handleDeleteItem(index, rows){
      rows.splice(index, 1);
    },
    // 数组去空
    emip(arr){
      console.log(arr)
        let arr1=[]
      for (let i = 0; i < arr.length; i++) {
        if(arr[i]!==''){
          console.log(999)
          arr1.push(arr[i])
        }
      }
       return arr1;
    },
    getList(id){
      let params={id};
      httpGet("INSERTDTAIL",id).then(res=>{
        this.ruleForm.frightName=res.data.frightName ;
        this.isFreeShipping=res.data.isFreeShipping ;
        let arr=res.data.goodsAddress.split(' ')
        this.ruleForm.goodsAddress=this.emip(arr);
        this.id=res.data.id;
        let modelPriceList=res.data.modelPriceList;
        for (let i = 0; i < modelPriceList.length; i++) {
          if(modelPriceList[i].isDefaultFright=='y'){
            this.defaultPriceParamList=modelPriceList[i];
          }else{
            modelPriceList[i].addressName=modelPriceList[i].addressName.split(' ')
            this.tableData.push(modelPriceList[i])
          }
        }
        
        console.log(res)
      })
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {//填写成功
           let priceParamList=[];
           let falg=false;
           for (var i  in this.defaultPriceParamList) { // 如果不为空，则会执行到这一步，返回true
                if(this.defaultPriceParamList[i]==''){
                    falg=true;
                }
            }
            if(falg&&this.isFreeShipping=='n'){
                 this.$message({
                type: 'warning',
                message: '请完整填写默认运费!'
              })
              return;
            }
            priceParamList.push(this.defaultPriceParamList);
           let arr=JSON.parse(JSON.stringify(this.tableData));
           arr.forEach(item=>{
             item.addressName=item.addressName.join(' ');
             priceParamList.push(item)
           })
           let goodsAddress='';
           for (let i = 0; i < this.ruleForm.goodsAddress.length; i++) {
             goodsAddress+=' '+this.ruleForm.goodsAddress[i];
             
           }
           let params={
              frightName:this.ruleForm.frightName,
              goodsAddress,
              isFreeShipping:this.isFreeShipping,
              fightPriceType:this.fightPriceType,
              
            }
            if(this.isFreeShipping=='n'){
              params.priceParamList=priceParamList
            }
            if(this.edit==0){
              httpPost('INSERT',params).then(res=>{
              if(res.code==200){
                this.$message({
                type: 'success',
                message: '新增成功!'
              })
              setTimeout(()=>{
                this.$router.back()
              },500)
              }else{
                  this.$message({
                type: 'warning',
                message: '网络异常!'
              })
              } 
            })
            }else{//编辑 
              params.id=this.id;
              httpPut('INSERTUPDATE',params).then(res=>{
              if(res.code==200){
                this.$message({
                type: 'success',
                message: '编辑成功!'
              })
              setTimeout(()=>{
                this.$router.back()
              },500)
              }else{
                  this.$message({
                type: 'warning',
                message: '网络异常!'
              })
              } 
            })

            } 
          
          } else {//填写失败
            console.log('error submit!!');
            return false;
          }
        });
      }, 
    handleBack(){
      this.$router.back()
    }
  }
};
</script>
<style lang="scss" >
.xb{
    background: white;
}
.cascader1{
  width: 425px;
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
.el-form-item__label {
  text-align: left !important;
  width: 150px !important;
  padding-left: 20px;
}
.xbConent{
  border: 1px solid #ccc;
  .xbConentItem{
    display: flex;
    align-items: center;
    background: rgb(231, 240, 255);
    padding: 10px;
    box-sizing: border-box;
    span{
      margin: 0 5px;
    }
    input{
      width: 100%;
      height: 30px;
    }
  }
  .xbConentItemTable{
    .xbConentItemTableTop{
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span{
        margin-left: 20px;
      }
      input{
         width: 70px;
         margin: 0 10px;
         height: 30px;
      }
    }
  }
}
.xbBlue{
  color: rgb(64, 158, 255);
  cursor: pointer;
 
 
}
</style>
