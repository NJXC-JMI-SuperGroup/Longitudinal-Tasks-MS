import DetailForDeclare from "../DetailForDeclare/DetailForDeclare";
import {mapActions} from "vuex";

export default {
    components: {
        DetailForDeclare
    },
    methods: {
        ...mapActions('global', ['updateSelectionList']),
        updateDeclare() {
            this.$refs.detailForm.submit('declare/modifyDeclare', 'declare/commit');
        }
    },
    data() {
        return {
            loaded: false
        }
    },
    mounted() {
        this.$axios.get(this.apiHost + 'basic/getSelectionList').then(res => {
            this.updateSelectionList(res.data).then(() => {
                this.loaded = true;
            })
        })
    }
}