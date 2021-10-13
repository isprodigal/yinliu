<template>
    <div class="dialog">
        <el-dialog v-if="sj.dialogFormVisible" :title="sj.title" :visible.sync="sj.dialogFormVisible">
            <el-form label-position="right" label-width="80px" ref="dialog" :model="sj.formLabelAlign" :rules="rules">
                <el-form-item label="标题" prop='article_title'>
                    <el-input v-model="sj.formLabelAlign.article_title"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop='article_value'>
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 100}" v-model="sj.formLabelAlign.article_value"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="sj.dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="qd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { timeFormat } from "../../../../utils/filters.js"
import { mapState, mapMutations, mapActions } from "vuex"
export default {
    data() {
        return {
            sj: {
                title: '新增数据',
                dialogFormVisible: true,
                formLabelAlign: {
                    article_title: '',
                    article_value: '',
                },
            },
            rules: {
                article_title: {
                    required: true, message: '标题不能为空', trigger: 'blur'
                },
                article_value: {
                    required: true, message: '内容不能为空', trigger: 'blur'
                }
            }
        }
    },
    props: {
        dialogOneSj: { type: Object, default: () => { } }
    },
    created() {
        this.sj = Object.assign(this.sj, this.dialogOneSj)
    },
    methods: {
        ...mapActions({ ACT_query_tableData: 'ACT_query_tableData' }),
        //确定
        async qd() {
            this.$refs['dialog'].validate(async (valid) => {
                if (valid) {
                    if (this.dialogType == 'add') {
                        let article_id = new Date().getTime()
                        await this.add(article_id)
                    } else if (this.dialogType == 'edit') {
                        await this.edit()
                    }
                    this.dialogOneSj.dialogFormVisible = false
                } else {
                    this.$message({
                        showClose: true,
                        message: '有缺失的数据',
                        type: 'error'
                    });
                    return false;
                }
            });
        },
        //新增
        async add(article_id) {
            let { article_title, article_value } = this.dialogOneSj.formLabelAlign
            let params = {
                "tableName": "article",
                "columns": {
                    article_id,
                    article_key: Math.round(Math.random() * 100000000),
                    article_time: timeFormat(new Date(), 'YMDHMS'),
                    article_title,
                    article_value,
                    group_id: '1',//默认1 通过下拉选择
                }
            }
            const { code, data } = await this.$API.insert(params)
            if (code == '00000') {
                this.update(article_id)
            }
        },
        //更新文章id至用户表
        async update(article_id) {
            const { user_id } = JSON.parse(sessionStorage.getItem('userInfo'))[0]
            let params = {
                "tableName": "user_article",
                "columns": {
                    article_id,
                    user_id
                },
            }
            const { code, data } = await this.$API.insert(params)
            if (code == '00000') {
                this.ACT_query_tableData(this.PageOrgan.pageNo)
                this.$message({
                    message: '新增成功！',
                    type: 'success'
                });
            };
        },
        //编辑
        async edit() {
            let { article_id, article_title, article_value } = this.dialogOneSj.formLabelAlign
            let params = {
                "tableName": "article",
                "updateColumns": {
                    article_time: timeFormat(new Date(), 'YMDHMS'),
                    article_title,
                    article_value
                },
                "whereColumns": {
                    article_id
                }
            }
            const { code, data } = await this.$API.update(params)
            if (code == '00000') {
                this.ACT_query_tableData(this.PageOrgan.pageNo)
                this.$message({
                    message: '修改成功！',
                    type: 'success'
                });
            }
        }
    },
    computed: {
        ...mapState({
            dialogType: state => state.dialogType,
            PageOrgan: state => state.PageOrgan,
        }),
    },
    watch: {
        'dialogOneSj': {
            handler(newVal) {
                this.sj = Object.assign(this.sj, this.dialogOneSj)
            },
            deep: true,
            immediate: true
        }
    }
};
</script>

<style lang="scss" scoped>
.dialog {
    /deep/ .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 100%;
    }
}
</style>