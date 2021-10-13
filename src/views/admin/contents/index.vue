<template>
    <div class="contents">
        <div class="header">
            <el-button type="primary" @click="add">新增</el-button>
        </div>
        <div class="center">
            <tableOne @edit="edit"></tableOne>
        </div>
        <el-pagination background layout="prev, pager, next" :page-size='PageOrgan.pageSize' :hide-on-single-page='true' @current-change="change" :total="PageOrgan.total">
        </el-pagination>
        <div class="mark">
            <dialogOne :dialogOneSj='dialogOneSj' :key="dialogKey"></dialogOne>
        </div>
    </div>
</template>

<script>
import tableOne from "../compoents/tableOne.vue"
import dialogOne from "../compoents/dialogOne.vue"
import { mapState, mapMutations, mapActions } from "vuex"
export default {
    components: { tableOne, dialogOne },
    data: () => ({
        dialogKey: 1,
        dialogOneSj: {
            dialogFormVisible: false
        }
    }),
    created() {
        this.ACT_query_tableData()
    },
    methods: {
        ...mapMutations({ Mut_SET_dialogType: 'Mut_SET_dialogType' }),
        ...mapActions({ ACT_query_tableData: 'ACT_query_tableData' }),
        //分页器点击
        change(val) {
            this.ACT_query_tableData(val)
        },
        //编辑
        edit(val) {
            this.dialogKey++
            const { article_id, article_title, article_value } = val
            this.dialogOneSj.title = '编辑数据'
            this.dialogOneSj.formLabelAlign = {
                article_id, article_title, article_value
            }
            this.dialogOneSj.dialogFormVisible = true
        },
        //新增
        add() {
            this.Mut_SET_dialogType('add')
            this.dialogKey++
            this.dialogOneSj.title = '新增数据'
            this.dialogOneSj.formLabelAlign = {
                article_title: '',
                article_value: '',
            }
            this.dialogOneSj.dialogFormVisible = true
        }
    },
    computed: {
        ...mapState({
            dialogType: state => state.dialogType,
            PageOrgan: state => state.PageOrgan,
        })
    }
};
</script>

<style lang="scss" scoped>
.contents {
    width: 100%;
    height: 100%;
    .header {
        text-align: left;
        padding-left: 20px;
        padding-top: 10px;
    }
    .center {
        height: calc(100% - 100px);
    }
    .el-pagination {
        margin-top: 10px;
    }
}
</style>