<template>
    <el-menu class="el-menu"
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse='isCollapse'
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"></Sidebar-item>
    </el-menu>
</template>

<script>
import SidebarItem from './SidebarItem'
import {mapGetters} from 'vuex'
export default {
  name: 'SideBar',
  components: {SidebarItem},
  computed: {
    isCollapse: function () {
      return !this.$store.state.sidebar.isOpened
    },
    ...mapGetters([
      'permission_routers' // 默认全部路由,动态根据权限增加路由
    ])
  }
}
</script>

<style scoped>
</style>
