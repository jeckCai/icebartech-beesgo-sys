<template>
  <div class="xb">
    <div class="input_modal">
      <el-row style="padding:20px ;display: flex; align-items: center">
        <el-col :span="12">
          <div class="grid-content bg-purple">商品管理>查看商品</div>
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
            :props="{ value: 'id', label: 'categoryName' }"
            v-model="formData.categoryId"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="封面图" prop="indexKey" required>
          <img style="width:130px;height:100px;" :src="formData.indexUrl" />
        </el-form-item>
        <el-form-item label="商品图" prop="imageUrls" required>
          <img :src="formData.imageUrls.imageUrl" />
          <template v-if="formData.imageUrls.length !== 0">
            <el-col
              style="width:130px;height:100px;"
              :span="2"
              v-for="(item, i) in formData.imageUrls"
              :key="i"
            >
              <div class="remove addImg">
                <img :src="item.imageUrl" />
              </div>
            </el-col>
          </template>
        </el-form-item>
        <el-form-item label="商品名" prop="itemName" required>
          <el-col :span="5">
            <el-form-item>
              <el-input
                type="text"
                v-model="formData.itemName"
                placeholder="请输入"
                :disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="蜂蜜">
          <el-col :span="5">
            <el-form-item>
              <el-input
                type="number"
                v-model="formData.honey"
                placeholder="请输入"
                :disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="价格" prop="price" required>
          <el-col :span="5">
            <el-form-item>
              <el-input
                type="number"
                v-model="formData.price"
                placeholder="请输入"
                :disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="划线价" prop="markingPrice" required>
          <el-col :span="5">
            <el-form-item>
              <el-input
                type="number"
                v-model="formData.markingPrice"
                placeholder="请输入"
                :disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="商品条码" prop="itemNo" required>
          <el-col :span="5">
            <el-form-item>
              <el-input
                type="text"
                v-model="formData.itemNo"
                placeholder="请输入"
                :disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="商品详情" prop="info" required>
          <div v-html="formData.info"></div>
        </el-form-item>
        <el-form-item label="选择商品属性" required label-width="120px">
          <el-form-item
            :label="item.modelName"
            prop="size"
            style="text-align: left;"
            v-for="(item, i) in tableDatas"
            :key="i"
          >
            <span
              v-for="(items, index) in item.valueList"
              :key="index"
              style="margin:15px;"
              >{{ items.attributeValue }}</span
            >
          </el-form-item>
        </el-form-item>

        <el-form-item label="库存管理"></el-form-item>
        <el-table :data="formData.models1" style="width: 100%">
          <el-table-column fixed prop="date" label="图片" width="150">
            <!-- <div v-html="salePrice"></div> -->
            <template slot-scope="scope">
              <img :src="scope.row.imgUrl" width="100px" height="100px"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="attributeValue"
            :label="item.modelName"
            width="120"
            v-for="(item, i) in tableDatas"
            :key="i"
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.attributeValueIds[i]"
                placeholder="请选择"
                :disabled="scope.row.id ? true : false"
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
          <el-table-column prop="modelStock" label="库存数量" width="120">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.stock"
                :disabled="disabled"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="salePrice" label="价格" width="300">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.salePrice"
                :disabled="disabled"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="markingPrice" label="划线价" width="120">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.markingPrice"
                :disabled="disabled"
              ></el-input>
            </template>
          </el-table-column>
        </el-table>

        <el-form-item
          label="选择运费"
          style="margin-top:30px;"
          prop="frightId"
          required
        >
        <!-- <span>{{firghName}}</span> -->
          <el-select v-model="firghName" placeholder="从运费设置中选择" disabled="true">
            <el-option
              :label="item.frightName"
              :value="item.frightId"
              v-for="(item, index) in firghtList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import { httpPost, httpGet, httpPut } from "@/util/post"; //

export default {
  name: "addShop",
  data() {
    return {
      dialogVisible: false,
      disabled: false,
      edit: 0, //新增0编辑1
      sku: "", //商品编辑sku
      id: "", //商品id
      info: "",
      radio: "1",
      firghName:'',
      tableData: [], //商品属性
      tableDatas: [], //动态商品属性
      categoryTree: [], // 商品分类树形结构
      modelSize: ["S", "M", "L", "XL", "XXL", "XXXL"], // 商品尺码列表
      modelColor: ["黄色", "红色", "白色"], // 商品颜色列表
      modelSizeCheck: [
        { name: "S", checked: true },
        { name: "M", checked: false },
        { name: "L", checked: false }
      ], // 商品尺码选择列表
      modelColor: ["黄色", "红色", "白色"], // 商品颜色列表
      modelColorCheck: [
        { name: "黄色", checked: true },
        { name: "红色", checked: false },
        { name: "白色", checked: false }
      ], // 商品颜色选择列表
      checkSize: [], // 选中的尺码
      checkColor: [], // 选中的颜色
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
        itemNo: [
          { required: true, message: "请输入商品条码 ", trigger: "blur" }
        ],
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
      // this.getFrightList();
    });
  },
  methods: {
    dialogImageUrl() {},
    deleteFalseImg() {},
    splitAtr(str, i) {
      return str.split("、")[i];
    },
    isEqual(arr1 = [], arr2 = []) {
      return JSON.stringify(arr1.sort()) == JSON.stringify(arr2.sort());
    },
    getListUrl(e) {
      console.log(e);
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
        this.firghName=res.data.frightName;
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
        this.formData.models1.push({
          attributeValueIds: [],
          goodsSkuKey: "",
          markingPrice: "",
          salePrice: ""
        });
      }

      return;
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
    // 尺码选中事件
    handleCheckedSizeChange(value) {
      this.formData.models = [];
      this.tableDatas.forEach(item => {
        item.valueList.forEach(items => {
          if (value == items.id) {
            console.log(items);
            let params = {
              modelColor: items.attributeValue,
              attributeValueIds: "",
              modelStock: "",
              salePrice: "",
              markingPrice: ""
            };
            this.formData.models.push(params);
          }
        });
      });

      return;
      this.tableDatas.forEach(item => {
        item.valueList.forEach(items => {
          if (value == items.attributeValue) {
          }
        });
      });
      let arr = value;
      arr.forEach(item => {
        this.modelSizeCheck.forEach(size => {
          if (item == size.name) {
            size.checked = true;
          }
        });
      });

      this.addModelList();
    },
    // 颜色选中事件
    handleCheckedColorChange(value) {
      console.log("value=", value);
      let arr = value;
      arr.forEach(item => {
        this.modelColorCheck.forEach(color => {
          if (item == color.name) {
            color.checked = true;
          }
        });
      });
      this.addModelList();
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
    // 尺码颜色组合
    addModelList() {
      this.formData.models = [];
      this.modelSizeCheck.forEach(size => {
        this.modelColorCheck.forEach(color => {
          if (size.checked && color.checked) {
            let params = {
              modelColor: color.name,
              modelSize: size.name,
              stock: "",
              salePrice: "",
              markingPrice: "",
              attributeValueIds: ""
            };
            this.formData.models.push(params);
            console.log(" this.formData.models=", this.formData.models);
          }
        });
      });
    },
    handleBack() {
      this.$router.back();
    }
  }
};
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
 .input_modal{
    background-color: #ffffff
  }
</style>
