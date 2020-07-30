<template>
    <div class="header overflow-hidden bg-white fixed-top">
        <div class="topH pt-1">
            <div class="img d-block h-100">- 课题管理一体化平台</div>
        </div>
        <div class="bottomH w-100 d-flex flex-row justify-content-start">
            <template v-for="(item, index) in list">
                <a :class="'HButton ' + (item.title === '课题申报立项管理系统' ? 'active' : '')"  :href="item.link" :key="'list' + index" target="_blank">{{item.title}}</a>
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
            background: linear-gradient(to bottom, rgb(90, 170, 200), rgb(160, 190, 210));
            div.img {
                height: 37px;
                background-position-x: 10px;
                background-image: url("../../../asserts/jmi.png");
                background-size: contain;
                background-repeat: no-repeat;
                padding-left: 240px;
                font-size: 16px;
                line-height: 39px;
                color: rgb(80, 110, 140);
                font-weight: bold;
            }
        }
        div.bottomH {
            height: 23px;
            background-color: rgb(56, 120, 200);
            a.HButton {
                text-decoration: none;
                display: block;
                height: 23px;
                background: linear-gradient(to bottom, rgb(40, 100, 190) 0%,rgb(60, 130, 220) 100%);
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
            a.active {
                background: white;
                border-bottom: 4px solid lightgray;
                color: #0a0303;
            }
        }
    }
</style>