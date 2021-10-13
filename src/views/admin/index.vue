<template>
    <div class="admin">
        <nav-menu></nav-menu>
        <component :is="componentId"></component>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex"
import navMenu from "./compoents/navMenu.vue"
import contents from "./contents/index.vue"
import user from "./user/index.vue"
export default {
    components: { navMenu, contents, user },
    data: () => ({
    }),
    computed: {
        ...mapState({
            componentList: state => state.componentList,
        }),
        componentId() {
            return [
                "contents",
                "user"
            ][this.componentList - 1]
        }
    }
};
</script>

<style lang="scss" scoped>
.admin {
    width: 100%;
    height: 100%;
    display: flex;
}
</style>