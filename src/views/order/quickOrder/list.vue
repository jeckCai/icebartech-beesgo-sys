<!--
 * @Author: your name
 * @Date: 2019-11-19 15:57:06
 * @LastEditTime : 2019-12-23 17:42:31
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \icebartech-beesgo-brand\src\views\order\quickOrder.vue
 -->
<template>
    <div id="quickOrder">
        <!-- 查询条件 -->
        <div class="xb">
        <div class="input_modal">
         <el-form :inline="true" :model="queryData" class="demo-form-inline">
            <el-form-item label="快递单号">
                <el-input v-model="queryData.outOrderCodeLike" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="订单状态">
                <el-select v-model="queryData.orderStatus" placeholder="全部">id
                    <el-option v-for="(item,index) in orderStatus" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="发货方式">
                <el-select v-model="queryData.deliveryType" placeholder="全部">
                    <el-option v-for="(item,index) in deliveryTypes" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属蜜蜂">
                 <el-select v-model="queryData.beesId" placeholder="全部">
                    <el-option v-for="(item,index) in beeList" :key="index" :label="item.truename" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getList">查询</el-button>
            </el-form-item>
       </el-form>
     </div>
     </div>
      <!-- 表格数据 -->
      <div class="table_con">
        <el-table
            :data="tableData"
            style="width: 100%"
            row-key="ids"
            border
            :tree-props="{children: 'childRen', hasChildren: 'hasChildren'}">
            <el-table-column
            prop="outOrderCode"
            label="快速单号"
            width="200">
            </el-table-column>
            <el-table-column
            prop="itemName"
            label="商品内容"
            width="180">
            </el-table-column>
            <el-table-column
            prop="userName"
            label="客户名称">
            </el-table-column>
            <el-table-column
            prop="goodPrice"
            label="单价">
            </el-table-column>
            <el-table-column
            prop="count"
            label="数量">
            </el-table-column>
            <el-table-column
            prop="totalPrice"
            label="订单金额">
            </el-table-column>
               
             <el-table-column
            prop="orderStatus"
            label="订单状态">
             <template slot-scope="scope">
                 <div v-html="getOrderStatus(scope.row.orderStatus)"></div>
             </template>
            </el-table-column>
            
            <el-table-column
            prop="deliveryType"
            label="发货方式">
               <template slot-scope="scope">
                    <div v-if="scope.row.deliveryType == 'EXPRESS'">物流发货</div>
               </template>
            </el-table-column>
            <el-table-column
            prop="beesName"
            label="所属蜜蜂">
            </el-table-column>
            <el-table-column   label="操作方式">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" v-if="scope.row.itemName" @click="handleView(scope.row.id)">查看</el-button>
                </template>
             </el-table-column>
       </el-table>
      </div>
       <!-- 分页 -->
      <div class="pagination">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryData.pageIndex"
        :page-size="queryData.pageSize"
        :page-sizes="[10,20,30,40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
      </div>
      <!-- 订单发货 -->
      <el-dialog title="填写物流信息" :visible.sync="showOrderSend">
        <el-form ref="orderSend" :model="orderSend" :rules="sendRules" label-width="150px" label-position="right">
              <el-form-item label="物流公司" prop="expressType">
                <el-col :span="10">
                    <el-select v-model="orderSend.expressType" placeholder="全部">
                        <el-option v-for="(item,index) in transportComs" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="物流单号" prop="wayBillCode">
          <el-col :span="10">
             <el-input type="text" v-model="orderSend.wayBillCode" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="orderDelivery('orderSend')">确 定</el-button>
        </div>
    </el-dialog>
    </div>
