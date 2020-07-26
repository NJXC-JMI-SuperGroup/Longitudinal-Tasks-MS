import DetailForAudit from "../DetailForAudit/DetailForAudit";
import {mapState} from "vuex";
import validators from "vue-form-generator/src/utils/validators";

export default {
    data() {
        return {
            form: {
                schema: {
                    groups: [{
                        fields: [{
                            type: 'input',
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
    components: {
        DetailForAudit
    },
    computed: {
        ...mapState('global', ['host']),
        ...mapState('global', {
            declareId: state => state.model.declare.declareId
        })
    },
    mounted() {
        this.form.model.declareId = this.declareId;
        this.$axios.get(this.host + 'audit/getExpertAudit', {
            params: {
                declareId: this.declareId
            }
        }).then(res => {
            if (res.data === null || res.data.length===0) {
                this.isAudit = true;
            } else {
                this.form.model = res.data;
            }
        })
    },
    methods: {
        submit() {
            this.$refs.vfg.validate().then(res => {
                if (res.length === 0) {
                    this.$axios.post(this.host + 'audit/setExpertAudit', this.form.model).then(res => {
                        // eslint-disable-next-line no-console
                        console.info(res.data);
                        this.$router.push('/Crescent/audit/expertDash').then();
                    })
                }
            })
        }
    }
}