<template>
  <div class="main">
    <router-view></router-view>
  </div>
</template>
<style>
body,
html {
  height: 100%;
  padding: 0;
  margin: 0;
}
.main {
  height: 100%;
}
</style>

<script>
export default {
  created() {
    let islogin = localStorage.getItem("isLogin");
    if (!islogin) {
      this.$router.replace({ path: "/login" });
    }
  }
};
</script>
