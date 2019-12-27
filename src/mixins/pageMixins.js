/**
 * 多个列表公用分页，增加mixins
 * 
 * 2019-12-5  Jeckcai 增加
 * */ 
export default {
    data() {
        return {
            total: 0, // 分页总条数
            pageNum: 1, // 分页当前页
            pageSize: 10, // 分页每页大小
        }
    },
    methods:{
        handleCurrentChange(item){ //  elementui 的没有双向绑定值，通过onchange触发值，记录一下 - -！
            this.pageNum = item;
            this.getData()
        },
        handleSizeChange(item){
            this.pageSize = item;
            this.getData()
        }
    }
}