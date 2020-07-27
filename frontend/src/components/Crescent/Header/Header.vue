<template>
    <b-navbar class="header d-print-none app-header">
        this is header.
    </b-navbar>
</template>

<script>
    import {mapState, mapActions} from 'vuex';

    export default {
        name: 'Header',
        computed: {
            ...mapState('layout', ['sidebarClose', 'sidebarStatic']),
        },
        methods: {
            ...mapActions('layout', ['toggleSidebar', 'switchSidebar', 'changeSidebarActive']),
            switchSidebarMethod() {
                if (!this.sidebarClose) {
                    this.switchSidebar(true);
                    this.changeSidebarActive(null);
                } else {
                    this.switchSidebar(false);
                    const paths = this.$route.fullPath.split('/');
                    paths.pop();
                    this.changeSidebarActive(paths.join('/'));
                }
            },
            toggleSidebarMethod() {
                if (this.sidebarStatic) {
                    this.toggleSidebar();
                    this.changeSidebarActive(null);
                } else {
                    this.toggleSidebar();
                    const paths = this.$route.fullPath.split('/');
                    paths.pop();
                    this.changeSidebarActive(paths.join('/'));
                }
            },
            logout() {
                window.localStorage.setItem('authenticated', false);
                this.$router.push('/SingApp/login');
            },
        }
    };
</script>

<style src="./Header.scss" lang="scss"></style>
