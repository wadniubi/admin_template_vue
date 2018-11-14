<template>
  <div class="app-wrapper">
    <SideBar class="sidebar-container"></SideBar>
    <div class="main-container">
      <NavBar></NavBar>
      <AppMin></AppMin>
    </div>
  </div>
</template>

<script>
import SideBar from './components/SideBar'
import AppMin from './components/AppMin'
import NavBar from './components/NavBar'
export default {
  name: 'layout',
  components: {NavBar, SideBar, AppMin}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
  }
  .main-container {
    min-height: 100%;
    transition: margin-left .28s;
    margin-left: 180px;
    position: relative;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  // 侧边栏
  .sidebar-container {
    transition: width 0.28s;
    width: 180px !important;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    //reset element-ui css
    .horizontal-collapse-transition {
      transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
    }
    .scrollbar-wrapper {
      height: calc(100% + 15px);
      .el-scrollbar__view {
        height: 100%;
      }
    }
    .is-horizontal {
      display: none;
    }
    a {
      display: inline-block;
      width: 100%;
      overflow: hidden;
    }
    .svg-icon {
      margin-right: 16px;
    }
    .el-menu {
      border: none;
      height: 100%;
      width: 100% !important;
    }
  }
</style>
