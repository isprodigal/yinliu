import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//导入API接口
import API from '../../api'

const state = {
    //菜单栏索引
    componentList: 1,
    //表单数据
    tableData: [],
    //分页器
    PageOrgan: {
        pageSize: 5,
        pageNo: 1,
        total: 1,
    },
    //弹窗类型
    dialogType: 'add'
}

const mutations = {
    Mut_SET_componentList(state, newVal) {
        state.componentList = newVal
    },
    Mut_SET_PageOrgan(state, newVal) {
        state.PageOrgan = newVal
    },
    Mut_SET_tableData(state, newVal) {
        state.tableData = newVal
    },
    Mut_SET_dialogType(state, newVal) {
        state.dialogType = newVal
    }
}

const actions = {
    //刷新表格
    async ACT_query_tableData(context, res = 1) {
        const { user_id } = JSON.parse(sessionStorage.getItem('userInfo'))[0]
        let params = {
            "beforeSql": "SELECT * from article  join user_article on article.article_id =  user_article.article_id",
            "limitMap": {
                pageSize: state.PageOrgan.pageSize,
                pageNo: res,
            },
            "condition": {
                "user_article.user_id": user_id
            }
        }
        let { code, data, total } = await API.multiTableQuery(params)
        if (code == '00000') {
            context.commit('Mut_SET_tableData', data)
            let PageOrgan = {
                pageSize: state.PageOrgan.pageSize,
                pageNo: res,
                total
            }
            context.commit('Mut_SET_PageOrgan', PageOrgan)
        }
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    actions
})


export default store