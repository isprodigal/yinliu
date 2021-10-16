import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
export const eventBus = new Vue()
//导入vuex
import store from './stort'
//全局挂载所有接口名
import api from "../api/index.js";
Vue.prototype.$API = api;

import filters from "@utils/filters.js";
Object.keys(filters).forEach(key => { Vue.filter(key, filters[key]); });

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})


