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
            this.$axios.get(this.host + 'account/getState').then(res => {
                if (res.data.isLogin) {
                    res.data.type = this.levelDesc[res.data.level];
                }
                this.updateAccountState(res.data);
                if (!this.accountState.isLogin && this.$router.history.current.path!=='/Crescent/login') {
                    this.$router.push('/Crescent/login')
                }
            })
        },
        methods: {
            ...mapActions('global', ['updateAccountState'])
        },
        computed: {
            ...mapState('global', ['host', 'accountState'])
        }
    };
</script>

<style src="./styles/Crescent/theme.scss" lang="scss"/>
