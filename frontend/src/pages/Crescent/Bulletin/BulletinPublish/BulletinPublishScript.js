import DetailForBulletin from "../DetailForBulletin/DetailForBulletin";
import {mapActions} from "vuex";

export default {
    components: {
        DetailForBulletin
    },
    methods: {
        ...mapActions('global', ['resetBulletinModel']),
        publishBulletin() {
            this.$refs.detailForm.submit('bulletin/addBulletin');
        }
    },
    data() {
        return {
            loading: true
        }
    },
    mounted() {
        this.resetBulletinModel().then(() => {
            this.loading = false;
        });
    }
}