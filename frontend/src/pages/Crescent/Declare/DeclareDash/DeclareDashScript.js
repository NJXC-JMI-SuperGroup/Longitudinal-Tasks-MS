import Vue from 'vue';
import {mapActions, mapState} from "vuex";
let moment = require('moment');
let thisVue = null;

export default {
    data() {
        return {
            easytable: {
                fullData: [],
                tableData: [],
                columns: [
                    {
                        field: '', title: '', width: 30, titleAlign: 'center', columnAlign: 'center',
                        formatter: function(rowData, index, pagingIndex) {
                            return  index + pagingIndex + 1;
                        }, isFrozen: true
                    },
                    {field: 'projectName', title: '项目名称', width: 150, titleAlign: 'left', columnAlign: 'left',isResize:true},
                    {field: 'state', title: '状态', width: 120, titleAlign: 'center', columnAlign: 'center'},
                    {field: 'bulletin', title: '申报课题', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'custom-adv', title: '操作',width: 140, titleAlign: 'center',columnAlign:'center',componentName:'table-operation-declare'}
                ],
                total: 0,
                pageIndex: 1,
                pageSize: 10,
                isLoading: true
            },
            form: {
                schema: this.$store.state.global.schema.declare
            },
            tabs: [],
            reasonList: []
        }
    },
    methods:{
        pageChange(index) {
            this.easytable.pageIndex = index;
            this.setTableData(index, this.easytable.pageSize, this.easytable.fullData);
        },
        setTableData(index, size, fullData) {
            let ex = index * size;
            let ret = fullData.slice(ex - size, ex);
            this.easytable.tableData = ret === "" ? [] :ret;
        },
        columnCellClass(rowIndex) {
            return rowIndex % 2 ? 'easytable-class-column-gray' : 'easytable-class-column-white';
        }
    },
    computed: {
        ...mapState('global', {
            declareModel: state => state.model.declare
        })
    },
    mounted() {
        this.$axios.get(this.apiHost + 'declare/getDeclareList').then((res) => {
            this.easytable.fullData = res.data;
            this.easytable.total = res.data.length;
            this.setTableData(this.easytable.pageIndex, this.easytable.pageSize, this.easytable.fullData);
        }).finally(() => {
            this.easytable.isLoading = false;
        })
    },
    created() {
        thisVue = this;
    }
}

Vue.component('table-operation-declare',{
    template:`
        <span>
            <a @click.stop.prevent="showExpertAudit(rowData)"
               v-if="[7, 8, 9].indexOf(rowData.stateId) !== -1 && rowData.expertAudit">专审结果 </a>
            <a @click.stop.prevent="showReason(rowData)" v-if="[1, 2].indexOf(rowData.stateId) !== -1">驳回理由 </a>
            <a @click.stop.prevent="update(rowData,index)" v-if="[1, 2, 3, 4].indexOf(rowData.stateId) !== -1">修改</a>
            <a @click.stop.prevent="showModel(rowData,index,'modal-scrollable-declare')"
               v-if="[1, 2].indexOf(rowData.stateId) === -1">查看 </a>
        </span>`,
    props:{
        rowData:{ type:Object },
        field:{ type:String },
        index:{ type:Number }
    },
    methods:{
        ...mapActions('global', ['updateDeclareModel', 'updateUploader']),
        update(rowData){
            this.$axios.get(this.apiHost + 'declare/getDeclare', {
                params: {
                    declareId: rowData.declareId
                }
            }).then((res) => {
                res.data.expectDeadline = moment(res.data.expectDeadline).format('YYYY-MM-DD');
                this.updateDeclareModel(res.data).then(() => {
                    this.updateUploader({
                        hint: '提交后请等待文件上传',
                        target: this.apiHost + 'declare/uploadFiles'
                    }).then(() => {
                        this.$router.push('/Crescent/declare/dash/modify').then();
                    });
                })
            })
        },
        showModel(rowData, index, modelId) {
            this.$axios.get(this.apiHost + 'declare/getDeclare', {
                params: {
                    declareId: rowData.declareId
                }
            }).then((res) => {
                res.data.expectDeadline = moment(res.data.expectDeadline).format('YYYY-MM-DD');
                res.data.additionUrl = this.apiHost + res.data.additionUrl;
                this.updateDeclareModel(res.data).then(() => {
                    this.$bvModal.show(modelId);
                })
            })
        },
        showReason(rowData) {
            this.$axios.get(this.apiHost + 'audit/getProcessList', {
                params: {
                    declareId: rowData.declareId,
                    stateId: rowData.stateId
                }
            }).then(res => {
                thisVue.reasonList = res.data;
                this.$bvModal.show('modal-reason');
            })
        },
        showExpertAudit(rowData) {
            this.$axios.get(this.apiHost + 'audit/getExpertAuditList', {
                params: {
                    declareId: rowData.declareId
                }
            }).then(res => {
                thisVue.tabs = res.data;
                this.$bvModal.show('modal-expert');
            })
        }
    }
})