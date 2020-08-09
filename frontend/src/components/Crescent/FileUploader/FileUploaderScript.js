import {mapState} from "vuex";

export default {
    data() {
        return {
            options: {
                withCredentials: true,
                target: this.$store.state.global.uploader.target,
                testChunks: false
            },
            fileStatusText: {
                success: '成功',
                error: '错误',
                uploading: '上传中',
                paused: '暂停',
                waiting: '等待'
            }
        }
    },
    computed: {
        ...mapState('global', {
            uler: state => state.uploader
        })
    }
}