import Vue from 'vue'

import {mapActions, mapState} from "vuex";
import validators from "vue-form-generator/src/utils/validators";

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
                    {field: 'custom-adv', title: '操作',width: 200, titleAlign: 'center',columnAlign:'center',componentName:'table-operation-audit-expert',isResize:true}
                ],
                total: 0,
                pageIndex: 1,
                pageSize: 10,
                isLoading: true
            },
            form: {
                expertAccount: {
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
                        createCnt: 0,
                        list: []
                    }
                },
                expertAuditResult: {
                    schema: {

                    },
                    model: {

                    }
                },
                options: {
                    validateAfterLoad: false,
                    validateAfterChanged: true,
                    validateAsync: true
                }
            },
            bulletinId: null
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
                    this.$axios.get(this.host + 'audit/createExpertAccount', {
                        params: {
                            bulletinId: this.bulletinId,
                            cnt: this.form.expertAccount.model.createCnt
                        }
                    }).then(res => {
                        this.form.expertAccount.model.currentCnt = res.data.length;
                        this.form.expertAccount.model.list = res.data;
                    })
                }
            }).finally(() => {
                this.form.expertAccount.model.createCnt = 1;
            })
        }
    },
    computed: {
        ...mapState('global', ['host', 'accountState'])
    },
    mounted() {
        this.$axios.get(this.host + 'audit/getDeclareListForExpert', {
            params: {
                limit: this.accountState.level === 13
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

Vue.component('table-operation-audit-expert',{
    template:`
        <span v-if="accountState.level===13">
            <a @click.stop.prevent="audit(rowData,index)">{{ rowData.stateId===3 ? '评审' : '查看' }}</a>
        </span>
        <span v-else-if="accountState.level===1||accountState.level===14">
            <a v-if="rowData.stateId===3" @click.stop.prevent="expertAccount(rowData,index)">外审账号</a>
            <a v-else @click.stop.prevent="showDetail(rowData,index)">查看外审结果</a>
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
        audit(rowData) {
            this.updateIsAudit(rowData.stateId === 3).then(() => {
                this.$axios.get(this.host + 'bulletin/getBulletin', {
                    params: {
                        bulletinId: rowData.bulletinId
                    }
                }).then(bulletinRes => {
                    this.$axios.get(this.host + 'declare/getDeclare', {
                        params: {
                            declareId: rowData.declareId
                        }
                    }).then(declareRes => {
                        this.updateModel({
                            bulletin: bulletinRes.data,
                            declare: declareRes.data
                        }).then(() => {
                            this.$router.push('/Crescent/audit/expertDash/expertAudit').then();
                        });
                    })
                })
            })
        },
        showDetail(rowData) {
            this.$bvModal.show('show-expert-result');
        },
        expertAccount(rowData) {
            thisVue.bulletinId = rowData.bulletinId;
            this.$axios.get(this.host + 'audit/getExpertAccount', {
                params: {
                    bulletinId: rowData.bulletinId
                }
            }).then(res => {
                thisVue.form.expertAccount.model.currentCnt = res.data.length;
                thisVue.form.expertAccount.model.list = res.data;
                this.$bvModal.show('show-expert-account');
            })
        }
    },
    computed: {
        ...mapState('global', ['host', 'accountState'])
    }
})