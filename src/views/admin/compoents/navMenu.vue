<template>
    <div class="navMenu">
        <el-menu default-active="1" class="el-menu-vertical-demo" @select="select" :collapse="isCollapse">
            <el-menu-item index="1">
                <span slot="title">LSP引流</span>
            </el-menu-item>
            <el-menu-item index="2">
                <span slot="title">用户信息</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex"
export default {
    name: 'navMenu',
    data() {
        return {
            isCollapse: false
        };
    },
    methods: {
        ...mapMutations({ Mut_SET_componentList: 'Mut_SET_componentList' }),
        select(val) {
            this.Mut_SET_componentList(val)
        }
    },
}
</script>

<style lang="scss" scoped>
.navMenu {
    width: 200px;
    height: 100%;
}
</style>
