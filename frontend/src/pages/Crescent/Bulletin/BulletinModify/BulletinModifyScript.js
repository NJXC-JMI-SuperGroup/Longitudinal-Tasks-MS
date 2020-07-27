import DetailForBulletin from "../DetailForBulletin/DetailForBulletin";

export default {
    components: {
        DetailForBulletin
    },
    methods: {
        updateBulletin() {
            this.$refs.detailForm.submit('bulletin/modifyBulletin', 'bulletin/commit');
        }
    }
}