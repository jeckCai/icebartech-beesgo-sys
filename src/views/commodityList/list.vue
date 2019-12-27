<!--
 * @Descripttion: 描述
 * @version: 版本
 * @Author: xiongbin
 * @Date: 2019-08-21 10:22:45
 * @LastEditors: 1490251116@qq.com
 * @LastEditTime: 2019-11-26 13:57:39
 --> 
<template>
  <div class="xb">
    <div class="input_modal">
      <el-button type="primary"  @click="handleAddAccount">新增商品属性</el-button>
    </div>
    <div class="input_modal">
      <div class="input-item">
        <span>分类</span>
        <el-input
          v-model="provinceNameLike"
          placeholder="请输入"
          class="proName"
          @keyup.enter.native="getList"
        />
      </div>
      <div class="input-item">
        <span>商品属性</span>
        <el-input
          v-model="modelNameLike"
          placeholder="请输入"
          class="proName"
          @keyup.enter.native="getList"
        />
      </div>
      <el-button type="primary"  @click="getList">查询</el-button>
    </div>
    <div class="table_con">
      <el-table :data="tableData">
        <el-table-column :formatter="formatter" type="index" width="180px" label="序号"/>
        <el-table-column :formatter="formatter" prop="parentCategoryName" label="分类">
           <template slot-scope="scope">
            <span>{{scope.row.parentCategoryName}}--{{scope.row.childCategoryName}} </span>
          </template>
        </el-table-column>
        <el-table-column :formatter="formatter" prop="modelName" label="商品属性"/>
        <el-table-column  prop="modelName" label="名称">
          <template slot-scope="scope">
            <span v-for="(item,i) in scope.row.valueList" :key="i">{{item.attributeValue}}&nbsp;&nbsp;&nbsp;</span>
          </template>
        </el-table-column>
        <el-table-column prop label="操作" width="200px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleShowModal(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDeleteItem(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog   title="新增商品属性" :visible.sync="isAddCityModal" width="30%" v-if="isAddCityModal">
      <div class="modal_input">
         <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm ruleForm"
        >
          <el-form-item label="请选择"  prop="parentCategoryId" required>
            <!-- <el-select v-model="ruleForm.parentCategoryId" placeholder="请选择">
              <el-option
                v-for="item in top_list"
                :key="item.id"
                :label="item.categoryName"
                :value="item.id">
              </el-option>
            </el-select> -->
            <el-cascader
             :options="categoryTree"
             :props="{ value: 'id', label: 'categoryName'}"
              v-model="ruleForm.parentCategoryId"
              @change="handleChange">
          </el-cascader>
          </el-form-item>
          <el-form-item label="属性名称"  prop="modelName" required>
                <el-input
                  v-model="ruleForm.modelName"
                  placeholder="请输入"
                  class="proName"
                />
          </el-form-item>
           <el-form-item label=" " v-for="(item,i) in AcbitLists" :key="i">
                <el-input
                  v-model="item.attributeValue"
                  placeholder="请输入"
                  class="proName"
                /> <span class="icon-xinzeng iconfont" style="margin-left:8px" @click="addItem(i)"></span>
                 <span class="icon-shanchu iconfont "  style="margin-left:8px;color:red" @click="delItem(i)"></span>
          </el-form-item>

          <!-- <el-form-item label=" "  >
              <el-button @click="addAcbit">添加属性</el-button>
          </el-form-item>
            <div v-for="(item,i) in AcbitList" :key="i">
            <el-form-item label="名称" required >
                <el-input
                  v-model="item.attributeValue"
                  placeholder="请输入"
                  class="proName"
                />
                <span class="icon-shanchu iconfont "  style="margin-left:8px;color:red" @click="delItem(i)"></span>
            </el-form-item>
            <el-form-item label=" "  v-for="(items,j) in item.acbit" :key="j">
                <el-input v-model="items.attributeValue" placeholder="请输入" class="proName"  />
                <span class="icon-xinzeng iconfont" style="margin-left:8px" @click="addItem(i)"></span>
            </el-form-item>
            </div> -->

         </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isAddCityModal = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog> 
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageIndex"
        :page-size="pageSize"
        :page-sizes="[10,20,30,40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import { httpPost,formDel,httpPut } from '@/util/post'

