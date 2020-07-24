import Vue from 'vue';
import {mapActions, mapState} from "vuex";

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
                schema: {
                    groups: [{
                        legend: '项目申报信息',
                        fields: [{
                            type: 'input',
                            inputType: 'text',
                            id: 'projectName',
                            label: '项目名称',
                            model: 'projectName',
                            readonly: true
                        }, {
                            type: 'input',
                            inputType: 'text',
                            id: 'projectIndex',
                            label: '项目编号',
                            model: 'index',
                            readonly: true
                        }, {
                            type: 'input',
                            inputType: 'text',
                            id: 'declareLeader',
                            label: '负责人',
                            model: 'leader',
                            readonly: true
                        }, {
                            type: "input",
                            inputType: "text",
                            id: "leaderJobTitle",
                            label: '负责人职称',
                            model: 'leaderJobTitle',
                            readonly: true
                        }, {
                            type: 'input',
                            inputType: 'text',
                            id: "declareBulletin",
                            label: '申报课题',
                            model: 'bulletin',
                            readonly: true
                        }, {
                            type: 'input',
                            inputType: 'text',
                            label: '申报部门',
                            id: "declareDept",
                            model: 'declareDept',
                            readonly: true
                        }, {
                            type: "input",
                            inputType: "text",
                            label: "预期完成时间",
                            model: "expectDeadline",
                            id: "expectDeadline",
                            readonly: true
                        }, {
                            type: "textArea",
                            label: "预期成果",
                            model: 'expectAchievement',
                            readonly: true
                        }]
                    }]
                }
            }
        }
    },
    methods:{
        pageChange(index) {
            this.easytable.pageIndex = index;
            this.setTableData(index, this.easytable.pageSize, this.easytable.fullData);
        },
        setTableData(index, size, fullData) {
            let ex = index * size;
            this.easytable.tableData = fullData.slice(ex - size, ex);
        }
    },
    computed: {
        ...mapState('global', ['host']),
        ...mapState('global', {
            declareModel: state => state.model.declare
        })
    },
    mounted() {
        this.$axios.get(this.host + 'declare/getDeclareList').then((res) => {
            this.easytable.fullData = res.data;
            this.easytable.total = res.data.length;
            this.setTableData(this.easytable.pageIndex, this.easytable.pageSize, this.easytable.fullData);
        }).finally(() => {
            this.easytable.isLoading = false;
        })
    }
}

Vue.component('table-operation-declare',{
    template:`
        <span>
            <a @click.stop.prevent="showModel(rowData,index,'modal-scrollable-declare')">查看 </a>
            <a @click.stop.prevent="showModel(rowData,index,'modal-reason')" v-if="rowData.state==='驳回'">驳回理由 </a>
            <a @click.stop.prevent="showModel(rowData,index,'modal-expert')" v-if="rowData.state==='已立项' && index%2===0">专审结果 </a>
            <a @click.stop.prevent="modify(rowData,index)" v-if="rowData.state==='驳回'">修改</a>
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
        ...mapActions('global', ['updateDeclareModel']),
        modify() {
            this.$router.push('/Crescent/declare/dash/modify');
        },
        update(rowData, index){
            this.$axios.get(this.host + 'declare/getDeclare', {
                params: {
                    declareId: rowData.declareId
                }
            }).then((res) => {
                res.data.expectDeadline = res.data.expectDeadline.slice(0, 10);
                this.updateDeclareModel(res.data);
                this.$router.push('/Crescent/declare/dash/modify');
            })
        },
        showModel(rowData, index, modelId) {
            this.$axios.get(this.host + 'declare/getDeclare', {
                params: {
                    declareId: rowData.declareId
                }
            }).then((res) => {
                res.data.expectDeadline = res.data.expectDeadline.slice(0, 10);
                this.updateDeclareModel(res.data);
                this.$bvModal.show(modelId);
            })
        }
    },
    computed: {
        ...mapState('global', ['host'])
    }
})