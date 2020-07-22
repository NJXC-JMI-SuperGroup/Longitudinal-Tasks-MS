import DetailForBulletin from "../DetailForBulletin/DetailForBulletin";
import {mapActions} from "vuex";

export default {
    components: {
        DetailForBulletin
    },
    methods: {
        ...mapActions('global', ['resetBulletinModel']),
        publishBulletin() {
            // eslint-disable-next-line no-console
            console.info(this.$refs.detailForm.model, this.$refs.detailForm.$refs.quillEditor.quill.root.innerHTML);
        }
    },
    mounted() {
        this.resetBulletinModel();
    },
}