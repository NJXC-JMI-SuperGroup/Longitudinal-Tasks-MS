<template>
    <div class="header overflow-hidden bg-white fixed-top">
        <div class="topH py-2 position-relative">
            <div class="img d-block h-100">- 课题管理一体化平台</div>
            <span @click="logout" class="exitBTN position-absolute">退出</span>
        </div>
        <div class="bottomH w-100 d-flex flex-row justify-content-start">
            <template v-for="(item, index) in list">
                <a :class="'HButton text-center ' + (item.title === '纵向课题申报' ? 'active' : '')"  :href="item.link" :key="'list' + index" target="_blank">{{item.title}}</a>
            </template>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

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
        },
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

<style lang="less" scoped>
    div.header {
        height: 79px;
        div.topH {
            height: 52px;
            background: linear-gradient(to bottom, rgb(90, 170, 200), rgb(160, 190, 210));
            div.img {
                height: 52px;
                background-position-x: 12px;
                background-image: url("../../../asserts/jmi.png");
                background-size: contain;
                background-repeat: no-repeat;
                padding-left: 284px;
                font-size: 16px;
                line-height: 39px;
                color: rgb(80, 110, 140);
                font-weight: bold;
            }
            .exitBTN {
                right: 30px;
                top: 16px;
                color: white;
                cursor: pointer;
            }
        }
        div.bottomH {
            height: 27px;
            background-color: rgb(56, 120, 200);
            a.HButton {
                text-decoration: none;
                display: block;
                height: 27px;
                background: linear-gradient(to bottom, rgb(40, 100, 190) 0%,rgb(60, 130, 220) 100%);
                border-radius: 1px;
                border-bottom: 4px solid #2b8bc6;
                border-left: 1px solid darkblue;
                color: #fbfbfb;
                font-family: sans-serif;
                text-shadow: 1px 1px 1px rgba(0,0,0,.4);
                text-indent: 5px;
                font-size: 12px;
                cursor: pointer;
                font-weight: bold;
                padding-left: 5px;
                padding-right: 5px;
                line-height: 27px;
                width: 92px;
            }
            a.active {
                background: white;
                border: none;
                border-top: 3px solid lightgreen;
                border-bottom: 1px solid lightgray;
                color: #0a0303;
                text-shadow: none;
                line-height: 24px;
            }
        }
    }
</style>