<template>
  <div>
    <el-tag type="info">
      用户名:{{authInfo.userName}}
    </el-tag>
    <el-tag type="success">
      权限列表:{{authInfo.roles}}
    </el-tag>
    <el-button :plain="true" @click="open">打开信息提示</el-button>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'firstPage',
  data: function () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'authInfo'
    ])
  },
  methods: {
    open () {
      this.$message({
        showClose: true,
        message: '用户名:' + this.authInfo.userName + '权限数组:' + this.authInfo.roles,
        type: 'sucess',
        center: true
      })
    }
  }
}
</script>

<style scoped>

</style>
