import DetailForDeclare from "../DetailForDeclare/DetailForDeclare";
import {mapActions} from "vuex";

export default {
    components: {
        DetailForDeclare
    },
    methods: {
        ...mapActions('global', ['resetDeclareModel']),
        createDeclare() {
            this.$refs.detailForm.submit('declare/createDeclare');
        }
    },
    data() {
        return {
            loading: true
        }
    },
    mounted() {
        this.resetDeclareModel().then(() => {
            this.loading = false;
        });
    }
}