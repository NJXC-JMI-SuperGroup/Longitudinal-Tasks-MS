import Vue from 'vue';
import {mapActions, mapState} from "vuex";

let thisVue = null;

export default {
    name: "DeclareProgress",
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
                    {field: 'projectName', title: '项目名称', width: 130, titleAlign: 'left', columnAlign: 'left',isResize:true},
                    {field: 'state', title: '当前状态', width: 60, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'bulletin', title: '申报课题', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'custom-adv', title: '操作',width: 200, titleAlign: 'center',columnAlign:'center',componentName:'table-operation-declare',isResize:true}
                ],
                total: 0,
                pageIndex: 1,
                pageSize: 10,
                isLoading: true
            },
            form: {
                schema: this.$store.state.global.schema.declare
            },
            tabs: []
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
            <a @click.stop.prevent="showModel(rowData,index,'modal-scrollable-declare')">查看 </a>
            <a @click.stop.prevent="showExpertAudit(rowData)" 
               v-if="(rowData.stateId===3||rowData.stateId===4) && rowData.expertAudit">专审结果 </a>
            <template v-if="rowData.stateId===1">
                <a @click.stop.prevent="showModel(rowData,index,'modal-reason')">驳回理由 </a>
                <a @click.stop.prevent="update(rowData,index)">修改</a>
            </template>
        </span>`,
    props:{
        rowData:{
            type:Object
        },
        field:{
            type:String
        },
        index:{
            type:Number
        }
    },
    methods:{
        ...mapActions('global', ['updateDeclareModel', 'updateUploader']),
        update(rowData){
            this.$axios.get(this.apiHost + 'declare/getDeclare', {
                params: {
                    declareId: rowData.declareId
                }
            }).then((res) => {
                res.data.expectDeadline = res.data.expectDeadline.slice(0, 10);
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
                res.data.expectDeadline = res.data.expectDeadline.slice(0, 10);
                res.data.additionUrl = this.apiHost + res.data.additionUrl;
                this.updateDeclareModel(res.data).then(() => {
                    this.$bvModal.show(modelId);
                })
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