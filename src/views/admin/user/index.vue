<template>
    <div class="user">
        <header>用户信息</header>
        <el-form label-position="left" label-width="100px" :model="user">
            <el-form-item label="用户ID">
                <el-input v-model="user.user_id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="用户名称">
                <el-input v-model="user.user_name"></el-input>
            </el-form-item>
            <el-form-item label="用户密码">
                <el-input v-model="user.user_pwd"></el-input>
            </el-form-item>
            <el-form-item label="用户群链接">
                <el-input v-model="user.user_qunSrc"></el-input>
            </el-form-item>
            <el-form-item label="用户群图片">
                <el-input v-model="user.user_imgSrc"></el-input>
            </el-form-item>
            <div class="demo-image__preview">
                <el-image :src="user.user_imgSrc" :preview-src-list="[user.user_imgSrc]">
                </el-image>
            </div>
        </el-form>
        <el-button type="primary" @click="bc">保存</el-button>
    </div>
</template>

<script>
export default {
    data: () => ({
        user: {}
    }),
    async created() {
        if (sessionStorage.getItem('userInfo')) {
            const { user_name } = JSON.parse(sessionStorage.getItem('userInfo'))[0]
            let params = {
                "tableName": "user_base",
                "selectColumns": ["user_id", "user_name", "user_pwd", "user_qunSrc", "user_imgSrc"],
                "whereColumns": { user_name }
            }
            const { code, data } = await this.$API.select(params)
            if (code == '00000') {
                this.user = data[0]
            }
        }
    },
    methods: {
        async bc() {
            const { user_id, user_name, user_pwd, user_qunSrc, user_imgSrc } = this.user
            let params = {
                "tableName": "user_base",
                "updateColumns": {
                    user_id,
                    user_name,
                    user_pwd,
                    user_qunSrc,
                    user_imgSrc
                },
                "whereColumns": {
                    user_id
                }
            }
            const { code, data } = await this.$API.update(params)
            if (code == '00000' && data > 0) {
                this.$alert('更新成功，请重新登录！', '温馨提示', {
                    confirmButtonText: 'ok', callback: action => {
                        this.$router.push({ path: '/login' });
                    }
                })
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.user {
    width: 100%;
    height: 100%;
}
header {
    margin: 20px 0;
}
</style>