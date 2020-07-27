import DetailForBulletin from "../DetailForBulletin/DetailForBulletin";
import {mapActions} from "vuex";

export default {
    components: {
        DetailForBulletin
    },
    methods: {
        ...mapActions('global', ['resetBulletinModel', 'updateUploader']),
        publishBulletin() {
            this.$refs.detailForm.submit('bulletin/addBulletin', 'bulletin/commit');
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
            target: this.apiHost + 'bulletin/uploadFiles'
        }).then();
        this.resetBulletinModel().then(() => {
            this.loading = false;
        });
    }
}