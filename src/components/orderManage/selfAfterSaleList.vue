<!--
 * @Author: your name
 * @Date: 2019-11-19 15:57:06
 * @LastEditTime : 2019-12-26 16:12:43
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
            <el-form-item label="售后单号">
                <el-input v-model="queryData.returnCodeLike" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="售后类型">
                <el-select v-model="queryData.type" placeholder="全部">
                    <el-option v-for="(item,index) in afterSaletypes" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="售后状态">
                <el-select v-model="queryData.Status" placeholder="全部">
                    <el-option v-for="(item,index) in afterSaleStatus" :key="index" :label="item.label" :value="item.value"></el-option>
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
            style="width: 100%">
            <el-table-column
            prop="returnCode"
            label="售后单号">
            </el-table-column>
            <el-table-column
            prop="littleOrderCode"
            label="订单编号">
            </el-table-column>
            <el-table-column
            prop="orderItem.userName"
            label="下单用户">
            </el-table-column>
            <el-table-column
            prop="orderItem.itemName"
            label="商品名">
            </el-table-column>
            <el-table-column
            prop="count"
            label="售后数量">
            </el-table-column>
             <el-table-column
            prop="lastRefundPrice"
            label="售后金额">
            </el-table-column>
             <el-table-column
            prop="checkPrice"
            label="审核金额">
            </el-table-column>
            <el-table-column
            prop="type"
            label="售后类型">
              <template slot-scope="scope">
                    <div v-if="scope.row.type == 'JUST_MONEY'">仅退款</div>
                    <div v-if="scope.row.type == 'JUST_PRODUCT'">退货</div>
                    <div v-if="scope.row.type == 'CHANGE_PRODUCT'">换货</div>
              </template>
            </el-table-column>
            <el-table-column
            prop="status"
            label="售后状态">
            <template slot-scope="scope">
                    <div v-if="scope.row.status == 'SALE_AFTER_REJECT'">售后失败</div>
                    <div v-if="scope.row.status == 'WAIT_CHECK'">待审核</div>
                    <div v-if="scope.row.status == 'RETURN_GOODS_ING'">换货处理中</div>
                    <div v-if="scope.row.status == 'RETURN_MONEY_ING'">退货处理中</div>
                    <div v-if="scope.row.status == 'FINISH'">售后完成</div>
              </template>
            </el-table-column>
            <el-table-column
            prop="applyTime"
            label="申请时间">
            </el-table-column>
            <el-table-column label="操作" width="300px">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleView(scope.row.id)" >查看</el-button>
                    <el-button type="success" size="mini" v-if="scope.row.status == 'WAIT_CHECK'" @click="handleCheck(scope.row,'pass')">通过</el-button>
                    <el-button type="danger" size="mini" v-if="scope.row.status == 'WAIT_CHECK'" @click="handleCheck(scope.row,'reject')">拒绝</el-button>
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
    <!-- 审核通过 -->
     <el-dialog title="同意" :visible.sync="dialogPass">
        <el-form ref="orderPass" :model="orderPass" :rules="passRules" label-width="150px" label-position="right">
        <el-form-item label="退款金额" prop="refundPrice">
          <el-col :span="10">
             <el-input type="text" v-model="orderPass.refundPrice" placeholder="请输入"></el-input>
          </el-col>                       
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogPass = false">取 消</el-button>
          <el-button type="primary" @click="handlePass('orderPass')">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 审核拒绝 -->
      <el-dialog title="拒绝" :visible.sync="dialogReject">
        <el-form ref="orderReject" :model="orderReject" :rules="rejectRules" label-width="150px" label-position="right">
              <el-form-item label="拒绝原因" prop="expressType">
                <el-col :span="10">
                    <el-select v-model="orderReject.rejectType" placeholder="全部">
                        
                        <el-option v-for="(item,index) in rejectReasons" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="拒绝原因" prop="rejectMessage">
          <el-col :span="10">
             <el-input type="text" v-model="orderReject.rejectMessage" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogReject = false">取 消</el-button>
          <el-button type="primary" @click="handleReject()">确 定</el-button>
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
            dialogPass:false, // 售后审核同意弹窗
            dialogReject:false, // 售后审核同意弹窗
            lastRefundPrice:null, // 售后最大可退款金额
            afterSaleStatus:[
                {'label':"全部",value:''},
                {'label':"待审核",value:'WAIT_CHECK'},
                {'label':"换货处理中",value:'RETURN_GOODS_ING'},
                {'label':"退货处理中",value:'RETURN_MONEY_ING'},
                {'label':"售后失败",value:'SALE_AFTER_REJECT'},
                {'label':"售后完成",value:'FINISH'},
            ],
            afterSaletypes:[
                {'label':"全部",value:''},
                {'label':"仅退款",value:'JUST_MONEY'},
                {'label':"退货",value:'JUST_PRODUCT'},
                {'label':"换货",value:'CHANGE_PRODUCT'},
            ],
            rejectReasons:[
                {'label':"商品或者吊牌损坏",value:'PRODUCT_DAMAGE'},
                {'label':"特殊商品不支持退换",value:'SPECIFIC_PRODUCT'},
            ],
            queryData:{
                returnCodeLike:"",
                status:"",
                type:"",
                orderType:"NORMAL_ORDER", // 普通订单
                pageIndex: 1,
                pageSize: 10,
            },
            // 订单审核通过
            orderPass:{
                id:"", // 订单id
                status: "", //  审核状态
                refundPrice: null,  // 退款金额
            },
            // 订单审核拒绝
            orderReject:{
                id:"", // 订单id
                rejectMessage: "", // 拒绝原因备注
                rejectType: "", // 拒绝原因
                status: "", //  审核状态
            },
            passRules:{
                refundPrice: [
                    { required: true, message: '请输入退款金额',  trigger: 'blur' },
                ]
            },
            rejectRules:{
                rejectType:[
                     { required: true, message: '请选择拒绝原因',  trigger: 'change' },
                ],
                rejectMessage:[
                     { required: true, message: '请输入拒绝原因',  trigger: 'blur' },
                ]
            },
            total: 0,
            tableData: []
        }
    },
    mounted(){
        console.log(this.$route.path)
       this.getList()
    },
    methods:{
        handleView(id){
            this.$router.push('sysAfterSaleDetail?id='+id);
        },
        handleCheck(row,type){
             if(type == 'pass'){  
                 this.dialogPass = true;
                 this.orderPass.id = row.id;
                 this.orderPass.orderId = row.orderId;
                 this.orderPass.refundPrice = row.checkPrice;
                 this.orderPass.status = 'FINISH';
                 this.lastRefundPrice = row.lastRefundPrice;
             }else{
                this.dialogReject = true;
                this.orderReject.id = row.id;
                this.orderReject.status = 'SALE_AFTER_REJECT';
             }
        },
        // 售后审核通过
        handlePass(formName){
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    if( parseFloat(this.orderPass.refundPrice) > this.lastRefundPrice){
                        window.vm.$message({
                                type: 'warning',
                                message: '退款金额不能超过最大可退款金额'
                        })
                        return 
                    }
                    httpPost("AFTERSALECHECK",this.orderPass).then(res => {
                        if(res.code == 200){
                            this.dialogPass = false;
                            window.vm.$message({
                                type: 'success',
                                message: res.message
                            })
                        this.getList();
                        }
                    });
                }
             })
        },
        // 售后审核拒绝
        handleReject(){
            httpPost("AFTERSALECHECK",  this.orderReject).then(res => {
                if(res.code == 200){
                    this.dialogReject = false;
                    window.vm.$message({
                    type: 'success',
                    message: res.message
                   })
                  this.getList(); 
                }
            });
        },
        
        handleSizeChange(val) {
            this.queryData.pageSize = val
        },
        handleCurrentChange(val) {
            this.queryData.pageIndex = val
        },
        // 售后订单列表
        getList(reset) {
                this.queryData.pageIndex = reset? 1:  this.queryData.pageIndex;
                httpPost('AFTERSALELIST',this.queryData).then(res=>{
                    if (res.code == 200) {
                    this.tableData = res.data;
                    this.total = res.count;
                    console.log('order=',res.data)
                }
        }) 
        },
    }
}
</script>
<style lang="scss" scope>
.input_modal{
    background:#fff;
    padding:10px 30px;
    margin-bottom: 10px;
}   
</style>
