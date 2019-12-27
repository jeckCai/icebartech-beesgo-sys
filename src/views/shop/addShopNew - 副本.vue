<!--
 * @Descripttion: 描述
 * @version: 版本
 * @Author: xiongbin
 * @Date: 2019-08-21 10:22:45
 * @LastEditors  : 1490251116@qq.com
 * @LastEditTime : 2019-12-25 19:06:31
 --> 
<template>
  <div class="xb">
    <div class="input_modal">
      <el-row style="padding:20px ;display: flex; align-items: center">
        <el-col :span="12">
          <div class="grid-content bg-purple">商品管理>新增商品</div>
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
        :model="formData"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        label-position="right"
        class="demo-ruleForm"
      >
        <el-form-item label="分类" prop="categoryId" required>
          <el-cascader
            :disabled="disabled"
            :options="categoryTree"
            :props="{ value: 'id', label: 'categoryName'}"
            v-model="formData.categoryId"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="封面图" prop="indexKey" required>
          <uploadOne
            :clear="false"
            :imgUrl.sync="formData.indexUrl"
            :autoCropWidth="335"
            :autoCropHeight="390"
            :isShowImg="true"
            @upLoadSuccess="v=>{formData.indexKey =v.fileKey}"
          ></uploadOne>
        </el-form-item>
        <el-form-item label="商品图" prop="imageUrls" required>
          <template v-if="formData.imageUrls.length!==0">
            <el-col
              style="width:130px;height:100px;"
              :span="2"
              v-for="(item,i) in formData.imageUrls"
              :key="i"
            >
              <div class="remove addImg">
                <uploadOne
                  :clear="false"
                  :keyIndex="i"
                  :isShowImg="true"
                  :imgUrl.sync="item.fileUrl||item.imageUrl"
                  @deleteImg="deleteFalseImg"
                  @upLoadSuccess="v=>{item.fileKey=v.filekey,item.imageKey=v.fileKey}"
                ></uploadOne>
                <i class="el-icon-close deleteIcon" @click="remove(i)"></i>
              </div>
            </el-col>
          </template>
          <el-col :span="4" v-show="formData.imageUrls.length<9">
            <uploadOne :clear="false" @upLoadSuccess="getMoreKey"></uploadOne>
          </el-col>
        </el-form-item>
        <el-form-item label="商品名" prop="itemName" required>
          <el-col :span="5">
            <el-form-item>
              <el-input type="text" v-model="formData.itemName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="蜂蜜">
          <el-col :span="5">
            <el-form-item>
              <el-input type="number" v-model="formData.honey" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="价格" prop="price" required>
          <el-col :span="5">
            <el-form-item>
              <el-input type="number" v-model="formData.price" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="划线价" prop="markingPrice" required>
          <el-col :span="5">
            <el-form-item>
              <el-input type="number" v-model="formData.markingPrice" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="商品条码">
          <el-col :span="5">
            <el-form-item>
              <el-input type="text" v-model="formData.itemNo" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="商品详情" prop="info" required>
          <el-col :span="12">
            <el-form-item>
              <bgEditor
                :minHeight="500"
                :content="formData.info"
                @editorData="handleEditorContent"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="商品颜色" required label-width="120px">
          <el-form-item
            :label="item.modelName"
            prop="size"
            style="text-align: left;"
            v-for="(item,i) in tableDatas"
            :key="i"
            v-show="item.modelName=='颜色'"
          >
            <div class="valueList">
              <el-checkbox :label="items.attributeValue" :checked="items.ischeckd" v-model="items.ischeckd" v-for="(items,index) in item.valueList" :key="index" @change="handleCheckedColorChange(items)"></el-checkbox>
            </div>
          </el-form-item>
        </el-form-item>-->
        <el-form-item label="选择商品属性" required label-width="120px">
          <div class="checkbox_test">
            <div class="div_contentlist">
              <ul class="Father_Title" v-for="(item,i) in tableDatas"  :key="i">
                  <li class="li_modelName">{{item.modelName}}</li>
                  <ul :class="'Father_Item'+i">
                    <li class="li_width" v-for="(items,index) in item.valueList" :key="index">
                      <label @change="Creat_Table">
                        <input type="checkbox" class="chcBox_Width" :value="items.attributeValue" />
                        {{items.attributeValue}}
                        <span class="li_empty"></span>
                      </label>
                    </li>
                  </ul>
              </ul>
            </div>
            <!-- <el-form-item
              :label="item.modelName"
              prop="size"
              style="text-align: left;"
              v-for="(item,i) in tableDatas"
              :key="i"
              :class="'Father_Item'+i"
            >
              <li class="li_width" v-for="(items,index) in item.valueList" :key="index">
                <label @change="Creat_Table">
                  <input type="checkbox" class="chcBox_Width" :value="items.id" />
                  {{items.attributeValue}}
                  <span class="li_empty"></span>
                </label>
              </li> -->
              <!-- <el-checkbox :data-checkId="items.id" :label="items.attributeValue" :checked="items.ischeckd" v-model="items.ischeckd" v-for="(items,index) in item.valueList" :key="index" @change="handleCheckedSizeChange(items)"></el-checkbox> -->
            <!-- </el-form-item> -->
          </div>
        </el-form-item>
        <el-form-item label="库存管理"></el-form-item>
        <!-- <el-table :data="formData.models1" style="width: 100%" size="small">
          <el-table-column fixed prop="date" label="图片" width="150">
            <template slot-scope="scope">
              <uploadOne
                :clear="false"
                :imgUrl.sync="scope.row.imgUrl"
                :isShowImg="true"
                @upLoadSuccess="v=>{scope.row.goodsSkuKey =v.fileKey}"
              ></uploadOne>
            </template>
          </el-table-column>
          <el-table-column
            prop="attributeValue"
            :label="item.modelName"
            width="120"
            v-for="(item,i) in tableDatas"
            :key="i"
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.attributeValueIds[i]"
                placeholder="请选择"
                :disabled="scope.row.id?true:false"
              >
                <el-option
                  v-for="items in item.valueList"
                  :key="items.id"
                  :label="items.attributeValue"
                  :value="items.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="modelStock"
            label="库存数量"
            :render-header="renderHeaderStock"
            width="180"
          >
            <template slot-scope="scope">
              <el-input type="number" v-model="scope.row.stock"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="salePrice"
            label="价格"
            :render-header="renderHeaderStock"
            width="180"
          >
            <template slot-scope="scope">
              <el-input type="number" v-model="scope.row.salePrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="markingPrice"
            label="划线价"
            :render-header="renderHeaderStock"
            width="180"
          >
            <template slot-scope="scope">
              <el-input type="number" v-model="scope.row.markingPrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop label="操作" width="280px">
            <template slot-scope="scope">
              <el-button
                type="danger"
                :disabled="scope.row.id?true:false"
                size="mini"
                @click="handleDeleteItem(scope.$index, formData.models1)"
              >删除</el-button>
              <el-button type="danger" size="mini" @click="handleAddeteItem()">添加</el-button>
            </template>
          </el-table-column>
        </el-table> -->
        <div class="createTable" id="createTable"></div>
        <el-form-item label="选择运费" style="margin-top:30px;" prop="frightId" required>
          <el-select v-model="formData.frightId" placeholder="从运费设置中选择">
            <el-option
              :label="item.frightName"
              :value="item.id"
              v-for="(item,index) in firghtList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">{{this.edit==0?'提交审核':'保存'}}</el-button>
          <!-- <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <el-dialog :title="title" :visible.sync="upstockVisible" width="20%" center>
      <div>
        <el-input type="number" v-model="upstockNum"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="upstockVisible = false">取 消</el-button>
        <el-button type="primary" @click="upstockSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { httpPost, httpGet, httpPut } from "@/util/post"; //

