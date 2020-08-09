import DetailForAudit from "../DetailForAudit/DetailForAudit";
import {mapState} from "vuex";
import validators from "../../../../validators";

export default {
    data() {
        return {
            form: {
                schema: {
                    groups: [{
                        legend: "驳回理由与建议",
                        fields: [{
                            type: "textArea",
                            rows: 10,
                            model: 'rejectionReason'
                        }]
                    }]
                },
                model: {
                    rejectionReason: null
                }
            }
        }
    },
    components: {
        DetailForAudit
    },
    computed: {
        ...mapState('global', ['isAudit'])
    },
    methods: {
        submit(stateId) {
            this.$axios.post(this.apiHost + 'audit/projectAudit', {
                declareId: this.$refs.detailForm.form.model.declare.declareId,
                stateId: stateId,
                desc: this.form.model.rejectionReason
            }).then(res => {
                // eslint-disable-next-line no-console
                console.info(res.data);
            }).finally(() => {
                this.$router.push('/Crescent/audit/departDash').then();
            })
        }
    }
}