const glob = require("glob");
const pages = {};

const path = require("path");
const pathRosolve = function(dir) {
  return path.join(__dirname, dir);
};

// 自定义 代理地址
const proxyUrl = {
  dev: "http://192.168.0.102:8888/"
};
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: proxyUrl.dev,
        changeOrigin: true
      }
    },
    port: "8081"
  },
  lintOnSave: false,
  chainWebpack: config => {
    // // @ is an alias to /src  下面是设置的其他 路径别名;图片引入使用require(),可以识别别名。
    // config.resolve.alias.set("components", pathRosolve("src/components"));
    // config.resolve.alias.set("assets", pathRosolve("src/assets"));
    // config.resolve.alias.set("img", pathRosolve("src/assets/img"));
    // config.resolve.alias.set("@", pathRosolve("src"));

    // set svg-sprite-loader
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
        include: ["src/assets/img/svg"]
      });
  }
};
