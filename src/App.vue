<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  a,
  a:focus,
  a:hover {
    cursor: pointer;
    color: inherit;
    outline: none;
    text-decoration: none;
  }
  div:focus{
    outline: none;
  }
</style>
