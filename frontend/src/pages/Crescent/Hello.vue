<template>
    <div>
        hello, world.
    </div>
</template>

<script>
    export default {
        name: "hello",
        mounted() {
            this.axios.get(this.global.Crescent.host + '/test/is_ok', {
                withCredentials: true,
                params: {
                    card: 26
                }
            }).then(res => {
                // eslint-disable-next-line no-console
                console.info(res.data);
            });
        }
    }
</script>

<style scoped>

</style>