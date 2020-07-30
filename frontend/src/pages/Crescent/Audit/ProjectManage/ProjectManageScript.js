import Vue from 'vue'

import {mapActions, mapState} from "vuex";
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
                    {field: 'state', title: '当前状态', width: 60, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'bulletin', title: '申报课题', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'leader', title: '负责人', width: 75, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'custom-adv', title: '操作',width: 200, titleAlign: 'center',columnAlign:'center',componentName:'table-operation-project-manage',isResize:true}
                ],
                total: 0,
                pageIndex: 1,
                pageSize: 10,
                isLoading: true
            },
            form: {
                schema: {
                    groups: [{
                        legend: '发布公告信息',
                        fields: [{
                            type: 'input',
                            inputType: 'text',
                            label: '当前账号数目',
                            id: 'currentAccountNumber',
                            model: 'currentCnt',
                            readonly: true
                        }, {
                            type: "input",
                            inputType: "number",
                            label: "继续生成账号数目",
                            model: 'createCnt',
                            min: 1,
                            validator: validators.integer
                        }]
                    }]
                },
                model: {
                    currentCnt: 0,
                    createCnt: 1,
                    list: []
                },
                options: {
                    validateAfterLoad: false,
                    validateAfterChanged: true,
                    validateAsync: true
                }
            },
            bulletinId: null,
            declareId: null,
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
        },
        createAccount() {
            this.$refs.accountVFG.validate().then(res => {
                if (res.length === 0) {
                    this.$axios.get(this.apiHost + 'audit/createExpertAccount', {
                        params: {
                            bulletinId: this.bulletinId,
                            cnt: this.form.model.createCnt
                        }
                    }).then(res => {
                        this.form.model.currentCnt = res.data.length;
                        this.form.model.list = res.data;
                    })
                }
            }).finally(() => {
                this.form.model.createCnt = 1;
            })
        },
        submit() {
            this.$axios.post(this.apiHost + 'audit/departAudit', {
                declareId: this.declareId,
                stateId: 4
            }).then(res => {
                // eslint-disable-next-line no-console
                console.info(res.data);
                this.$router.go(0);
            })
        }
    },
    computed: {
        ...mapState('global', ['accountState'])
    },
    mounted() {
        this.$axios.get(this.apiHost + 'audit/getDeclareListForExpert', {
            params: {
                limit: false
            }
        }).then((res) => {
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

Vue.component('table-operation-project-manage',{
    template:`
        <span>
            <a @click.stop.prevent="expertAccount(rowData,index)">外审账号</a>
            <a @click.stop.prevent="showDetail(rowData,index)">外审结果</a>
        </span>
    `,
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
        ...mapActions('global', ['updateIsAudit', 'updateModel']),
        showDetail(rowData) {
            this.$axios.get(this.apiHost + 'audit/getExpertAuditList', {
                params: {
                    declareId: rowData.declareId
                }
            }).then(res => {
                thisVue.tabs = res.data;
                thisVue.declareId = rowData.declareId;
                this.$bvModal.show('show-expert-result');
            })
        },
        expertAccount(rowData) {
            thisVue.bulletinId = rowData.bulletinId;
            this.$axios.get(this.apiHost + 'audit/getExpertAccount', {
                params: {
                    bulletinId: rowData.bulletinId
                }
            }).then(res => {
                thisVue.form.model.currentCnt = res.data.length;
                thisVue.form.model.list = res.data;
                this.$bvModal.show('show-expert-account');
            })
        }
    },
    computed: {
        ...mapState('global', ['accountState'])
    }
})