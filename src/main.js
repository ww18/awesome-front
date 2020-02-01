import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";

Vue.config.productionTip = false;
//每次跳转之前先检查是否登陆
router.beforeEach((to, from, next) => {
  let islogin = localStorage.getItem("isLogin");
  if (!islogin && to.path != "/login") {
    next({ path: "/login" });
  } else {
    next();
  }
});

/* 使用axios */
import axios from "axios";
Vue.prototype.$http = axios;
import qs from "qs";
Vue.prototype.$qs = qs;
import API from "./assets/api";
window.API = API;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
