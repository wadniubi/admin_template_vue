<template>
<div>
  <div class="block">
    <span class="demonstration">进度条</span>
    <el-slider v-model="value2" show-input></el-slider>
  </div>
</div>
</template>

<script>
export default {
  name: 'upload',
  data () {
    return {
      value2: 30
    }
  }
}
</script>

<style scoped>

</style>
