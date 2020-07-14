<template>
    <router-view/>
</template>

<script>
    export default {
        created() {
            // const currentPath = this.$router.history.current.path;
            //
            // if (currentPath === '/' || currentPath === '/Crescent') {
            //     this.$router.push('/Crescent/hello');
            // }
        },
    };
</script>

<style src="./styles/Crescent/theme.scss" lang="scss"/>
