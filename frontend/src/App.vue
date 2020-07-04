<template>
    <router-view/>
</template>

<script>
    export default {
        name: 'App',
        created() {
            const currentPath = this.$router.history.current.path;

            // root router redirect begin
            if (currentPath === '/' || currentPath === '/SingApp') {
                this.$router.push('/SingApp/dashboard');
            }
            // root router redirect end

            // projects router redirect begin

            // Crescent router redirect begin
            // Crescent router redirect end

            // NotBad router redirect begin
            // NotBad router redirect end

            // Third router redirect begin
            // Third router redirect end

            // projects router redirect end

        },
    };
</script>

<style src="./styles/SingApp/theme.scss" lang="scss"/>
