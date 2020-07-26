import {mapState} from "vuex";

export default {
    data() {
        return {
            options: {
                withCredentials: true,
                target: this.$store.state.global.uploader.target,
                testChunks: false
            }
        }
    },
    computed: {
        ...mapState('global', {
            uler: state => state.uploader
        })
    }
}