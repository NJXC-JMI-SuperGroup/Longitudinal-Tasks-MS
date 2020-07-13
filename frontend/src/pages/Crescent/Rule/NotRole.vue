<template>
    <div>
        <b-jumbotron header="Not Role" lead="用户角色不匹配">
            <p>当前用户角色无法访问此路径</p>
            <b-button variant="primary" @click="logout">退出登录</b-button>
        </b-jumbotron>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        methods: {
            ...mapActions('global', ['updateUserLevel']),
            logout() {
                this.updateUserLevel(0);
                this.$router.push('/Crescent/login');
            }
        }
    }
</script>

<style scoped>

</style>