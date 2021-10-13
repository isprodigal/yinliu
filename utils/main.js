
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/utils/rem"


//全局挂载所有接口名
// import api from "@/api/page_yeKuo/troumetermentStolen/api.js"
// Vue.prototype.$api = api;
//全局挂载所有接口名
import api from "@/api/page_yeKuo/lowVoltage/temporaryDemolition";
Vue.prototype.$api = api;


//全局挂载时间过滤器
import filters from "@utils/toolsClass/filters.js"
Vue.prototype.$filters = filters;
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

//全局挂载表单校验方法
import verificationInfoFn from "@utils/toolsClass/verificationInfoFn.js"
Vue.prototype.$verificationInfoFn = verificationInfoFn;


// 引入VantUI样式和按需引入VantUI组件
import 'vant/lib/icon/local.css';
//引入重置VantUI库的样式文件
import "@/static/style/resetVantui.scss";
//引入重置特殊字体文件
import "@/static/fonts/font.css";
//引入base页面通用样式文件
import "@/static/style/base.css";
// 引入scss语法封装的公共样式,全局使用sass定义的变量及mixin混合函数
import "@/static/style/scss/index.scss";


//全局使用dayjs格式化时间
import day from 'dayjs';
Vue.prototype.$day = day;

//全局获取标准代码数据
// store.dispatch("baseStore/SET_SELECT_DATA");

import CreateAPI from 'vue-create-api';
Vue.use(CreateAPI)
import TimePickerPop from '@baseComponents/base_mask/timePickerPop.vue'
import SingleSelectPop from '@baseComponents/base_mask/singleSelectPop.vue'
import CalendarPop from '@baseComponents/base_mask/calendarPop.vue'
import CheckboxPop from '@baseComponents/base_mask/checkboxPop.vue'
import TagPop from '@baseComponents/base_mask/tagPop.vue'
import RadioPop from '@baseComponents/base_mask/radioPop.vue'
Vue.createAPI(TimePickerPop, true)
Vue.createAPI(SingleSelectPop, true)
Vue.createAPI(CalendarPop, true)
Vue.createAPI(CheckboxPop, true)
Vue.createAPI(TagPop, true)
Vue.createAPI(RadioPop, true)

Vue.config.productionTip = false;

window.uexOnload = () => {
    let workInfo = JSON.parse(uexWidget.getOpenerInfo()) // 获取移动端数据
    window.$_workData = JSON.parse(uexWidget.getOpenerInfo());
    let order = workInfo.order ? workInfo.order : {} //移动端工单数据
    let user = workInfo.user ? workInfo.user : {} //移动端用户信息
    let token = workInfo.token ? workInfo.token : '' // 移动端用户token
    let url = workInfo.url ? workInfo.url : ''
    let authTokenUrl = {
        url: url,
        authToken: token
    }
    // let orderStr = Object.getOwnPropertyNames(order).reduce((pre, item) =>{
    // 	pre += item + ": " + order[item] + '\n'
    // 	return pre
    // }, '移动端工单数据-order:\n');

    // let userStr = Object.getOwnPropertyNames(order).reduce((pre, item) =>{
    // 	pre += item + ": " + user[item] + '\n'
    // 	return pre
    // }, '移动端用户信息-user:\n')


    // alert(orderStr)
    // alert(userStr)



    Object.assign(order, {
        userID: order.handleID,
        appNo: order.wkOrderNo,
        authToken: token,  // token
        userInfoData: user,  // 用户信息,
        url: url              // 请求接口
    });
    sessionStorage.setItem("workOrgindPoolData", JSON.stringify(order)); // 存入本地
    sessionStorage.setItem("authTokenUrl", JSON.stringify(authTokenUrl)); // 存入本地
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
