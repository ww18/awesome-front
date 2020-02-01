export default {
  requestData(opt) {
    let vm = opt.vm;
    opt.method = opt.method || "GET";
    // const userInfo = window.API.getStorage("userInfo");

    opt = {
      ...opt
      // ...userInfo,
      // headers: {
      //   token: userInfo.token
      // }
    };
    // 改成 promise 调用回调
    return vm
      .$http(opt)
      .then(res => {
        // 保留 直接 传入回调函数方式
        if ("callback" in opt) {
          opt.callback(res, vm);
        }
        return res;
      })
      .catch(() => {
        vm.$message.error("网络错误，请检查网络");
      })
      .finally(() => {
        // promise 是否 resolve 都需要在请求完成 后 执行的逻辑
        vm.loading = false;
      });
  }
};