export default {
  name: "addShop",
  data() {
    return {
      type: "",
      title: "",
      upstockNum: 0, //修改库存数量
      upstockVisible: false, //修改库存弹窗
      disabled: false,
      edit: 0, //新增0编辑1
      sku: "", //商品编辑sku
      id: "", //商品id
      info: "",
      checkedColor: [],
      radio: "1",
      tableData: [], //商品属性
      tableDatas: [], //动态商品属性
      categoryTree: [], // 商品分类树形结构
      firghtList: [], // 邮费模板列表
      formData: {
        branchNo: 1, // 店铺编号
        categoryId: [], // 商品分类id
        indexKey: "",
        indexUrl: "", // 封面图
        imageUrls: [], //商品图
        itemName: "", // 商品名称
        honey: "", // 蜂蜜
        models: [], // 商品SKU
        models1: [], // 商品SKU
        frightId: "", // 运费id
        price: "",
        itemNo: "",
        markingPrice: "",
        info: ""
      },
      rules: {
        categoryId: [
          { required: true, message: "请选择商品分类 ", trigger: "blur" }
        ],
        markingPrice: [
          { required: true, message: "请输入划线价格 ", trigger: "blur" }
        ],
        // itemNo:[
        //   { required: true, message: '请输入商品条码 ', trigger: 'blur' },
        // ],
        indexKey: [
          { required: true, message: "请上传封面图", trigger: "blur" }
        ],
        imageUrls: [
          { required: true, message: "请上传商品图", trigger: "blur" }
        ],
        itemName: [
          { required: true, message: "请输入商品名", trigger: "change" }
        ],
        info: [
          { required: true, message: "请输入商品详情", trigger: "change" }
        ],
        checkSize: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个尺码",
            trigger: "change"
          }
        ],
        frightId: [
          { required: true, message: "请选择运费模板", trigger: "blur" }
        ],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }]
      }
    };
  },

  mounted() {
    this.getList().then(res => {
      this.tableData = res;
      this.getCategory(this.$route.query.id);
      this.getFrightList();
    });
  },
  components: {
    uploadOne: resolve => require(["@/components/upload/uploadOne"], resolve),
    upload: resolve => require(["@/components/upload/upload"], resolve),
    bgEditor: resolve => require(["@/components/upload/bg-editor"], resolve),
    imgEdit: resolve => require(["@/components/upload/imgEdit"], resolve)
  },

  methods: {
    renderHeaderStock(h, { column, $index }) {
      //库存数量
      if (column.label == "库存数量") {
        return (
          <div>
            <span>{column.label}</span>
            <el-button onClick={this.handleMultipleStop}>修改</el-button>
          </div>
        );
      } else if (column.label == "价格") {
        return (
          <div>
            <span>{column.label}</span>
            <el-button onClick={this.handleMultipleStop1}>修改</el-button>
          </div>
        );
      } else if (column.label == "划线价") {
        return (
          <div>
            <span>{column.label}</span>
            <el-button onClick={this.handleMultipleStop2}>修改</el-button>
          </div>
        );
      }
    },
    //库存数量
    handleMultipleStop(e) {
      this.upstockVisible = true;
      this.type = 1;
      this.title = "统一修改库存数量";
    },
    //价格
    handleMultipleStop1(e) {
      this.upstockVisible = true;
      this.type = 2;
      this.title = "统一修改价格";
    },
    //划线价
    handleMultipleStop2(e) {
      this.upstockVisible = true;
      this.type = 3;
      this.title = "统一修改划线价";
    },
    upstockSure() {
      let models1 = JSON.parse(JSON.stringify(this.formData.models1));
      if (this.type == 1) {
        models1.forEach(item => {
          item.stock = this.upstockNum;
        });
      } else if (this.type == 2) {
        models1.forEach(item => {
          item.salePrice = this.upstockNum;
        });
      } else if (this.type == 3) {
        models1.forEach(item => {
          item.markingPrice = this.upstockNum;
        });
      }

      this.formData.models1 = models1;
      this.upstockVisible = false;
    },
    //添加
    handleAddeteItem() {
      let attributeValueIds = this.idDefault(this.tableDatas);
      this.formData.models1.push({
        attributeValueIds,
        goodsSkuKey: "",
        markingPrice: "",
        salePrice: ""
      });
    },
    // 删除
    handleDeleteItem(index, rows) {
      if (rows.length == 1) return;
      rows.splice(index, 1);
    },
    remove(i) {
      this.formData.imageUrls.splice(i, 1);
    },
    splitAtr(str, i) {
      return str.split("、")[i];
    },
    isEqual(arr1 = [], arr2 = []) {
      return JSON.stringify(arr1.sort()) == JSON.stringify(arr2.sort());
    },
    getDetail(id) {
      this.id = id;
      httpGet("SHOPDETAILE", id).then(res => {
        this.formData.info = res.data.info;
        this.formData.price = res.data.price;
        this.formData.itemName = res.data.itemName;
        this.formData.honey = res.data.honey;
        this.formData.itemNo = res.data.itemNo;
        this.formData.markingPrice = res.data.markingPrice;
        this.formData.indexUrl = res.data.indexImage.imageUrl;
        this.formData.indexKey = res.data.indexImage.imageKey;
        this.formData.imageUrls = res.data.image1s;

        let d = null;
        this.categoryTree.forEach(item => {
          item.children.forEach(items => {
            if (items.id == res.data.categoryId) {
              d = item.id;
            }
          });
        });
        this.handleChange([d, Number(res.data.categoryId)]);
        this.formData.categoryId = [d, Number(res.data.categoryId)];
        this.formData.frightId = res.data.frightId;
        this.formData.indexKey = res.data.indexImageKey;
        httpGet("SHOPSKU", id).then(data => {
          let datas = data.data;
          console.log(datas);
          let models = [];
          for (let i = 0; i < datas.length; i++) {
            let attributeValueIds = datas[i].attributeValueIds;
            let obj = {
              salePrice: datas[i].salePrice,
              attributeValueIds: attributeValueIds.reverse(),
              markingPrice: datas[i].markingPrice,
              stock: datas[i].stock,
              id: datas[i].id,
              goodsSkuKey: datas[i].imageInfo.imageKey,
              imgUrl: datas[i].imageInfo.imageUrl
            };
            models.push(obj);
          }
          console.log(models);
          this.formData.models1 = models;
        });
      });
    },
    handleEditorContent(v) {
      this.formData.info = v;
    },

    getList() {
      const param = {
        pageIndex: 1,
        pageSize: 10000
      };
      return new Promise((resolve, reject) => {
        httpPost("ATTRIBUTE", param).then(res => {
          if (res.code == 200) {
            resolve(res.data);
            // this.tableData = res.data
          }
        });
      });
    },
    handleChange(e) {
      this.tableDatas = [];
      this.formData.models1 = [];
      let parentCategoryId = e[1];
      let arr = [];
      let attributeValueIds = [];
      this.tableData.forEach(item => {
        if (item.parentCategoryId == parentCategoryId) {
          item.checked = false;
          arr.push(item);
        }
      });
      this.tableDatas = arr;
      if (this.id == "") {
        attributeValueIds = this.idDefault(arr);
        this.formData.models1.push({
          attributeValueIds,
          goodsSkuKey: "",
          markingPrice: "",
          salePrice: ""
        });
      }

      return; /////////////////////////////
      let arr1 = [];
      let arr3 = [];
      arr.forEach(item => {
        let arr2 = [];
        item.valueList.forEach(items => {
          let obj = { id: items.id, attributeValue: items.attributeValue };
          arr2.push(items.attributeValue);
          arr3.push(obj);
        });
        arr1.push(arr2);
      });

      //计算2个数组时一共组合情况
      function reduceTwoArr(source1, source2) {
        let result = [];
        source1.forEach(item => {
          source2.forEach(item2 => {
            result.push(`${item}、${item2}`);
          });
        });
        return result;
      }
      //计算多个数组时一共组合情况
      function reduceMultipleArr(arr = []) {
        return arr.reduce((acc, currentItem) => {
          return reduceTwoArr(acc, currentItem);
        });
      }
      let result = reduceMultipleArr(arr1);
      this.tableDatas = arr;
      let arr9 = [];
      result.forEach(item => {
        arr9.push(item.split("、"));
      });
      result.forEach(name => {
        let arr0 = [];
        arr3.forEach(a => {
          let arr4 = name.split("、");
          for (let i = 0; i < arr4.length; i++) {
            if (arr4[i] == a.attributeValue) {
              arr0.push(a.id);
            }
          }
        });
        let params = {
          modelColor: name,
          attributeValueIds: arr0,
          modelStock: "",
          salePrice: "",
          markingPrice: "",
          goodsSkuKey: ""
        };
        // console.log(params)
        // this.formData.models.push(params);
      });
    },
    idDefault(array) {
      let tempArr = new Array(array.length);
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].valueList.length; j++) {
          if (array[i].valueList[j].attributeValue == "默认") {
            // tempArr.push(array[i].valueList[j].id)
            tempArr[i] = array[i].valueList[j].id;
          } else {
            if (tempArr[i] == "") {
              tempArr[i] = "";
            }
          }
        }
      }
      return tempArr;
    },
    isCheckDefault(array) {
      let tempArr = new Array(array.length); // 颜色大类
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].valueList.length; j++) {
          //其他属性
          if (array[i].valueList[j].ischeckd) {
            tempArr[i] = array[i].valueList[j].id;
          } else {
            if (tempArr[i] == "") {
              tempArr[i] = "";
            }
          }
        }
      }
      return tempArr;
    },
    // 尺码选中事件
    handleCheckedSizeChange(value) {
      let arr = this.tableDatas;
      let b = [];
      arr.forEach(item => {
        if (item.modelName != "颜色") {
          b.push(item);
        }
      });
      this.handleChecnkeTest(b);
    },
    // 处理其他属性选中数据
    handleChecnkeTest(item) {
      let arr = this.tableDatas;
    },
    // 颜色选中事件
    handleCheckedColorChange(item) {
      let arr = this.checkedColor;
      if (item.ischeckd) {
        arr.push(item.id);
      } else {
        let _arr = arr.filter(i => {
          return i != item.id;
        });
        arr = _arr;
      }
      this.checkedColor = arr;
      console.log(this.checkedColor);
    },
    getMoreKey(e) {
      console.log(e);
      if (this.formData.imageUrls.length > 9) return;
      this.formData.imageUrls.push(e);
    },
    // 获取商品分类树形列表
    getCategory(id) {
      httpPost("CATEGORYTREE").then(res => {
        if (res.code == 200) {
          this.categoryTree = res.data;
          if (id) {
            this.getDetail(id);
            this.edit = 1;
            this.disabled = true;
          }
        }
      });
    },
    // 获取邮费模板列表
    getFrightList() {
      httpPost("FRIGHT").then(res => {
        if (res.code == 200) {
          this.firghtList = res.data;
        }
      });
    },
    // 尺码颜色组合
    addModelList() {},
    handleBack() {
      this.$router.back();
    },
    notempty(array) {
      //数组去空
      var arr = [];
      for (let i = 0; i < array.length; i++) {
        if (array[i] != undefined) {
          arr.push(array[i]);
        }
      }
      return arr;
    },
    isRepeat(arr) {
      var hash = {};
      for (var i in arr) {
        if (hash[arr[i]]) return true;
        hash[arr[i]] = true;
      }
      return false;
    },
    // 数组去空
    empity(arr) {
      let flag = false;
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].attributeValueIds.length; j++) {
          if (!arr[i].attributeValueIds[j]) {
            flag = true;
          }
        }
      }
      //  let arr1=JSON.parse(JSON.stringify(arr))
      //  arr1.forEach(item=>{
      //    let tempArr=[]
      //    for (let i = 0; i < item.attributeValueIds.length; i++) {
      //       if(item.attributeValueIds[i]){
      //         console.log(item.attributeValueIds[i])
      //           tempArr.push(item.attributeValueIds[i])
      //       }
      //    }
      //    item.attributeValueIds=tempArr
      //  })
      //   return arr1;
      return flag;
    },
    Creat_Table() {
      this.hebingFunction();
      var SKUObj = $(".Father_Title");
      //var skuCount = SKUObj.length;//
      var arrayTile = new Array(); //标题组数
      var arrayInfor = new Array(); //盛放每组选中的CheckBox值的对象
      var arrayColumn = new Array(); //指定列，用来合并哪些列
      var bCheck = true; //是否全选
      var columnIndex = 0;
      $.each(SKUObj, function(i, item) {
        arrayColumn.push(columnIndex);
        columnIndex++;
        // console.log(SKUObj.find(".li_modelName").eq(i).html());
        arrayTile.push(SKUObj.find(".li_modelName").eq(i).html());
        var itemName = "Father_Item" + i;
        //选中的CHeckBox取值
        var order = new Array();
        $("." + itemName + " input[type=checkbox]:checked").each(function() {
          order.push($(this).val());
        });
        arrayInfor.push(order);
        if (order.join() == "") {
          bCheck = false;
        }
      });
      //开始创建Table表
      if (bCheck == true) {
        var RowsCount = 0;
        $("#createTable").html("");
        var table = $(
          '<table id="process" border="1" cellpadding="1" cellspacing="0" style="width:100%;padding:5px;"></table>'
        );
        table.appendTo($("#createTable"));
        var thead = $("<thead></thead>");
        thead.appendTo(table);
        var trHead = $("<tr></tr>");
        trHead.appendTo(thead);
        //创建表头
        $.each(arrayTile, function(index, item) {
          console.log(item)
          var td = $("<th>" + item + "</th>");
          td.appendTo(trHead);
        });
        var itemColumHead = $(
          '<th  style="width:70px;">价格</th><th style="width:70px;">库存数量</th><th style="width:70px;">划线价</th> '
        );
        itemColumHead.appendTo(trHead);
        var tbody = $("<tbody></tbody>");
        tbody.appendTo(table);
        ////生成组合
        var zuheDate = this.doExchange(arrayInfor);
        if (zuheDate.length > 0) {
          //创建行
          $.each(zuheDate, function(index, item) {
            var td_array = item.split(",");
            var tr = $("<tr></tr>");
            tr.appendTo(tbody);
            $.each(td_array, function(i, values) {
              var td = $("<td>" + values + "</td>");
              td.appendTo(tr);
            });
            var td1 = $(
              '<td ><input name="Txt_PriceSon" class="l-text" type="text" value=""></td>'
            );
            td1.appendTo(tr);
            var td2 = $(
              '<td ><input name="Txt_CountSon" class="l-text" type="text" value=""></td>'
            );
            td2.appendTo(tr);
            var td3 = $(
              '<td ><input name="Txt_PriceNew" class="l-text" type="text" value=""></td>'
            );
            td3.appendTo(tr);
          });
        }
        //结束创建Table表
        arrayColumn.pop(); //删除数组中最后一项
        //合并单元格
        $(table).mergeCell({
          // 目前只有cols这么一个配置项, 用数组表示列的索引,从0开始
          cols: arrayColumn
        });
      } else {
        //未全选中,清除表格
        document.getElementById("createTable").innerHTML = "";
      }
    },
    hebingFunction() {
      $.fn.mergeCell = function(options) {
        return this.each(function() {
          var cols = options.cols;
          for (var i = cols.length - 1; cols[i] != undefined; i--) {
            mergeCell($(this), cols[i]);
          }
          dispose($(this));
        });
      };
      function mergeCell($table, colIndex) {
        $table.data("col-content", ""); // 存放单元格内容
        $table.data("col-rowspan", 1); // 存放计算的rowspan值 默认为1
        $table.data("col-td", $()); // 存放发现的第一个与前一行比较结果不同td(jQuery封装过的), 默认一个"空"的jquery对象
        $table.data("trNum", $("tbody tr", $table).length); // 要处理表格的总行数, 用于最后一行做特殊处理时进行判断之用
        // 进行"扫面"处理 关键是定位col-td, 和其对应的rowspan
        $("tbody tr", $table).each(function(index) {
          // td:eq中的colIndex即列索引
          var $td = $("td:eq(" + colIndex + ")", this);
          // 取出单元格的当前内容
          var currentContent = $td.html();
          // 第一次时走此分支
          if ($table.data("col-content") == "") {
            $table.data("col-content", currentContent);
            $table.data("col-td", $td);
          } else {
            // 上一行与当前行内容相同
            if ($table.data("col-content") == currentContent) {
              // 上一行与当前行内容相同则col-rowspan累加, 保存新值
              var rowspan = $table.data("col-rowspan") + 1;
              $table.data("col-rowspan", rowspan);
              // 值得注意的是 如果用了$td.remove()就会对其他列的处理造成影响
              $td.hide();
              // 最后一行的情况比较特殊一点
              // 比如最后2行 td中的内容是一样的, 那么到最后一行就应该把此时的col-td里保存的td设置rowspan
              if (++index == $table.data("trNum"))
                $table
                  .data("col-td")
                  .attr("rowspan", $table.data("col-rowspan"));
            } else {
              // 上一行与当前行内容不同
              // col-rowspan默认为1, 如果统计出的col-rowspan没有变化, 不处理
              if ($table.data("col-rowspan") != 1) {
                $table
                  .data("col-td")
                  .attr("rowspan", $table.data("col-rowspan"));
              }
              // 保存第一次出现不同内容的td, 和其内容, 重置col-rowspan
              $table.data("col-td", $td);
              $table.data("col-content", $td.html());
              $table.data("col-rowspan", 1);
            }
          }
        });
      }
      // 同样是个private函数 清理内存之用
      function dispose($table) {
        $table.removeData();
      }
    },
    doExchange(doubleArrays) {
      var len = doubleArrays.length;
      if (len >= 2) {
        var arr1 = doubleArrays[0];
        var arr2 = doubleArrays[1];
        var len1 = doubleArrays[0].length;
        var len2 = doubleArrays[1].length;
        var newlen = len1 * len2;
        var temp = new Array(newlen);
        var index = 0;
        for (var i = 0; i < len1; i++) {
          for (var j = 0; j < len2; j++) {
            temp[index] = arr1[i] + "," + arr2[j];
            index++;
          }
        }
        var newArray = new Array(len - 1);
        newArray[0] = temp;
        if (len > 2) {
          var _count = 1;
          for (var i = 2; i < len; i++) {
            newArray[_count] = doubleArrays[i];
            _count++;
          }
        }
        //console.log(newArray);
        return this.doExchange(newArray);
      } else {
        return doubleArrays[0];
      }
    },
    // 提交表单
    submitForm(formName) {
      let attributeValueIds = [];
      let attributeIds = [];
      this.tableDatas.forEach(item => {
        attributeIds.push(item.id);
        if (typeof item.modifier == "number") {
          attributeValueIds.push(item.modifier);
        }
      });
      let categoryId = this.formData.categoryId[1];
      let imageUrlsKey = "";
      let tempStr = [];
      if (this.edit == 0) {
        this.formData.imageUrls.forEach(item => {
          tempStr.push(item.imageKey || item.fileKey);
        });
      } else {
        this.formData.imageUrls.forEach(item => {
          tempStr.push(item.imageKey || item.fileKey);
        });
      }
      imageUrlsKey = tempStr.join(",");
      let arrs = [];
      let stockParams = this.formData.models1.map(
        ({
          salePrice,
          attributeValueIds,
          markingPrice,
          stock,
          goodsSkuKey,
          id
        }) => {
          arrs.push(attributeValueIds);
          if (id) {
            return {
              salePrice,
              attributeValueIds,
              markingPrice,
              stock,
              goodsSkuKey,
              id
            };
          } else {
            return {
              salePrice,
              attributeValueIds,
              markingPrice,
              stock,
              goodsSkuKey
            };
          }
        }
      );
      let flag = false;
      // for (let i = 0; i < stockParams.length; i++) {
      //   if(!stockParams[i].markingPrice||!stockParams[i].salePrice||!stockParams[i].stock||stockParams[i].attributeValueIds.length==0){
      //       flag=true;
      //   }
      // }
      stockParams.forEach(item => {
        if (
          !item.markingPrice ||
          !item.salePrice ||
          !item.stock ||
          item.attributeValueIds.length == 0
        ) {
          flag = true;
        }
        if (!item.goodsSkuKey) {
          item.goodsSkuKey = this.formData.indexKey;
        }
      });
      if (this.empity(stockParams)) {
        this.$message({
          type: "warning",
          message: "请选择属性"
        });
        return;
      }
      console.log(stockParams);
      // stockParams=this.empity(stockParams)
      console.log(stockParams);
      // return;
      if (flag) {
        this.$message({
          type: "warning",
          message: "请填写完整信息"
        });
        return;
      }

      if (this.isRepeat(arrs)) {
        this.$message({
          type: "warning",
          message: "有重复属性!"
        });
        return;
      }

      let params = {
        info: this.formData.info,
        categoryId, //分类id
        indexImageKey: this.formData.indexKey, //封面图
        imageUrlsKey, //商品图
        itemName: this.formData.itemName, //商品名
        honey: this.formData.honey, //蜜蜂
        frightId: this.formData.frightId, //运费模板id
        stockParams: this.notempty(stockParams), //属性结合
        // itemNo:Number(this.formData.itemNo),//商品条码
        attributeIds, //父级属性id
        // branchNo:1,
        price: this.formData.price,
        markingPrice: this.formData.markingPrice
      };
      if (this.formData.itemNo) {
        params.itemNo = Number(this.formData.itemNo);
      }
      console.log(params);
      this.$refs[formName].validate(valid => {
        if (valid) {
          let models = this.formData.models;
          if (this.edit == 0) {
            //新增
            httpPost("SHOPINSERT", params).then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "新增成功!"
                });
                setTimeout(() => {
                  this.handleBack();
                }, 500);
              }
            });
          } else {
            //编辑
            params.id = Number(this.id);
            httpPut("SHOPUPDATE", params).then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "修改成功!"
                });
                setTimeout(() => {
                  this.handleBack();
                }, 500);
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.valueList {
  display: flex;
  flex-wrap: wrap;
}
.valueList span {
  margin: 0;
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
.remove {
  width: 100px;
  height: 100px;
  position: relative;
  margin-right: 20px;
  margin-bottom: 10px;

  span {
    position: absolute;
    left: 85px;
    top: -5px;
    font-size: 26px;
    //  color: #ccc;
    display: flex;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid red;
    align-items: center;
    justify-content: center;
    color: red;
    cursor: pointer;
  }
  .el-col-2 {
    width: 130px;
  }
}
 ul,
  ol,
  li {
    list-style-type: none;
    vertical-align: 0;
  }
.checkbox_test {
 
  .div_content {
    line-height: 24px;
  }
  .div_contentlist ul {
    clear: both;
    margin-bottom: 10px;
  }
  li label {
    cursor: pointer;
    margin-right: 25px;
  }
  .Father_Item0 li {
    float: left;
  }
  .Father_Item1 li {
    float: left;
  }
  .Father_Item2 li {
    float: left;
  }
  .Father_Item3 li {
    float: left;
  }

  /*表格样式*/
  #createTable {
    padding: 20px 0;
  }
  .chcBox_Width {
    position: relative;
    top: 2px;
    margin-right: 5px;
  }
  table#process {
    font-size: 12px;
    color: #333333;
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
  }
  table#process th {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #dedede;
  }
  table#process td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #ffffff;
  }
}
</style>