export default {
  name: 'account-list',
  data() {
    return {
      categoryTree:[],//分类
      AcbitList:[
        {attributeValue:'',acbit:[
          {attributeValue:''}
        ]} 
      ],
      AcbitLists:[
        {attributeValue:''}, 
      ],
      insert:0,
      top_list:[], 
      modelNameLike:'', 
      provinceNameLike : null,
      departmentLike  : null,
      mobileLike  : null,
      nameLike  : null, 
      id: null,
      inputName: null,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      isAddCityModal: false,
      ruleForm: {
        parentCategoryId: [],
        goodsAddress: "",
        modelName:'',
      },
      rules: {
        parentCategoryId: [
          { required: true, message: "请输入模板名", trigger: "blur" }
        ],
        modelName: [
          { required: true, message: "请输入属性名", trigger: "blur" }
        ],
      },
    }
  }, 

  mounted() {
    this.getList()
    this.getCategory()
  },

  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 格式化元素，当为空的时候显示 "- -"
    formatter(row, column, cellValue) {
      return cellValue || '- -'
    },
    // 新增商品属性
    handleAddAccount(){
      this.isAddCityModal=true;
      this.insert=0;
      this.ruleForm.parentCategoryId=[]
      this.ruleForm.modelName=''
      this.AcbitLists=[
        {attributeValue:''},
      ]

    },
    //选择分类
    handleChange(e){
      console.log(e)
    },
     // 获取商品分类树形列表
    getCategory(){
        httpPost('CATEGORYTREE',).then(res=>{
          if (res.code == 200) {
             this.categoryTree = res.data;
         }
      }) 
    },
    //获取列表
      getList() {
      const param = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      if(this.modelNameLike){
        this.pageIndex = 1
        param.modelNameLike=this.modelNameLike
      }  
      if(this.nameLike  ){
        this.pageIndex = 1
        param.nameLike  =this.nameLike  
      }
      httpPost('ATTRIBUTE',param).then(res=>{
        if (res.code == 200) {
        this.tableData = res.data
        this.total = res.count
      }
      }) 
      httpPost('TOP_LIST',{}).then(res=>{
        if (res.code == 200) {
        this.top_list = res.data
      }
      }) 
    },
    //添加属性
    addAcbit(){
      let obj={attributeValue:'',acbit:[ {attributeValue:''}]};
      this.AcbitList.push(obj)
    },
    //删除单个属性
    delItem(i){
      
      let AcbitLists= JSON.parse(JSON.stringify(this.AcbitLists))
      if(AcbitLists.length==1)return;
      AcbitLists.splice(i,1)
      this.AcbitLists=AcbitLists
      // let AcbitList= JSON.parse(JSON.stringify(this.AcbitList))
      // AcbitList.splice(i,1)
      // this.AcbitList=AcbitList
    },
    //新增单个属性
    addItem(i){
      // let AcbitLists= JSON.parse(JSON.stringify(this.AcbitLists))
      // AcbitLists.forEach(item => {
      //   if(JSON.stringify(item)==JSON.stringify(AcbitLists[i])){
      //     item.push({attributeValue:''})
      //   }
      // });
      this.AcbitLists.push({attributeValue:""}); 
      // let AcbitList= JSON.parse(JSON.stringify(this.AcbitList))
      // AcbitList.forEach(item => {
      //   if(JSON.stringify(item)==JSON.stringify(AcbitList[i])){
      //     item.acbit.push({attributeValue:''})
      //      console.log(JSON.stringify(item))
      //   }
      // });
      // this.AcbitList=AcbitList; 
    },
    //提交账号
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let attributeValues=[]
            this.AcbitLists.forEach(item=>{
              if(item.attributeValue!=''){
               attributeValues.push(item.attributeValue)
              }
            })
            if(attributeValues.length==0){
              this.$message({
                type: 'warning',
                message: '请填写属性'
              })
              return;
            }
            let params={
              attributeValues:attributeValues,
              modelName:this.ruleForm.modelName,
              parentCategoryId:this.ruleForm.parentCategoryId[1],
            } 
            if(this.insert==0){
              httpPost('ATTRIBUTESAVE',params).then(res=>{
              if(res.code==200){
                this.$message({
                type: 'success',
                message: '新增成功'
              })
              this.isAddCityModal=false;
              this.getList()
              }else{
                this.$message({
                type: 'warning',
                message: '网络错误'
              })
              }
            }) 
            }else{ 
              params.id=this.id;
              params.attributeValues=this.AcbitLists;
              httpPut('ATTRIBUTEUPDATE',params).then(res=>{
              if(res.code==200){
                this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.isAddCityModal=false;
              this.getList()
              }else{
                this.$message({
                type: 'warning',
                message: '网络错误'
              })
              }
            }) 
            }
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }, 
    //编辑
     handleShowModal(e) {
      this.insert=1;
      this.isAddCityModal=true;
      this.ruleForm.modelName=e.modelName
      this.ruleForm.parentCategoryId=e.parentCategoryId
      this.id=e.id;
      if(e.valueList.length!=0){
        this.AcbitLists=[]
        e.valueList.forEach(item=>{
          let obj={attributeValue:item.attributeValue,id:item.id}
          this.AcbitLists.push(obj)
        })
      }
      console.log(e)
    }, 

      handleDeleteItem(id) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then( ()=>{
        let params={id}
        formDel("ATTRIBUTEDEL",params).then(res=>{
          if(res.code==200){
             this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList()
          }else{
            this.$message({
              type: 'warning',
              message: '网络错误'
            })
          }
          console.log(res)
        })
      }
      )
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },

    handleCurrentChange(val) {
      this.pageIndex = val
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
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
// .del{
//   position: absolute;
//   right: 54px;
//   top: -16px;
// }
</style>
