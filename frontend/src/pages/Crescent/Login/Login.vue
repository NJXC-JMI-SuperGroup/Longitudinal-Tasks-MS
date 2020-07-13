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
                <form class="mt">
                    <div class="form-group">
                        <!--suppress HtmlFormInputWithoutLabel -->
                        <input class="form-control no-border" ref="email" required type="email" name="email"
                               placeholder="Email"/>
                    </div>
                    <div class="form-group">
                        <!--suppress HtmlFormInputWithoutLabel -->
                        <input class="form-control no-border" ref="password" required type="password" name="password"
                               placeholder="Password"/>
                    </div>
                    <b-button size="sm" class="auth-btn mb-3" variant="inverse">Login</b-button>
                </form>
                <p class="widget-auth-info">
                    Don't have an account? use out test account!
                </p>
                <div class="row d-flex justify-content-around">
                    <b-button size="sm" class="auth-btn col-6 bg-info" @click="login(1)" variant="inverse">教师</b-button>
                    <b-button size="sm" class="auth-btn col-6 bg-info" @click="login(2)" variant="inverse">二级学院</b-button>
                    <b-button size="sm" class="auth-btn col-6 bg-info" @click="login(3)" variant="inverse">外审专家</b-button>
                    <b-button size="sm" class="auth-btn col-6 bg-info" @click="login(4)" variant="inverse">究极BOSS</b-button>
                </div>
            </Widget>
        </b-container>
        <footer class="auth-footer">
            2020 &copy; Crescent App of Crab.mooyyu's group.
        </footer>
    </div>
</template>

<script src="./LoginScript.js" />
