import DetailForAudit from "../DetailForAudit/DetailForAudit";
import {mapState} from "vuex";

export default {
    data() {
        return {
            form: {
                schemaModel: {
                    groups: [{
                        legend: "驳回理由与建议",
                        fields: [{
                            type: "textArea",
                            rows: 10
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
    }
}