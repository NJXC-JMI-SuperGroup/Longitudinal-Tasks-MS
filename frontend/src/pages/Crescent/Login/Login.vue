<template>
    <div class="auth-page">
        <div class="header fixed-top">欢迎登陆科研管理系统</div>
        <b-container>
            <Widget class="widget-auth mx-auto" customHeader>
                <div class="card border-0">
                    <vue-form-generator :schema="form.schema" :model="form.model" :options="form.options" ref="vfg" />
                    <b-button squared class="my-2 submitBTN" @click="login">登录</b-button>
                    <b-toast id="submit-login" variant="danger" title="登陆失败" static autoHideDelay=260>
                        请检查用户名密码是否正确。
                    </b-toast>
                </div>
            </Widget>
        </b-container>
    </div>
</template>

<style lang="less">
    div.auth-page {
        background-image: url("../../../asserts/bg.png");
        background-size: cover;
        background-repeat: no-repeat;
        padding-top: 220px;
        .header {
            height: 47px;
            background: rgba(1, 1, 5, .26) url("../../../asserts/open.png") no-repeat 21px 18px;
            color: rgba(255, 255, 255, .7);
            line-height: 47px;
            font-size: 9pt;
            text-indent: 44px;
        }
        .widget-auth {
            background-image: url("../../../asserts/loginBorder.png");
            background-size: contain;
            background-repeat: no-repeat;
            background-color: transparent;
            width: 690px;
            max-width: 690px;
            min-width: 690px;
            height: 390px;
            div.card {
                background-color: transparent;
                padding-left: 200px;
                padding-top: 64px;
                div.vue-form-generator > fieldset {
                    div.form-group {
                        display: flex;
                        label {
                            width: 84px;
                            font-weight: bold;
                            margin-left: 61px;
                            line-height: 42px;
                        }
                        label[for="inputPassword"] {
                            text-indent: 7px;
                        }
                        div.field-wrap {
                            width: 260px;
                            div.wrapper > input {
                                height: 42px;
                                border: solid 1px #A5C7FF;
                                border-radius: 0;
                            }
                        }
                    }
                    div.form-group.required > label:after {
                        content: '';
                    }
                }
                .submitBTN {
                    margin-left: 120px;
                    height: 35px;
                    width: 111px;
                    background-color: rgb(80, 150, 195);
                    color: white;
                    font-weight: bold;
                    border-radius: 4px !important;
                }
            }
        }
    }
</style>

<script src="./LoginScript.js" />
