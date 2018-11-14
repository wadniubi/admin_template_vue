<template>
  <el-menu class="navbar" mode="horizontal">
    <BreadCrumb ></BreadCrumb>
    <div class="avatar-container" style="right: 95px">{{authInfo.userName}}</div>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="getPicture">
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item >
            Home
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">LogOut</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import BreadCrumb from './Breadcrumb'
export default {
  name: 'NavBar',
  components: {
    BreadCrumb
  },
  computed: {
    ...mapGetters([
      'authInfo'
    ]),
    getPicture () {
      return 'https://s1.ax1x.com/2018/08/08/Ps2ni9.jpg'
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      vertical-align: center;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 0px;
        position: relative;
        .user-avatar {
          width: 50px;
          height: 50px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
</style>
