import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login'


Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        userBasic: login
    },
});

export default store;