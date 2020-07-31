<template>
    <div v-if="!excluded">
        <div class="tree"><span class="font-weight-bold">位置:</span><span class="mx-1" />{{tree}}</div>
    </div>
</template>
<script>
    export default {
        name: 'BreadcrumbHistory',
        props: {
            exclude: {type: Array, default: () => []}
        },
        computed: {
            excluded() {
                return this.exclude.indexOf(this.$route.path.split('/').pop()) > -1;
            },
            tree() {
                return this.$route.meta.chShow;
            }
        }
    }
</script>

<style lang="less" scoped>
    div.tree {
        height: 39px;
        padding-left: 20px;
        background-color: rgb(237, 246, 250);
        border-bottom: 1px solid rgb(210, 230, 230);
        line-height: 39px;
        font-size: 13px;
    }
</style>
