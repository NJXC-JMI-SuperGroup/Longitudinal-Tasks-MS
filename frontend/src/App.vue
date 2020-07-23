<template>
    <router-view/>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        data() {
            return {
                levelDesc: {
                    "0": "教师",
                    "1": "二级学院管理员",
                    "13": "外审专家",
                    "14": "立项课题系统管理员"
                }
            }
        },
        created() {
            this.$axios.get(this.host + 'basic/getAccountState').then(res => {
                if (res.data.loginState) {
                    res.data.type = this.levelDesc[res.data.level];
                }
                this.updateAccountState(res.data);
                if (!this.accountState.loginState && this.$router.history.current.path!=='/Crescent/login') {
                    this.$router.push('/Crescent/login')
                } else {
                    if (this.accountState.level === 13 && this.$router.history.current.path!=='/Crescent/audit/expertDash') {
                        this.$router.push('/Crescent/audit/expertDash');
                    } else if (this.$router.history.current.path!=='/Crescent/bulletin/dash') {
                        this.$router.push('/Crescent/bulletin/dash');
                    }
                }
            });
            this.$axios.get(this.host + 'basic/getSelectionList').then(res => {
                this.updateSelectionList(res.data).then()
            })
        },
        methods: {
            ...mapActions('global', ['updateAccountState', 'updateSelectionList'])
        },
        computed: {
            ...mapState('global', ['host', 'accountState', 'selectionList'])
        }
    };
</script>

<style src="./styles/Crescent/theme.scss" lang="scss"/>
