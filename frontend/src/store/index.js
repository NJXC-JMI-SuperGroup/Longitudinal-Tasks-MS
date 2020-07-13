import Vue from 'vue';
import Vuex from 'vuex';

import layout from './layout';
import global from './global'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        layout,
        global
    },
});