</template>
<script>
import { httpPost,httpDel} from '@/util/post'
export default {
    name:'quickOrder',
    data(){
        return{
            showOrderSend:false, // 订单发货弹窗
            beeList:[], // 蜜蜂列表
            orderStatus:[
                {'label':"全部",value:''},
                {'label':"待付款",value:'WAIT_PAY'},
                {'label':"待发货",value:'WAIT_SEND'},
                {'label':"待收货",value:'WAIT_RECEIVING'},
                {'label':"已取消",value:'CANCEL_USER'},
                {'label':"已完成",value:'COMPLETED'},
                {'label':"超时关闭",value:'CANCEL_TIMEOUT'}
            ],
            transportComs:[
                {'label':"顺丰",value:'SF'},
                {'label':"中通",value:'ZT'},
                {'label':"申通",value:'ST'},
                {'label':"圆通",value:'YT'},
                {'label':"汇通",value:'HT'},
                {'label':"韵达",value:'YD'},
                {'label':"申通",value:'ST'},
                {'label':"邮政包裹/平邮",value:'YZ'},
                {'label':"EMS",value:'EMS'},
                {'label':"天天",value:'TT'},
                {'label':"德邦",value:'DB'}
            ],
            deliveryTypes:[
                {'label':"全部",value:''},
                {'label':"物流发货",value:'EXPRESS'},
                {'label':"门店自提",value:'PICK'},
            ],
            queryData:{
                // outOrderCodeLike:"",
                // orderStatus:"",
                // deliveryType:"",
                // beesId:"",
                orderType:"QUICK_ORDER",
                pageIndex: 1,
                pageSize: 10,
            },
            // 订单发货
            orderSend:{
                id:"", // 订单id
                wayBillCode: "",// 物流单号
                expressType: "", // 物流公司
            },
            sendRules:{
                expressType:[
                     { required: true, message: '请输入物流公司',  trigger: 'change' },
                ],
                wayBillCode:[
                     { required: true, message: '请输入物流单号',  trigger: 'blur' },
                ]
            },
            total: 0,
            tableData: []
        }
    },
    mounted(){
       this.getList();
       this.getBeeList();
    },
    methods:{
         getOrderStatus(type){
            let val = '';
            switch(type){
                case 'WAIT_PAY':
                    val = '待付款';
                    break;
                case 'WAIT_SEND':
                    val = '待发货';
                    break;
                case 'WAIT_RECEIVING':
                    val = '待收货';
                    break; 
                case 'CANCEL_USER':
                    val = '已取消';
                    break;  
                case "COMPLETED":
                    val = "已完成";
                    break;
                case 'CANCEL_TIMEOUT':
                    val = '超时关闭';
                    break;  
                default:
                    val = '';
                    break;
            }

            return val;
            
        },
          // 查看详情
        handleView(id){
           this.$router.push('quickOrderDetail?id='+id);
        },
        handleSizeChange(val) {
            this.queryData.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.queryData.pageIndex = val;
            this.getList();
        },
       
         // 订单弹窗
        handleDelivery(id){
           this.orderSend.id = id;
           this.showOrderSend = true;
        },
         // 订单发货
        orderDelivery(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                        httpPost("orderSend",this.orderSend).then(res=>{
                            if (res.code == 200) {
                                this.showOrderSend = false;
                                this.$refs[formName].resetFields();
                                this.getList();
                                window.vm.$message({
                                    type: 'success',
                                    message: res.message
                                })
                            }else{
                                window.vm.$message({
                                    type: 'success',
                                    message: res.message
                                })
                            }
                    }) 
                }else{
                     console.log('error submit!!');
                    }
                })
         
        },

        // 获取蜜蜂列表
        getBeeList(){
             httpPost('BEEMAP').then(res=>{
                  if (res.code == 200) {
                    this.beeList = res.data;
                   }
               }) 
        },
        
        //获取列表
        getList(reset) {
                this.queryData.pageIndex = reset? 1:  this.queryData.pageIndex;
                httpPost('findBranchPage',this.queryData).then(res=>{
                    if (res.code == 200) {
                    let tableData = res.data;
                    if(tableData.length>0){
                        tableData.forEach((item,index)=>{
                            item.outOrderCode = item.orderCode;
                            item.ids =  item.id*10;
                            // item.children =  item.childRen;
                            // item.hasChildren = true,
                            item.hasChildren ? item.hasChildren=true:item.hasChildren=false;
                            item.count = '';
                            item.actualPrice = '';
                            item.orderStatus = '';
                            item.deliveryType = '';
                            item.userName = '';
                            item.orderTime = ''; 
                            item.childRen.forEach((item2,index2)=>{
                                 item.orderStatus = item2.orderStatus;
                                 item2.orderCode =  item2.outOrderCode;
                                 item2.ids =  item.id*10 + index2 +1;
                            })
                        })
                    }
                    this.tableData = tableData;
                     console.log('this.tableData111111=',this.tableData)
                    this.total = res.count;
                }
        }) 
        },
    }
}
</script>