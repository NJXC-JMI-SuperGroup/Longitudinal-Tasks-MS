<template>
    <div class="auth-page">
        <b-container>
            <h5 class="auth-logo">
                <i class="fa fa-circle text-primary"></i>
                Crescent App
                <i class="fa fa-circle text-danger"></i>
            </h5>
            <Widget class="widget-auth mx-auto" title="<h3 class='mt-0'>Login Crescent App</h3>" customHeader>
                <p class="widget-auth-info">
                    login to enjoy my Crescent App.
                </p>
                <vue-form-generator :schema="form.schema" :model="form.model" :options="form.options" ref="vfg" />
                <b-button size="sm" class="auth-btn mb-3" variant="inverse" @click="login">Login</b-button>
                <b-toast id="submit-login" variant="danger" title="登陆失败" static autoHideDelay=260>
                    请检查用户名密码是否正确。
                </b-toast>
                <p class="widget-auth-info">
                    Don't have an account? use out test account!
                </p>
            </Widget>
        </b-container>
        <footer class="auth-footer">
            2020 &copy; Crescent App of Crab.mooyyu's group.
        </footer>
    </div>
</template>

<script src="./LoginScript.js" />
