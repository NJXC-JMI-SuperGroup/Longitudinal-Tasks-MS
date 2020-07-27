import DetailForDeclare from "../DetailForDeclare/DetailForDeclare";
import {mapActions} from "vuex";

export default {
    components: {
        DetailForDeclare
    },
    methods: {
        ...mapActions('global', ['resetDeclareModel', 'updateUploader']),
        createDeclare() {
            this.$refs.detailForm.submit('declare/createDeclare', 'declare/commit');
        }
    },
    data() {
        return {
            loading: true
        }
    },
    mounted() {
        this.updateUploader({
            hint: '提交后请等待文件上传',
            target: this.apiHost + 'declare/uploadFiles'
        }).then();
        this.resetDeclareModel().then(() => {
            this.loading = false;
        });
    }
}