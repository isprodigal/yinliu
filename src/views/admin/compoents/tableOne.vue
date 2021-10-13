<template>
    <div class="tableOne">
        <el-table ref="multipleTable" :data="tableData" height="100%" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column label="宣传链接" fixed width="200">
                <template slot-scope="scope">
                    <el-link type="primary" :href="'http://localhost:8080/#/common?id=' +scope.row.article_id" :underline="false">
                        http://localhost:8080/#/common?id={{ scope.row.article_id }}</el-link>
                </template>
            </el-table-column>
            <el-table-column label="文章ID" fixed width="130">
                <template slot-scope="scope">{{ scope.row.article_id }}</template>
            </el-table-column>
            <el-table-column label="文章KEY" fixed width="100">
                <template slot-scope="scope">{{ scope.row.article_key }}</template>
            </el-table-column>
            <el-table-column label="日期" width="170">
                <template slot-scope="scope">{{ scope.row.article_time | timeFormat("YMDHMS") }}</template>
            </el-table-column>
            <el-table-column prop="article_title" label="标题" width="150">
            </el-table-column>
            <el-table-column prop="article_value" label="内容" show-overflow-tooltip>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="small" @click="edit(scope.row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="small" @click="del(scope.row.article_id)"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex"
export default {
    data: () => ({
    }),
    methods: {
        ...mapMutations({ Mut_SET_dialogType: 'Mut_SET_dialogType' }),
        ...mapActions({ ACT_query_tableData: 'ACT_query_tableData' }),
        //编辑
        edit(val) {
            const { article_id, article_title, article_value } = val
            this.$emit('edit', { article_id, article_title, article_value })
            this.Mut_SET_dialogType('edit')
        },
        //删除
        async del(val) {
            let params = {
                "tableName": "article",
                "whereColumns": {
                    article_id: val,
                }
            }
            const { code, data } = await this.$API.delete(params)
            if (code == '00000') {
                this.update(val)
            }
        },
        //更新删除文章id至用户文章关联表
        async update(article_id) {
            const { user_id } = JSON.parse(sessionStorage.getItem('userInfo'))[0]
            let params = {
                "tableName": "user_article",
                "whereColumns": {
                    article_id,
                    user_id
                },
            }
            const { code, data } = await this.$API.delete(params)
            if (code == '00000') {
                this.ACT_query_tableData(this.PageOrgan.pageNo)
                this.$message({
                    message: '删除成功！',
                    type: 'success'
                });
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    },
    computed: {
        ...mapState({
            dialogType: state => state.dialogType,
            tableData: state => state.tableData,
            PageOrgan: state => state.PageOrgan,
        })
    },
};
</script>

<style lang="scss" scoped>
.tableOne {
    height: 100%;
}
</style>