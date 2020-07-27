<template>
    <div class="header overflow-hidden bg-white fixed-top">
        <div class="topH"><div class="img" /></div>
        <div class="bottomH bg-white d-flex flex-row justify-content-start">
            <template v-for="(item, index) in list">
                <a class="HButton" :href="item.link" :key="'list' + index" target="_blank">{{item.title}}</a>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: []
            }
        },
        mounted() {
            this.$axios.get(this.apiHost + 'linkList/getLinkList').then(res => {
                this.list = res.data;
            })
        }
    }
</script>

<style lang="less" scoped>
    div.header {
        height: 60px;
        div.topH {
            height: 37px;
            background: linear-gradient(173deg, rgb(72, 134, 232) 0%, rgb(80, 145, 222) 10%, rgba(105,166,236,1) 27%, rgba(242,242,242,1) 100%);
            div.img {
                height: 37px;
                background-position-x: 10px;
                background-image: url("../../../asserts/jmi.png");
                background-size: contain;
                background-repeat: no-repeat;
            }
        }
        div.bottomH {
            height: 23px;
            background: linear-gradient(173deg, rgb(152, 189, 246) 0%, rgb(161, 197, 239) 10%, rgb(160, 187, 219) 29%, rgba(242,242,242,1) 100%);
            a.HButton {
                display: block;
                height: 23px;
                width: 87px;
                background: linear-gradient(to bottom, #4eb5e5 0%,#389ed5 100%);
                border: none;
                border-radius: 3px;
                border-bottom: 4px solid #2b8bc6;
                color: #fbfbfb;
                font-family: serif;
                text-shadow: 1px 1px 1px rgba(0,0,0,.4);
                text-indent: 5px;
                box-shadow: 0 3px 0 0 rgba(0,0,0,.2);
                cursor: pointer;
                margin-right: 2px;
                padding-left: 5px;
                padding-right: 5px;
            }
        }
    }
</style>