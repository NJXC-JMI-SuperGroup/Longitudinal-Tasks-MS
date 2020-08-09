// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueTouch from 'vue-touch';
import Trend from 'vuetrend';
import Toasted from 'vue-toasted';
import VueApexCharts from 'vue-apexcharts';

import store from './store';
import router from './Routes';
import App from './App';
import layoutMixin from './mixins/layout';
import Widget from './components/Crescent/Widget/Widget';

Vue.use(BootstrapVue);
Vue.use(VueTouch);
Vue.use(Trend);
Vue.component('Widget', Widget);
Vue.component('apexchart', VueApexCharts);
Vue.mixin(layoutMixin);
Vue.use(Toasted, {duration: 10000});

import axios from 'axios';
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;

import $ from 'jquery';
Vue.prototype.$ = $;

import uploader from 'vue-simple-uploader';
Vue.use(uploader);

import LoadScript from "vue-plugin-load-script";
Vue.use(LoadScript);

import "pikaday/css/pikaday.css";
import VueFormGenerator from 'vue-form-generator';
import 'vue-form-generator/dist/vfg.css';
Vue.use(VueFormGenerator);

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.use(VueQuillEditor /* , { default global options } */)

// vue-easytable
import 'vue-easytable/libs/themes-base/index.css'
import {VTable,VPagination} from 'vue-easytable'
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

// Vue.prototype.apiHost = 'http://10.252.40.180:8216/crescent/';
Vue.prototype.apiHost = 'http://localhost:8216/crescent/';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    if (to.meta.hasOwnProperty('role') &&
        (!store.state.global.accountState.loginState || to.meta.role.indexOf(store.state.global.accountState.level) === -1)
    ) {
        next({
            replace: true,
            name: 'notRole'
        })
    } else {
        next();
    }
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});
