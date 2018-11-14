<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMin',
  computed: {
    key () {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
  .app-main {
    min-height: calc(100vh - 50px); // 设置页面最小高度,如果想去掉进度条(页面高度不满足),
    position: relative;
    overflow: hidden;
  }
  /*fade-transform*/
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all .5s;
  }
  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
  }
  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>
