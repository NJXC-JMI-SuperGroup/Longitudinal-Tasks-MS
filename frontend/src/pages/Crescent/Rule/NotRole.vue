<template>
    <div>
        <b-jumbotron header="Not Role" lead="用户角色不匹配">
            <p>当前用户角色无法访问此路径</p>
            <b-button variant="primary" @click="logout">退出登录</b-button>
        </b-jumbotron>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";

    export default {
        methods: {
            ...mapActions('global', ['resetAccountState']),
            logout() {
                this.$axios.get(this.apiHost + 'basic/logout').then(res => {
                    // eslint-disable-next-line no-console
                    console.info(res.data);
                }).finally(() => {
                    this.resetAccountState();
                    this.$router.push('/Crescent/login');
                })
            }
        }
    }
</script>

<style scoped>

</style>