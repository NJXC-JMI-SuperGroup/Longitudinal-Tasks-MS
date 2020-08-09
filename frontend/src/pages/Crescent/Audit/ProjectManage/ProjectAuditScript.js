import DetailForAudit from "../DetailForAudit/DetailForAudit";
import {mapState} from "vuex";
import validators from "../../../../validators";

export default {
    data() {
        return {
            form: {
                schemaReject: {
                    groups: [{
                        legend: "驳回理由与建议",
                        fields: [{
                            type: "textArea",
                            rows: 10,
                            model: 'desc'
                        }]
                    }]
                },
                schemaOver: {
                    groups: [{
                        legend: "项目编号",
                        fields: [{
                            type: "input",
                            inputType: "text",
                            id: "projectIndex",
                            maxlength: 50,
                            model: 'desc'
                        }]
                    }]
                },
                model: {
                    desc: null
                }
            },
            formAccount: {
                schema: {
                    groups: [{
                        legend: '发布公告信息',
                        fields: [{
                            type: 'input',
                            maxlength: 50,
                            inputType: 'text',
                            label: '当前账号数目',
                            id: 'currentAccountNumber',
                            model: 'currentCnt',
                            readonly: true
                        }, {
                            type: 'input',
                            maxlength: 50,
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
            tabs: []
        }
    },
    components: {
        DetailForAudit
    },
    computed: {
        ...mapState('global', ['model'])
    },
    methods: {
        submit(stateId) {
            this.$axios.post(this.apiHost + 'audit/projectAudit', {
                declareId: this.$refs.detailForm.form.model.declare.declareId,
                stateId: stateId,
                desc: [2, 7].indexOf(stateId) !== -1 ? this.form.model.desc : null
            }).then(() => {
                this.$router.push('/Crescent/audit/projectManage').then();
            })
        },
        createAccount() {
            this.$refs.accountVFG.validate().then(res => {
                if (res.length === 0) {
                    this.$axios.get(this.apiHost + 'audit/createExpertAccount', {
                        params: {
                            bulletinId: this.model.bulletin.bulletinId,
                            cnt: this.formAccount.model.createCnt
                        }
                    }).then(res => {
                        this.formAccount.model.currentCnt = res.data.length;
                        this.formAccount.model.list = res.data;
                    })
                }
            }).finally(() => {
                this.formAccount.model.createCnt = 1;
            })
        },
        expertResult() {
            this.$axios.get(this.apiHost + 'audit/getExpertAuditList', {
                params: {
                    declareId: this.model.declare.declareId
                }
            }).then(res => {
                this.tabs = res.data;
                this.$bvModal.show('show-expert-result');
            })
        },
        expertAccount() {
            this.$axios.get(this.apiHost + 'audit/getExpertAccount', {
                params: {
                    bulletinId: this.model.bulletin.bulletinId
                }
            }).then(res => {
                this.formAccount.model.currentCnt = res.data.length;
                this.formAccount.model.list = res.data;
                this.$bvModal.show('expert-account');
            })
        }
    }
}