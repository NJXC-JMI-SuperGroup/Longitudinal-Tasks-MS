import DetailForAudit from "../DetailForAudit/DetailForAudit";
import {mapState} from "vuex";

export default {
    data() {
        return {
            form: {
                schemaModel: {
                    groups: [{
                        fields: [{
                            type: 'input',
                            inputType: "Number",
                            label: "分数",
                            id: 'scoreId',
                        }]
                    }, {
                        legend: "意见与建议",
                        fields: [{
                            type: "textArea",
                            rows: 10,
                        }]
                    }]
                },
                schemaModelReadonly: {
                    groups: [{
                        fields: [{
                            type: 'input',
                            inputType: "Number",
                            label: "分数",
                            id: 'scoreIdReadonly',
                            readonly: true
                        }]
                    }, {
                        legend: "意见与建议",
                        fields: [{
                            type: "textArea",
                            rows: 10,
                            readonly: true
                        }]
                    }]
                }
            }
        }
    },
    components: {
        DetailForAudit
    },
    computed: {
        ...mapState('global', {
            isAudit: state => state.isAudit
        })
    },
    mounted() {
        // eslint-disable-next-line no-console
        console.info(this.isAudit);
    }
}