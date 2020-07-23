import DetailForBulletin from "../DetailForBulletin/DetailForBulletin";
import {mapActions, mapState} from "vuex";

export default {
    components: {
        DetailForBulletin
    },
    methods: {
        ...mapActions('global', ['resetBulletinModel']),
        publishBulletin() {
            let leftVFG = this.$refs.detailForm.$refs.vfgLeft;
            let rightVFG = this.$refs.detailForm.$refs.vfgRight;
            let formModel = this.$refs.detailForm.form.model;
            formModel.content = this.$refs.detailForm.$refs.quillEditor.quill.root.innerHTML;
            leftVFG.validate().then(leftRes => {
                rightVFG.validate().then(rightRes => {
                    if (leftRes.length === 0 && rightRes.length === 0) {
                        this.$axios.post(this.host + 'bulletin/addBulletin', formModel).then(res => {
                            if (res.data!==-1) {
                                this.$refs.detailForm.uploadFiles(res.data);
                            }
                        })
                    }
                })
            })
        }
    },
    mounted() {
        this.resetBulletinModel();
    },
    computed: {
        ...mapState('global', ['host'])
    }
}