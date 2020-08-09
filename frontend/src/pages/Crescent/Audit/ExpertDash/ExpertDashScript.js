import Vue from 'vue'

import {mapState} from "vuex";
import validators from "../../../../validators";

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
                    {field: 'projectName', title: '项目名称', width: 130, titleAlign: 'left', columnAlign: 'left',isResize:true},
                    {
                        field: 'state', title: '状态', width: 90, titleAlign: 'center', columnAlign: 'center',
                        formatter: function(rowData) {
                            return rowData.audited ? '已评审' : '未评审';
                        }
                    },
                    {field: 'custom-adv', title: '操作',width: 200, titleAlign: 'center',columnAlign:'center',componentName:'table-operation-audit-expert'}
                ],
                total: 0,
                pageIndex: 1,
                pageSize: 10,
                isLoading: true
            },
            form: {
                schema: {
                    groups: [{
                        fields: [{
                            type: 'input',
                            maxlength: 50,
                            inputType: "Number",
                            label: "分数",
                            model: 'score',
                            id: 'scoreId',
                            min: 0,
                            max: 100,
                            validator: validators.integer
                        }]
                    }, {
                        legend: "意见与建议",
                        fields: [{
                            type: "textArea",
                            model: 'suggestion',
                            rows: 10
                        }]
                    }]
                },
                schemaReadonly: {
                    groups: [{
                        fields: [{
                            type: 'input',
                            maxlength: 50,
                            inputType: "Number",
                            label: "分数",
                            id: 'scoreIdReadonly',
                            model: 'score',
                            readonly: true
                        }]
                    }, {
                        legend: "意见与建议",
                        fields: [{
                            type: "textArea",
                            rows: 10,
                            model: 'suggestion',
                            readonly: true
                        }]
                    }]
                },
                model: {
                    declareId: null,
                    score: 80,
                    suggestion: null
                },
                options: {
                    validateAfterLoad: false,
                    validateAfterChanged: true,
                    validateAsync: true
                }
            },
            isAudit: false
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
        submit() {
            this.$refs.vfg.validate().then(res => {
                if (res.length === 0) {
                    this.$axios.post(this.apiHost + 'audit/setExpertAudit', this.form.model).then(() => {
                        this.$bvModal.hide('modal-scrollable-audit');
                        this.loadData();
                    })
                }
            })
        },
        columnCellClass(rowIndex){
            return rowIndex % 2 ? 'easytable-class-column-gray' : 'easytable-class-column-white';
        },
        loadData() {
            this.$axios.get(this.apiHost + 'audit/getDeclareListForExpertAudit').then((res) => {
                this.easytable.fullData = res.data;
                this.easytable.total = res.data.length;
                this.setTableData(this.easytable.pageIndex, this.easytable.pageSize, this.easytable.fullData);
            }).finally(() => {
                this.easytable.isLoading = false;
            })
        }
    },
    computed: {
        ...mapState('global', ['accountState'])
    },
    mounted() {
        this.loadData();
    },
    created() {
        thisVue = this;
    }
}

Vue.component('table-operation-audit-expert',{
    template:`
        <span>
            <a :href="this.apiHost + 'declare/getAddition/' + rowData.declareId + '.zip'" target="_blank">下载申报书及附件</a>
            <a v-if="rowData.audited" @click.stop.prevent="audit(rowData,index)">查看</a>
            <a v-else @click.stop.prevent="audit(rowData,index)">评审</a>
        </span>
    `,
    props:{
        rowData:{ type:Object },
        field:{ type:String },
        index:{ type:Number }
    },
    methods:{
        audit(rowData) {
            thisVue.isAudit = !rowData.audited;
            thisVue.form.model.declareId = rowData.declareId;
            this.$bvModal.show('modal-scrollable-audit');
        }
    },
    computed: {
        ...mapState('global', ['accountState'])
    }
})