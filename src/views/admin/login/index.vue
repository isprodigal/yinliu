<template>
    <div class="login-container" :style="{'background-image':'url(https://cdn.seovx.com/d/?mom=302' ,'background-size': '100%'}">
        <el-form :model="ruleForm2" :rules="rules2" status-icon ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-page">
            <h3 class="title">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="ruleForm2.username" auto-complete="off" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            logining: false,
            ruleForm2: {
                username: '',
                password: '',
            },
            rules2: {
                username: [{ required: true, message: '账号？？', trigger: 'blur' }],
                password: [{ required: true, message: '密码？？', trigger: 'blur' }]
            },
            checked: false
        }
    },
    mounted() {
        if (localStorage.getItem('user')) {
            this.checked = true
            this.ruleForm2 = JSON.parse(localStorage.getItem('user'))
        }
    },
    methods: {
        //登录
        handleSubmit(event) {
            if (this.checked) {
                localStorage.setItem('user', JSON.stringify(this.ruleForm2))
            } else {
                localStorage.removeItem('user')
            }
            this.$refs.ruleForm2.validate(async (valid) => {
                if (valid) {
                    this.logining = true;
                    const { username, password } = this.ruleForm2
                    let params = {
                        tableName: "user_base",
                        selectColumns: ["user_id", "user_name", "user_pwd"],
                        whereColumns: {
                            user_name: username,
                            user_pwd: password
                        }
                    }
                    const { code, data } = await this.$API.login(params)
                    if (code == '00000' && data.userInfo.length > 0) {
                        sessionStorage.setItem('token', data.token);
                        sessionStorage.setItem('userInfo', JSON.stringify(data.userInfo));
                        this.$router.push({ path: '/admin' });
                    } else {
                        this.$alert('请检查账号和密码，账号或密码错误!', '温馨提示', {
                            confirmButtonText: 'ok'
                        })
                    }
                    this.logining = false;
                } else {
                    console.log('error submit!');
                    return false;
                }
            })
        }
    }
};
</script>

<style scoped>
.login-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
h3 {
    margin-bottom: 10px;
}
.login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
}
</style>