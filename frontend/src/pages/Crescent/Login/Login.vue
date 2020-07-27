<template>
    <div class="auth-page">
        <b-container>
            <h5 class="auth-logo text-white">
                <i class="fa fa-circle text-primary"></i>
                课题申报立项管理系统
                <i class="fa fa-circle text-danger"></i>
            </h5>
            <Widget class="widget-auth mx-auto" customHeader>
                <div class="card border-0">
                    <vue-form-generator :schema="form.schema" :model="form.model" :options="form.options" ref="vfg" />
                    <b-button size="sm" squared class="mb-3" variant="inverse" @click="login">Login</b-button>
                    <b-toast id="submit-login" variant="danger" title="登陆失败" static autoHideDelay=260>
                        请检查用户名密码是否正确。
                    </b-toast>
                </div>
            </Widget>
        </b-container>
        <footer class="auth-footer">
            2020 &copy; JMI 课题申报立项管理系统
        </footer>
    </div>
</template>

<style lang="less" scoped>
    div.auth-page {
        background-image: url("../../../asserts/bg.png");
        background-size: cover;
        background-repeat: no-repeat;
        padding-top: 120px;
        .widget-auth {
            background-image: url("../../../asserts/loginBorder.png");
            background-size: contain;
            background-repeat: no-repeat;
            background-color: transparent;
            max-width: 640px;
            height: 390px;
            div.card {
                background-color: transparent;
                padding-left: 200px;
                padding-top: 76px;
            }
        }
    }
</style>

<script src="./LoginScript.js" />
