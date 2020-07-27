import DetailForDeclare from "../DetailForDeclare/DetailForDeclare";

export default {
    components: {
        DetailForDeclare
    },
    methods: {
        updateDeclare() {
            this.$refs.detailForm.submit('declare/modifyDeclare', 'declare/commit');
        }
    }
}