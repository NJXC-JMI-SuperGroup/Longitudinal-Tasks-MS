import Widget from "../../../components/Crescent/Widget/Widget";
import {mapActions} from "vuex";

export default {
    components: {Widget},
    data() {
        return {
        };
    },
    methods: {
        ...mapActions('global', ['updateUserLevel']),
        login(level) {
            this.updateUserLevel(level);
            if (level === 3) {
                this.$router.push('/Crescent/audit/expertDash');
            } else {
                this.$router.push('/Crescent/bulletin/dash');
            }
        },
    }
};